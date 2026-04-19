import { Link } from 'react-router-dom';

const STATS = [
  { label: 'HTTPS 보안 연결', sub: 'SSL 적용', icon: 'ri-shield-check-line' },
  { label: '상담 중심 제작', sub: '문의 전환 구조', icon: 'ri-customer-service-2-line' },
  { label: '사례 기반 개선', sub: '전환·동선 점검', icon: 'ri-bar-chart-box-line' },
];

const MINI_REVIEWS = [
  {
    quote: '상담 버튼 위치와 문구만 정리했는데 문의가 눈에 띄게 늘었어요.',
    tag: '서비스업',
  },
  {
    quote: '스크롤만 길었던 소개 페이지를 단계별로 나눠 전환율이 개선됐습니다.',
    tag: 'B2B',
  },
];

export default function SocialProofSection() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center mb-12">
          <span className="text-[#1E5EFF] text-xs font-semibold tracking-widest uppercase mb-3 block">Trust</span>
          <h2 className="text-2xl md:text-4xl font-bold text-[#0F172A] leading-tight mb-4">
            신뢰할 수 있는 제작 방식
          </h2>
          <p className="text-[#64748B] text-sm md:text-base max-w-2xl mx-auto">
            실제 사례와 운영 경험을 바탕으로, <strong className="text-[#0F172A]">문의로 이어지는 구조</strong>를 우선합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-12">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center text-center gap-3 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] px-5 py-6"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white border border-[#E2E8F0]">
                <i className={`${s.icon} text-2xl text-[#1E5EFF]`}></i>
              </div>
              <p className="text-[#0F172A] font-semibold text-sm">{s.label}</p>
              <p className="text-[#64748B] text-xs">{s.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MINI_REVIEWS.map((r) => (
            <div
              key={r.quote}
              className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-6 md:p-8"
            >
              <p className="text-[#0F172A] text-sm md:text-base leading-relaxed mb-4">&ldquo;{r.quote}&rdquo;</p>
              <span className="inline-block text-xs font-semibold text-[#1E5EFF] bg-[#1E5EFF]/10 px-3 py-1 rounded-full">
                {r.tag}
              </span>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-[#94A3B8] mt-6">
          수치는 업종·기간·마케팅에 따라 달라질 수 있습니다. 상담 시 사례를 기준으로 설명드립니다.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Link
            to="/cases"
            className="inline-flex items-center justify-center gap-2 border-2 border-[#1E5EFF] text-[#1E5EFF] font-semibold px-8 py-3.5 rounded-full whitespace-nowrap cursor-pointer hover:bg-[#1E5EFF]/5 transition-colors text-sm"
          >
            제작 사례 더 보기
            <i className="ri-arrow-right-line"></i>
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 bg-[#1E5EFF] text-white font-semibold px-8 py-3.5 rounded-full whitespace-nowrap cursor-pointer hover:bg-[#1a4fd6] transition-colors text-sm shadow-md shadow-[#1E5EFF]/20"
          >
            무료 상담 받기
          </Link>
        </div>
      </div>
    </section>
  );
}
