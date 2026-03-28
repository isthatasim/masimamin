import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download, Zap } from 'lucide-react';
import { personal } from '../data/content';

const navLinks = [
  { label: 'About',        href: '#about' },
  { label: 'Research',     href: '#research' },
  { label: 'Experience',   href: '#experience' },
  { label: 'Publications', href: '#publications' },
  { label: 'Projects',     href: '#projects' },
  { label: 'Contact',      href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Track active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    navLinks.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-navy-950/90 backdrop-blur-md border-b border-slate-800/80 shadow-[0_1px_20px_rgba(0,0,0,0.5)]'
            : 'bg-transparent border-b border-transparent'
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.a
              href="#hero"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center gap-2 group"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                <Zap className="w-4 h-4 text-cyan-400" />
              </div>
              <span className="font-display font-bold text-slate-200 text-sm sm:text-base hidden xs:block">
                M. Asim <span className="text-cyan-400">Amin</span>
              </span>
            </motion.a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1" aria-label="Primary navigation">
              {navLinks.map(({ label, href }) => {
                const sectionId = href.slice(1);
                const isActive = activeSection === sectionId;
                return (
                  <button
                    key={href}
                    onClick={() => handleNavClick(href)}
                    className={`relative px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-200 ${
                      isActive
                        ? 'text-cyan-400'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {label}
                    {isActive && (
                      <motion.span
                        className="absolute inset-x-1 -bottom-px h-px bg-cyan-400"
                        layoutId="nav-indicator"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href={personal.cvUrl}
                download
                className="btn-primary text-xs px-4 py-2"
              >
                <Download className="w-3.5 h-3.5" />
                Download CV
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors"
              onClick={() => setMenuOpen((p) => !p)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />
            {/* Drawer */}
            <motion.div
              className="absolute top-16 inset-x-0 bg-navy-900/95 backdrop-blur-md border-b border-slate-800 shadow-2xl"
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <nav className="flex flex-col p-4 gap-1" aria-label="Mobile navigation">
                {navLinks.map(({ label, href }) => (
                  <button
                    key={href}
                    onClick={() => handleNavClick(href)}
                    className="text-left px-4 py-3 rounded-lg text-slate-300 hover:text-cyan-400 hover:bg-slate-800/60 transition-colors text-sm font-medium"
                  >
                    {label}
                  </button>
                ))}
                <div className="pt-2 border-t border-slate-800 mt-2">
                  <a
                    href={personal.cvUrl}
                    download
                    className="btn-primary w-full justify-center text-sm"
                    onClick={() => setMenuOpen(false)}
                  >
                    <Download className="w-4 h-4" />
                    Download CV
                  </a>
                </div>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
