import MarketingPageLayout from '@/pages/marketing/MarketingPageLayout';

export default function AboutPage() {
  return (
    <MarketingPageLayout
      seo={{
        title: '웹메이드 소개 | 문의 전환 중심 홈페이지 제작',
        description: '웹메이드는 소상공인과 중소기업을 위한 문의 전환 중심 홈페이지와 랜딩페이지를 제작합니다.',
        path: '/about',
      }}
      eyebrow="About"
      title="웹메이드는 화면보다 흐름을 먼저 봅니다."
      description="홈페이지는 예쁜 소개서이기도 하지만, 실제 고객이 들어와서 신뢰하고 문의하게 만드는 영업 도구이기도 합니다. 웹메이드는 작은 사업의 목적과 예산에 맞는 현실적인 구조를 제안합니다."
      items={[
        { title: '목적 중심', desc: '문의, 예약, 판매, 신뢰도 강화처럼 홈페이지가 해야 할 역할을 먼저 정합니다.' },
        { title: '모바일 중심', desc: '대부분의 방문자가 모바일로 들어오는 흐름을 기준으로 버튼, 문구, 정보 순서를 설계합니다.' },
        { title: '운영 현실 고려', desc: '자료가 부족하거나 관리 시간이 적은 상황까지 고려해 무리 없는 구성을 제안합니다.' },
      ]}
    />
  );
}
