/**
 * VITE_SENTRY_DSN 이 설정된 경우에만 Sentry 초기화.
 * DSN은 공개 가능한 클라이언트 키이며, 프로젝트 설정에서 도메인 제한을 권장합니다.
 */
import * as Sentry from '@sentry/react';

export function initSentry() {
  const dsn = import.meta.env.VITE_SENTRY_DSN as string | undefined;
  if (!dsn?.trim()) return;

  Sentry.init({
    dsn: dsn.trim(),
    environment: import.meta.env.MODE,
    tracesSampleRate: 0,
    beforeSend(event) {
      if (event.request?.cookies) delete event.request.cookies;
      return event;
    },
  });
}

export { Sentry };
