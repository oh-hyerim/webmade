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
import { SEO_PAGES } from '@/config/seo';

export default function HomePage() {
  const seo = SEO_PAGES['/'];
  return (
    <main>
      <Seo
        title={seo.title}
        description={seo.description}
        ogTitle={seo.ogTitle}
        ogDescription={seo.ogDescription}
        path="/"
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
