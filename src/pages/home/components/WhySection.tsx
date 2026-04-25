import { useEffect, useRef } from 'react';

export default function WhySection() {
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
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#f5f4f0] py-28 md:py-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 md:px-16">

        {/* Top — Declaration */}
        <div className="reveal-item opacity-0 translate-y-6 transition-all duration-700 mb-20 md:mb-32">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-8 h-px bg-[#0a0a0a]/25" />
            <span className="text-[10px] tracking-[0.3em] text-[#0a0a0a]/40 uppercase font-light">제작 기준</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end">
            <div className="lg:col-span-7">
              <h2 className="font-serif text-[clamp(2rem,4.5vw,4rem)] text-[#0a0a0a] leading-[1.12] tracking-tight">
                숫자를 부풀리지 않습니다.<br />
                <span className="italic text-[#0a0a0a]/35">대신 기준 있게 만듭니다.</span>
              </h2>
            </div>
            <div className="lg:col-span-5 lg:pb-2">
              <p className="text-[#0a0a0a]/55 text-sm leading-[1.95] font-light max-w-xs">
                화면이 예쁘기 전에,<br />
                처음 들어온 사람이 이해할 수 있어야 합니다.<br />
                그래서 아래 기준부터 먼저 점검합니다.
              </p>
            </div>
          </div>
        </div>

        {/* 3 Criteria — 선언형, 비대칭 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">

          {/* 01 — 가장 크게, 왼쪽 */}
          <div className="reveal-item opacity-0 translate-y-6 transition-all duration-700 lg:col-span-5 border-t-2 border-[#0a0a0a] pt-10 pb-14 lg:pr-14">
            <span className="text-[#0a0a0a]/18 text-[10px] font-mono tracking-widest block mb-8">01</span>
            <h3 className="font-serif text-[clamp(1.5rem,2.8vw,2.2rem)] text-[#0a0a0a] leading-snug mb-5">
              첫 화면에서<br />믿음이 생기는가
            </h3>
            <p className="text-[#0a0a0a]/60 text-sm font-light leading-[1.9] max-w-xs">
              방문자는 3초 안에 이 사이트가 자신에게 필요한지 판단합니다.
              화려한 디자인보다 명확한 정보 배치가 먼저입니다.
            </p>
          </div>

          {/* 02 — 중간, 오프셋 */}
          <div className="reveal-item opacity-0 translate-y-6 transition-all duration-700 lg:col-span-4 border-t border-[#0a0a0a]/15 pt-10 pb-14 lg:px-10 lg:mt-20">
            <span className="text-[#0a0a0a]/12 text-[10px] font-mono tracking-widest block mb-8">02</span>
            <h3 className="font-serif text-[clamp(1.2rem,2vw,1.7rem)] text-[#0a0a0a] leading-snug mb-5">
              모바일에서<br />바로 이해되는가
            </h3>
            <p className="text-[#0a0a0a]/55 text-sm font-light leading-[1.9]">
              대부분의 방문자는 모바일로 접속합니다.
              모바일 흐름을 먼저 기준으로 잡습니다.
            </p>
          </div>

          {/* 03 — 가장 작게, 오른쪽 */}
          <div className="reveal-item opacity-0 translate-y-6 transition-all duration-700 lg:col-span-3 border-t border-[#0a0a0a]/10 pt-10 pb-14 lg:pl-10 lg:mt-36">
            <span className="text-[#0a0a0a]/10 text-[10px] font-mono tracking-widest block mb-8">03</span>
            <h3 className="font-serif text-[clamp(1.1rem,1.8vw,1.4rem)] text-[#0a0a0a] leading-snug mb-5">
              문의 버튼이<br />자연스럽게<br />보이는가
            </h3>
            <p className="text-[#0a0a0a]/48 text-xs font-light leading-[1.9]">
              문의 흐름은 화면 구조 안에 자연스럽게 녹아 있어야 합니다.
            </p>
          </div>

        </div>

        {/* Bottom */}
        <div className="reveal-item opacity-0 translate-y-4 transition-all duration-700 mt-16 pt-10 border-t border-[#0a0a0a]/10 flex items-center justify-between">
          <p className="text-[#0a0a0a]/35 text-xs font-light">
            이 기준들은 제작 전 상담 단계에서 함께 확인합니다.
          </p>
          <a
            href="#contact"
            className="whitespace-nowrap inline-flex items-center gap-2 text-[#0a0a0a]/50 text-xs font-light border-b border-[#0a0a0a]/20 pb-0.5 hover:text-[#0a0a0a] hover:border-[#0a0a0a]/50 transition-colors cursor-pointer"
          >
            상담 먼저 받아보기
            <i className="ri-arrow-right-line text-[10px]" />
          </a>
        </div>

      </div>
    </section>
  );
}
