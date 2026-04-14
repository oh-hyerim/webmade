const DIFFS = [
  {
    num: '01',
    icon: 'ri-layout-masonry-line',
    title: '예쁜 디자인보다 먼저, 사업에 맞는 구조부터 제안합니다',
    desc: '정해진 템플릿에 끼우기보다, 업종과 목적에 맞는 방향부터 상담합니다.',
  },
  {
    num: '02',
    icon: 'ri-eye-line',
    title: '트렌디하지만 읽기 쉬운 디자인을 만듭니다',
    desc: '트렌드를 반영하되 가독성과 이해도를 놓치지 않습니다. 과한 감성보다 실용성을 우선합니다.',
  },
  {
    num: '03',
    icon: 'ri-customer-service-2-line',
    title: '가격만 안내하는 것이 아니라 필요한 방향부터 상담합니다',
    desc: '상담을 통해 필요한 범위를 먼저 정리합니다. 불필요한 제안 없이 현실적으로 안내합니다.',
  },
  {
    num: '04',
    icon: 'ri-user-smile-line',
    title: '처음 제작하는 분도 이해하기 쉽게 진행합니다',
    desc: '운영에 도움이 되는 홈페이지를 목표로 제작합니다. 처음이라도 편하게 시작하실 수 있습니다.',
  },
  {
    num: '05',
    icon: 'ri-map-pin-line',
    title: '전국 어디서든 비대면으로 빠르게 상담 가능합니다',
    desc: '카카오톡으로 편하게 문의해주세요. 지역 제한 없이 전국 어디서든 진행 가능합니다.',
  },
];

export default function DiffSection() {
  return (
    <section className="bg-[#F8FAFC] py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <span className="text-[#1E5EFF] text-xs font-semibold tracking-widest uppercase mb-3 block">Why WebMade</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0F172A] leading-tight">
              웹메이드는<br />이렇게 다릅니다
            </h2>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {DIFFS.map((d, i) => (
            <div
              key={d.num}
              className={`bg-white rounded-2xl p-7 flex flex-col gap-5 hover:-translate-y-1 transition-transform ${i === 4 ? 'sm:col-span-2 lg:col-span-1' : ''}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[#E2E8F0] text-4xl font-black leading-none">{d.num}</span>
                <div className="w-10 h-10 flex items-center justify-center bg-[#1E5EFF]/10 rounded-xl">
                  <i className={`${d.icon} text-[#1E5EFF] text-lg`}></i>
                </div>
              </div>
              <div>
                <h3 className="text-sm md:text-base font-bold text-[#0F172A] mb-2 leading-snug">{d.title}</h3>
                <p className="text-sm text-[#64748B] leading-relaxed">{d.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
