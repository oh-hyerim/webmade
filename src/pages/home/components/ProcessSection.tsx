import { Link } from 'react-router-dom';

const STEPS = [
  { num: '01', icon: 'ri-chat-1-line', title: '상담 접수', desc: '카카오톡 또는 문의 폼으로 업종, 목적, 필요한 내용을 편하게 보내주세요.' },
  { num: '02', icon: 'ri-compass-3-line', title: '방향 정리', desc: '필요한 페이지 구성, 원하는 분위기, 참고 사이트 등을 함께 정리합니다.' },
  { num: '03', icon: 'ri-layout-2-line', title: '기획 및 디자인', desc: '업종과 목적에 맞는 구조를 기획하고 트렌디한 디자인으로 제작합니다.' },
  { num: '04', icon: 'ri-edit-line', title: '수정 및 검수', desc: '제작 후 수정 요청을 반영하고 꼼꼼하게 검수합니다.' },
  { num: '05', icon: 'ri-rocket-line', title: '최종 오픈', desc: '검수 완료 후 최종 오픈합니다. 오픈 후 안내도 함께 드립니다.' },
];

export default function ProcessSection() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="text-center mb-6">
          <span className="text-[#1E5EFF] text-xs font-semibold tracking-widest uppercase mb-3 block">Process</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0F172A] leading-tight mb-4">
            상담부터 제작까지,<br />이렇게 진행됩니다
          </h2>
        </div>
        <p className="text-center text-[#64748B] text-sm md:text-base leading-relaxed mb-14 max-w-xl mx-auto">
          처음이라 준비된 자료가 많지 않아도 괜찮습니다.<br />
          상담을 통해 필요한 내용을 하나씩 정리해드립니다.
        </p>

        {/* Steps */}
        <div className="relative">
          <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-px bg-[#E2E8F0] z-0"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 relative z-10">
            {STEPS.map((s) => (
              <div key={s.num} className="flex flex-col items-center text-center gap-4">
                <div className="relative">
                  <div className="w-20 h-20 flex items-center justify-center bg-[#F8FAFC] border-2 border-[#E2E8F0] rounded-full">
                    <i className={`${s.icon} text-2xl text-[#1E5EFF]`}></i>
                  </div>
                  <span className="absolute -top-1 -right-1 w-6 h-6 flex items-center justify-center bg-[#1E5EFF] text-white text-xs font-bold rounded-full">{s.num.replace('0', '')}</span>
                </div>
                <div>
                  <h3 className="text-[#0F172A] font-bold text-base mb-2">{s.title}</h3>
                  <p className="text-[#64748B] text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 text-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-[#1E5EFF] text-white font-semibold px-8 py-4 rounded-full whitespace-nowrap cursor-pointer hover:bg-[#1a4fd6] transition-colors"
          >
            <i className="ri-mail-send-line text-lg"></i>
            문의하기
          </Link>
        </div>
      </div>
    </section>
  );
}
