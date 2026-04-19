/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PUBLIC_SITE_URL?: string;
  readonly VITE_GA_MEASUREMENT_ID?: string;
  /** Sentry 브라우저 DSN (공개 가능, 프로젝트에서 도메인 제한 권장) */
  readonly VITE_SENTRY_DSN?: string;
  /**
   * 요청서 접근 검증 API 전체 URL (선택).
   * 로컬 `vite`만 쓸 때는 배포된 `/api/verify-request-access` URL을 넣거나 `vercel dev` 사용.
   */
  readonly VITE_REQUEST_VERIFY_URL?: string;
  readonly VITE_PUBLIC_SUPABASE_URL: string;
  /** 레거시: Supabase anon 공개 키 (publishable 키와 동일 역할) */
  readonly VITE_PUBLIC_SUPABASE_ANON_KEY: string;
  /** Supabase Publishable 키 — 설정 시 anon 대신 사용 */
  readonly VITE_PUBLIC_SUPABASE_PUBLISHABLE_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare const __BASE_PATH__: string;
declare const __IS_PREVIEW__: boolean;
