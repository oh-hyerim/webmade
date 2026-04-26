import { useEffect, useRef } from 'react';

const supporting = [
  {
    title: '신뢰를 먼저 보여줘야 하는\n회사소개형',
    desc: '회사 소개, 서비스 안내, 팀 소개 등 신뢰 요소를 중심으로 구성합니다. 처음 방문한 고객이 "믿을 수 있는 곳"이라는 인상을 받을 수 있도록 정보 순서를 설계합니다.',
    tag: '기업 · 프리랜서 · 전문직',
  },
  {
    title: '예약 흐름이 중요한\n모바일 중심형',
    desc: '예약 버튼까지 빠르게 도달할 수 있도록 정보 밀도와 버튼 위치를 최적화합니다.',
    tag: '뷰티 · 의료 · 교육',
  },
  {
    title: '서비스 설명이 중요한\n소개형 랜딩페이지',
    desc: '서비스 특징과 선택 이유를 순서대로 정리해 자연스럽게 문의 결정으로 이어지도록 구성합니다.',
    tag: '서비스업 · 컨설팅 · B2B',
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal-item').forEach((el, i) => {
              setTimeout(() => (el as HTMLElement).classList.add('opacity-100', 'translate-y-0'), i * 100);
            });
          }
        });
      },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="bg-[#0a0a0a] py-28 md:py-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 md:px-16">

        {/* Section label */}
        <div className="reveal-item opacity-0 translate-y-4 transition-all duration-700 flex items-center gap-3 mb-16">
          <span className="w-8 h-px bg-white/20" />
          <span className="text-[10px] tracking-[0.3em] text-white/35 uppercase font-light">목적별 제작 방식</span>
        </div>

        {/* Section title */}
        <div className="reveal-item opacity-0 translate-y-6 transition-all duration-700 mb-20">
          <h2 className="font-serif text-[clamp(1.8rem,4vw,3.4rem)] text-white leading-[1.12] tracking-tight">
            목적이 다르면,<br />
            <span className="italic text-white/40">화면 구조도 달라져야 합니다</span>
          </h2>
        </div>

        {/* Asymmetric layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-start">

          {/* Left — Featured (대표 목적, 크게) */}
          <div className="reveal-item opacity-0 translate-y-6 transition-all duration-700 lg:col-span-6 lg:pr-16 pb-14 lg:pb-0 border-b lg:border-b-0 lg:border-r border-white/[0.06]">

            <div className="mb-6">
              <span className="text-white/25 text-[10px] font-mono tracking-widest">대표 목적</span>
            </div>

            <div className="relative mb-8 overflow-hidden">
              <img
                src="https://readdy.ai/api/search-image?query=minimal%20dark%20website%20design%20on%20laptop%20screen%20showing%20clean%20contact%20form%20and%20navigation%2C%20monochrome%20black%20and%20white%20editorial%20aesthetic%2C%20sophisticated%20layout%2C%20premium%20dark%20UI%2C%20soft%20studio%20lighting%2C%20no%20text%20visible%2C%20abstract%20web%20design%20concept&width=900&height=600&seq=svc-featured-v2&orientation=landscape"
                alt="문의 전환형 홈페이지"
                loading="lazy"
                decoding="async"
                width={900}
                height={600}
                className="w-full h-52 md:h-64 object-cover object-top opacity-55"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
            </div>

            <h3 className="font-serif text-[clamp(1.5rem,2.8vw,2.2rem)] text-white leading-snug mb-4">
              문의가 필요한 홈페이지
            </h3>
            <p className="text-white/50 text-sm font-light leading-[1.9] mb-8 max-w-sm">
              처음 들어온 사람이 무엇을 하는 곳인지 바로 이해하고
              자연스럽게 상담이나 문의로 이어질 수 있도록
              구조를 먼저 잡습니다.
            </p>

            <a
              href="#contact"
              className="whitespace-nowrap inline-flex items-center gap-2 text-white/55 text-xs font-light border-b border-white/20 pb-0.5 hover:text-white hover:border-white/50 transition-colors cursor-pointer"
            >
              이 방향으로 상담받기
              <i className="ri-arrow-right-line text-[10px]" />
            </a>
          </div>

          {/* Right — Supporting (보조, 더 작게) */}
          <div className="reveal-item opacity-0 translate-y-6 transition-all duration-700 lg:col-span-6 lg:pl-16 pt-14 lg:pt-0 space-y-0">

            {supporting.map((item, i) => (
              <div
                key={i}
                className="group py-7 border-b border-white/[0.06] first:border-t first:border-white/[0.06] cursor-default"
              >
                <div className="flex items-start justify-between gap-4 mb-2.5">
                  <h3 className="text-white/75 text-sm font-light leading-snug whitespace-pre-line group-hover:text-white transition-colors">
                    {item.title}
                  </h3>
                  <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center border border-white/[0.08] group-hover:border-white/20 transition-colors mt-0.5">
                    <i className="ri-arrow-right-up-line text-white/20 text-[10px] group-hover:text-white/40 transition-colors" />
                  </span>
                </div>
                <p className="text-white/38 text-xs font-light leading-relaxed mb-2.5">
                  {item.desc}
                </p>
                <span className="text-white/25 text-[10px] tracking-widest font-light">{item.tag}</span>
              </div>
            ))}

            <div className="pt-7">
              <p className="text-white/30 text-xs font-light leading-relaxed">
                어떤 유형이 맞는지 모르겠다면,<br />
                상담에서 함께 정리해드립니다.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
