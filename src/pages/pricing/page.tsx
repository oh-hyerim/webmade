import { Link } from 'react-router-dom';
import Seo from '@/components/feature/Seo';

const plans = [
  {
    id: 'basic',
    name: '베이직',
    price: '₩300,000',
    originalPrice: null,
    discountRate: null,
    badge: null,
    desc: '간단한 소개용 홈페이지',
    features: [
      '단일 랜딩 페이지 (스크롤형)',
      '기본 디자인 구성',
      '문의폼 (구글 시트 저장)',
      '카카오톡 / 전화 연결',
    ],
    cta: '베이직으로 시작하기',
    highlight: false,
  },
  {
    id: 'standard',
    name: '스탠다드',
    price: '₩1,100,000',
    originalPrice: '₩1,590,000',
    discountRate: '30%',
    badge: '추천',
    desc: '실제 운영 가능한 홈페이지',
    features: [
      '베이직 플랜 전체 포함',
      '관리자 페이지 제공',
      '문의 목록 / 상세 확인',
      '상태 관리 (미확인 / 확인)',
      '관리자 메모 기능',
      '문의 삭제 기능',
      'SEO 설정 (서비스)',
    ],
    cta: '스탠다드로 시작하기',
    highlight: true,
  },
];

const options = [
  {
    icon: 'ri-pages-line',
    title: '메뉴 페이지 구성',
    desc: '기본 3페이지 구성, 추가 페이지당 확장 가능',
    tag: '소개 / 서비스 / 문의 등 분리 구성',
  },
  {
    icon: 'ri-database-2-line',
    title: '데이터 관리 기능',
    desc: '검색 기능, 카테고리 필터, 날짜 선택 조회, 문의 통계 대시보드',
    tag: '운영 및 고객 관리 최적화',
  },
  {
    icon: 'ri-edit-box-line',
    title: '콘텐츠 관리 기능',
    desc: '이미지 변경 (배너, 대표 이미지), FAQ 추가 및 수정',
    tag: '외주 없이 직접 관리 가능',
  },
  {
    icon: 'ri-star-smile-line',
    title: '후기 관리 기능',
    desc: '후기 등록 / 삭제, 관리자 답글 기능, 홈페이지 후기 자동 노출',
    tag: '신뢰도 및 전환율 상승',
  },
  {
    icon: 'ri-slideshow-3-line',
    title: '후기 슬라이더',
    desc: '자동 슬라이드 애니메이션, 모바일 최적화 UI',
    tag: '시각적 완성도 강화',
  },
  {
    icon: 'ri-translate-2',
    title: '다국어 지원',
    desc: '영어 / 일본어 등 추가 가능, 언어 선택 기능 제공',
    tag: '해외 고객 대응 가능',
  },
  {
    icon: 'ri-calendar-check-line',
    title: '예약 요청 기능',
    desc: '날짜·시간 선택, 예약 요청 전송, 관리자 확인 후 직접 확정',
    tag: '간편한 예약 문의 시스템',
  },
  {
    icon: 'ri-search-eye-line',
    title: 'SEO 최적화',
    desc: '메타 태그 설정, 검색 최적화 구조 구성, SNS 공유 썸네일 설정',
    tag: '검색 및 유입 효과 개선',
  },
  {
    icon: 'ri-shopping-bag-line',
    title: '쇼핑몰 연동 (외부)',
    desc: '스마트스토어 등 외부 쇼핑몰 연결, 상품 구매 링크 구성',
    tag: '간편한 판매 구조 구축',
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-white pt-20 md:pt-24 pb-16 md:pb-20">
      <Seo
        title="홈페이지 제작 요금 안내 | 베이직·스탠다드 플랜 - 웹메이드"
        description="웹메이드 홈페이지 제작 요금을 확인하세요. 베이직 30만원부터 스탠다드 150만원까지, 사업자 맞춤 플랜과 추가 옵션을 안내합니다."
        ogTitle="홈페이지 제작 요금 안내"
        ogDescription="베이직·스탠다드 플랜 및 추가 옵션 확인"
        canonical="https://webmade.co.kr/pricing"
      />

      {/* Header */}
      <section className="max-w-4xl mx-auto px-5 md:px-10 text-center mb-10 md:mb-16">
        <span className="text-[#1E5EFF] text-xs font-semibold tracking-widest uppercase mb-3 block">Pricing</span>
        <h1 className="text-2xl md:text-5xl font-bold text-[#0F172A] leading-tight mb-4">
          요금 안내
        </h1>
        <p className="text-[#64748B] text-sm md:text-base leading-relaxed max-w-xl mx-auto">
          필요한 구성에 맞는 플랜을 선택하세요.<br />
          추가로 옵션 선택이 있습니다.
        </p>
      </section>

      {/* Plans */}
      <section className="max-w-4xl mx-auto px-5 md:px-10 mb-14 md:mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 items-start">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl border flex flex-col overflow-hidden ${
                plan.highlight
                  ? 'bg-[#0F172A] border-[#1E5EFF] text-white ring-2 ring-[#1E5EFF]'
                  : 'bg-white border-[#E2E8F0] text-[#0F172A]'
              }`}
            >
              {plan.badge && (
                <div className="bg-[#1E5EFF] px-6 py-3.5 flex items-center justify-center gap-2.5">
                  <i className="ri-star-fill text-yellow-300 text-base"></i>
                  <span className="text-white text-sm font-bold tracking-wider">가장 많이 선택하는 플랜</span>
                  <i className="ri-star-fill text-yellow-300 text-base"></i>
                </div>
              )}
              <div className="p-6 md:p-8 flex flex-col flex-1">
                <div className="mb-5 md:mb-6">
                  <p className={`text-xs font-semibold tracking-widest uppercase mb-2 ${plan.highlight ? 'text-[#1E5EFF]' : 'text-[#94A3B8]'}`}>
                    {plan.name}
                  </p>
                  {plan.originalPrice ? (
                    <div className="mb-2">
                      <span className="text-sm font-medium text-white/30 line-through decoration-white/40">
                        {plan.originalPrice}
                      </span>
                      <div className="mt-0.5">
                        <span className="text-3xl md:text-4xl font-bold text-white">{plan.price}</span>
                      </div>
                      <p className="text-xs text-[#1E5EFF] font-medium mt-1.5">
                        {plan.discountRate} 런칭 프로모션 · 선착순 3건
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-end gap-2 mb-2">
                      <span className={`text-3xl md:text-4xl font-bold ${plan.highlight ? 'text-white' : 'text-[#0F172A]'}`}>{plan.price}</span>
                    </div>
                  )}
                  <p className={`text-sm ${plan.highlight ? 'text-white/60' : 'text-[#64748B]'}`}>{plan.desc}</p>
                </div>
                <div className={`border-t mb-5 md:mb-6 ${plan.highlight ? 'border-white/10' : 'border-[#E2E8F0]'}`} />
                <ul className="flex flex-col gap-2.5 md:gap-3 mb-6 md:mb-8 flex-1">
                  {plan.features.map((f) => {
                    const isSeo = f.startsWith('SEO');
                    return (
                      <li key={f} className="flex items-start gap-3 text-sm">
                        <div className={`w-5 h-5 flex items-center justify-center rounded-full shrink-0 mt-0.5 ${
                          isSeo ? 'bg-[#1E5EFF]/40' : plan.highlight ? 'bg-[#1E5EFF]/20' : 'bg-[#F1F5F9]'
                        }`}>
                          <i className="ri-check-line text-xs text-[#1E5EFF]"></i>
                        </div>
                        {isSeo ? (
                          <span className="text-white font-semibold">{f}</span>
                        ) : (
                          <span className={plan.highlight ? 'text-white/80' : 'text-[#334155]'}>{f}</span>
                        )}
                      </li>
                    );
                  })}
                </ul>
                <Link
                  to="/contact"
                  className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm whitespace-nowrap cursor-pointer transition-colors ${
                    plan.highlight
                      ? 'bg-[#1E5EFF] text-white hover:bg-[#1a4fd6]'
                      : 'bg-[#F1F5F9] text-[#0F172A] hover:bg-[#E2E8F0]'
                  }`}
                >
                  <i className="ri-arrow-right-line text-base"></i>
                  {plan.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-[#94A3B8] mt-5">
          * 추가로 옵션 선택이 있습니다. 자세한 내용은 상담을 통해 안내드립니다.
        </p>

        <div className="mt-4 border border-[#FB923C]/40 rounded-xl px-5 py-4 flex items-start gap-3 bg-[#FFF7ED]">
          <i className="ri-error-warning-line text-[#F97316] text-base mt-0.5 shrink-0"></i>
          <p className="text-[#92400E] text-sm leading-relaxed">
            웹메이드는 <strong className="text-[#C2410C] font-semibold">소개형·안내형 홈페이지 제작</strong>에 집중합니다.<br />
            쇼핑몰 및 로그인 기능 개발은 진행하지 않습니다.
          </p>
        </div>
      </section>

      {/* Options section */}
      <section className="max-w-4xl mx-auto px-5 md:px-10 mb-14 md:mb-20">
        <div className="bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] p-6 md:p-10">
          <h2 className="text-lg md:text-2xl font-bold text-[#0F172A] mb-1.5">추가 옵션</h2>
          <p className="text-sm text-[#64748B] mb-6 md:mb-8">필요에 따라 선택적으로 추가할 수 있는 옵션입니다.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {options.map((opt) => (
              <div key={opt.title} className="flex items-start gap-3 md:gap-4 bg-white rounded-xl border border-[#E2E8F0] p-4 md:p-5">
                <div className="w-9 h-9 flex items-center justify-center bg-[#EEF2FF] rounded-lg shrink-0">
                  <i className={`${opt.icon} text-[#1E5EFF] text-base`}></i>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[#0F172A] mb-1">{opt.title}</p>
                  <p className="text-xs text-[#64748B] mb-1.5 leading-relaxed">{opt.desc}</p>
                  <span className="inline-block text-[10px] font-medium text-[#1E5EFF] bg-[#EEF2FF] px-2 py-0.5 rounded-full">
                    {opt.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA 버튼 영역 */}
      <section className="bg-[#F8FAFC] py-16 md:py-20 mt-4">
        <div className="max-w-2xl mx-auto px-5 md:px-10 text-center">
          <h2 className="text-xl md:text-2xl font-bold text-[#0F172A] mb-3">
            어떤 플랜이 맞는지 모르겠다면?
          </h2>
          <p className="text-[#64748B] text-sm mb-8 leading-relaxed">
            편하게 문의해주시면 업종과 목적에 맞는 플랜을 안내해드립니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-[#1E5EFF] text-white font-semibold px-8 py-3.5 rounded-full whitespace-nowrap cursor-pointer hover:bg-[#1a4fd6] transition-colors text-sm"
            >
              <i className="ri-mail-send-line text-base"></i>
              문의하기
            </Link>
            <a
              href="https://pf.kakao.com/_xcBxnxlX/friend"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#FEE500] text-[#3C1E1E] font-semibold px-8 py-3.5 rounded-full whitespace-nowrap cursor-pointer hover:bg-[#f5dc00] transition-colors text-sm"
            >
              <i className="ri-kakao-talk-fill text-base"></i>
              카카오톡 상담
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
