import { useEffect } from 'react';

/**
 * VITE_GA_MEASUREMENT_ID 가 설정된 경우에만 GA4(gtag) 로드.
 * 전환·유입 추적용 — Vercel 등에 환경 변수로 등록하세요.
 */
export default function Analytics() {
  useEffect(() => {
    const id = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;
    if (!id) return;

    const s1 = document.createElement('script');
    s1.async = true;
    s1.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
    document.head.appendChild(s1);

    const s2 = document.createElement('script');
    s2.textContent = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', ${JSON.stringify(id)});
    `;
    document.head.appendChild(s2);
  }, []);

  return null;
}
