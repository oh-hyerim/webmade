import { useEffect, useRef } from 'react';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const timer = setTimeout(() => el.classList.add('opacity-100'), 80);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-[#0a0a0a] flex flex-col justify-center opacity-0 transition-opacity duration-1000 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://readdy.ai/api/search-image?query=ultra%20minimal%20dark%20studio%20workspace%20with%20soft%20directional%20light%2C%20monochrome%20charcoal%20and%20black%20tones%2C%20subtle%20grain%20texture%2C%20no%20objects%2C%20pure%20abstract%20dark%20editorial%20atmosphere%2C%20premium%20photography%2C%20very%20dark%20with%20faint%20warm%20light%20from%20one%20side%2C%20sophisticated%20and%20quiet&width=1440&height=900&seq=hero-editorial-bg-v3&orientation=landscape"
          alt=""
          className="w-full h-full object-cover object-center opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/90 to-[#0a0a0a]/60" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-16 pt-36 pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-center min-h-[60vh]">

          {/* Left — Main Copy */}
          <div className="lg:col-span-7 flex flex-col justify-center">

            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-12">
              <span className="w-8 h-px bg-white/25" />
              <span className="text-[10px] tracking-[0.35em] text-white/35 uppercase font-light">
                홈페이지 제작 · 구조 설계
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-[clamp(2.6rem,5.8vw,5.2rem)] text-white leading-[1.08] mb-10 tracking-tight">
              예쁜 홈페이지 말고,<br />
              <em className="not-italic text-white/45">문의가 오는</em><br />
              홈페이지를 만듭니다
            </h1>

            {/* Sub Copy — 더 짧게 */}
            <p className="text-white/45 text-sm md:text-base leading-[1.95] mb-14 max-w-md font-light">
              처음 들어온 사람이 3초 안에 이해하고,<br />
              자연스럽게 문의까지 이어지는 구조를 먼저 설계합니다.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 items-start">
              <a
                href="#contact"
                className="whitespace-nowrap inline-flex items-center justify-center gap-2.5 bg-white text-[#0a0a0a] px-10 py-4 text-sm font-medium tracking-wide hover:bg-white/90 transition-colors cursor-pointer"
              >
                제작 문의하기
                <i className="ri-arrow-right-line" />
              </a>
              <a
                href="#process"
                className="whitespace-nowrap inline-flex items-center justify-center gap-2 border border-white/20 text-white/55 px-10 py-4 text-sm font-light tracking-wide hover:border-white/40 hover:text-white/75 transition-colors cursor-pointer"
              >
                진행 방식 보기
              </a>
            </div>

            {/* CTA 보조 문구 */}
            <p className="text-white/22 text-xs font-light mt-5 tracking-wide">
              어떤 구성이 맞는지, 상담으로 먼저 정리해드립니다
            </p>
          </div>

          {/* Right — 3 Principles, 더 간결하게 */}
          <div className="lg:col-span-5 flex flex-col justify-center lg:pl-20 mt-20 lg:mt-0">

            {/* 상징적 숫자 */}
            <div className="mb-12 pb-12 border-b border-white/[0.06]">
              <div className="flex items-baseline gap-4">
                <span className="font-serif text-[clamp(5rem,8vw,7.5rem)] text-white/[0.05] leading-none tracking-tight select-none">3</span>
                <div>
                  <p className="text-white/30 text-xs font-light leading-snug">가지 기준으로</p>
                  <p className="text-white/30 text-xs font-light leading-snug">화면을 설계합니다</p>
                </div>
              </div>
            </div>

            {/* Principles — 더 간결하게 */}
            <div className="space-y-0">
              {[
                { num: '01', text: '감성보다 구조를 먼저 봅니다' },
                { num: '02', text: '템플릿처럼 보이지 않게 정리합니다' },
                { num: '03', text: '모바일에서 먼저 읽히는 흐름을 만듭니다' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-5 py-5 border-b border-white/[0.06] last:border-b-0"
                >
                  <span className="text-white/15 text-[9px] font-mono tracking-widest flex-shrink-0">{item.num}</span>
                  <p className="text-white/55 text-sm font-light leading-snug">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-16 hidden md:flex flex-col items-start gap-3 opacity-20">
        <div className="w-px h-12 bg-white/60" />
        <span className="text-white text-[9px] tracking-[0.35em] uppercase font-light">Scroll</span>
      </div>
    </section>
  );
}
