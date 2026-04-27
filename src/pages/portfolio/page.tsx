import MarketingPageLayout from '@/pages/marketing/MarketingPageLayout';

export default function PortfolioPage() {
  return (
    <MarketingPageLayout
      seo={{
        title: '홈페이지 제작 포트폴리오 | 웹메이드',
        description: '업종과 목적에 따라 문의 전환 흐름을 다르게 설계하는 웹메이드 홈페이지 제작 포트폴리오와 구성 방식을 확인하세요.',
        path: '/portfolio',
      }}
      eyebrow="Portfolio"
      title="보여주기보다 문의로 이어지게 설계합니다."
      description="웹메이드는 단순히 예쁜 화면보다 방문자가 무엇을 보고 어떤 행동을 해야 하는지 먼저 정리합니다. 업종별 목적에 맞춰 메인 구조, CTA, 상세 페이지 흐름을 다르게 설계합니다."
      items={[
        {
          title: '병원 · 뷰티 · 예약 업종',
          desc: '가격, 위치, 예약 방법을 빠르게 이해하도록 모바일 중심 CTA와 신뢰 요소를 앞쪽에 배치합니다.',
        },
        {
          title: '전문 서비스 · B2B',
          desc: '회사 소개, 서비스 범위, 진행 사례, 문의 흐름을 정리해 첫 방문에서도 전문성과 안정감을 느끼도록 구성합니다.',
        },
        {
          title: '광고 랜딩페이지',
          desc: '광고 유입 후 이탈을 줄이기 위해 핵심 제안, 혜택, 문의 버튼을 짧고 명확한 흐름으로 연결합니다.',
        },
      ]}
    >
      <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 border-t border-[#0a0a0a]/10 pt-12">
        <div className="lg:col-span-4">
          <h2 className="font-serif text-3xl text-[#0a0a0a] leading-tight">포트폴리오는 결과물이 아니라 설계 방식입니다.</h2>
        </div>
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {['첫 화면에서 무엇을 믿게 할지', '문의 버튼을 어디에 둘지', '어떤 정보가 구매 결정을 돕는지', '모바일에서 어떤 순서가 편한지'].map((text) => (
            <div key={text} className="border-t border-[#0a0a0a]/10 pt-5">
              <p className="text-[#0a0a0a]/65 text-sm font-light leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </MarketingPageLayout>
  );
}
