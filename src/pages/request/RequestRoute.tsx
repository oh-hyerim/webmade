import { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import RequestPage from './page';

const STORAGE_KEY = 'webmade_request_access';

/**
 * 계약 고객 전용: 환경변수 VITE_REQUEST_ACCESS_TOKEN 과 일치하는
 * ?access= 또는 ?key= 쿼리로 1회 인가 시 세션에 저장됩니다.
 * 토큰 미설정 시 /request 는 누구도 볼 수 없습니다(배포 시 반드시 설정).
 */
export default function RequestRoute() {
  const location = useLocation();
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const expected = (import.meta.env.VITE_REQUEST_ACCESS_TOKEN as string | undefined)?.trim();
    const params = new URLSearchParams(location.search);
    const token = params.get('access') || params.get('key');

    if (expected && token && token === expected) {
      sessionStorage.setItem(STORAGE_KEY, '1');
      navigate('/request', { replace: true });
      setAllowed(true);
      setReady(true);
      return;
    }

    if (sessionStorage.getItem(STORAGE_KEY) === '1') {
      setAllowed(true);
    }
    setReady(true);
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
