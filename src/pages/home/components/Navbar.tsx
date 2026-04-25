import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white border-b border-neutral-100'
          : 'bg-transparent'
      }`}
    >
      <div className="px-8 md:px-16 flex items-center justify-between h-[68px]">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <span
            className={`text-lg font-black tracking-[0.15em] uppercase transition-colors duration-300 ${
              scrolled ? 'text-[#111]' : 'text-white'
            }`}
            style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: '0.2em' }}
          >
            WEB<span className="font-light">MADE</span>
          </span>
        </a>

        {/* Desktop nav — center */}
        <nav className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
          {[
            { label: 'Services', id: 'services' },
            { label: 'Work', id: 'portfolio' },
            { label: 'Process', id: 'process' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`text-xs font-semibold tracking-[0.12em] uppercase transition-colors cursor-pointer whitespace-nowrap hover:opacity-60 ${
                scrolled ? 'text-[#111]' : 'text-white/80'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right CTA */}
        <div className="hidden md:flex items-center gap-5">
          <button
            onClick={() => scrollTo('contact')}
            className={`text-xs font-semibold tracking-[0.1em] uppercase transition-all cursor-pointer whitespace-nowrap border px-5 py-2.5 ${
              scrolled
                ? 'border-[#111] text-[#111] hover:bg-[#111] hover:text-white'
                : 'border-white/60 text-white hover:border-white hover:bg-white hover:text-[#111]'
            }`}
          >
            문의하기
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <i className={`${menuOpen ? 'ri-close-line' : 'ri-menu-line'} text-2xl ${scrolled ? 'text-[#111]' : 'text-white'}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-neutral-100 px-8 py-8 flex flex-col gap-6">
          {[
            { label: 'Services', id: 'services' },
            { label: 'Work', id: 'portfolio' },
            { label: 'Process', id: 'process' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="text-left text-sm font-semibold tracking-widest uppercase text-[#111] hover:opacity-50 transition-opacity cursor-pointer"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('contact')}
            className="mt-2 px-6 py-3.5 border border-[#111] text-[#111] text-xs font-bold tracking-widest uppercase text-center cursor-pointer hover:bg-[#111] hover:text-white transition-all whitespace-nowrap"
          >
            문의하기
          </button>
        </div>
      )}
    </header>
  );
}
