import { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import RequestPage from './page';

const STORAGE_KEY = 'webmade_request_granted';

function verifyEndpoint(): string {
  const override = (import.meta.env.VITE_REQUEST_VERIFY_URL as string | undefined)?.trim();
  if (override) return override;
  return '/api/verify-request-access';
}

/**
 * 계약 고객 전용: ?access= 또는 ?key= 토큰을 서버(API)에서만 검증합니다.
 * 비밀값은 Vercel 환경변수 REQUEST_ACCESS_TOKEN (서버 전용).
 */
export default function RequestRoute() {
  const location = useLocation();
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      const params = new URLSearchParams(location.search);
      const token = params.get('access') || params.get('key');

      if (token) {
        try {
          const res = await fetch(verifyEndpoint(), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token }),
          });
          const data = (await res.json().catch(() => ({}))) as { ok?: boolean };
          if (!cancelled && res.ok && data.ok === true) {
            sessionStorage.setItem(STORAGE_KEY, '1');
            navigate('/request', { replace: true });
            setAllowed(true);
            setReady(true);
            return;
          }
        } catch {
          /* 네트워크 오류 시 미허용 */
        }
        if (!cancelled) {
          setAllowed(false);
          setReady(true);
        }
        return;
      }

      if (!cancelled) {
        setAllowed(sessionStorage.getItem(STORAGE_KEY) === '1');
        setReady(true);
      }
    }

    void run();
    return () => {
      cancelled = true;
    };
  }, [location.search, navigate]);

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="w-8 h-8 border-2 border-[#0F172A] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!allowed) {
    return <Navigate to="/contract-only" replace />;
  }

  return <RequestPage />;
}
