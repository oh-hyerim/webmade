import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import WhySection from './components/WhySection';
import ServicesSection from './components/ServicesSection';
import PortfolioSection from './components/PortfolioSection';
import ProcessSection from './components/ProcessSection';
import PricingSection from './components/PricingSection';
import FinalCta from './components/FinalCta';
import SeoHead from '@/components/feature/SeoHead';

export default function HomePage() {
  return (
    <div
      className="min-h-screen"
      style={{ fontFamily: "'Noto Sans KR', 'Montserrat', sans-serif" }}
    >
      <SeoHead
        title="웹메이드 | 문의 전환 중심 홈페이지 제작"
        description="소상공인과 중소기업을 위한 반응형 홈페이지·랜딩페이지 제작. 구조 설계부터 문의 전환까지 고려해 비대면으로 빠르게 진행합니다."
        path="/"
      />
      <Navbar />
      <main>
        {/* 1. Hero */}
        <HeroSection />
        {/* 2. 선언형 기준 섹션 */}
        <WhySection />
        {/* 3. 목적별 제작 방식 */}
        <ServicesSection />
        {/* 4. 대표 포트폴리오 */}
        <PortfolioSection />
        {/* 5. 진행 방식 + 인라인 FAQ */}
        <ProcessSection />
        {/* 6. 가격 안내 */}
        <PricingSection />
        {/* 7. 상담 CTA + Footer */}
        <FinalCta />
      </main>

      {/* Mobile sticky CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex">
        <a
          href="/contact"
          className="flex-1 flex items-center justify-center gap-2 py-5 bg-[#0a0a0a] text-white font-medium text-sm cursor-pointer border-r border-white/10 whitespace-nowrap"
        >
          <i className="ri-question-answer-line text-base" />
          문의하기
        </a>
        <a
          href="http://pf.kakao.com/_xcBxnxlX"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-5 bg-[#FEE500] text-[#111] font-medium text-sm cursor-pointer whitespace-nowrap"
        >
          <i className="ri-kakao-talk-fill text-base" />
          카카오 상담
        </a>
      </div>
      <div className="md:hidden h-16" />
    </div>
  );
}
