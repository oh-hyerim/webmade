const SERVICES = [
  {
    icon: 'ri-building-4-line',
    title: '회사소개형 홈페이지',
    desc: '브랜드와 사업을 신뢰감 있게 소개하는 구조',
    detail: '회사 소개, 팀 소개, 연혁, 오시는 길 등 브랜드 신뢰를 높이는 구성으로 제작합니다.',
    dark: true,
  },
  {
    icon: 'ri-service-line',
    title: '서비스 안내형 홈페이지',
    desc: '서비스 내용을 쉽게 이해할 수 있게 정리한 구조',
    detail: '제공하는 서비스를 명확하게 전달하고 고객이 빠르게 이해할 수 있도록 설계합니다.',
    dark: false,
  },
  {
    icon: 'ri-chat-smile-2-line',
    title: '상담 유도형 홈페이지',
    desc: '문의 버튼과 흐름을 중심으로 설계한 구조',
    detail: '방문자가 자연스럽게 상담 버튼을 누르도록 동선과 정보 구조를 전략적으로 배치합니다.',
    dark: false,
  },
];

export default function ServiceSection() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-[#1E5EFF] text-xs font-semibold tracking-widest uppercase mb-3 block">Services</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0F172A] leading-tight mb-4">
            필요한 목적에 맞는<br />홈페이지를 제작합니다
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {SERVICES.map((s) => (
            <div
              key={s.title}
              className={`rounded-2xl p-8 flex flex-col gap-5 hover:-translate-y-1 transition-transform ${
                s.dark ? 'bg-[#0F172A]' : 'bg-[#F8FAFC]'
              }`}
            >
              <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${s.dark ? 'bg-[#1E5EFF]/20' : 'bg-[#1E5EFF]/10'}`}>
                <i className={`${s.icon} text-2xl text-[#1E5EFF]`}></i>
              </div>
              <div>
                <h3 className={`text-lg font-bold mb-2 ${s.dark ? 'text-white' : 'text-[#0F172A]'}`}>{s.title}</h3>
                <p className={`text-sm font-medium mb-3 ${s.dark ? 'text-[#22C55E]' : 'text-[#1E5EFF]'}`}>{s.desc}</p>
                <p className={`text-sm leading-relaxed ${s.dark ? 'text-white/55' : 'text-[#64748B]'}`}>{s.detail}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="bg-[#F8FAFC] rounded-2xl px-8 py-6 text-center">
          <p className="text-[#64748B] text-sm md:text-base leading-relaxed">
            업종과 목적이 다르면 필요한 페이지 구성도 달라집니다.<br />
            <strong className="text-[#0F172A]">웹메이드는 필요한 방향에 맞춰 설계합니다.</strong>
          </p>
        </div>
      </div>
    </section>
  );
}
