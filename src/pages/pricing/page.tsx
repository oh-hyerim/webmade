import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/pages/home/components/Navbar';
import SeoHead from '@/components/feature/SeoHead';

const plans = [
  {
    num: '01',
    name: '원페이지형',
    price: '79',
    role: '가볍게 시작하는 1페이지 구성',
    tag: '입문용',
    highlights: ['1페이지 구성', '문의형 / 소개형', '광고 랜딩 연결'],
    seo: false,
    admin: false,
    featured: false,
    includes: ['메인 1페이지', '반응형 제작', '문의 폼 연결', '기본 문구 정리', '오픈 세팅'],
    for: '처음 홈페이지를 만들거나, 광고 랜딩 페이지가 필요한 분께 적합합니다.',
  },
  {
    num: '02',
    name: '기본형',
    price: '149',
    role: '가장 일반적인 홈페이지 구성',
    tag: '가장 많이 선택하는 구성',
    highlights: ['3~5페이지 구성', '회사소개 / 서비스 / 문의', '기본 SEO 포함'],
    seo: true,
    admin: false,
    featured: true,
    includes: ['메인 + 서브 3~5페이지', '반응형 제작', '문의 폼 연결', '기본 문구 정리', '기본 SEO 설정', '오픈 세팅'],
    for: '소상공인, 프리랜서, 전문직 등 일반적인 홈페이지가 필요한 분께 가장 많이 선택됩니다.',
  },
  {
    num: '03',
    name: '확장형',
    price: '229',
    role: '운영 기능까지 고려한 확장형 구성',
    tag: '운영 / 확장형',
    highlights: ['다수 페이지 구성', '관리자 기능 가능', '게시물 / 포트폴리오 운영'],
    seo: true,
    admin: true,
    featured: false,
    includes: ['메인 + 서브 다수 페이지', '반응형 제작', '문의 폼 연결', '기본 문구 정리', '기본 SEO 설정', '관리자 페이지 구성 가능', '게시물 / 포트폴리오 / 공지 관리', '오픈 세팅'],
    for: '게시물 관리, 포트폴리오 운영 등 지속적으로 콘텐츠를 업데이트해야 하는 분께 적합합니다.',
  },
];

const addons = [
  { name: '페이지 수 추가', desc: '기본 구성 외 추가 페이지' },
  { name: '관리자 / 게시물 기능', desc: '직접 콘텐츠 관리 가능' },
  { name: 'FAQ / 후기 관리', desc: '고객 신뢰 요소 운영' },
  { name: '예약 요청', desc: '간단한 예약 폼 연결' },
  { name: '운영 자동화 툴 연결', desc: '예약 알림 · 응답 자동화 연동' },
  { name: '다국어 지원', desc: '한국어 + 영어 등 다국어' },
  { name: '외부 쇼핑몰 연결', desc: '스마트스토어 등 연결' },
];

const notIncluded = ['쇼핑몰', '결제 기능', '로그인 / 회원가입', '예약 시스템', '복잡한 기능 개발'];

export default function PricingPage() {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLElement>(null);
  const [openDetail, setOpenDetail] = useState<number | null>(null);

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
    if (contentRef.current) observer.observe(contentRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ fontFamily: "'Noto Sans KR', 'Montserrat', sans-serif" }}>
      <SeoHead
        title="홈페이지 제작 비용 | 웹메이드 가격 안내"
        description="원페이지형, 기본형, 확장형 홈페이지 제작 비용과 포함 범위, 추가 옵션을 확인하세요."
        path="/pricing"
      />
      <Navbar />

      {/* Hero */}
      <section
        ref={heroRef}
        className="relative min-h-[55vh] bg-[#0a0a0a] flex flex-col justify-end opacity-0 transition-opacity duration-1000 overflow-hidden pt-[68px]"
      >
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=ultra%20minimal%20dark%20abstract%20background%20with%20subtle%20texture%2C%20monochrome%20deep%20black%20tones%2C%20soft%20directional%20light%2C%20premium%20editorial%20atmosphere%2C%20no%20objects%2C%20pure%20abstract%20dark%20surface%2C%20sophisticated%20and%20quiet%2C%20very%20dark&width=1440&height=700&seq=pricing-hero-bg&orientation=landscape"
            alt=""
            className="w-full h-full object-cover object-center opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 pb-20 md:pb-28 pt-24 md:pt-32 w-full">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-8 h-px bg-white/25" />
            <span className="text-[10px] tracking-[0.35em] text-white/35 uppercase font-light">제작 비용 안내</span>
          </div>
          <h1 className="font-serif text-[clamp(2.4rem,5vw,4.8rem)] text-white leading-[1.1] tracking-tight mb-6">
            필요한 만큼만,<br />
            <em className="not-italic text-white/40">단계별로 선택하세요</em>
          </h1>
          <p className="text-white/45 text-sm md:text-base font-light leading-[1.9] max-w-lg">
            처음 제작하시는 경우, 기본형부터 가장 많이 선택하십니다.<br />
            페이지 수와 구성에 따라 금액은 달라질 수 있습니다.
          </p>
        </div>
      </section>

      {/* Pricing content */}
      <section ref={contentRef} className="bg-[#f5f4f0] py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-8 md:px-16">

          {/* Plans — Desktop 3-col */}
          <div className="reveal-item opacity-0 translate-y-6 transition-all duration-700 hidden lg:grid lg:grid-cols-3 gap-3 items-stretch mb-10">
            {plans.map((plan, i) => (
              <div
                key={plan.num}
                className={`flex flex-col relative overflow-hidden ${
                  plan.featured
                    ? 'bg-white ring-1 ring-[#0a0a0a]/18'
                    : 'bg-white/60 ring-1 ring-[#0a0a0a]/[0.07]'
                }`}
              >
                {plan.featured && <div className="h-[2px] w-full bg-[#0a0a0a]" />}

                <div className={`flex flex-col flex-1 px-9 ${plan.featured ? 'pt-9' : 'pt-10'}`}>
                  <div className="flex items-center justify-between mb-7">
                    <span className={`text-[10px] font-mono tracking-widest ${plan.featured ? 'text-[#0a0a0a]/30' : 'text-[#0a0a0a]/18'}`}>{plan.num}</span>
                    <span className={`text-[10px] font-light tracking-wide whitespace-nowrap ${plan.featured ? 'text-[#0a0a0a]/70 border-b border-[#0a0a0a]/25 pb-px' : 'text-[#0a0a0a]/30'}`}>{plan.tag}</span>
                  </div>

                  <h2 className={`font-serif tracking-tight leading-none mb-2 ${plan.featured ? 'text-[#0a0a0a] text-[clamp(1.6rem,2.2vw,2rem)]' : 'text-[#0a0a0a]/40 text-[clamp(1.3rem,1.8vw,1.6rem)]'}`}>
                    {plan.name}
                  </h2>
                  <p className={`text-xs font-light leading-snug mb-8 ${plan.featured ? 'text-[#0a0a0a]/50' : 'text-[#0a0a0a]/28'}`}>{plan.role}</p>

                  <div className={`flex items-baseline gap-2 mb-6 pb-6 border-b ${plan.featured ? 'border-[#0a0a0a]/10' : 'border-[#0a0a0a]/[0.06]'}`}>
                    <span className={`font-serif leading-none tracking-tight ${plan.featured ? 'text-[#0a0a0a] text-[clamp(3.2rem,5vw,4.6rem)]' : 'text-[#0a0a0a]/30 text-[clamp(2.4rem,3.5vw,3.2rem)]'}`}>{plan.price}</span>
                    <span className={`text-sm font-light ${plan.featured ? 'text-[#0a0a0a]/40' : 'text-[#0a0a0a]/22'}`}>만원부터</span>
                  </div>

                  <p className={`text-xs font-light leading-relaxed mb-6 ${plan.featured ? 'text-[#0a0a0a]/55' : 'text-[#0a0a0a]/30'}`}>{plan.for}</p>

                  <ul className="space-y-3 mb-8">
                    {plan.highlights.map((h, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <i className={`ri-arrow-right-line text-[10px] mt-0.5 flex-shrink-0 ${plan.featured ? 'text-[#0a0a0a]/35' : 'text-[#0a0a0a]/18'}`} />
                        <span className={`text-sm font-light leading-snug ${plan.featured ? 'text-[#0a0a0a]/70' : 'text-[#0a0a0a]/38'}`}>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {['반응형 제작', '문의 폼', ...(plan.seo ? ['기본 SEO'] : []), ...(plan.admin ? ['관리자 페이지'] : [])].map((badge, j) => (
                      <span key={j} className={`text-[11px] font-light rounded-full px-3 py-1.5 whitespace-nowrap border ${plan.featured ? 'border-[#0a0a0a]/14 text-[#0a0a0a]/55' : 'border-[#0a0a0a]/[0.07] text-[#0a0a0a]/28'}`}>{badge}</span>
                    ))}
                  </div>
                </div>

                <div className="px-9 pb-9 pt-2">
                  <button
                    onClick={() => setOpenDetail(openDetail === i ? null : i)}
                    className={`whitespace-nowrap flex items-center gap-2 text-xs font-light transition-colors cursor-pointer mb-4 ${plan.featured ? 'text-[#0a0a0a]/38 hover:text-[#0a0a0a]/65' : 'text-[#0a0a0a]/22 hover:text-[#0a0a0a]/45'}`}
                  >
                    <span>{openDetail === i ? '포함 항목 닫기' : '포함 항목 보기'}</span>
                    <i className={`text-[10px] ${openDetail === i ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'}`} />
                  </button>
                  {openDetail === i && (
                    <ul className="space-y-2 mb-6">
                      {plan.includes.map((item, j) => (
                        <li key={j} className="flex items-center gap-2">
                          <i className={`ri-check-line text-[10px] ${plan.featured ? 'text-[#0a0a0a]/25' : 'text-[#0a0a0a]/15'}`} />
                          <span className={`text-xs font-light ${plan.featured ? 'text-[#0a0a0a]/50' : 'text-[#0a0a0a]/30'}`}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <Link
                    to="/contact"
                    className={`whitespace-nowrap w-full flex items-center justify-center gap-2 py-3.5 text-xs font-medium tracking-wide transition-all cursor-pointer ${
                      plan.featured
                        ? 'bg-[#0a0a0a] text-white hover:bg-[#0a0a0a]/85'
                        : 'border border-[#0a0a0a]/15 text-[#0a0a0a]/45 hover:border-[#0a0a0a]/30 hover:text-[#0a0a0a]/65'
                    }`}
                  >
                    이 구성으로 문의하기
                    <i className="ri-arrow-right-line text-[10px]" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Plans — Mobile stacked */}
          <div className="lg:hidden space-y-3 mb-10">
            {plans.map((plan, i) => (
              <div
                key={plan.num}
                className={`overflow-hidden ${plan.featured ? 'bg-white ring-1 ring-[#0a0a0a]/18' : 'bg-white/60 ring-1 ring-[#0a0a0a]/[0.07]'}`}
              >
                {plan.featured && <div className="h-[2px] w-full bg-[#0a0a0a]" />}
                <div className="p-7">
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      <div className="flex items-center gap-2.5 mb-2">
                        <span className={`text-[10px] font-mono tracking-widest ${plan.featured ? 'text-[#0a0a0a]/30' : 'text-[#0a0a0a]/18'}`}>{plan.num}</span>
                        <span className={`text-[10px] font-light ${plan.featured ? 'text-[#0a0a0a]/60 border-b border-[#0a0a0a]/20 pb-px' : 'text-[#0a0a0a]/28'}`}>{plan.tag}</span>
                      </div>
                      <h2 className={`font-serif tracking-tight ${plan.featured ? 'text-[#0a0a0a] text-xl' : 'text-[#0a0a0a]/40 text-lg'}`}>{plan.name}</h2>
                      <p className={`text-xs font-light mt-1 ${plan.featured ? 'text-[#0a0a0a]/48' : 'text-[#0a0a0a]/28'}`}>{plan.role}</p>
                    </div>
                    <div className="text-right flex-shrink-0 ml-4">
                      <div className="flex items-baseline gap-1">
                        <span className={`font-serif leading-none tracking-tight ${plan.featured ? 'text-[#0a0a0a] text-4xl' : 'text-[#0a0a0a]/30 text-3xl'}`}>{plan.price}</span>
                        <span className={`text-xs font-light ${plan.featured ? 'text-[#0a0a0a]/38' : 'text-[#0a0a0a]/22'}`}>만원~</span>
                      </div>
                    </div>
                  </div>

                  <p className={`text-xs font-light leading-relaxed mb-4 ${plan.featured ? 'text-[#0a0a0a]/55' : 'text-[#0a0a0a]/30'}`}>{plan.for}</p>

                  <ul className="space-y-2.5 mb-5">
                    {plan.highlights.map((h, j) => (
                      <li key={j} className="flex items-start gap-2.5">
                        <i className={`ri-arrow-right-line text-[10px] mt-1 ${plan.featured ? 'text-[#0a0a0a]/30' : 'text-[#0a0a0a]/18'}`} />
                        <span className={`text-sm font-light ${plan.featured ? 'text-[#0a0a0a]/65' : 'text-[#0a0a0a]/35'}`}>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {['반응형 제작', '문의 폼', ...(plan.seo ? ['기본 SEO'] : []), ...(plan.admin ? ['관리자 페이지'] : [])].map((badge, j) => (
                      <span key={j} className={`text-[11px] font-light rounded-full px-3 py-1 whitespace-nowrap border ${plan.featured ? 'border-[#0a0a0a]/12 text-[#0a0a0a]/50' : 'border-[#0a0a0a]/[0.07] text-[#0a0a0a]/28'}`}>{badge}</span>
                    ))}
                  </div>

                  <button
                    onClick={() => setOpenDetail(openDetail === i ? null : i)}
                    className={`whitespace-nowrap flex items-center gap-2 text-xs font-light cursor-pointer mb-4 ${plan.featured ? 'text-[#0a0a0a]/35' : 'text-[#0a0a0a]/22'}`}
                  >
                    <span>{openDetail === i ? '포함 항목 닫기' : '포함 항목 보기'}</span>
                    <i className={`text-[10px] ${openDetail === i ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'}`} />
                  </button>
                  {openDetail === i && (
                    <ul className="mt-2 mb-4 space-y-2">
                      {plan.includes.map((item, j) => (
                        <li key={j} className="flex items-center gap-2">
                          <i className={`ri-check-line text-[10px] ${plan.featured ? 'text-[#0a0a0a]/22' : 'text-[#0a0a0a]/15'}`} />
                          <span className={`text-xs font-light ${plan.featured ? 'text-[#0a0a0a]/48' : 'text-[#0a0a0a]/28'}`}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <Link
                    to="/contact"
                    className={`whitespace-nowrap w-full flex items-center justify-center gap-2 py-3.5 text-xs font-medium tracking-wide transition-all cursor-pointer ${
                      plan.featured
                        ? 'bg-[#0a0a0a] text-white hover:bg-[#0a0a0a]/85'
                        : 'border border-[#0a0a0a]/15 text-[#0a0a0a]/45 hover:border-[#0a0a0a]/30 hover:text-[#0a0a0a]/65'
                    }`}
                  >
                    이 구성으로 문의하기
                    <i className="ri-arrow-right-line text-[10px]" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Not included */}
          <div className="reveal-item opacity-0 translate-y-4 transition-all duration-700 mb-16 md:mb-20">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
              <span className="text-[#0a0a0a]/25 text-[10px] tracking-[0.2em] uppercase font-light mr-2 whitespace-nowrap">진행하지 않는 작업</span>
              {notIncluded.map((item, i) => (
                <span key={i} className="text-[#0a0a0a]/28 text-xs font-light flex items-center gap-1.5 whitespace-nowrap">
                  {i > 0 && <span className="w-px h-3 bg-[#0a0a0a]/12 inline-block" />}
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Add-ons */}
          <div className="reveal-item opacity-0 translate-y-6 transition-all duration-700 border-t border-[#0a0a0a]/10 pt-12 md:pt-14">
            <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-20">
              <div className="flex-shrink-0 lg:w-64">
                <span className="text-[10px] tracking-[0.25em] text-[#0a0a0a]/35 uppercase font-light block mb-4">추가 옵션</span>
                <p className="text-[#0a0a0a]/55 text-sm font-light leading-[1.9]">
                  기본 제작 외에 필요한 기능을<br />
                  선택해서 추가할 수 있습니다.<br />
                  <span className="text-[#0a0a0a]/35">필요한 기능만 맞춰서 안내드립니다.</span>
                </p>
                <Link
                  to="/contact"
                  className="whitespace-nowrap inline-flex items-center gap-2 text-[#0a0a0a]/45 text-xs font-light border-b border-[#0a0a0a]/15 pb-px hover:text-[#0a0a0a]/70 hover:border-[#0a0a0a]/35 transition-colors cursor-pointer mt-5"
                >
                  어떤 구성이 맞는지 먼저 물어보기
                  <i className="ri-arrow-right-line text-[10px]" />
                </Link>
              </div>

              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {addons.map((addon, i) => (
                  <div key={i} className="bg-white/70 ring-1 ring-[#0a0a0a]/[0.07] px-5 py-4">
                    <p className="text-[#0a0a0a]/70 text-sm font-light mb-1">{addon.name}</p>
                    <p className="text-[#0a0a0a]/35 text-xs font-light">{addon.desc}</p>
                  </div>
                ))}
                <div className="bg-transparent ring-1 ring-dashed ring-[#0a0a0a]/10 px-5 py-4 flex items-center">
                  <p className="text-[#0a0a0a]/28 text-xs font-light">그 외 상담 가능</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0a0a0a] py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-8 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-white/30 text-[10px] tracking-[0.3em] uppercase font-light mb-6">어떤 구성이 맞는지 모르겠다면</p>
              <h2 className="font-serif text-[clamp(1.6rem,3.5vw,2.8rem)] text-white leading-[1.2] mb-4">
                상담에서 함께<br />
                <span className="italic text-white/40">정리해드립니다</span>
              </h2>
              <p className="text-white/40 text-sm font-light leading-relaxed">
                자료가 없어도, 아직 방향이 정해지지 않아도 괜찮습니다.<br />
                상담 후에는 어떤 구성이 맞는지, 대략적인 비용이 어느 정도인지 안내드립니다.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/contact"
                className="whitespace-nowrap flex-1 flex items-center justify-center gap-2.5 bg-white text-[#0a0a0a] px-8 py-4 text-sm font-medium tracking-wide hover:bg-white/90 transition-colors cursor-pointer"
              >
                제작 문의하기
                <i className="ri-arrow-right-line" />
              </Link>
              <a
                href="https://open.kakao.com/o/webmade"
                target="_blank"
                rel="noopener noreferrer"
                className="whitespace-nowrap flex-shrink-0 flex items-center justify-center gap-2 px-8 py-4 bg-[#FEE500] text-[#111] text-sm font-medium cursor-pointer hover:bg-[#FEE500]/90 transition-colors"
              >
                <i className="ri-kakao-talk-fill" />
                카카오 상담
              </a>
            </div>
          </div>
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
