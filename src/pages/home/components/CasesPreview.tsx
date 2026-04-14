import { Link } from 'react-router-dom';

interface CaseItem {
  customImg: string;
  industry: string;
  title: string;
  point: string;
  url: string;
}

const CASES: CaseItem[] = [
  {
    customImg: 'images/7644a05f-b1ca-44a5-bc1e-0ad3873b3e47_b7b968c0-beae-4879-b89d-25a999b951a6.jpg',
    industry: '물류 / 배송',
    title: 'DK Express 홈페이지',
    point: '서비스 안내 + 상담 전환 최적화',
    url: 'https://dkexpress.us',
  },
  {
    customImg: '/images/edited_95e9644b3e3e07ba8be394545b916746_4aaef9f9.jpg',
    industry: '출판',
    title: 'The Venue Times',
    point: '출판 서비스 안내 + 출간 상담 최적화',
    url: 'https://thevenuetimes.readdy.co',
  },
  {
    customImg: '/images/edited_83c319ce3a638dbaf0f658d46172a195_52f88c2d.jpg',
    industry: '반려동물',
    title: '기억할개',
    point: '제작 서비스 안내 + 주문 전환 최적화',
    url: 'https://rememberdog.readdy.co',
  },
];

export default function CasesPreview() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-6">
          <div>
            <span className="text-[#1E5EFF] text-xs font-semibold tracking-widest uppercase mb-3 block">Portfolio</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0F172A] leading-tight">
              목적에 맞게 구성한<br />홈페이지 사례
            </h2>
          </div>
          <Link
            to="/cases"
            className="inline-flex items-center gap-2 text-[#1E5EFF] font-semibold text-sm hover:gap-3 transition-all whitespace-nowrap cursor-pointer"
          >
            제작 사례 더 보기
            <i className="ri-arrow-right-line"></i>
          </Link>
        </div>

        {/* Sub Text */}
        <p className="text-[#64748B] text-sm md:text-base leading-relaxed mb-12 max-w-2xl">
          업종과 고객 특성에 따라 필요한 구조와 화면 구성은 달라집니다.<br />
          웹메이드는 브랜드 분위기와 실제 문의 흐름을 함께 고려해 제작합니다.
        </p>

        {/* Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CASES.map((c) => (
            <div key={c.title} className="group block rounded-2xl overflow-hidden bg-[#F8FAFC]">
              <div className="relative overflow-hidden h-52 w-full">
                <img
                  src={c.customImg}
                  alt={c.title}
                  className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 flex items-center justify-center bg-[#0F172A]/0 group-hover:bg-[#0F172A]/35 transition-colors duration-300 cursor-pointer"
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 text-[#0F172A] text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5">
                    <i className="ri-external-link-line"></i>
                    사이트 방문하기
                  </span>
                </a>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[#1E5EFF] text-xs font-semibold bg-[#1E5EFF]/10 px-2.5 py-1 rounded-full">{c.industry}</span>
                  <span className="text-[#16a34a] text-xs font-semibold bg-[#16a34a]/10 px-2.5 py-1 rounded-full">실제 제작</span>
                </div>
                <h3 className="text-[#0F172A] font-bold text-base mt-3 mb-1">{c.title}</h3>
                <p className="text-[#64748B] text-sm">{c.point}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
