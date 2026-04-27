import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function FinalCta() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal-item').forEach((el, i) => {
              setTimeout(() => {
                const item = el as HTMLElement;
                item.classList.remove('opacity-0', 'translate-y-6', 'translate-y-8');
                item.classList.add('opacity-100', 'translate-y-0');
              }, i * 120);
            });
          }
        });
      },
      { threshold: 0.05 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section ref={ref} id="contact" className="bg-[#0a0a0a] overflow-hidden py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-8 md:px-16">
          <div className="reveal-item opacity-0 translate-y-8 transition-all duration-700 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center border-t border-white/[0.07] pt-12 md:pt-16">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-8">
                <span className="w-8 h-px bg-white/20" />
                <span className="text-[10px] tracking-[0.3em] text-white/30 uppercase font-light">상담 문의</span>
              </div>
              <h2 className="font-serif text-[clamp(1.8rem,3.6vw,3.1rem)] text-white leading-[1.2] tracking-tight mb-6">
                어떤 홈페이지가 맞을지,<br />
                <span className="italic text-white/40">문의하기 페이지에서 정리해드릴게요.</span>
              </h2>
              <p className="text-white/45 text-sm leading-[1.9] max-w-xl font-light">
                이름과 연락처, 간단한 문의 내용을 남겨주시면 24시간 이내로 답변드립니다.
                빠른 상담은 카카오톡 채널로 바로 이어갈 수 있습니다.
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-stretch">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-3 bg-white text-[#0a0a0a] px-8 py-4 text-sm font-medium tracking-wide hover:bg-white/90 transition-colors cursor-pointer whitespace-nowrap"
              >
                문의하기 페이지로 이동
                <i className="ri-arrow-right-line" />
              </Link>
              <a
                href="http://pf.kakao.com/_xcBxnxlX"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 border border-white/15 text-white/60 px-8 py-4 text-sm font-light hover:border-white/35 hover:text-white/85 transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-kakao-talk-fill" />
                카카오톡 상담
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#0a0a0a] border-t border-white/[0.05] py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-8 md:px-16">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <p className="text-white/50 font-serif text-base mb-1">웹메이드</p>
              <p className="text-white/20 text-xs font-light">구조부터 다르게 만드는 홈페이지 제작</p>
            </div>
            <div className="flex flex-wrap gap-6 md:gap-10">
              <a href="#services" className="text-white/20 text-xs font-light hover:text-white/45 transition-colors cursor-pointer whitespace-nowrap">목적별 제작</a>
              <a href="#portfolio" className="text-white/20 text-xs font-light hover:text-white/45 transition-colors cursor-pointer whitespace-nowrap">샘플 시안</a>
              <a href="#process" className="text-white/20 text-xs font-light hover:text-white/45 transition-colors cursor-pointer whitespace-nowrap">진행 순서</a>
              <Link to="/contact" className="text-white/20 text-xs font-light hover:text-white/45 transition-colors cursor-pointer whitespace-nowrap">문의하기</Link>
              <Link to="/privacy" className="text-white/20 text-xs font-light hover:text-white/45 transition-colors cursor-pointer whitespace-nowrap">개인정보처리방침</Link>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-white/[0.05]">
            <p className="text-white/12 text-xs font-light">© 2024 웹메이드. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
