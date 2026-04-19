import Seo from '@/components/feature/Seo';
import PrivacyPolicyContent from '@/components/PrivacyPolicyContent';
import { SEO_PAGES } from '@/config/seo';

export default function PrivacyPage() {
  const seo = SEO_PAGES['/privacy'];
  return (
    <main className="pt-24 pb-16 md:pb-24 min-h-screen bg-white">
      <Seo
        title={seo.title}
        description={seo.description}
        ogTitle={seo.ogTitle}
        ogDescription={seo.ogDescription}
        path="/privacy"
      />
      <div className="max-w-3xl mx-auto px-6 md:px-10">
        <h1 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-6">개인정보 처리방침</h1>
        <PrivacyPolicyContent />
      </div>
    </main>
  );
}
