import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/pages/home/components/Navbar';
import SeoHead from '@/components/feature/SeoHead';

const works = [
  {
    num: '01',
    label: 'Demo Project',
    category: '피부과 / 랜딩페이지',
    title: '신뢰형 메인 구조',
    structureTag: '신뢰 → 서비스 → 예약',
    designNote: '첫 화면 신뢰 확보 중심 구조',
    intent: '처음 방문한 환자가 진료 항목과 예약 방법을 빠르게 파악할 수 있도록 정보 흐름을 설계한 샘플입니다.',
    tags: ['의료', '랜딩페이지', '신뢰형'],
    img: 'https://readdy.ai/api/search-image?query=ultra%20minimal%20dark%20medical%20clinic%20website%20design%20concept%2C%20full%20screen%20hero%20layout%2C%20elegant%20serif%20typography%20on%20deep%20black%20background%2C%20sophisticated%20healthcare%20landing%20page%2C%20monochrome%20editorial%20aesthetic%2C%20clean%20white%20text%20on%20dark%2C%20premium%20trustworthy%20feel%2C%20no%20people%2C%20abstract%20web%20design&width=1400&height=900&seq=work-gallery-01&orientation=landscape',
    size: 'large',
  },
  {
    num: '02',
    label: 'Concept Work',
    category: '컨설팅 기업 / 회사소개',
    title: '전문성 중심 구성',
    structureTag: '신뢰 → 실적 → 문의',
    designNote: '문의 유도 흐름에 맞춘 구성',
    intent: '처음 방문한 잠재 고객이 "믿을 수 있는 곳"이라는 인상을 받을 수 있도록 신뢰 요소를 앞에 배치한 구성입니다.',
    tags: ['기업', '회사소개', '전문직'],
    img: 'https://readdy.ai/api/search-image?query=premium%20consulting%20firm%20website%20design%20concept%20on%20dark%20background%2C%20large%20editorial%20typography%2C%20professional%20business%20layout%2C%20monochrome%20black%20and%20white%20palette%2C%20sophisticated%20corporate%20aesthetic%2C%20clean%20minimal%20design%2C%20no%20people%2C%20abstract%20web%20design&width=900&height=700&seq=work-gallery-02&orientation=landscape',
    size: 'medium',
  },
  {
    num: '03',
    label: 'Sample Landing Page',
    category: '뷰티 브랜드 / 상세페이지',
    title: '감성형 전환 구조',
    structureTag: '감성 → 특징 → 구매',
    designNote: '정보 전달보다 전환을 우선한 메인 설계',
    intent: '브랜드 감성을 먼저 전달하고, 제품 특징 → 구매 버튼 순서로 자연스럽게 전환을 유도하는 흐름입니다.',
    tags: ['뷰티', '브랜드', '전환형'],
    img: 'https://readdy.ai/api/search-image?query=luxury%20beauty%20brand%20website%20design%20concept%2C%20dark%20elegant%20background%2C%20feminine%20editorial%20typography%2C%20sophisticated%20cosmetics%20landing%20page%2C%20monochrome%20dark%20aesthetic%2C%20premium%20beauty%20brand%20feel%2C%20no%20people%2C%20abstract%20web%20design&width=900&height=700&seq=work-gallery-03&orientation=landscape',
    size: 'medium',
  },
  {
    num: '04',
    label: 'Concept Work',
    category: '소상공인 서비스업 / 문의형',
    title: '소상공인 문의 전환형',
    structureTag: '소개 → 신뢰 → 문의',
    designNote: '업종 설명 없이도 첫 화면에서 즉시 이해',
    intent: '업종 설명 없이도 첫 화면에서 무엇을 하는 곳인지 바로 읽히고, 문의 버튼까지 자연스럽게 이어지는 흐름입니다.',
    tags: ['소상공인', '서비스업', '문의형'],
    img: 'https://readdy.ai/api/search-image?query=minimal%20small%20business%20service%20website%20design%20concept%2C%20dark%20background%20with%20clean%20layout%2C%20simple%20editorial%20typography%2C%20local%20service%20landing%20page%20aesthetic%2C%20monochrome%20dark%20tones%2C%20premium%20feel%2C%20no%20people%2C%20abstract%20web%20design&width=900&height=700&seq=work-gallery-04&orientation=landscape',
    size: 'medium',
  },
  {
    num: '05',
    label: 'Sample Work',
    category: '교육 / 학원 랜딩페이지',
    title: '교육 신뢰형 구조',
    structureTag: '커리큘럼 → 후기 → 등록',
    designNote: '수강 결정까지 이어지는 정보 흐름',
    intent: '커리큘럼과 강사 소개를 통해 신뢰를 쌓고, 수강생 후기를 통해 결정을 돕는 구조입니다.',
    tags: ['교육', '학원', '등록형'],
    img: 'https://readdy.ai/api/search-image?query=clean%20education%20academy%20website%20design%20concept%2C%20dark%20minimal%20background%2C%20editorial%20typography%2C%20sophisticated%20learning%20platform%20aesthetic%2C%20monochrome%20dark%20tones%2C%20premium%20educational%20feel%2C%20no%20people%2C%20abstract%20web%20design&width=900&height=700&seq=work-gallery-05&orientation=landscape',
    size: 'medium',
  },
  {
    num: '06',
    label: 'Concept Work',
    category: '요식업 / 브랜드 소개',
    title: '브랜드 스토리형',
    structureTag: '브랜드 → 메뉴 → 위치',
    designNote: '브랜드 정체성을 먼저 전달하는 구조',
    intent: '브랜드 스토리와 철학을 먼저 전달하고, 메뉴와 위치 정보를 자연스럽게 연결하는 구조입니다.',
    tags: ['요식업', '브랜드', '소개형'],
    img: 'https://readdy.ai/api/search-image?query=elegant%20restaurant%20brand%20website%20design%20concept%2C%20dark%20sophisticated%20background%2C%20minimal%20editorial%20layout%2C%20premium%20food%20brand%20aesthetic%2C%20monochrome%20dark%20tones%2C%20clean%20typography%2C%20no%20people%2C%20abstract%20web%20design&width=900&height=700&seq=work-gallery-06&orientation=landscape',
    size: 'medium',
  },
];

const filterTags = ['전체', '의료', '기업', '뷰티', '소상공인', '교육', '요식업'];

export default function WorkPage() {
  const heroRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLElement>(null);
  const [activeFilter, setActiveFilter] = useState('전체');
  const [selectedWork, setSelectedWork] = useState<typeof works[0] | null>(null);

  const filtered = activeFilter === '전체'
    ? works
    : works.filter((w) => w.tags.includes(activeFilter));

  useEffect(() => {
    window.scrollTo(0, 0);
    const el = heroRef.current;
    if (!el) return;
    const timer = setTimeout(() => {
      el.classList.remove('opacity-0');
      el.classList.add('opacity-100');
    }, 80);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal-item').forEach((el, i) => {
              setTimeout(() => {
                const item = el as HTMLElement;
                item.classList.remove('opacity-0', 'translate-y-4', 'translate-y-6', 'translate-y-8');
                item.classList.add('opacity-100', 'translate-y-0');
              }, i * 100);
            });
          }
        });
      },
      { threshold: 0.04 }
    );
    if (gridRef.current) observer.observe(gridRef.current);
    return () => observer.disconnect();
  }, []);

  // Close modal on escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedWork(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div style={{ fontFamily: "'Noto Sans KR', 'Montserrat', sans-serif" }}>
      <SeoHead
        title="홈페이지 제작 포트폴리오 | 웹메이드"
        description="업종과 목적별로 문의 전환 흐름을 다르게 설계하는 웹메이드 홈페이지 제작 샘플과 구성 방식을 확인하세요."
        path="/work"
      />
      <Navbar />

      {/* Hero */}
      <section
        ref={heroRef}
        className="relative min-h-[55vh] bg-black flex flex-col justify-end transition-opacity duration-1000 overflow-hidden pt-[68px]"
        style={{ backgroundColor: '#0a0a0a' }}
      >
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=ultra%20minimal%20dark%20abstract%20background%2C%20monochrome%20deep%20black%20tones%2C%20subtle%20grain%20texture%2C%20soft%20directional%20light%2C%20premium%20editorial%20atmosphere%2C%20no%20objects%2C%20pure%20abstract%20dark%20surface%2C%20sophisticated%20and%20quiet&width=1440&height=700&seq=work-hero-bg-v2&orientation=landscape"
            alt=""
            className="w-full h-full object-cover object-center opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 pb-20 md:pb-28 pt-24 md:pt-32 w-full">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-8 h-px bg-white/25" />
            <span className="text-[10px] tracking-[0.35em] text-white/35 uppercase font-light">샘플 시안</span>
          </div>
          <h1 className="font-serif text-[clamp(2.4rem,5vw,4.8rem)] text-white leading-[1.1] tracking-tight mb-6">
            설계 의도가 보이는<br />
            <em className="not-italic text-white/40">작업 방식</em>
          </h1>
          <p className="text-white/45 text-sm md:text-base font-light leading-[1.9] max-w-lg">
            각 시안은 업종과 목적에 맞게 정보 흐름을 다르게 설계한 예시입니다.<br />
            <span className="text-white/25">실제 성과 사례가 아닌 방향 참고용입니다.</span>
          </p>
        </div>
      </section>

      {/* Filter + Image Grid */}
      <section ref={gridRef} className="bg-[#0d0d0d] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-8 md:px-16">

          {/* Filter */}
          <div className="reveal-item translate-y-0 transition-all duration-700 flex flex-wrap gap-2 mb-12 md:mb-16">
            {filterTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                className={`whitespace-nowrap text-xs font-light px-4 py-2 border transition-all cursor-pointer ${
                  activeFilter === tag
                    ? 'border-white/50 text-white bg-white/10'
                    : 'border-white/[0.08] text-white/35 hover:border-white/20 hover:text-white/55'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Image Grid — masonry-like */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {filtered.map((work, i) => {
              const isLarge = work.size === 'large';
              return (
                <div
                  key={work.num}
                  className={`reveal-item translate-y-0 transition-all duration-700 group cursor-pointer ${
                    isLarge ? 'md:col-span-12' : 'md:col-span-6'
                  }`}
                  style={{ transitionDelay: `${i * 80}ms` }}
                  onClick={() => setSelectedWork(work)}
                >
                  <div
                    className="relative overflow-hidden"
                    style={{ height: isLarge ? 'clamp(320px, 50vw, 580px)' : 'clamp(260px, 32vw, 400px)' }}
                  >
                    <img
                      src={work.img}
                      alt={work.title}
                      className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                    {/* Top tags */}
                    <div className="absolute top-5 left-5 flex items-center gap-2">
                      <span className="text-[9px] tracking-[0.25em] text-white/60 uppercase bg-black/50 border border-white/15 px-3 py-1.5 font-light">
                        {work.label}
                      </span>
                      <span className="text-[9px] tracking-[0.15em] text-white/35 font-light border border-white/10 px-3 py-1.5 whitespace-nowrap">
                        {work.structureTag}
                      </span>
                    </div>

                    {/* Bottom info */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                      <p className="text-white/30 text-[9px] tracking-widest uppercase mb-2 font-light">{work.category}</p>
                      <h3 className={`font-serif text-white leading-snug mb-2 ${isLarge ? 'text-[clamp(1.4rem,2.5vw,2.2rem)]' : 'text-lg'}`}>
                        {work.title}
                      </h3>
                      <p className="text-white/45 text-xs font-light leading-relaxed max-w-md">{work.designNote}</p>
                    </div>

                    {/* Hover overlay arrow */}
                    <div className="absolute top-5 right-5 w-8 h-8 border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <i className="ri-arrow-right-up-line text-white/60 text-xs" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom note */}
          <div className="reveal-item translate-y-0 transition-all duration-700 mt-12 pt-8 border-t border-white/[0.05]">
            <p className="text-white/20 text-xs font-light leading-relaxed">
              실제 제작 시에는 업종, 목적, 고객 특성에 맞게 구조를 새로 설계합니다. 위 시안은 방향 참고용입니다.
            </p>
          </div>
        </div>
      </section>

      {/* Detail Modal */}
      {selectedWork && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          onClick={() => setSelectedWork(null)}
        >
          <div className="absolute inset-0 bg-black/80" />
          <div
            className="relative bg-[#0d0d0d] w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setSelectedWork(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-colors cursor-pointer"
            >
              <i className="ri-close-line text-sm" />
            </button>

            {/* Image */}
            <div className="relative h-64 md:h-80 overflow-hidden">
              <img
                src={selectedWork.img}
                alt={selectedWork.title}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent" />
              <div className="absolute top-5 left-5 flex items-center gap-2">
                <span className="text-[9px] tracking-[0.25em] text-white/60 uppercase bg-black/50 border border-white/15 px-3 py-1.5 font-light">{selectedWork.label}</span>
                <span className="text-[9px] tracking-[0.15em] text-white/35 font-light border border-white/10 px-3 py-1.5 whitespace-nowrap">{selectedWork.structureTag}</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 md:p-12">
              <p className="text-white/30 text-[9px] tracking-widest uppercase mb-3 font-light">{selectedWork.category}</p>
              <h2 className="font-serif text-white text-2xl md:text-3xl leading-snug mb-4">{selectedWork.title}</h2>
              <p className="text-white/50 text-sm font-light leading-relaxed mb-8">{selectedWork.intent}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <p className="text-white/20 text-[9px] tracking-widest uppercase mb-2 font-light">설계 의도</p>
                  <p className="text-white/60 text-sm font-light">{selectedWork.designNote}</p>
                </div>
                <div>
                  <p className="text-white/20 text-[9px] tracking-widest uppercase mb-2 font-light">정보 흐름</p>
                  <p className="text-white/60 text-sm font-light">{selectedWork.structureTag}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {selectedWork.tags.map((tag, j) => (
                  <span key={j} className="text-[10px] font-light text-white/35 border border-white/[0.1] rounded-full px-3 py-1 whitespace-nowrap">{tag}</span>
                ))}
              </div>

              <Link
                to="/contact"
                onClick={() => setSelectedWork(null)}
                className="whitespace-nowrap inline-flex items-center gap-2.5 bg-white text-[#0a0a0a] px-8 py-3.5 text-sm font-medium tracking-wide hover:bg-white/90 transition-colors cursor-pointer"
              >
                이 방향으로 문의하기
                <i className="ri-arrow-right-line" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <section className="bg-black border-t border-white/[0.05] py-20 md:py-28" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="max-w-7xl mx-auto px-8 md:px-16 text-center">
          <p className="text-white/30 text-[10px] tracking-[0.3em] uppercase font-light mb-6">이런 방향으로 만들고 싶다면</p>
          <h2 className="font-serif text-[clamp(1.6rem,3.5vw,2.8rem)] text-white leading-[1.2] mb-8">
            어떤 구성이 맞는지<br />
            <span className="italic text-white/40">상담에서 함께 정리해드립니다</span>
          </h2>
          <Link
            to="/contact"
            className="whitespace-nowrap inline-flex items-center gap-2.5 bg-white text-[#0a0a0a] px-10 py-4 text-sm font-medium tracking-wide hover:bg-white/90 transition-colors cursor-pointer"
          >
            제작 문의하기
            <i className="ri-arrow-right-line" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-white/[0.05] py-10 md:py-14" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="max-w-7xl mx-auto px-8 md:px-16">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <p className="text-white/50 font-serif text-base mb-1">웹메이드</p>
              <p className="text-white/20 text-xs font-light">구조부터 다르게 만드는 홈페이지 제작</p>
            </div>
            <div className="flex flex-wrap gap-6 md:gap-10">
              <Link to="/services" className="text-white/20 text-xs font-light hover:text-white/45 transition-colors cursor-pointer whitespace-nowrap">목적별 제작</Link>
              <Link to="/work" className="text-white/20 text-xs font-light hover:text-white/45 transition-colors cursor-pointer whitespace-nowrap">샘플 시안</Link>
              <Link to="/process" className="text-white/20 text-xs font-light hover:text-white/45 transition-colors cursor-pointer whitespace-nowrap">진행 순서</Link>
              <Link to="/pricing" className="text-white/20 text-xs font-light hover:text-white/45 transition-colors cursor-pointer whitespace-nowrap">가격 안내</Link>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-white/[0.05]">
            <p className="text-white/12 text-xs font-light">© 2024 웹메이드. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Mobile sticky CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex">
        <a href="/contact" className="flex-1 flex items-center justify-center gap-2 py-5 bg-black text-white font-medium text-sm cursor-pointer border-r border-white/10 whitespace-nowrap">
          <i className="ri-question-answer-line text-base" />문의하기
        </a>
        <a href="http://pf.kakao.com/_xcBxnxlX" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-5 bg-[#FEE500] text-[#111] font-medium text-sm cursor-pointer whitespace-nowrap">
          <i className="ri-kakao-talk-fill text-base" />카카오 상담
        </a>
      </div>
      <div className="md:hidden h-16" />
    </div>
  );
}
