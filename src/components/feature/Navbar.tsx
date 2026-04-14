import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

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

  // 홈(/)에서만 투명 배경 + 흰 글씨, 나머지 페이지는 항상 흰 배경 + 어두운 글씨
  const isHome = location.pathname === '/';
  const transparent = isHome && !scrolled;

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        transparent ? 'bg-transparent' : 'bg-white shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link to="/" className="shrink-0">
          <span
            className={`text-2xl md:text-3xl font-bold tracking-tight transition-colors`}
            style={{ fontFamily: "'Dancing Script', cursive", letterSpacing: '-0.01em', color: transparent ? '#ffffff' : '#1E5EFF' }}
          >
            WebMade
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
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

        {/* CTA Button */}
        <Link
          to="/contact"
          className="hidden md:flex items-center gap-2 bg-[#FEE500] text-[#3C1E1E] text-sm font-semibold px-5 py-2.5 rounded-full whitespace-nowrap cursor-pointer hover:bg-[#f5dc00] transition-colors"
        >
          <i className="ri-kakao-talk-fill text-base"></i>
          문의하기
        </Link>

        {/* Mobile Hamburger */}
        <button
          className={`md:hidden w-9 h-9 flex items-center justify-center cursor-pointer ${
            transparent ? 'text-white' : 'text-[#0F172A]'
          }`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="메뉴 열기"
        >
          <i className={`text-xl ${menuOpen ? 'ri-close-line' : 'ri-menu-line'}`}></i>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4">
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
            className="flex items-center justify-center gap-2 bg-[#FEE500] text-[#3C1E1E] text-sm font-semibold px-5 py-3 rounded-full whitespace-nowrap cursor-pointer"
          >
            <i className="ri-kakao-talk-fill text-base"></i>
            문의하기
          </Link>
        </div>
      )}
    </header>
  );
}
