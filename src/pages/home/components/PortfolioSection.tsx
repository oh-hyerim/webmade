import { useEffect, useRef } from 'react';

const featured = {
  label: 'Demo Project',
  category: '피부과 / 랜딩페이지',
  title: '신뢰형 메인 구조',
  structureTag: '신뢰 → 서비스 → 예약',
  designNote: '첫 화면 신뢰 확보 중심 구조',
  intent: '처음 방문한 환자가 진료 항목과 예약 방법을 빠르게 파악할 수 있도록 정보 흐름을 설계한 샘플',
  img: 'https://readdy.ai/api/search-image?query=ultra%20minimal%20dark%20medical%20clinic%20website%20design%20concept%2C%20full%20screen%20hero%20layout%2C%20elegant%20serif%20typography%20on%20deep%20black%20background%2C%20sophisticated%20healthcare%20landing%20page%2C%20monochrome%20editorial%20aesthetic%2C%20clean%20white%20text%20on%20dark%2C%20premium%20trustworthy%20feel%2C%20no%20people%2C%20abstract%20web%20design&width=1400&height=800&seq=port-v3-featured&orientation=landscape',
};

const secondary = [
  {
    label: 'Concept Work',
    category: '컨설팅 기업 / 회사소개',
    title: '전문성 중심 구성',
    structureTag: '신뢰 → 실적 → 문의',
    designNote: '문의 유도 흐름에 맞춘 구성',
    intent: '처음 방문한 잠재 고객이 "믿을 수 있는 곳"이라는 인상을 받을 수 있도록 신뢰 요소를 앞에 배치한 구성',
    img: 'https://readdy.ai/api/search-image?query=premium%20consulting%20firm%20website%20design%20concept%20on%20dark%20background%2C%20large%20editorial%20typography%2C%20professional%20business%20layout%2C%20monochrome%20black%20and%20white%20palette%2C%20sophisticated%20corporate%20aesthetic%2C%20clean%20minimal%20design%2C%20no%20people%2C%20abstract%20web%20design&width=900&height=600&seq=port-v3-consulting&orientation=landscape',
  },
  {
    label: 'Sample Landing Page',
    category: '뷰티 브랜드 / 상세페이지',
    title: '감성형 전환 구조',
    structureTag: '감성 → 특징 → 구매',
    designNote: '정보 전달보다 전환을 우선한 메인 설계',
    intent: '브랜드 감성을 먼저 전달하고, 제품 특징 → 구매 버튼 순서로 자연스럽게 전환을 유도하는 흐름',
    img: 'https://readdy.ai/api/search-image?query=luxury%20beauty%20brand%20website%20design%20concept%2C%20dark%20elegant%20background%2C%20feminine%20editorial%20typography%2C%20sophisticated%20cosmetics%20landing%20page%2C%20monochrome%20dark%20aesthetic%2C%20premium%20beauty%20brand%20feel%2C%20no%20people%2C%20abstract%20web%20design&width=700&height=480&seq=port-v3-beauty&orientation=landscape',
  },
];

export default function PortfolioSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal-item').forEach((el, i) => {
              setTimeout(() => (el as HTMLElement).classList.add('opacity-100', 'translate-y-0'), i * 120);
            });
          }
        });
      },
      { threshold: 0.04 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="relative overflow-x-hidden"
      style={{
        background: 'linear-gradient(to bottom, #f5f4f0 0%, #f5f4f0 100%)',
      }}
    >
      {/* 사다리꼴 검정 배경 — 데스크탑 */}
      <div
        className="absolute inset-0 pointer-events-none hidden md:block"
        style={{
          background: '#0d0d0d',
          clipPath: 'polygon(0 62%, 100% 37%, 100% 100%, 0% 100%)',
        }}
      />
      {/* 사다리꼴 검정 배경 — 모바일: 완만한 경사, 위치 조정 */}
      <div
        className="absolute inset-0 pointer-events-none md:hidden"
        style={{
          background: '#0d0d0d',
          clipPath: 'polygon(0 27%, 100% 21%, 100% 100%, 0% 100%)',
        }}
      />

      {/* 콘텐츠 — 배경 위에 올라옴 */}
      <div className="relative z-10 pt-16 md:pt-24 pb-16 md:pb-40">
        <div className="max-w-7xl mx-auto px-4 md:px-16">

          {/* ── Header (베이지 영역) ── */}
          <div className="reveal-item opacity-0 translate-y-4 transition-all duration-700 flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-6 mb-12 md:mb-16">
            <div>
              <div className="flex items-center gap-3 mb-5 md:mb-7">
                <span className="w-8 h-px bg-[#0d0d0d]/20" />
                <span className="text-[10px] tracking-[0.3em] text-[#0d0d0d]/40 uppercase font-light">샘플 시안</span>
              </div>
              <h2 className="font-serif text-[clamp(1.8rem,4vw,3.2rem)] text-[#0d0d0d] leading-[1.12] tracking-tight">
                설계 의도가 보이는<br />
                <span className="italic text-[#0d0d0d]/35">작업 방식</span>
              </h2>
            </div>
            <p className="text-[#0d0d0d]/40 text-xs font-light leading-relaxed max-w-xs md:text-right pb-1">
              각 시안은 업종과 목적에 맞게<br className="hidden md:block" />
              정보 흐름을 다르게 설계한 예시입니다.<br className="hidden md:block" />
              <span className="text-[#0d0d0d]/25">실제 성과 사례가 아닌 방향 참고용입니다.</span>
            </p>
          </div>

          {/* ─── Featured — 주인공처럼 크게 ─── */}
          <div className="reveal-item opacity-0 translate-y-8 transition-all duration-700 mb-3 group cursor-default">

            {/* Mobile */}
            <div className="md:hidden">
              <div className="relative w-full h-[240px] overflow-hidden">
                <img src={featured.img} alt={featured.title} className="w-full h-full object-cover object-center" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d]/80 to-transparent" />
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="text-[9px] tracking-[0.25em] text-white/60 uppercase bg-black/50 border border-white/15 px-3 py-1.5 font-light">{featured.label}</span>
                  <span className="text-[9px] text-white/35 font-light border border-white/10 px-2.5 py-1.5 whitespace-nowrap">{featured.structureTag}</span>
                </div>
              </div>
              <div className="pt-5 pb-4">
                <p className="text-white/30 text-[9px] tracking-widest uppercase font-light mb-2">{featured.category}</p>
                <h3 className="font-serif text-white text-xl leading-snug mb-2">{featured.title}</h3>
                <p className="text-white/45 text-xs font-light leading-relaxed mb-3">{featured.intent}</p>
                <div className="pt-4 border-t border-white/[0.07]">
                  <p className="text-white/22 text-[9px] tracking-widest uppercase mb-1.5 font-light">설계 의도</p>
                  <p className="text-white/38 text-xs font-light">{featured.designNote}</p>
                </div>
              </div>
            </div>

            {/* Desktop */}
            <div className="hidden md:block relative w-full overflow-hidden" style={{ height: 'clamp(380px, 55vw, 640px)' }}>
              <img
                src={featured.img}
                alt={featured.title}
                className="w-full h-full object-cover object-top group-hover:scale-[1.015] transition-transform duration-1200"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/20 to-transparent" />

              <div className="absolute top-8 left-8 flex items-center gap-3">
                <span className="text-[9px] tracking-[0.25em] text-white/60 uppercase bg-black/50 border border-white/15 px-3 py-1.5 font-light">
                  {featured.label}
                </span>
                <span className="text-[9px] tracking-[0.15em] text-white/35 font-light border border-white/10 px-3 py-1.5 whitespace-nowrap">
                  {featured.structureTag}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-10 md:p-14">
                <div className="flex flex-row items-end justify-between gap-8">
                  <div>
                    <p className="text-white/30 text-[9px] tracking-widest uppercase mb-3 font-light">{featured.category}</p>
                    <h3 className="font-serif text-white text-[clamp(1.8rem,3vw,2.8rem)] leading-snug mb-3">{featured.title}</h3>
                    <p className="text-white/50 text-sm font-light leading-relaxed max-w-md">{featured.intent}</p>
                  </div>
                  <div className="max-w-xs flex-shrink-0 pb-1">
                    <p className="text-white/20 text-[9px] tracking-widest uppercase mb-2 font-light">설계 의도</p>
                    <p className="text-white/42 text-sm font-light leading-relaxed">{featured.designNote}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ─── Row 2: Two columns ─── */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-3">

            {/* Left — consulting */}
            <div className="reveal-item opacity-0 translate-y-6 transition-all duration-700 md:col-span-7 group cursor-default">
              <div className="md:hidden">
                <div className="relative w-full h-[180px] overflow-hidden">
                  <img src={secondary[0].img} alt={secondary[0].title} className="w-full h-full object-cover object-center" />
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="text-[9px] tracking-[0.2em] text-white/55 uppercase bg-black/40 border border-white/12 px-2.5 py-1 font-light">{secondary[0].label}</span>
                  </div>
                </div>
                <div className="pt-4 pb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <p className="text-white/28 text-[9px] tracking-widest uppercase font-light">{secondary[0].category}</p>
                    <span className="text-white/18 text-[9px] font-light border border-white/10 px-2 py-0.5 rounded-full whitespace-nowrap">{secondary[0].structureTag}</span>
                  </div>
                  <h3 className="text-white text-base font-light leading-snug mb-1.5">{secondary[0].title}</h3>
                  <p className="text-white/35 text-xs font-light leading-relaxed mb-1">{secondary[0].designNote}</p>
                  <p className="text-white/28 text-xs font-light leading-relaxed">{secondary[0].intent}</p>
                </div>
              </div>

              <div className="hidden md:block relative overflow-hidden" style={{ height: 'clamp(240px, 32vw, 420px)' }}>
                <img src={secondary[0].img} alt={secondary[0].title} className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d]/90 via-[#0d0d0d]/15 to-transparent" />
                <div className="absolute top-5 left-5 flex items-center gap-2">
                  <span className="text-[9px] tracking-[0.2em] text-white/55 uppercase bg-black/40 border border-white/12 px-2.5 py-1 font-light">{secondary[0].label}</span>
                  <span className="text-[9px] text-white/28 font-light border border-white/[0.08] px-2.5 py-1 whitespace-nowrap">{secondary[0].structureTag}</span>
                </div>
                <div className="absolute bottom-0 left-0 p-7">
                  <p className="text-white/28 text-[9px] tracking-widest uppercase mb-1.5 font-light">{secondary[0].category}</p>
                  <h3 className="text-white text-xl font-light leading-snug mb-1.5">{secondary[0].title}</h3>
                  <p className="text-white/45 text-xs font-light mb-1">{secondary[0].designNote}</p>
                  <p className="text-white/30 text-xs font-light leading-relaxed max-w-sm">{secondary[0].intent}</p>
                </div>
              </div>
            </div>

            {/* Right — beauty */}
            <div className="reveal-item opacity-0 translate-y-6 transition-all duration-700 md:col-span-5 group cursor-default" style={{ transitionDelay: '100ms' }}>
              <div className="md:hidden">
                <div className="relative w-full h-[180px] overflow-hidden">
                  <img src={secondary[1].img} alt={secondary[1].title} className="w-full h-full object-cover object-center" />
                </div>
                <div className="pt-4 pb-3 border-b border-white/[0.07]">
                  <div className="flex items-center gap-3 mb-2">
                    <p className="text-white/22 text-[9px] tracking-widest uppercase font-light">{secondary[1].category}</p>
                    <span className="text-white/15 text-[9px] font-light border border-white/[0.08] px-2 py-0.5 rounded-full whitespace-nowrap">{secondary[1].structureTag}</span>
                  </div>
                  <h3 className="text-white text-sm font-light leading-snug mb-1.5">{secondary[1].title}</h3>
                  <p className="text-white/32 text-xs font-light mb-1">{secondary[1].designNote}</p>
                  <p className="text-white/25 text-xs font-light leading-relaxed">{secondary[1].intent}</p>
                </div>
              </div>

              <div className="hidden md:block">
                <div className="relative overflow-hidden" style={{ height: 'clamp(180px, 22vw, 300px)' }}>
                  <img src={secondary[1].img} alt={secondary[1].title} className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d]/80 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="text-[9px] tracking-[0.2em] text-white/55 uppercase bg-black/40 border border-white/12 px-2.5 py-1 font-light">{secondary[1].label}</span>
                    <span className="text-[9px] text-white/25 font-light border border-white/[0.08] px-2.5 py-1 whitespace-nowrap">{secondary[1].structureTag}</span>
                  </div>
                </div>
                <div className="pt-5 pb-4 border-b border-white/[0.07]">
                  <p className="text-white/22 text-[9px] tracking-widest uppercase mb-1.5 font-light">{secondary[1].category}</p>
                  <h3 className="text-white text-sm font-light leading-snug mb-1.5">{secondary[1].title}</h3>
                  <p className="text-white/40 text-xs font-light mb-1">{secondary[1].designNote}</p>
                  <p className="text-white/28 text-xs font-light leading-relaxed">{secondary[1].intent}</p>
                </div>
              </div>
            </div>
          </div>

          {/* ─── Row 3: Text strip ─── */}
          <div className="reveal-item opacity-0 translate-y-4 transition-all duration-700 border-t border-white/[0.06] py-6 md:py-8 flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-6 group cursor-default" style={{ transitionDelay: '80ms' }}>
            <div className="flex items-start gap-4 md:gap-10">
              <span className="text-white/12 text-[10px] font-mono mt-0.5 flex-shrink-0">04</span>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <p className="text-white/22 text-[9px] tracking-widest uppercase font-light">소상공인 서비스업 / 문의형 메인페이지</p>
                  <span className="text-white/15 text-[9px] font-light border border-white/[0.07] px-2 py-0.5 rounded-full whitespace-nowrap">소개 → 신뢰 → 문의</span>
                </div>
                <h3 className="text-white/70 text-sm md:text-base font-light leading-snug mb-1.5 group-hover:text-white transition-colors">
                  소상공인 서비스업용 문의 전환형 샘플
                </h3>
                <p className="text-white/30 text-xs font-light leading-relaxed max-w-lg">
                  업종 설명 없이도 첫 화면에서 무엇을 하는 곳인지 바로 읽히고, 문의 버튼까지 자연스럽게 이어지는 흐름을 보여주기 위한 시안
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 flex-shrink-0 md:pt-1 pl-8 md:pl-0">
              <span className="text-white/15 text-[9px] tracking-widest uppercase font-light border border-white/[0.08] px-3 py-1.5">
                Concept Work
              </span>
            </div>
          </div>

          {/* Bottom note */}
          <div className="reveal-item opacity-0 translate-y-4 transition-all duration-700 mt-8 md:mt-10 pt-6 md:pt-8 border-t border-white/[0.05]">
            <p className="text-white/20 text-xs font-light leading-relaxed">
              실제 제작 시에는 업종, 목적, 고객 특성에 맞게 구조를 새로 설계합니다. 위 시안은 방향 참고용입니다.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
