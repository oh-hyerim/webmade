import { Link } from 'react-router-dom';

export default function CtaBanner() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/images/6d11544f2cfb277bf1bfd4cd9b134278.jpg"
          alt="CTA 배경"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-[#0F172A]/80"></div>
      </div>
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 text-center">
        <span className="text-[#1E5EFF] text-xs font-semibold tracking-widest uppercase mb-5 block">지금 바로 시작하세요</span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
          홈페이지 제작, 어디서부터<br />시작해야 할지 막막하신가요?
        </h2>
        <p className="text-white/60 text-base md:text-lg leading-relaxed mb-10 max-w-xl mx-auto">
          업종과 목적에 맞는 방향부터 함께 정리해드립니다.<br />
          가격이 궁금하셔도, 아직 준비가 덜 되어 있어도 괜찮습니다.<br />
          편하게 문의해보세요.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 bg-white text-[#0F172A] font-semibold px-8 py-4 rounded-full whitespace-nowrap cursor-pointer hover:bg-white/90 transition-colors text-base"
          >
            <i className="ri-mail-send-line text-lg"></i>
            무료 상담 받기
          </Link>
          <Link
            to="/cases"
            className="inline-flex items-center justify-center gap-2 border border-white/30 text-white font-semibold px-8 py-4 rounded-full whitespace-nowrap cursor-pointer hover:bg-white/10 transition-colors text-base"
          >
            제작 사례 보기
            <i className="ri-arrow-right-line"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}
