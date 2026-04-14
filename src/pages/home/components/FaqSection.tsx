import { useState } from 'react';
import { Link } from 'react-router-dom';

const FAQS = [
  { q: '가격은 어떻게 정해지나요?', a: '홈페이지 제작 비용은 페이지 수, 구성, 필요한 기능, 디자인 범위에 따라 달라집니다. 정해진 금액보다 필요한 구성에 따라 달라지기 때문에, 먼저 상담을 통해 필요한 범위를 확인한 뒤 맞춤으로 안내해드립니다.' },
  { q: '자료가 없어도 상담 가능한가요?', a: '네, 자료가 없어도 상담 가능합니다. 업종과 목적만 알려주시면 필요한 내용을 함께 정리해드립니다. 간단한 상담만으로도 대략적인 방향 안내가 가능합니다.' },
  { q: '제작 기간은 어느 정도 걸리나요?', a: '일반적으로 상담 후 기획 확정까지 3~5일, 제작 기간은 구성에 따라 2~4주 정도 소요됩니다. 정확한 기간은 상담 후 안내드립니다.' },
  { q: '지역 상관없이 진행 가능한가요?', a: '전국 어디서든 비대면 상담으로 진행 가능합니다. 카카오톡, 이메일, 화상 미팅 등 편하신 방법으로 소통합니다.' },
  { q: '수정도 가능한가요?', a: '제작 과정에서 수정 요청이 가능하며, 오픈 후에도 일정 범위 내 수정을 지원합니다. 수정 범위와 횟수는 상담 시 함께 안내드립니다.' },
];

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-6 md:px-10">
        <div className="text-center mb-14">
          <span className="text-[#1E5EFF] text-xs font-semibold tracking-widest uppercase mb-3 block">FAQ</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0F172A] leading-tight mb-4">자주 묻는 질문</h2>
          <p className="text-[#64748B] text-base md:text-lg">가격, 기간, 준비사항 등 핵심 궁금증을 정리했습니다.</p>
        </div>
        <div className="flex flex-col gap-3">
          {FAQS.map((faq, idx) => (
            <div key={idx} className="bg-[#F8FAFC] rounded-2xl overflow-hidden">
              <button
                className="w-full flex items-center justify-between px-7 py-5 text-left cursor-pointer"
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              >
                <span className="text-[#0F172A] font-semibold text-sm md:text-base pr-4">{faq.q}</span>
                <div className="w-7 h-7 flex items-center justify-center shrink-0">
                  <i className={`text-[#1E5EFF] text-lg transition-transform duration-200 ${openIdx === idx ? 'ri-subtract-line' : 'ri-add-line'}`}></i>
                </div>
              </button>
              {openIdx === idx && (
                <div className="px-7 pb-6">
                  <div className="h-px bg-[#E2E8F0] mb-4"></div>
                  <p className="text-[#64748B] text-sm leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <p className="text-[#0F172A] font-semibold text-lg mb-4">더 궁금한 점이 있으신가요?</p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-[#1E5EFF] text-white font-semibold px-7 py-3.5 rounded-full whitespace-nowrap cursor-pointer hover:bg-[#1a4fd6] transition-colors"
          >
            <i className="ri-mail-send-line text-lg"></i>
            문의하기
          </Link>
        </div>
      </div>
    </section>
  );
}
