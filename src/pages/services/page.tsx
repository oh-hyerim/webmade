import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/pages/home/components/Navbar';
import SeoHead from '@/components/feature/SeoHead';

const serviceTypes = [
  {
    num: '01',
    title: '문의 전환형 홈페이지',
    tag: '가장 많이 선택',
    who: '소상공인, 프리랜서, 서비스업, 전문직',
    problem: '처음 들어온 사람이 3초 안에 무엇을 하는 곳인지 이해하지 못하고, 문의 버튼을 찾지 못해 이탈하는 경우',
    solution: '첫 화면에서 무엇을 하는 곳인지 즉시 전달하고, 문의 버튼까지 자연스러운 흐름으로 설계합니다. 신뢰 요소를 앞에 배치해 "믿을 수 있는 곳"이라는 인상을 줍니다.',
    includes: [
      '첫 화면 가치 전달 구조',
      '문의 버튼 최적 위치 설계',
      '신뢰 요소(후기, 실적, 자격) 배치',
      '모바일 우선 반응형 제작',
      '기본 SEO 설정',
    ],
    priceFrom: '79',
    priceNote: '원페이지형부터',
  },
  {
    num: '02',
    title: '회사소개형 홈페이지',
    tag: '기업 · 전문직',
    who: '기업, 컨설팅, B2B, 전문직',
    problem: '회사 소개, 서비스 안내, 팀 소개 등 신뢰 요소가 흩어져 있어 처음 방문한 고객이 "믿을 수 있는 곳"이라는 인상을 받지 못하는 경우',
    solution: '회사 소개, 서비스 안내, 팀 소개 등 신뢰 요소를 중심으로 구성합니다. 처음 방문한 고객이 자연스럽게 문의로 이어질 수 있도록 정보 순서를 설계합니다.',
    includes: [
      '회사 소개 / 비전 페이지',
      '서비스/제품 상세 페이지',
      '팀/대표 소개 페이지',
      '실적/고객사 노출 구조',
      '문의 유도 흐름 설계',
      '기본 SEO 설정',
    ],
    priceFrom: '149',
    priceNote: '기본형부터',
  },
  {
    num: '03',
    title: '모바일 중심형 예약 랜딩',
    tag: '뷰티 · 의료 · 교육',
    who: '뷰티, 의료, 교육, 헬스',
    problem: '모바일에서 예약 버튼까지 도달하는 경로가 길고 복잡해, 잠재 고객이 중간에 이탈하는 경우',
    solution: '예약 버튼까지 빠르게 도달할 수 있도록 정보 밀도와 버튼 위치를 최적화합니다. 모바일에서 먼저 읽히는 흐름을 만들어 전환율을 높입니다.',
    includes: [
      '모바일 우선 정보 구조 설계',
      '예약 버튼 최단 경로 배치',
      '업종별 신뢰 요소(자격, 후기) 배치',
      '간단한 예약 폼 연결',
      '운영 자동화 (별도 추가)',
      '반응형 제작',
    ],
    priceFrom: '79',
    priceNote: '원페이지형부터',
  },
];

const notDoing = ['쇼핑몰 제작', '결제 기능', '로그인 / 회원가입', '예약 시스템', '복잡한 기능 개발'];

export default function ServicesPage() {
  const heroRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLElement>(null);
  const [openService, setOpenService] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const el = heroRef.current;
    if (!el) return;
    const timer = setTimeout(() => el.classList.add('opacity-100'), 80);
    return () => clearTimeout(timer);
  }, []);

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
      { threshold: 0.05 }
    );
    if (listRef.current) observer.observe(listRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ fontFamily: "'Noto Sans KR', 'Montserrat', sans-serif" }}>
      <SeoHead
        title="홈페이지 제작 서비스 | 웹메이드"
        description="문의 전환형 홈페이지, 회사소개형 홈페이지, 모바일 예약 랜딩, 광고 랜딩페이지 등 목적별 홈페이지 제작 서비스를 안내합니다."
        path="/services"
      />
      <Navbar />

      {/* Hero */}
      <section
        ref={heroRef}
        className="relative min-h-[60vh] bg-[#0a0a0a] flex flex-col justify-end opacity-0 transition-opacity duration-1000 overflow-hidden pt-[68px]"
      >
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=ultra%20minimal%20dark%20abstract%20background%20with%20subtle%20texture%2C%20monochrome%20deep%20black%20tones%2C%20soft%20directional%20light%20from%20one%20side%2C%20premium%20editorial%20atmosphere%2C%20no%20objects%2C%20pure%20abstract%20dark%20surface%2C%20sophisticated%20and%20quiet%2C%20very%20dark&width=1440&height=700&seq=svc-hero-bg-v2&orientation=landscape"
            alt=""
            className="w-full h-full object-cover object-center opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 pb-20 md:pb-28 pt-24 md:pt-32 w-full">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-8 h-px bg-white/25" />
            <span className="text-[10px] tracking-[0.35em] text-white/35 uppercase font-light">목적별 제작 방식</span>
          </div>
          <h1 className="font-serif text-[clamp(2.4rem,5vw,4.8rem)] text-white leading-[1.1] tracking-tight mb-6">
            목적이 다르면,<br />
            <em className="not-italic text-white/40">화면 구조도 달라져야 합니다</em>
          </h1>
          <p className="text-white/45 text-sm md:text-base font-light leading-[1.9] max-w-lg">
            어떤 홈페이지를 만들어야 할지 모르겠다면,<br />
            목적부터 먼저 정리합니다.
          </p>
        </div>
      </section>

      {/* Service list — text focused */}
      <section ref={listRef} className="bg-[#f5f4f0] py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-8 md:px-16">
          <div className="space-y-0">
            {serviceTypes.map((svc, i) => (
              <div
                key={svc.num}
                className="reveal-item opacity-0 translate-y-6 transition-all duration-700 border-t border-[#0a0a0a]/[0.07] first:border-t-0"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="py-10 md:py-14">
                  {/* Header row */}
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
                    <div className="flex items-start gap-4 md:gap-6">
                      <span className="text-[#0a0a0a]/15 text-[10px] font-mono tracking-widest flex-shrink-0 mt-1">{svc.num}</span>
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h2 className="font-serif text-[clamp(1.3rem,2.2vw,1.8rem)] text-[#0a0a0a] leading-snug">
                            {svc.title}
                          </h2>
                          <span className="text-[10px] font-light tracking-wide text-[#0a0a0a]/45 border border-[#0a0a0a]/12 px-2.5 py-0.5 rounded-full whitespace-nowrap">
                            {svc.tag}
                          </span>
                        </div>
                        <p className="text-[#0a0a0a]/40 text-xs font-light">
                          적합한 경우: <span className="text-[#0a0a0a]/60">{svc.who}</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-baseline gap-2 flex-shrink-0 md:text-right">
                      <span className="font-serif text-[clamp(2rem,3vw,2.8rem)] text-[#0a0a0a]/20 leading-none tracking-tight">{svc.priceFrom}</span>
                      <span className="text-xs font-light text-[#0a0a0a]/30">만원부터</span>
                    </div>
                  </div>

                  {/* Problem / Solution */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-8 pl-0 md:pl-12">
                    <div>
                      <p className="text-[10px] tracking-[0.2em] text-[#0a0a0a]/30 uppercase font-light mb-2">이런 문제가 있나요?</p>
                      <p className="text-[#0a0a0a]/55 text-sm font-light leading-[1.8]">{svc.problem}</p>
                    </div>
                    <div>
                      <p className="text-[10px] tracking-[0.2em] text-[#0a0a0a]/30 uppercase font-light mb-2">이렇게 해결합니다</p>
                      <p className="text-[#0a0a0a]/70 text-sm font-light leading-[1.8]">{svc.solution}</p>
                    </div>
                  </div>

                  {/* Includes toggle */}
                  <div className="pl-0 md:pl-12">
                    <button
                      onClick={() => setOpenService(openService === i ? null : i)}
                      className="flex items-center gap-2 text-xs font-light text-[#0a0a0a]/40 hover:text-[#0a0a0a]/65 transition-colors cursor-pointer mb-4"
                    >
                      <span>{openService === i ? '포함 항목 닫기' : '포함 항목 보기'}</span>
                      <i className={`text-[10px] ${openService === i ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'}`} />
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${openService === i ? 'max-h-80' : 'max-h-0'}`}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 pb-4">
                        {svc.includes.map((item, j) => (
                          <div key={j} className="flex items-start gap-2.5 bg-white/60 ring-1 ring-[#0a0a0a]/[0.05] px-4 py-3">
                            <i className="ri-check-line text-[10px] text-[#0a0a0a]/25 mt-0.5 flex-shrink-0" />
                            <span className="text-xs font-light text-[#0a0a0a]/60">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Not doing */}
          <div className="reveal-item opacity-0 translate-y-4 transition-all duration-700 mt-10 pt-10 border-t border-[#0a0a0a]/[0.07]">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
              <span className="text-[#0a0a0a]/25 text-[10px] tracking-[0.2em] uppercase font-light mr-2 whitespace-nowrap">진행하지 않는 작업</span>
              {notDoing.map((item, i) => (
                <span key={i} className="text-[#0a0a0a]/28 text-xs font-light flex items-center gap-1.5 whitespace-nowrap">
                  {i > 0 && <span className="w-px h-3 bg-[#0a0a0a]/12 inline-block" />}
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0a0a0a] py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-8 md:px-16 text-center">
          <p className="text-white/30 text-[10px] tracking-[0.3em] uppercase font-light mb-6">어떤 구성이 맞는지 모르겠다면</p>
          <h2 className="font-serif text-[clamp(1.6rem,3.5vw,2.8rem)] text-white leading-[1.2] mb-8">
            상담에서 함께 정리해드립니다
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
      <footer className="bg-[#0a0a0a] border-t border-white/[0.05] py-10 md:py-14">
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
        <a href="tel:010-5130-1576" className="flex-1 flex items-center justify-center gap-2 py-5 bg-[#0a0a0a] text-white font-medium text-sm cursor-pointer border-r border-white/10 whitespace-nowrap">
          <i className="ri-phone-line text-base" />전화 상담
        </a>
        <a href="https://open.kakao.com/o/webmade" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-5 bg-[#FEE500] text-[#111] font-medium text-sm cursor-pointer whitespace-nowrap">
          <i className="ri-kakao-talk-fill text-base" />카카오 상담
        </a>
      </div>
      <div className="md:hidden h-16" />
    </div>
  );
}
