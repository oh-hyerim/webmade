import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

type NavbarProps = {
  forceSolid?: boolean;
};

const navItems = [
  { label: 'Services', to: '/Services' },
  { label: 'Work', to: '/Work' },
  { label: 'Process', to: '/Process' },
  { label: 'Pricing', to: '/Pricing' },
];

export default function Navbar({ forceSolid = false }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const solid = forceSolid || scrolled;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        solid
          ? 'bg-white border-b border-neutral-100'
          : 'bg-transparent'
      }`}
    >
      <div className="px-8 md:px-16 flex items-center justify-between h-[68px]">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span
            className={`text-lg font-black tracking-[0.15em] uppercase transition-colors duration-300 ${
              solid ? 'text-[#111]' : 'text-white'
            }`}
            style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: '0.2em' }}
          >
            WEB<span className="font-light">MADE</span>
          </span>
        </Link>

        {/* Desktop nav - center */}
        <nav className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `text-xs font-semibold tracking-[0.12em] uppercase transition-colors cursor-pointer whitespace-nowrap hover:opacity-60 ${
                isActive
                  ? solid ? 'text-[#111]' : 'text-white'
                  : solid ? 'text-[#111]/65' : 'text-white/80'
              }`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Right CTA */}
        <div className="hidden md:flex items-center gap-5">
          <Link
            to="/contact"
            className={`text-xs font-semibold tracking-[0.1em] uppercase transition-all cursor-pointer whitespace-nowrap border px-5 py-2.5 ${
              solid
                ? 'border-[#111] text-[#111] hover:bg-[#111] hover:text-white'
                : 'border-white/60 text-white hover:border-white hover:bg-white hover:text-[#111]'
            }`}
          >
            문의하기
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="메뉴 열기"
          aria-expanded={menuOpen}
        >
          <i className={`${menuOpen ? 'ri-close-line' : 'ri-menu-line'} text-2xl ${solid ? 'text-[#111]' : 'text-white'}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-neutral-100 px-8 py-8 flex flex-col gap-6">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => `text-left text-sm font-semibold tracking-widest uppercase transition-opacity cursor-pointer ${
                isActive ? 'text-[#111]' : 'text-[#111]/65 hover:text-[#111]'
              }`}
            >
              {item.label}
            </NavLink>
          ))}
          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className="mt-2 px-6 py-3.5 border border-[#111] text-[#111] text-xs font-bold tracking-widest uppercase text-center cursor-pointer hover:bg-[#111] hover:text-white transition-all whitespace-nowrap"
          >
            문의하기
          </Link>
        </div>
      )}
    </header>
  );
}
