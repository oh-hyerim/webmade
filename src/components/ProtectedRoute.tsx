import { useEffect, useState, useRef, useCallback, type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { isAdminSession } from '@/lib/auth';

const IDLE_MS = 30 * 60 * 1000;

type Props = { children: ReactNode };

/**
 * 관리자 전용: 로그인 + user_metadata.role === 'admin'
 * 비활성 30분 후 자동 로그아웃 (관리자 세션)
 */
export default function ProtectedRoute({ children }: Props) {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);
  const lastActivityRef = useRef<number>(Date.now());

  const refreshAllowed = useCallback((session: Session | null) => {
    setAllowed(isAdminSession(session));
  }, []);

  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      refreshAllowed(data.session);
      setLoading(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      refreshAllowed(session);
    });
    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, [refreshAllowed]);

  useEffect(() => {
    if (!allowed) return;

    const bump = () => {
      lastActivityRef.current = Date.now();
    };
    const events: (keyof WindowEventMap)[] = ['mousedown', 'keydown', 'scroll', 'touchstart', 'click'];
    events.forEach((e) => window.addEventListener(e, bump, { passive: true }));

    const interval = window.setInterval(() => {
      if (Date.now() - lastActivityRef.current > IDLE_MS) {
        void supabase.auth.signOut();
      }
    }, 60_000);

    return () => {
      events.forEach((e) => window.removeEventListener(e, bump));
      window.clearInterval(interval);
    };
  }, [allowed]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="w-6 h-6 border-2 border-[#0F172A] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!allowed) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
