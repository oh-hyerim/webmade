import { Link } from 'react-router-dom';
import { KAKAO_CHANNEL_URL } from '@/config/site';

export default function Footer() {
  return (
    <footer className="bg-[#0F172A] text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-14 md:py-20">
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center sm:justify-start mb-10">
          <a
            href={KAKAO_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#FEE500] text-[#3C1E1E] font-bold px-5 py-3 rounded-full text-sm hover:bg-[#f5dc00] transition-colors"
          >
            <i className="ri-kakao-talk-fill text-lg"></i>
            카카오톡 상담
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 mb-14">
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
            <p className="text-[#64748B] text-xs mt-4 flex items-center gap-2">
              <i className="ri-shield-check-line text-[#22C55E]"></i>
              HTTPS(SSL) 보안 연결
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">메뉴</h4>
            <div className="h-px bg-[#334155] mb-4"></div>
            <ul className="flex flex-col gap-3">
              <li><Link to="/" className="text-[#94A3B8] text-sm hover:text-white transition-colors">홈</Link></li>
              <li><Link to="/cases" className="text-[#94A3B8] text-sm hover:text-white transition-colors">제작 사례</Link></li>
              <li><Link to="/pricing" className="text-[#94A3B8] text-sm hover:text-white transition-colors">요금 안내</Link></li>
              <li><Link to="/contact" className="text-[#94A3B8] text-sm hover:text-white transition-colors">문의하기</Link></li>
              <li><Link to="/privacy" className="text-[#94A3B8] text-sm hover:text-white transition-colors">개인정보 처리방침</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">뉴스레터 · 소식</h4>
            <div className="h-px bg-[#334155] mb-4"></div>
            <p className="text-[#94A3B8] text-sm mb-4 leading-relaxed">
              제작 팁·소식을 받아보고 싶으시면 문의 페이지에서 남겨주세요.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-[#1E5EFF] text-white font-semibold px-5 py-3 rounded-full text-sm hover:bg-[#1a4fd6] transition-colors"
            >
              <i className="ri-mail-send-line"></i>
              소식 받기 · 문의하기
            </Link>
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
