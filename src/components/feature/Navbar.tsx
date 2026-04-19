import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { KAKAO_CHANNEL_URL } from '@/config/site';

const NAV_LINKS = [
  { label: '제작 사례', path: '/cases' },
  { label: '요금 안내', path: '/pricing' },
  { label: '문의하기', path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const isHome = location.pathname === '/';
  const transparent = isHome && !scrolled;

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        transparent ? 'bg-transparent' : 'bg-white shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-20 gap-2">
        <Link to="/" className="shrink-0 min-w-0">
          <span
            className={`text-2xl md:text-3xl font-bold tracking-tight transition-colors block truncate`}
            style={{ fontFamily: "'Dancing Script', cursive", letterSpacing: '-0.01em', color: transparent ? '#ffffff' : '#1E5EFF' }}
          >
            WebMade
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 lg:gap-8 flex-1 justify-center min-w-0">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-base font-semibold transition-colors whitespace-nowrap ${
                location.pathname === link.path
                  ? 'text-[#1E5EFF]'
                  : transparent
                  ? 'text-white hover:text-white/70'
                  : 'text-[#0F172A] hover:text-[#1E5EFF]'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2 lg:gap-3 shrink-0">
          <a
            href={KAKAO_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-[#FEE500] text-[#3C1E1E] text-xs lg:text-sm font-bold px-2.5 lg:px-3 py-2 rounded-full whitespace-nowrap hover:bg-[#f5dc00] transition-colors"
          >
            <i className="ri-kakao-talk-fill text-base"></i>
            카카오톡
          </a>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-[#1E5EFF] text-white font-semibold px-5 lg:px-8 py-3 lg:py-4 rounded-full whitespace-nowrap cursor-pointer hover:bg-[#1a4fd6] transition-colors text-sm shadow-md shadow-[#1E5EFF]/30"
          >
            <i className="ri-mail-send-line text-lg"></i>
            문의하기
          </Link>
        </div>

        <button
          className={`md:hidden w-9 h-9 flex items-center justify-center cursor-pointer shrink-0 ${
            transparent ? 'text-white' : 'text-[#0F172A]'
          }`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="메뉴 열기"
        >
          <i className={`text-xl ${menuOpen ? 'ri-close-line' : 'ri-menu-line'}`}></i>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <a
              href={KAKAO_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#FEE500] text-[#3C1E1E] font-bold py-3 rounded-full"
            >
              <i className="ri-kakao-talk-fill text-lg"></i>
              카카오톡 상담
            </a>
          </div>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-base font-semibold py-1 ${
                location.pathname === link.path ? 'text-[#1E5EFF]' : 'text-[#0F172A]'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 bg-[#1E5EFF] text-white font-semibold px-8 py-4 rounded-full whitespace-nowrap cursor-pointer hover:bg-[#1a4fd6] transition-colors"
          >
            <i className="ri-mail-send-line text-lg"></i>
            문의하기
          </Link>
        </div>
      )}
    </header>
  );
}
