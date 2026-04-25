import { useState, useEffect, useRef } from 'react';

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
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
    <section ref={sectionRef} id="process" className="bg-[#f5f4f0] py-28 md:py-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 md:px-16">

        {/* Header */}
        <div className="reveal-item opacity-0 translate-y-4 transition-all duration-700 mb-20 md:mb-28">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-8 h-px bg-[#0a0a0a]/25" />
            <span className="text-[10px] tracking-[0.3em] text-[#0a0a0a]/50 uppercase font-light">진행 순서</span>
          </div>
          <h2 className="font-serif text-[clamp(1.8rem,4vw,3.2rem)] text-[#0a0a0a] leading-[1.15] tracking-tight max-w-lg">
            처음 맡겨도,<br />
            <span className="italic text-[#0a0a0a]/50">흐름은 명확해야 합니다</span>
          </h2>
        </div>

        {/* Timeline — vertical, asymmetric weight */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-16">

          {/* Left spine line (desktop only) */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="relative h-full">
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#0a0a0a]/10" />
            </div>
          </div>

          {/* Steps */}
          <div className="lg:col-span-11 space-y-0">

            {/* Step 01 — KEY, large */}
            <div className="reveal-item opacity-0 translate-y-6 transition-all duration-700 relative pb-14 md:pb-20">
              {/* Connector dot */}
              <div className="hidden lg:block absolute -left-[3.15rem] top-1 w-2 h-2 rounded-full bg-[#0a0a0a]/30" />
              <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-12">
                <div className="flex-shrink-0">
                  <span className="text-[#0a0a0a]/20 text-[10px] font-mono">01</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-[clamp(1.3rem,2.5vw,2rem)] text-[#0a0a0a] leading-snug mb-4">
                    상담 및 목적 정리
                  </h3>
                  <p className="text-[#0a0a0a]/70 text-sm md:text-base font-light leading-[1.9] max-w-lg">
                    무엇이 필요한지, 어떤 방향이 맞는지 먼저 정리합니다.<br />
                    자료가 없어도, 방향이 없어도 괜찮습니다.<br />
                    이 단계에서 함께 정리합니다.
                  </p>
                  <p className="text-[#0a0a0a]/40 text-xs font-light mt-4">카카오톡 또는 이메일로 편하게 시작하세요</p>
                </div>
              </div>
            </div>

            {/* Step 02 — secondary, compact */}
            <div className="reveal-item opacity-0 translate-y-4 transition-all duration-700 relative pb-10 md:pb-14 border-t border-[#0a0a0a]/[0.07] pt-10 md:pt-14" style={{ transitionDelay: '80ms' }}>
              <div className="hidden lg:block absolute -left-[3.15rem] top-10 md:top-14 w-1.5 h-1.5 rounded-full bg-[#0a0a0a]/15" />
              <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-12">
                <div className="flex-shrink-0">
                  <span className="text-[#0a0a0a]/15 text-[10px] font-mono">02</span>
                </div>
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12">
                  <h3 className="text-[#0a0a0a] text-base font-medium leading-snug">
                    화면 구조 제안
                  </h3>
                  <p className="text-[#0a0a0a]/60 text-sm font-light leading-relaxed">
                    업종과 목적에 맞는 페이지 흐름을 잡습니다. 어떤 정보를 어떤 순서로 보여줄지 먼저 정리한 뒤 확인을 받습니다.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 03 — KEY, large */}
            <div className="reveal-item opacity-0 translate-y-6 transition-all duration-700 relative pb-10 md:pb-14 border-t border-[#0a0a0a]/[0.07] pt-10 md:pt-14" style={{ transitionDelay: '120ms' }}>
              <div className="hidden lg:block absolute -left-[3.15rem] top-10 md:top-14 w-2 h-2 rounded-full bg-[#0a0a0a]/30" />
              <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-12">
                <div className="flex-shrink-0">
                  <span className="text-[#0a0a0a]/20 text-[10px] font-mono">03</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-[clamp(1.1rem,2vw,1.6rem)] text-[#0a0a0a] leading-snug mb-4">
                    시안 제작
                  </h3>
                  <p className="text-[#0a0a0a]/70 text-sm font-light leading-[1.9] max-w-md">
                    과하게 꾸미기보다 신뢰와 가독성을 우선해 시안을 만듭니다.
                    업종에 맞는 분위기와 정보 배치를 함께 검토합니다.
                  </p>
                  <p className="text-[#0a0a0a]/40 text-xs font-light mt-4">1차 시안 공유 후 피드백 반영</p>
                </div>
              </div>
            </div>

            {/* Step 04 — secondary, compact */}
            <div className="reveal-item opacity-0 translate-y-4 transition-all duration-700 relative pb-10 md:pb-14 border-t border-[#0a0a0a]/[0.07] pt-10 md:pt-14" style={{ transitionDelay: '160ms' }}>
              <div className="hidden lg:block absolute -left-[3.15rem] top-10 md:top-14 w-1.5 h-1.5 rounded-full bg-[#0a0a0a]/15" />
              <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-12">
                <div className="flex-shrink-0">
                  <span className="text-[#0a0a0a]/15 text-[10px] font-mono">04</span>
                </div>
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12">
                  <h3 className="text-[#0a0a0a] text-base font-medium leading-snug">
                    수정 및 보완
                  </h3>
                  <p className="text-[#0a0a0a]/60 text-sm font-light leading-relaxed">
                    문구, 구성, 버튼 위치 등 필요한 부분을 함께 조정합니다. 수정 범위는 처음부터 명확하게 안내드립니다.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 05 — KEY, large */}
            <div className="reveal-item opacity-0 translate-y-6 transition-all duration-700 relative border-t border-[#0a0a0a]/[0.07] pt-10 md:pt-14" style={{ transitionDelay: '200ms' }}>
              <div className="hidden lg:block absolute -left-[3.15rem] top-10 md:top-14 w-2 h-2 rounded-full bg-[#0a0a0a]/30" />
              <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-12">
                <div className="flex-shrink-0">
                  <span className="text-[#0a0a0a]/20 text-[10px] font-mono">05</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-[clamp(1.1rem,2vw,1.6rem)] text-[#0a0a0a] leading-snug mb-4">
                    최종 오픈
                  </h3>
                  <p className="text-[#0a0a0a]/70 text-sm font-light leading-[1.9] max-w-md">
                    확정된 내용으로 정리 후 실제 사용 가능한 상태로 마무리합니다.
                    도메인 연결 및 기본 점검도 함께 진행합니다.
                  </p>
                  <div className="mt-6 flex items-center gap-4">
                    <span className="text-[#0a0a0a]/45 text-xs font-light">평균 제작 기간: 2–3주</span>
                    <span className="w-1 h-1 rounded-full bg-[#0a0a0a]/15" />
                    <a
                      href="#contact"
                      className="whitespace-nowrap text-[#0a0a0a]/50 text-xs font-light border-b border-[#0a0a0a]/20 pb-0.5 hover:text-[#0a0a0a] hover:border-[#0a0a0a]/50 transition-colors cursor-pointer"
                    >
                      1단계 상담 시작하기 →
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* FAQ — inline, minimal */}
        <div className="reveal-item opacity-0 translate-y-4 transition-all duration-700 mt-20 md:mt-28 pt-12 border-t border-[#0a0a0a]/10">
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
                  <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-32 pb-5' : 'max-h-0'}`}>
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
  );
}
