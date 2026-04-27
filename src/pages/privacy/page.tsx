import { Link } from 'react-router-dom';
import SeoHead from '@/components/feature/SeoHead';
import Navbar from '@/pages/home/components/Navbar';

const sections = [
  {
    title: '수집 항목',
    body: '웹메이드는 상담 및 견적 안내를 위해 이름, 연락처, 이메일, 문의내용을 수집합니다.',
  },
  {
    title: '수집 목적',
    body: '수집된 정보는 홈페이지 제작 상담, 견적 안내, 프로젝트 진행 가능 여부 확인을 위해 사용합니다.',
  },
  {
    title: '보관 기간',
    body: '상담 완료 후 내부 기준에 따라 필요한 기간 동안 보관하며, 더 이상 보관이 필요하지 않은 정보는 지체 없이 파기합니다.',
  },
  {
    title: '제3자 처리 서비스',
    body: '문의 및 제작요청 데이터 저장과 사이트 운영을 위해 Supabase, Vercel 서비스를 이용할 수 있습니다.',
  },
  {
    title: '문의처',
    body: '개인정보 관련 문의는 웹메이드 상담 채널을 통해 요청하실 수 있습니다.',
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#f5f4f0]" style={{ fontFamily: "'Noto Sans KR', 'Montserrat', sans-serif" }}>
      <SeoHead
        title="개인정보처리방침 | 웹메이드"
        description="웹메이드 홈페이지 제작 상담 및 견적 안내를 위한 개인정보 수집 항목, 목적, 보관 기간, 처리 서비스를 안내합니다."
        path="/privacy"
      />
      <Navbar forceSolid />
      <main className="pt-32 md:pt-40 pb-20 md:pb-28">
        <section className="max-w-5xl mx-auto px-8 md:px-16">
          <div className="flex items-center gap-3 mb-10">
            <span className="w-8 h-px bg-[#0a0a0a]/25" />
            <span className="text-[10px] tracking-[0.3em] text-[#0a0a0a]/45 uppercase font-light">Privacy</span>
          </div>
          <h1 className="font-serif text-[clamp(2.4rem,5vw,4.6rem)] text-[#0a0a0a] leading-[1.08] tracking-tight mb-8">
            개인정보처리방침
          </h1>
          <p className="text-[#0a0a0a]/55 text-sm md:text-base font-light leading-[1.9] max-w-2xl mb-14">
            웹메이드는 상담과 견적 안내에 필요한 최소한의 개인정보를 수집하며, 수집 목적 범위 안에서만 이용합니다.
          </p>

          <div className="grid grid-cols-1 gap-px bg-[#0a0a0a]/10">
            {sections.map((section, index) => (
              <article key={section.title} className="bg-white/70 p-7 md:p-9">
                <span className="text-[10px] font-mono tracking-widest text-[#0a0a0a]/20">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h2 className="font-serif text-2xl text-[#0a0a0a] mt-5 mb-4">{section.title}</h2>
                <p className="text-sm text-[#0a0a0a]/60 font-light leading-[1.85]">{section.body}</p>
              </article>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-[#0a0a0a]/10 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <p className="text-xs text-[#0a0a0a]/40">최종 업데이트: 2026-04-27</p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-xs text-[#0a0a0a]/55 hover:text-[#0a0a0a] transition-colors"
            >
              문의하기
              <i className="ri-arrow-right-line" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
