import { Component, type ErrorInfo, type ReactNode } from 'react';
import * as Sentry from '@sentry/react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

/** 루트 오류 시 폴백 UI (디자인 최소 침해) */
export default class AppErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (import.meta.env.VITE_SENTRY_DSN) {
      Sentry.captureException(error, { extra: { componentStack: errorInfo.componentStack } });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-[#F8FAFC] text-center">
          <p className="text-[#0F172A] font-semibold mb-2">일시적인 오류가 발생했습니다.</p>
          <p className="text-[#64748B] text-sm mb-6">페이지를 새로고침하거나 잠시 후 다시 시도해 주세요.</p>
          <button
            type="button"
            className="bg-[#1E5EFF] text-white font-semibold px-6 py-3 rounded-xl text-sm"
            onClick={() => window.location.reload()}
          >
            새로고침
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
