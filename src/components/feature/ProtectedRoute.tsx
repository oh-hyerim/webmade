import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const [checking, setChecking] = useState(true);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        if (!mounted) return;
        setAuthed(!!session);
        setChecking(false);
      })
      .catch(() => {
        if (!mounted) return;
        setAuthed(false);
        setChecking(false);
      });
    return () => { mounted = false; };
  }, []);

  if (checking) {
    return (
      <div className="min-h-screen bg-[#f8f7f4] flex items-center justify-center">
        <i className="ri-loader-4-line animate-spin text-[#0a0a0a]/30 text-2xl" />
      </div>
    );
  }

  return authed ? <>{children}</> : <Navigate to="/admin/login" replace />;
}
