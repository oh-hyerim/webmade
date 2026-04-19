import { Link } from 'react-router-dom';
import { KAKAO_CHANNEL_URL } from '@/config/site';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/images/01b397564d2c608b5e25e8b1204b3ff8.jpg"
          alt="웹메이드 히어로 배경"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/90 via-[#0F172A]/70 to-[#0F172A]/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full pt-24 md:pt-28 pb-16 md:pb-20">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-10 lg:gap-24">

          {/* Left: Main Copy */}
          <div className="flex-1 max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse shrink-0"></span>
              <span className="text-white/90 text-xs font-medium">전국 비대면 상담 가능</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-white leading-[1.2] mb-5">
              예쁜 사이트를 넘어<br />
              <span className="text-[#1E5EFF]">문의가 들어오는 홈페이지</span>를 만듭니다
            </h1>

            {/* Sub Copy */}
            <p className="text-white/80 text-base md:text-lg leading-relaxed mb-5 max-w-lg font-medium">
              업종과 목표에 맞춰 상담 전환이 잘 되는 구조를 설계합니다
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {['회사소개형', '서비스 안내형', '상담 유도형', '전국 상담 가능', '쇼핑몰 제외'].map((tag) => (
                <span key={tag} className="text-white/60 text-xs border border-white/20 rounded-full px-3 py-1">{tag}</span>
              ))}
            </div>

            {/* CTA Buttons — 대비 강화, 히어로 내 즉시 노출 */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-[#1E5EFF] text-white font-bold px-8 py-4 rounded-full whitespace-nowrap cursor-pointer hover:bg-[#1a4fd6] transition-colors text-sm md:text-base shadow-lg shadow-[#1E5EFF]/40 ring-2 ring-white/20"
              >
                <i className="ri-calendar-check-line text-lg"></i>
                무료 상담 받기
              </Link>
              <a
                href={KAKAO_CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#FEE500] text-[#3C1E1E] font-bold px-8 py-4 rounded-full whitespace-nowrap cursor-pointer hover:bg-[#f5dc00] transition-colors text-sm md:text-base shadow-lg shadow-[#FEE500]/40 border-2 border-[#FEE500]"
              >
                <i className="ri-kakao-talk-fill text-lg"></i>
                카카오톡 상담
              </a>
            </div>

            {/* Price Nudge */}
            <div className="flex items-start gap-3 bg-white/8 backdrop-blur-sm border border-white/15 rounded-2xl px-5 py-4 max-w-md">
              <div className="w-8 h-8 flex items-center justify-center bg-[#1E5EFF]/30 rounded-lg shrink-0 mt-0.5">
                <i className="ri-question-line text-white text-sm"></i>
              </div>
              <div>
                <p className="text-white font-semibold text-sm mb-0.5">가격이 궁금하신가요?</p>
                <p className="text-white/60 text-xs leading-relaxed">간단 상담 후 범위에 맞는 견적·일정을 안내해 드립니다.</p>
              </div>
            </div>
          </div>

          {/* Right: Trust Cards */}
          <div className="flex flex-col gap-4 lg:min-w-[260px]">
            {[
              { icon: 'ri-map-pin-line', label: '전국 상담 가능', desc: '지역 제한 없이 비대면으로' },
              { icon: 'ri-lightbulb-flash-line', label: '맞춤 기획 제안', desc: '업종과 목적에 맞는 구조 설계' },
              { icon: 'ri-palette-line', label: '트렌디한 디자인', desc: '깔끔하고 전문적인 인상' },
              { icon: 'ri-chat-smile-2-line', label: '상담 중심 진행', desc: '처음이라도 편하게 시작 가능' },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-4 bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl px-5 py-4"
              >
                <div className="w-10 h-10 flex items-center justify-center bg-[#1E5EFF]/25 rounded-xl shrink-0">
                  <i className={`${item.icon} text-[#1E5EFF] text-lg`}></i>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{item.label}</p>
                  <p className="text-white/55 text-xs mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 animate-bounce">
        <span className="text-white/35 text-xs">스크롤</span>
        <i className="ri-arrow-down-line text-white/35 text-lg"></i>
      </div>
    </section>
  );
}
