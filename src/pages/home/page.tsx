import HeroSection from './components/HeroSection';
import EmpathySection from './components/EmpathySection';
import ServiceSection from './components/ServiceSection';
import DiffSection from './components/DiffSection';
import CasesPreview from './components/CasesPreview';
import ProcessSection from './components/ProcessSection';
import PriceSection from './components/PriceSection';
import TestimonialSection from './components/TestimonialSection';
import FaqSection from './components/FaqSection';
import CtaBanner from './components/CtaBanner';
import Seo from '@/components/feature/Seo';

export default function HomePage() {
  return (
    <main>
      <Seo
        title="홈페이지 제작 전문 웹메이드 | 사업자 맞춤 사이트 제작"
        description="사업 운영자를 위한 홈페이지 제작 전문 서비스 웹메이드. 트렌디하고 전문적인 사이트 제작으로 상담 및 문의 유입을 높이세요."
        ogTitle="웹메이드 홈페이지 제작"
        ogDescription="사업자를 위한 전문 홈페이지 제작 서비스"
        canonical="https://webmade.co.kr/"
      />
      <HeroSection />
      <EmpathySection />
      <ServiceSection />
      <DiffSection />
      <CasesPreview />
      <ProcessSection />
      <PriceSection />
      <TestimonialSection />
      <FaqSection />
      <CtaBanner />
    </main>
  );
}
