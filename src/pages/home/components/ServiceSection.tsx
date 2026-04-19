import { Link } from 'react-router-dom';

const SERVICES = [
  {
    icon: 'ri-building-4-line',
    title: '회사소개형 홈페이지',
    problem: '정보는 많은데 연락으로 이어지지 않을 때',
    solution: '신뢰를 쌓는 순서로 소개·연혁·연락 동선을 정리합니다.',
    result: '브랜드 이해 후 자연스럽게 문의·상담으로 연결되는 구조',
    dark: true,
  },
  {
    icon: 'ri-service-line',
    title: '서비스 안내형 홈페이지',
    problem: '서비스 설명이 길고 핵심이 잘 안 보일 때',
    solution: '고객이 궁금해하는 순서대로 정보를 나누고 CTA를 반복 배치합니다.',
    result: '이해 속도가 빨라지고 상담 문의로 이어지기 쉬워집니다',
    dark: false,
  },
  {
    icon: 'ri-chat-smile-2-line',
    title: '상담 유도형 홈페이지',
    problem: '방문은 있는데 문의 버튼 클릭이 적을 때',
    solution: '스크롤 구간마다 상담 유도 문구와 버튼을 전략적으로 배치합니다.',
    result: '동선 끊김 없이 상담 예약·문의로 전환되도록 설계합니다',
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
            문제 → 해결 → 결과<br />목적에 맞는 홈페이지
          </h2>
          <p className="text-[#64748B] text-sm md:text-base max-w-2xl mx-auto">
            각 유형마다 <strong className="text-[#0F172A]">문의·상담으로 이어지는 흐름</strong>을 우선 설계합니다.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {SERVICES.map((s) => (
            <div
              key={s.title}
              className={`rounded-2xl p-8 flex flex-col gap-4 hover:-translate-y-1 transition-transform ${
                s.dark ? 'bg-[#0F172A]' : 'bg-[#F8FAFC]'
              }`}
            >
              <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${s.dark ? 'bg-[#1E5EFF]/20' : 'bg-[#1E5EFF]/10'}`}>
                <i className={`${s.icon} text-2xl text-[#1E5EFF]`}></i>
              </div>
              <div className="flex-1">
                <h3 className={`text-lg font-bold mb-3 ${s.dark ? 'text-white' : 'text-[#0F172A]'}`}>{s.title}</h3>
                <dl className="space-y-2 text-sm">
                  <div>
                    <dt className={`font-semibold mb-0.5 ${s.dark ? 'text-rose-300/90' : 'text-rose-600'}`}>문제</dt>
                    <dd className={s.dark ? 'text-white/70' : 'text-[#64748B]'}>{s.problem}</dd>
                  </div>
                  <div>
                    <dt className={`font-semibold mb-0.5 ${s.dark ? 'text-[#38BDF8]' : 'text-[#1E5EFF]'}`}>해결</dt>
                    <dd className={s.dark ? 'text-white/70' : 'text-[#64748B]'}>{s.solution}</dd>
                  </div>
                  <div>
                    <dt className={`font-semibold mb-0.5 ${s.dark ? 'text-[#4ADE80]' : 'text-emerald-600'}`}>결과</dt>
                    <dd className={s.dark ? 'text-white/80' : 'text-[#334155]'}>{s.result}</dd>
                  </div>
                </dl>
              </div>
              <Link
                to="/contact"
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm whitespace-nowrap cursor-pointer transition-colors ${
                  s.dark
                    ? 'bg-[#1E5EFF] text-white hover:bg-[#1a4fd6]'
                    : 'bg-[#1E5EFF] text-white hover:bg-[#1a4fd6]'
                }`}
              >
                <i className="ri-mail-send-line text-base"></i>
                무료 상담 받기
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="bg-[#F8FAFC] rounded-2xl px-8 py-6 text-center">
          <p className="text-[#64748B] text-sm md:text-base leading-relaxed">
            업종과 목적이 다르면 필요한 페이지 구성도 달라집니다.<br />
            <strong className="text-[#0F172A]">상담으로 방향을 먼저 잡은 뒤, 맞춤 구조를 제안합니다.</strong>
          </p>
        </div>
      </div>
    </section>
  );
}
