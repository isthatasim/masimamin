import { Zap, ExternalLink, Download, ArrowUp } from 'lucide-react';
import { personal } from '../data/content';

const footerLinks = [
  { label: 'About',        href: '#about' },
  { label: 'Research',     href: '#research' },
  { label: 'Experience',   href: '#experience' },
  { label: 'Publications', href: '#publications' },
  { label: 'Projects',     href: '#projects' },
  { label: 'Contact',      href: '#contact' },
];

const externalLinks = [
  { label: 'Google Scholar', href: personal.scholar },
  { label: 'LinkedIn',       href: personal.linkedin },
  { label: 'GitHub',         href: personal.github },
  { label: 'ResearchGate',   href: '#' }, // TODO: add ResearchGate URL if available
  { label: 'Publons',        href: personal.publons },
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative border-t border-white/[0.06] overflow-hidden" style={{ background: 'rgba(8,16,28,0.96)' }}>
      {/* Subtle grid */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `linear-gradient(rgba(6,182,212,0.03) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(6,182,212,0.03) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
        }}
      />

      <div className="section-container relative z-10">
        {/* Main footer content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                <Zap className="w-4 h-4 text-cyan-400" />
              </div>
              <span className="font-display font-bold text-slate-200">
                M. Asim <span className="text-cyan-400">Amin</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
              PhD Researcher in AI-Driven Power Systems & Smart Grids.
              Marie Sklodowska-Curie Early Stage Researcher at University of Genova.
            </p>
            <a href={personal.cvUrl} download className="btn-outline text-xs self-start">
              <Download className="w-3.5 h-3.5" />
              Download CV
            </a>
          </div>

          {/* Site navigation */}
          <div className="flex flex-col gap-4">
            <p className="text-xs font-mono text-slate-500 uppercase tracking-wider">Navigation</p>
            <nav className="grid grid-cols-2 gap-x-4 gap-y-2">
              {footerLinks.map(({ label, href }) => (
                <button
                  key={href}
                  onClick={() => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-left text-sm text-slate-400 hover:text-cyan-400 transition-colors duration-150"
                >
                  {label}
                </button>
              ))}
            </nav>
          </div>

          {/* External links */}
          <div className="flex flex-col gap-4">
            <p className="text-xs font-mono text-slate-500 uppercase tracking-wider">Academic Profiles</p>
            <div className="flex flex-col gap-2">
              {externalLinks.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-cyan-400 transition-colors duration-150 w-fit"
                >
                  {label}
                  <ExternalLink className="w-3 h-3" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-5 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} Muhammad Asim Amin · Built with React, TypeScript, Vite &amp; Tailwind CSS
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-cyan-400 transition-colors group"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
