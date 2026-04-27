import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import Navbar from '@/pages/home/components/Navbar';
import SeoHead from '@/components/feature/SeoHead';

type Item = {
  title: string;
  desc: string;
  eyebrow?: string;
};

type MarketingPageLayoutProps = {
  seo: {
    title: string;
    description: string;
    path: string;
  };
  eyebrow: string;
  title: string;
  description: string;
  items: Item[];
  dark?: boolean;
  children?: ReactNode;
};

export default function MarketingPageLayout({
  seo,
  eyebrow,
  title,
  description,
  items,
  dark = false,
  children,
}: MarketingPageLayoutProps) {
  return (
    <div className="min-h-screen bg-[#f5f4f0]" style={{ fontFamily: "'Noto Sans KR', 'Montserrat', sans-serif" }}>
      <SeoHead {...seo} />
      <Navbar forceSolid />
      <main>
        <section className={`${dark ? 'bg-[#0a0a0a] text-white' : 'bg-[#f5f4f0] text-[#0a0a0a]'} pt-32 md:pt-40 pb-20 md:pb-28`}>
          <div className="max-w-7xl mx-auto px-8 md:px-16">
            <div className="flex items-center gap-3 mb-10">
              <span className={`w-8 h-px ${dark ? 'bg-white/25' : 'bg-[#0a0a0a]/25'}`} />
              <span className={`text-[10px] tracking-[0.3em] uppercase font-light ${dark ? 'text-white/35' : 'text-[#0a0a0a]/45'}`}>
                {eyebrow}
              </span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end">
              <div className="lg:col-span-7">
                <h1 className="font-serif text-[clamp(2.4rem,5vw,4.8rem)] leading-[1.08] tracking-tight">
                  {title}
                </h1>
              </div>
              <div className="lg:col-span-5">
                <p className={`text-sm md:text-base font-light leading-[1.95] ${dark ? 'text-white/55' : 'text-[#0a0a0a]/60'}`}>
                  {description}
                </p>
                <div className="flex flex-wrap gap-3 mt-8">
                  <Link
                    to="/contact"
                    className={`inline-flex items-center gap-2 px-5 py-3 text-xs font-medium tracking-wide border transition-colors whitespace-nowrap ${
                      dark
                        ? 'border-white/25 text-white/80 hover:bg-white hover:text-[#0a0a0a]'
                        : 'border-[#0a0a0a]/20 text-[#0a0a0a]/70 hover:bg-[#0a0a0a] hover:text-white'
                    }`}
                  >
                    문의하기
                    <i className="ri-arrow-right-line" />
                  </Link>
                  <Link
                    to="/project-request"
                    className={`inline-flex items-center gap-2 px-5 py-3 text-xs font-light transition-colors whitespace-nowrap ${
                      dark ? 'text-white/45 hover:text-white' : 'text-[#0a0a0a]/45 hover:text-[#0a0a0a]'
                    }`}
                  >
                    제작 요청서 작성
                    <i className="ri-external-link-line" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={`${dark ? 'bg-[#111]' : 'bg-[#f5f4f0]'} py-20 md:py-28`}>
          <div className="max-w-7xl mx-auto px-8 md:px-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#0a0a0a]/10">
              {items.map((item, index) => (
                <article key={item.title} className={`${dark ? 'bg-[#0a0a0a]' : 'bg-white/70'} p-8 md:p-10 min-h-[230px]`}>
                  <span className={`text-[10px] font-mono tracking-widest ${dark ? 'text-white/20' : 'text-[#0a0a0a]/20'}`}>
                    {item.eyebrow || String(index + 1).padStart(2, '0')}
                  </span>
                  <h2 className={`mt-8 mb-5 font-serif text-2xl leading-snug ${dark ? 'text-white' : 'text-[#0a0a0a]'}`}>
                    {item.title}
                  </h2>
                  <p className={`text-sm font-light leading-[1.85] ${dark ? 'text-white/50' : 'text-[#0a0a0a]/58'}`}>
                    {item.desc}
                  </p>
                </article>
              ))}
            </div>
            {children}
          </div>
        </section>

        <section className="bg-[#0a0a0a] text-white py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-8 md:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center border-t border-white/[0.08] pt-10">
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-8 h-px bg-white/25" />
                  <span className="text-[10px] tracking-[0.3em] text-white/35 uppercase font-light">Contact</span>
                </div>
                <h2 className="font-serif text-[clamp(1.8rem,3vw,3rem)] leading-[1.16] tracking-tight">
                  우리 업종에 맞는 구성이 궁금하다면 상담에서 먼저 정리해드립니다.
                </h2>
              </div>
              <div className="lg:col-span-5 lg:text-right">
                <p className="text-white/45 text-sm font-light leading-[1.8] mb-7 lg:ml-auto max-w-md">
                  간단한 업종과 목적만 남겨주시면 필요한 페이지 구성, 예상 범위, 진행 방식을 안내드리겠습니다.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 border border-white/30 text-white/80 text-xs font-semibold tracking-wide hover:bg-white hover:text-[#0a0a0a] transition-colors whitespace-nowrap"
                >
                  문의 페이지로 이동
                  <i className="ri-arrow-right-line" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
