import { useState, useEffect } from 'react';
import { personal } from '../data/content';

const NAV = [
  { label: 'About',        href: '#about' ,}
  { label: "Education", href: "#education" },
  { label: 'Research',     href: '#research' },
  { label: 'Experience',   href: '#experience' },
  { label: 'Publications', href: '#publications' },
  { label: 'Projects',     href: '#projects' },
  { label: 'Contact',      href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800/60 shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          <a href="#home" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center group-hover:border-cyan-400 transition-colors">
              <span className="text-cyan-400 font-bold text-sm">A</span>
            </div>
            <span className="hidden sm:block text-slate-300 text-sm font-semibold group-hover:text-cyan-400 transition-colors">
              {personal.shortName}
            </span>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {NAV.map(l => (
              <a key={l.href} href={l.href}
                className="px-3 py-1.5 text-slate-400 hover:text-cyan-400 text-sm font-medium rounded-lg hover:bg-slate-800/40 transition-all">
                {l.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <a href={personal.cvUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-cyan-500/40 text-cyan-400 text-sm font-medium hover:bg-cyan-500/10 transition-all">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download CV
            </a>
          </div>

          <button className="md:hidden p-2 text-slate-400 hover:text-slate-100 rounded-lg" onClick={() => setOpen(!open)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open
                ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>}
            </svg>
          </button>
        </div>

        {open && (
          <div className="md:hidden py-3 border-t border-slate-800">
            {NAV.map(l => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                className="block py-2.5 px-2 text-slate-400 hover:text-cyan-400 text-sm transition-colors">
                {l.label}
              </a>
            ))}
            <a href={personal.cvUrl} target="_blank" rel="noopener noreferrer"
              className="block mt-2 py-2 px-2 text-cyan-400 text-sm font-medium">
              Download CV
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}