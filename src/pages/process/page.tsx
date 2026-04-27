import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/pages/home/components/Navbar';
import SeoHead from '@/components/feature/SeoHead';

const steps = [
  {
    num: '01',
    title: '상담 및 목적 정리',
    size: 'large',
    desc: '무엇이 필요한지, 어떤 방향이 맞는지 먼저 정리합니다. 자료가 없어도, 방향이 없어도 괜찮습니다. 이 단계에서 함께 정리합니다.',
    sub: '카카오톡 또는 이메일로 편하게 시작하세요',
    duration: null,
  },
  {
    num: '02',
    title: '화면 구조 제안',
    size: 'small',
    desc: '업종과 목적에 맞는 페이지 흐름을 잡습니다. 어떤 정보를 어떤 순서로 보여줄지 먼저 정리한 뒤 확인을 받습니다.',
    sub: null,
    duration: '1–2일',
  },
  {
    num: '03',
    title: '시안 제작',
    size: 'large',
    desc: '과하게 꾸미기보다 신뢰와 가독성을 우선해 시안을 만듭니다. 업종에 맞는 분위기와 정보 배치를 함께 검토합니다.',
    sub: '1차 시안 공유 후 피드백 반영',
    duration: '3–5일',
  },
  {
    num: '04',
    title: '수정 및 보완',
    size: 'small',
    desc: '문구, 구성, 버튼 위치 등 필요한 부분을 함께 조정합니다. 수정 범위는 처음부터 명확하게 안내드립니다.',
    sub: null,
    duration: '2–3일',
  },
  {
    num: '05',
    title: '최종 오픈',
    size: 'large',
    desc: '확정된 내용으로 정리 후 실제 사용 가능한 상태로 마무리합니다. 도메인 연결 및 기본 점검도 함께 진행합니다.',
    sub: '평균 제작 기간: 2–3주',
    duration: null,
  },
];

const faqs = [
  {
    q: '자료가 없어도 진행 가능한가요?',
    a: '네. 업종과 대략적인 방향만 알고 계시면 충분합니다. 어떤 내용이 필요한지 상담 과정에서 함께 정리해드립니다.',
  },
  {
    q: '수정은 어느 정도 가능한가요?',
    a: '수정 범위는 처음 상담 시 명확하게 안내드립니다. 일반적으로 시안 확인 후 2–3회 수정이 포함됩니다.',
  },
  {
    q: '어떤 홈페이지가 맞는지 모르겠어요.',
    a: '방향이 없는 상태에서 시작하는 분들이 더 많습니다. 업종과 목적에 맞는 방향을 먼저 제안드립니다.',
  },
  {
    q: '제작 기간은 얼마나 걸리나요?',
    a: '일반적으로 2–3주 정도 소요됩니다. 페이지 수와 구성에 따라 달라질 수 있으며, 상담 시 정확한 일정을 안내드립니다.',
  },
  {
    q: '비대면으로도 진행 가능한가요?',
    a: '네, 전국 어디서든 비대면으로 진행 가능합니다. 카카오톡, 이메일, 화상 미팅 등 편한 방법으로 소통합니다.',
  },
  {
    q: '오픈 후 수정이 필요하면 어떻게 하나요?',
    a: '오픈 후 일정 기간 내 발생하는 오류나 간단한 수정은 무상으로 지원합니다. 범위와 기간은 상담 시 안내드립니다.',
  },
];

export default function ProcessPage() {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
        title="홈페이지 제작 과정 | 웹메이드 진행 절차"
        description="상담, 화면 구조 제안, 시안 제작, 수정, 오픈까지 웹메이드 홈페이지 제작 과정을 단계별로 안내합니다."
        path="/process"
      />
      <Navbar />

      {/* Hero */}
      <section
        ref={heroRef}
        className="relative min-h-[55vh] bg-[#0a0a0a] flex flex-col justify-end opacity-0 transition-opacity duration-1000 overflow-hidden pt-[68px]"
      >
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=ultra%20minimal%20dark%20abstract%20background%20with%20subtle%20texture%2C%20monochrome%20deep%20black%20tones%2C%20soft%20directional%20light%2C%20premium%20editorial%20atmosphere%2C%20no%20objects%2C%20pure%20abstract%20dark%20surface%2C%20sophisticated%20and%20quiet%2C%20very%20dark&width=1440&height=700&seq=process-hero-bg&orientation=landscape"
            alt=""
            className="w-full h-full object-cover object-center opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 pb-20 md:pb-28 pt-24 md:pt-32 w-full">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-8 h-px bg-white/25" />
            <span className="text-[10px] tracking-[0.35em] text-white/35 uppercase font-light">진행 순서</span>
          </div>
          <h1 className="font-serif text-[clamp(2.4rem,5vw,4.8rem)] text-white leading-[1.1] tracking-tight mb-6">
            처음 맡겨도,<br />
            <em className="not-italic text-white/40">흐름은 명확해야 합니다</em>
          </h1>
          <p className="text-white/45 text-sm md:text-base font-light leading-[1.9] max-w-lg">
            상담부터 오픈까지, 각 단계에서 무엇을 하는지<br />
            미리 알고 시작할 수 있습니다.
          </p>
        </div>
      </section>

      {/* Process steps */}
      <section ref={contentRef} className="bg-[#f5f4f0] py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-8 md:px-16">

          {/* Timeline */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-16 mb-20 md:mb-28">
            <div className="hidden lg:block lg:col-span-1">
              <div className="relative h-full">
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#0a0a0a]/10" />
              </div>
            </div>

            <div className="lg:col-span-11 space-y-0">
              {steps.map((step, i) => (
                <div
                  key={step.num}
                  className={`reveal-item opacity-0 translate-y-6 transition-all duration-700 relative border-t border-[#0a0a0a]/[0.07] ${i === 0 ? 'pb-14 md:pb-20 pt-0 border-t-0' : 'py-10 md:py-14'}`}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="hidden lg:block absolute -left-[3.15rem] top-0 w-2 h-2 rounded-full bg-[#0a0a0a]/25 mt-1" />
                  <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-12">
                    <div className="flex-shrink-0 flex items-center gap-3 md:block">
                      <span className={`font-mono ${step.size === 'large' ? 'text-[#0a0a0a]/20 text-[10px]' : 'text-[#0a0a0a]/15 text-[10px]'}`}>{step.num}</span>
                      {step.duration && (
                        <span className="md:hidden text-[10px] font-light text-[#0a0a0a]/30 border border-[#0a0a0a]/10 px-2 py-0.5 rounded-full whitespace-nowrap">{step.duration}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      {step.size === 'large' ? (
                        <>
                          <h2 className="font-serif text-[clamp(1.3rem,2.5vw,2rem)] text-[#0a0a0a] leading-snug mb-4">
                            {step.title}
                          </h2>
                          <p className="text-[#0a0a0a]/70 text-sm md:text-base font-light leading-[1.9] max-w-lg mb-4">
                            {step.desc}
                          </p>
                          {step.sub && (
                            <p className="text-[#0a0a0a]/40 text-xs font-light">{step.sub}</p>
                          )}
                        </>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12">
                          <div>
                            <h2 className="text-[#0a0a0a] text-base font-medium leading-snug mb-2">{step.title}</h2>
                            {step.duration && (
                              <span className="hidden md:inline-block text-[10px] font-light text-[#0a0a0a]/30 border border-[#0a0a0a]/10 px-2 py-0.5 rounded-full whitespace-nowrap">{step.duration}</span>
                            )}
                          </div>
                          <p className="text-[#0a0a0a]/60 text-sm font-light leading-relaxed">{step.desc}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="reveal-item opacity-0 translate-y-4 transition-all duration-700 pt-12 border-t border-[#0a0a0a]/10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
              <div className="lg:col-span-3">
                <p className="text-[#0a0a0a]/50 text-[10px] tracking-[0.25em] uppercase font-light">자주 받는 질문</p>
              </div>
              <div className="lg:col-span-9 space-y-0">
                {faqs.map((faq, i) => (
                  <div key={i} className="border-t border-[#0a0a0a]/[0.07]">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-start justify-between gap-6 py-5 text-left cursor-pointer group"
                    >
                      <span className={`text-xs md:text-sm font-light leading-snug transition-colors ${openFaq === i ? 'text-[#0a0a0a]' : 'text-[#0a0a0a]/65 group-hover:text-[#0a0a0a]/85'}`}>
                        {faq.q}
                      </span>
                      <span className="flex-shrink-0 w-4 h-4 flex items-center justify-center mt-0.5">
                        <i className={`text-[#0a0a0a]/25 text-xs transition-all duration-300 ${openFaq === i ? 'ri-subtract-line' : 'ri-add-line'}`} />
                      </span>
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-40 pb-5' : 'max-h-0'}`}>
                      <p className="text-[#0a0a0a]/60 text-xs font-light leading-relaxed pr-8">{faq.a}</p>
                    </div>
                  </div>
                ))}
                <div className="border-t border-[#0a0a0a]/[0.07]" />
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
              <p className="text-white/30 text-[10px] tracking-[0.3em] uppercase font-light mb-6">1단계 상담 시작하기</p>
              <h2 className="font-serif text-[clamp(1.6rem,3.5vw,2.8rem)] text-white leading-[1.2] mb-4">
                어떤 홈페이지가 맞을지<br />
                <span className="italic text-white/40">같이 정리해드립니다</span>
              </h2>
              <p className="text-white/40 text-sm font-light leading-relaxed">
                자료가 없어도, 아직 방향이 정해지지 않아도 괜찮습니다.
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
