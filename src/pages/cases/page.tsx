import { Link } from 'react-router-dom';
import Seo from '@/components/feature/Seo';

interface CaseItem {
  img?: string;
  customImg?: string;
  industry: string;
  title: string;
  point: string;
  url?: string;
  isReal?: boolean;
  imgPosition?: string;
}

const CASES: CaseItem[] = [
  {
    customImg: '/images/7644a05f-b1ca-44a5-bc1e-0ad3873b3e47_b7b968c0-beae-4879-b89d-25a999b951a6.jpg',
    industry: '물류 / 배송',
    title: 'DK Express 홈페이지',
    point: '서비스 안내 + 상담 전환 최적화',
    url: 'https://dkexpress.us',
    isReal: true,
    imgPosition: 'object-top',
  },
  {
    customImg: '/images/edited_95e9644b3e3e07ba8be394545b916746_4aaef9f9.jpg',
    industry: '출판',
    title: 'The Venue Times',
    point: '출판 서비스 안내 + 출간 상담 최적화',
    url: 'https://thevenuetimes.readdy.co',
    isReal: true,
    imgPosition: 'object-top',
  },
  {
    customImg: '/images/edited_83c319ce3a638dbaf0f658d46172a195_52f88c2d.jpg',
    industry: '반려동물',
    title: '기억할개',
    point: '제작 서비스 안내 + 주문 전환 최적화',
    url: 'https://rememberdog.readdy.co',
    isReal: true,
    imgPosition: 'object-top',
  },
  {
    customImg: '/images/edited_d47f09eec5ca13ee698698dc3130053a_226a7d9d.jpg',
    industry: 'F&B',
    title: '미친F&B',
    point: '서비스 안내 + 가맹점 문의 최적화',
    url: 'https://michinfnb.readdy.co',
    isReal: true,
    imgPosition: 'object-center',
  },
];



export default function CasesPage() {
  return (
    <main className="pt-20 min-h-screen bg-white">
      <Seo
        title="홈페이지 제작 후기 | 실제 고객 성공 사례 - 웹메이드"
        description="웹메이드 홈페이지 제작 후기와 성공 사례를 확인하세요. 실제 사업자들의 만족도 높은 사이트 제작 결과를 제공합니다."
        ogTitle="제작 사례"
        ogDescription="고객 성공 사례 확인"
        canonical="https://webmade.co.kr/cases"
      />
      {/* Hero */}
      <section className="bg-[#F8FAFC] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-10 text-center">
          <span className="text-[#1E5EFF] text-xs font-semibold tracking-widest uppercase mb-3 block">Portfolio</span>
          <h1 className="text-3xl md:text-5xl font-bold text-[#0F172A] leading-tight mb-4">
            제작 사례
          </h1>
          <p className="text-[#64748B] text-base md:text-lg max-w-xl mx-auto">
            업종과 목적에 따라 구성한 실제 제작 사례입니다.<br />
            보기 좋은 디자인보다, 고객이 이해하기 쉬운 구조를 우선했습니다.
          </p>
        </div>
      </section>

      {/* Cases Grid */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {CASES.map((c) => (
              <div key={c.title} className="group rounded-2xl overflow-hidden bg-[#F8FAFC] w-full">
                {c.isReal && c.customImg ? (
                  /* 실제 제작 사례 - 이미지만 */
                  <div className="relative overflow-hidden h-72 md:h-80 w-full group/img">
                    <img
                      src={c.customImg}
                      alt={c.title}
                      className={`absolute inset-0 w-full h-full object-cover ${c.imgPosition ?? 'object-top'} group-hover/img:scale-105 transition-transform duration-500`}
                    />
                    {c.url && (
                      <a
                        href={c.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 flex items-center justify-center bg-[#0F172A]/0 group-hover/img:bg-[#0F172A]/30 transition-colors duration-300 cursor-pointer"
                        title={c.title}
                      >
                        <span className="opacity-0 group-hover/img:opacity-100 transition-opacity duration-200 bg-white/90 text-[#0F172A] text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5">
                          <i className="ri-external-link-line"></i>
                          사이트 방문하기
                        </span>
                      </a>
                    )}
                  </div>
                ) : (
                  /* 일반 사례 - 이미지 */
                  <div className="relative overflow-hidden h-72 md:h-80">
                    <img
                      src={c.img}
                      alt={c.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-[#0F172A]/0 group-hover:bg-[#0F172A]/30 transition-colors duration-300"></div>
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[#1E5EFF] text-xs font-semibold bg-[#1E5EFF]/10 px-2.5 py-1 rounded-full">{c.industry}</span>
                  </div>
                  <h3 className="text-[#0F172A] font-bold text-base mt-3 mb-1">{c.title}</h3>
                  <p className="text-[#64748B] text-sm">{c.point}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#F8FAFC] py-16 md:py-20">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-4">
            우리 업종에 맞는 홈페이지가 궁금하신가요?
          </h2>
          <p className="text-[#64748B] text-base mb-8">
            업종과 목적을 알려주시면 맞춤 방향을 제안해드립니다.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-[#1E5EFF] text-white font-semibold px-8 py-4 rounded-full whitespace-nowrap cursor-pointer hover:bg-[#1a4fd6] transition-colors"
          >
            <i className="ri-mail-send-line text-lg"></i>
            문의하기
          </Link>
        </div>
      </section>
    </main>
  );
}
