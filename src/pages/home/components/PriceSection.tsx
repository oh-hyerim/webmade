import { Link } from 'react-router-dom';

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
    highlight: true,
  },
];

export default function PriceSection() {
  return (
    <section className="bg-[#0F172A] py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <div className="text-center mb-14">
          <span className="text-[#1E5EFF] text-xs font-semibold tracking-widest uppercase mb-4 block">Pricing</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
            가격이 가장 궁금하실 겁니다
          </h2>
          <p className="text-white/50 text-sm md:text-base max-w-xl mx-auto">
            필요한 구성에 맞는 플랜을 선택하세요.<br />
            <span className="text-white/30 text-xs">추가로 옵션 선택이 있습니다.</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-3xl mx-auto mb-10">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl border p-8 flex flex-col ${
                plan.highlight
                  ? 'bg-white/5 border-[#1E5EFF] ring-2 ring-[#1E5EFF]/40 shadow-[0_0_40px_rgba(30,94,255,0.15)]'
                  : 'bg-white/[0.03] border-white/10'
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#1E5EFF] text-white text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
                  ⭐ {plan.badge}
                </span>
              )}
              <p className="text-[#1E5EFF] text-xs font-semibold tracking-widest uppercase mb-2">{plan.name}</p>

              {/* 가격 영역 */}
              {plan.originalPrice ? (
                <div className="mb-1">
                  <span className="text-sm font-medium text-white/30 line-through decoration-white/40">
                    {plan.originalPrice}
                  </span>
                  <p className="text-3xl font-bold text-white mt-0.5">{plan.price}</p>
                  <p className="text-xs text-[#1E5EFF] font-medium mt-1.5">
                    {plan.discountRate} 런칭 프로모션 · 선착순 3건
                  </p>
                </div>
              ) : (
                <p className="text-3xl font-bold text-white mb-1">{plan.price}</p>
              )}

              <p className="text-white/40 text-xs mb-6 mt-1">{plan.desc}</p>
              <div className="border-t border-white/10 mb-6" />
              <ul className="flex flex-col gap-3 flex-1 mb-8">
                {plan.features.map((f) => {
                  const isSeo = f.startsWith('SEO');
                  return (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <div className={`w-5 h-5 flex items-center justify-center rounded-full shrink-0 mt-0.5 ${
                        isSeo ? 'bg-[#1E5EFF]/40' : 'bg-[#1E5EFF]/20'
                      }`}>
                        <i className="ri-check-line text-[#1E5EFF] text-xs"></i>
                      </div>
                      {isSeo ? (
                        <span className="text-white font-semibold">{f}</span>
                      ) : (
                        <span className="text-white/70">{f}</span>
                      )}
                    </li>
                  );
                })}
              </ul>
              <Link
                to="/contact"
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm whitespace-nowrap cursor-pointer transition-colors ${
                  plan.highlight
                    ? 'bg-[#1E5EFF] text-white hover:bg-[#1a4fd6]'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <i className="ri-mail-send-line"></i>
                문의하기
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/pricing"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors cursor-pointer"
          >
            자세한 요금 안내 보기
            <i className="ri-arrow-right-line"></i>
          </Link>
        </div>

        <div className="mt-8 max-w-3xl mx-auto border border-white/10 rounded-xl px-5 py-4 flex items-start gap-3">
          <i className="ri-information-line text-white/30 text-sm mt-0.5 shrink-0"></i>
          <p className="text-white/30 text-xs leading-relaxed">
            웹메이드는 <strong className="text-white/40 font-medium">소개형·안내형 홈페이지 제작</strong>에 집중합니다. 쇼핑몰 및 로그인 기능 개발은 진행하지 않습니다.
          </p>
        </div>
      </div>
    </section>
  );
}
