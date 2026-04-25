import { useEffect, useRef, useState } from 'react';

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
  },
];

const addons = [
  '페이지 수 추가',
  '관리자 / 게시물 기능',
  'FAQ / 후기 관리',
  '예약 요청',
  '다국어 지원',
  '외부 쇼핑몰 연결',
];

const notIncluded = ['쇼핑몰', '결제 기능', '로그인 / 회원가입', '예약 시스템', '복잡한 기능 개발'];

export default function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openDetail, setOpenDetail] = useState<number | null>(null);

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
      { threshold: 0.06 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="pricing" className="bg-[#f5f4f0] py-28 md:py-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 md:px-16">

        {/* ── Header ── */}
        <div className="reveal-item opacity-0 translate-y-4 transition-all duration-700 mb-16 md:mb-20">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-8 h-px bg-[#0a0a0a]/30" />
            <span className="text-[10px] tracking-[0.3em] text-[#0a0a0a]/45 uppercase font-light">제작 비용 안내</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end">
            <div className="lg:col-span-7">
              <h2 className="font-serif text-[clamp(2rem,4.5vw,3.8rem)] text-[#0a0a0a] leading-[1.15] tracking-tight">
                필요한 만큼만,<br />
                <span className="italic text-[#0a0a0a]/40">단계별로 선택하세요.</span>
              </h2>
            </div>
            <div className="lg:col-span-5 lg:pb-2">
              <p className="text-[#0a0a0a]/55 text-sm leading-[1.9] font-light">
                처음 제작하시는 경우, 기본형부터 가장 많이 선택하십니다.<br />
                페이지 수와 구성에 따라 금액은 달라질 수 있습니다.
              </p>
            </div>
          </div>
        </div>

        {/* ── Desktop: 3-column ── */}
        <div className="reveal-item opacity-0 translate-y-6 transition-all duration-700 hidden lg:grid lg:grid-cols-3 gap-3 items-stretch">
          {plans.map((plan, i) => (
            <div
              key={plan.num}
              className={`
                flex flex-col relative rounded-lg overflow-hidden
                ${plan.featured
                  ? 'bg-white ring-1 ring-[#0a0a0a]/18'
                  : 'bg-white/60 ring-1 ring-[#0a0a0a]/[0.07]'
                }
              `}
            >
              {/* Top accent line — featured only */}
              {plan.featured && (
                <div className="h-[2px] w-full bg-[#0a0a0a]" />
              )}

              <div className={`flex flex-col flex-1 px-9 ${plan.featured ? 'pt-9' : 'pt-10'}`}>

                {/* Num + tag row */}
                <div className="flex items-center justify-between mb-7">
                  <span className={`text-[10px] font-mono tracking-widest ${plan.featured ? 'text-[#0a0a0a]/30' : 'text-[#0a0a0a]/18'}`}>
                    {plan.num}
                  </span>
                  <span className={`
                    text-[10px] font-light tracking-wide whitespace-nowrap
                    ${plan.featured
                      ? 'text-[#0a0a0a]/70 border-b border-[#0a0a0a]/25 pb-px'
                      : 'text-[#0a0a0a]/30'
                    }
                  `}>
                    {plan.tag}
                  </span>
                </div>

                {/* Plan name */}
                <h3 className={`
                  font-serif tracking-tight leading-none mb-2
                  ${plan.featured
                    ? 'text-[#0a0a0a] text-[clamp(1.6rem,2.2vw,2rem)]'
                    : 'text-[#0a0a0a]/40 text-[clamp(1.3rem,1.8vw,1.6rem)]'
                  }
                `}>
                  {plan.name}
                </h3>

                {/* Role */}
                <p className={`text-xs font-light leading-snug mb-8 ${plan.featured ? 'text-[#0a0a0a]/50' : 'text-[#0a0a0a]/28'}`}>
                  {plan.role}
                </p>

                {/* Price */}
                <div className={`flex items-baseline gap-2 mb-9 pb-9 border-b ${plan.featured ? 'border-[#0a0a0a]/10' : 'border-[#0a0a0a]/[0.06]'}`}>
                  <span className={`
                    font-serif leading-none tracking-tight
                    ${plan.featured
                      ? 'text-[#0a0a0a] text-[clamp(3.2rem,5vw,4.6rem)]'
                      : 'text-[#0a0a0a]/30 text-[clamp(2.4rem,3.5vw,3.2rem)]'
                    }
                  `}>
                    {plan.price}
                  </span>
                  <span className={`text-sm font-light ${plan.featured ? 'text-[#0a0a0a]/40' : 'text-[#0a0a0a]/22'}`}>
                    만원부터
                  </span>
                </div>

                {/* Highlights */}
                <ul className="space-y-3 mb-8">
                  {plan.highlights.map((h, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-3.5 h-3.5 flex items-center justify-center mt-0.5">
                        <i className={`ri-arrow-right-line text-[10px] ${plan.featured ? 'text-[#0a0a0a]/35' : 'text-[#0a0a0a]/18'}`} />
                      </span>
                      <span className={`text-sm font-light leading-snug ${plan.featured ? 'text-[#0a0a0a]/70' : 'text-[#0a0a0a]/38'}`}>
                        {h}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Feature badges */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {['반응형 제작', '문의 폼', ...(plan.seo ? ['기본 SEO'] : []), ...(plan.admin ? ['관리자 페이지'] : [])].map((badge, j) => (
                    <span
                      key={j}
                      className={`text-[11px] font-light rounded-full px-3 py-1.5 whitespace-nowrap border
                        ${plan.featured
                          ? 'border-[#0a0a0a]/14 text-[#0a0a0a]/55'
                          : 'border-[#0a0a0a]/[0.07] text-[#0a0a0a]/28'
                        }
                      `}
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              {/* Detail toggle — pinned bottom */}
              <div className={`px-9 pb-9 pt-2`}>
                <button
                  onClick={() => setOpenDetail(openDetail === i ? null : i)}
                  className={`whitespace-nowrap flex items-center gap-2 text-xs font-light transition-colors cursor-pointer
                    ${plan.featured ? 'text-[#0a0a0a]/38 hover:text-[#0a0a0a]/65' : 'text-[#0a0a0a]/22 hover:text-[#0a0a0a]/45'}
                  `}
                >
                  <span>{openDetail === i ? '포함 항목 닫기' : '포함 항목 보기'}</span>
                  {openDetail === i
                    ? <i className="ri-arrow-up-s-line text-[10px]" />
                    : <i className="ri-arrow-down-s-line text-[10px]" />
                  }
                </button>
                {openDetail === i && (
                  <ul className="mt-4 space-y-2">
                    {plan.includes.map((item, j) => (
                      <li key={j} className="flex items-center gap-2">
                        <i className={`ri-check-line text-[10px] ${plan.featured ? 'text-[#0a0a0a]/25' : 'text-[#0a0a0a]/15'}`} />
                        <span className={`text-xs font-light ${plan.featured ? 'text-[#0a0a0a]/50' : 'text-[#0a0a0a]/30'}`}>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ── Mobile: stacked ── */}
        <div className="lg:hidden space-y-3">
          {plans.map((plan, i) => (
            <div
              key={plan.num}
              className={`
                rounded-lg overflow-hidden
                ${plan.featured
                  ? 'bg-white ring-1 ring-[#0a0a0a]/18'
                  : 'bg-white/60 ring-1 ring-[#0a0a0a]/[0.07]'
                }
              `}
            >
              {plan.featured && <div className="h-[2px] w-full bg-[#0a0a0a]" />}
              <div className="p-7">
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <div className="flex items-center gap-2.5 mb-2">
                      <span className={`text-[10px] font-mono tracking-widest ${plan.featured ? 'text-[#0a0a0a]/30' : 'text-[#0a0a0a]/18'}`}>{plan.num}</span>
                      <span className={`text-[10px] font-light ${plan.featured ? 'text-[#0a0a0a]/60 border-b border-[#0a0a0a]/20 pb-px' : 'text-[#0a0a0a]/28'}`}>
                        {plan.tag}
                      </span>
                    </div>
                    <h3 className={`font-serif tracking-tight ${plan.featured ? 'text-[#0a0a0a] text-xl' : 'text-[#0a0a0a]/40 text-lg'}`}>
                      {plan.name}
                    </h3>
                    <p className={`text-xs font-light mt-1 ${plan.featured ? 'text-[#0a0a0a]/48' : 'text-[#0a0a0a]/28'}`}>
                      {plan.role}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0 ml-4">
                    <div className="flex items-baseline gap-1">
                      <span className={`font-serif leading-none tracking-tight ${plan.featured ? 'text-[#0a0a0a] text-4xl' : 'text-[#0a0a0a]/30 text-3xl'}`}>
                        {plan.price}
                      </span>
                      <span className={`text-xs font-light ${plan.featured ? 'text-[#0a0a0a]/38' : 'text-[#0a0a0a]/22'}`}>만원~</span>
                    </div>
                  </div>
                </div>

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
                    <span key={j} className={`text-[11px] font-light rounded-full px-3 py-1 whitespace-nowrap border ${plan.featured ? 'border-[#0a0a0a]/12 text-[#0a0a0a]/50' : 'border-[#0a0a0a]/[0.07] text-[#0a0a0a]/28'}`}>
                      {badge}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setOpenDetail(openDetail === i ? null : i)}
                  className={`whitespace-nowrap flex items-center gap-2 text-xs font-light cursor-pointer ${plan.featured ? 'text-[#0a0a0a]/35' : 'text-[#0a0a0a]/22'}`}
                >
                  <span>{openDetail === i ? '포함 항목 닫기' : '포함 항목 보기'}</span>
                  {openDetail === i ? <i className="ri-arrow-up-s-line text-[10px]" /> : <i className="ri-arrow-down-s-line text-[10px]" />}
                </button>
                {openDetail === i && (
                  <ul className="mt-3 space-y-2">
                    {plan.includes.map((item, j) => (
                      <li key={j} className="flex items-center gap-2">
                        <i className={`ri-check-line text-[10px] ${plan.featured ? 'text-[#0a0a0a]/22' : 'text-[#0a0a0a]/15'}`} />
                        <span className={`text-xs font-light ${plan.featured ? 'text-[#0a0a0a]/48' : 'text-[#0a0a0a]/28'}`}>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ── Not included ── */}
        <div className="reveal-item opacity-0 translate-y-4 transition-all duration-700 mt-10 md:mt-12">
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

        {/* ── Add-on block ── */}
        <div className="reveal-item opacity-0 translate-y-6 transition-all duration-700 mt-16 md:mt-20">
          <div className="border-t border-[#0a0a0a]/10 pt-12 md:pt-14">
            <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-20">

              <div className="flex-shrink-0">
                <span className="text-[10px] tracking-[0.25em] text-[#0a0a0a]/35 uppercase font-light block mb-4">추가 옵션</span>
                <p className="text-[#0a0a0a]/55 text-sm font-light leading-[1.9]">
                  기본 제작 외에 필요한 기능을<br />
                  선택해서 추가할 수 있습니다.<br />
                  <span className="text-[#0a0a0a]/35">필요한 기능만 맞춰서 안내드립니다.</span>
                </p>
                <a
                  href="#contact"
                  className="whitespace-nowrap inline-flex items-center gap-2 text-[#0a0a0a]/45 text-xs font-light border-b border-[#0a0a0a]/15 pb-px hover:text-[#0a0a0a]/70 hover:border-[#0a0a0a]/35 transition-colors cursor-pointer mt-5"
                >
                  어떤 구성이 맞는지 먼저 물어보기
                  <i className="ri-arrow-right-line text-[10px]" />
                </a>
              </div>

              <div className="flex flex-wrap gap-2 content-start pt-1">
                {addons.map((item, i) => (
                  <span
                    key={i}
                    className="text-[#0a0a0a]/55 text-xs font-light border border-[#0a0a0a]/12 rounded-full px-4 py-2 whitespace-nowrap bg-white/70"
                  >
                    {item}
                  </span>
                ))}
                <span className="text-[#0a0a0a]/28 text-xs font-light border border-dashed border-[#0a0a0a]/10 rounded-full px-4 py-2 whitespace-nowrap">
                  그 외 상담 가능
                </span>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
