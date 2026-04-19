import { useState, useEffect } from "react";

const NAV = [
  { label: 'Home',         href: '#home' },
  { label: 'About',        href: '#about' },
  { label: 'Education',    href: '#education' },
  { label: 'Research',     href: '#research' },
  { label: 'Experience',   href: '#experience' },
  { label: 'Publications', href: '#publications' },
  { label: 'Projects',     href: '#projects' },
  { label: 'Contact',      href: '#contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-slate-900/95 backdrop-blur-md shadow-lg border-b border-slate-700/50' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          <a href="#home" className="text-cyan-400 font-bold text-base tracking-wide hover:text-cyan-300 transition-colors">
            M. Asim Amin
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV.map(n => (
              <a
                key={n.href}
                href={n.href}
                className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-cyan-400 hover:bg-slate-800/60 rounded-md transition-all duration-200"
              >
                {n.label}
              </a>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-slate-300 hover:text-white p-2"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <div className="w-5 h-0.5 bg-current mb-1 transition-all" />
            <div className="w-5 h-0.5 bg-current mb-1 transition-all" />
            <div className="w-5 h-0.5 bg-current transition-all" />
          </button>
        </div>

        {/* Mobile dropdown */}
        {open && (
          <div className="md:hidden bg-slate-900/98 border-t border-slate-700/50 pb-3">
            {NAV.map(n => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-2.5 text-sm text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50 transition-colors"
              >
                {n.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
