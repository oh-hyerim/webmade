import { Link } from 'react-router-dom';
import Seo from '@/components/feature/Seo';
import { SEO_PAGES } from '@/config/seo';

export default function ContractOnlyPage() {
  const seo = SEO_PAGES['/contract-only'];
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 bg-[#F8FAFC]">
      <Seo
        title={seo.title}
        description={seo.description}
        ogTitle={seo.ogTitle}
        ogDescription={seo.ogDescription}
        path="/contract-only"
        noindex
      />
      <div className="max-w-md w-full bg-white border border-[#E2E8F0] rounded-2xl p-8 text-center shadow-sm">
        <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center bg-[#FEF3C7] rounded-full">
          <i className="ri-lock-2-line text-2xl text-[#D97706]"></i>
        </div>
        <h1 className="text-xl font-bold text-[#0F172A] mb-2">Contract Only</h1>
        <p className="text-[#64748B] text-sm leading-relaxed mb-6">
          이 페이지는 계약이 완료된 고객 전용 제작 요청서입니다.<br />
          일반 문의는 상담 페이지를 이용해 주세요.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center justify-center gap-2 w-full bg-[#1E5EFF] text-white font-semibold py-3.5 rounded-xl text-sm hover:bg-[#1a4fd6] transition-colors"
        >
          <i className="ri-mail-send-line"></i>
          상담 문의하기
        </Link>
        <Link to="/" className="block mt-4 text-sm text-[#1E5EFF] font-medium hover:underline">
          홈으로
        </Link>
      </div>
    </main>
  );
}
