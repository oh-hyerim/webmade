import { Link } from 'react-router-dom';

const PAINS = [
  { icon: 'ri-question-mark', text: '홈페이지가 필요한데 어디서부터 시작해야 할지 모르겠습니다' },
  { icon: 'ri-eye-off-line', text: '너무 감성적인 사이트 말고 깔끔하고 전문적으로 만들고 싶습니다' },
  { icon: 'ri-chat-1-line', text: '우리 업종에 맞는 구성으로 상담부터 제대로 받고 싶습니다' },
  { icon: 'ri-medal-line', text: '가격도 중요하지만 퀄리티와 소통이 더 중요합니다' },
  { icon: 'ri-map-pin-line', text: '전국 어디서든 비대면으로 편하게 진행하고 싶습니다' },
];

export default function EmpathySection() {
  return (
    <section className="bg-[#0F172A] py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col lg:flex-row gap-14 lg:gap-20 items-start">
          {/* Left */}
          <div className="lg:w-80 shrink-0">
            <span className="text-[#1E5EFF] text-xs font-semibold tracking-widest uppercase mb-4 block">For You</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              이런 고민이 있다면,<br />
              <span className="text-[#1E5EFF]">웹메이드가</span><br />
              잘 맞습니다
            </h2>
            <div className="mt-8">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-[#1E5EFF] text-white font-semibold px-6 py-3.5 rounded-full whitespace-nowrap cursor-pointer hover:bg-[#1a4fd6] transition-colors text-sm"
              >
                <i className="ri-mail-send-line text-base"></i>
                문의하기
              </Link>
            </div>
          </div>

          {/* Right: Pain Points */}
          <div className="flex-1 flex flex-col gap-4">
            {PAINS.map((p, i) => (
              <div
                key={i}
                className="flex items-center gap-5 bg-white/5 border border-white/10 rounded-2xl px-6 py-5 hover:bg-white/8 transition-colors"
              >
                <div className="w-10 h-10 flex items-center justify-center bg-[#1E5EFF]/20 rounded-xl shrink-0">
                  <i className={`${p.icon} text-[#1E5EFF] text-lg`}></i>
                </div>
                <p className="text-white/80 text-sm md:text-base leading-relaxed">{p.text}</p>
                <div className="ml-auto shrink-0">
                  <i className="ri-check-line text-[#1E5EFF] text-lg"></i>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
