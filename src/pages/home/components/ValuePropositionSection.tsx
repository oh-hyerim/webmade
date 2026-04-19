import { Link } from 'react-router-dom';

const STEPS = [
  {
    step: '문제',
    icon: 'ri-error-warning-line',
    title: '방문만 되고 문의는 없을 때',
    desc: '정보는 많은데 어디서 연락해야 할지 불분명하면 이탈이 늘어납니다.',
  },
  {
    step: '해결책',
    icon: 'ri-layout-masonry-line',
    title: '상담으로 이어지는 구조 설계',
    desc: '업종·목표에 맞춰 메뉴, 카피, CTA 배치를 먼저 설계합니다.',
  },
  {
    step: '기대 효과',
    icon: 'ri-line-chart-line',
    title: '문의·상담 전환에 집중',
    desc: '필요한 페이지만 담아 부담 없이 문의할 수 있는 동선을 만듭니다.',
  },
];

export default function ValuePropositionSection() {
  return (
    <section className="bg-[#F8FAFC] py-16 md:py-24 border-t border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center mb-12 md:mb-14">
          <span className="text-[#1E5EFF] text-xs font-semibold tracking-widest uppercase mb-3 block">Why WebMade</span>
          <h2 className="text-2xl md:text-4xl font-bold text-[#0F172A] leading-tight mb-4">
            3초 안에 이해되는 제안
          </h2>
          <p className="text-[#64748B] text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            예쁜 화면보다 <strong className="text-[#0F172A]">문의와 상담으로 이어지는 구조</strong>에 집중합니다.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {STEPS.map((item) => (
            <div
              key={item.step}
              className="bg-white rounded-2xl border border-[#E2E8F0] p-6 md:p-8 flex flex-col gap-4 shadow-sm"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[#1E5EFF] text-xs font-bold uppercase tracking-wider">{item.step}</span>
                <div className="w-11 h-11 flex items-center justify-center bg-[#EEF2FF] rounded-xl shrink-0">
                  <i className={`${item.icon} text-xl text-[#1E5EFF]`}></i>
                </div>
              </div>
              <h3 className="text-[#0F172A] font-bold text-lg leading-snug">{item.title}</h3>
              <p className="text-[#64748B] text-sm leading-relaxed flex-1">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 bg-[#1E5EFF] text-white font-semibold px-8 py-4 rounded-full whitespace-nowrap cursor-pointer hover:bg-[#1a4fd6] transition-colors text-sm md:text-base shadow-md shadow-[#1E5EFF]/25"
          >
            <i className="ri-calendar-check-line text-lg"></i>
            무료 상담 받기
          </Link>
        </div>
      </div>
    </section>
  );
}
