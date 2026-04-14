import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#0F172A] text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 mb-14">
          {/* Brand */}
          <div className="md:col-span-1">
            <span
              className="text-2xl font-bold text-white mb-4 block"
              style={{ fontFamily: "'Dancing Script', cursive" }}
            >
              WebMade
            </span>
            <p className="text-[#94A3B8] text-sm leading-relaxed">
              사업에 맞는 홈페이지,<br />
              상담부터 제대로 시작합니다.
            </p>
          </div>

          {/* Menu */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">메뉴</h4>
            <div className="h-px bg-[#334155] mb-4"></div>
            <ul className="flex flex-col gap-3">
              <li><Link to="/" className="text-[#94A3B8] text-sm hover:text-white transition-colors">홈</Link></li>
              <li><Link to="/cases" className="text-[#94A3B8] text-sm hover:text-white transition-colors">제작 사례</Link></li>
              <li><Link to="/contact" className="text-[#94A3B8] text-sm hover:text-white transition-colors">문의하기</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">상담 문의</h4>
            <div className="h-px bg-[#334155] mb-4"></div>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="https://pf.kakao.com/_xcBxnxlX/friend"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#94A3B8] text-sm hover:text-white transition-colors flex items-center gap-2"
                >
                  <i className="ri-kakao-talk-fill text-[#FEE500]"></i>
                  카카오톡 상담
                </a>
              </li>
              <li><span className="text-[#94A3B8] text-sm">전국 비대면 상담 가능</span></li>
              <li><span className="text-[#94A3B8] text-sm">평일 15:00 - 18:00</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#1E293B] pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-[#475569] text-sm">© 2025 웹메이드. All rights reserved.</p>
          <p className="text-[#475569] text-xs">사업자등록번호 문의 시 상담을 통해 안내드립니다.</p>
        </div>
      </div>
    </footer>
  );
}
