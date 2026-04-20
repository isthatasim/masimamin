import { useEffect } from "react";
import { personal } from "../data/content";

const SOCIAL = [
  { label: "Scholar",     href: "https://scholar.google.com/citations?user=qq7dHikAAAAJ&hl=en", color: "#06b6d4", icon: "GS" },
  { label: "ResearchGate",href: "https://www.researchgate.net/profile/Muhammad-Asim-Amin-2",  color: "#00ccbb", icon: "RG" },
  { label: "GitHub",      href: "https://github.com/isthatasim",                               color: "#8b5cf6", icon: "GH" },
  { label: "LinkedIn",    href: "https://www.linkedin.com/in/masim40",                         color: "#3b82f6", icon: "in" },
  { label: "Email",       href: `mailto:${personal.email}`,                                   color: "#f59e0b", icon: "@"  },
];

// Deterministic star field — 160 stars, no Math.random at render
const STARS = Array.from({ length: 160 }, (_, i) => ({
  left:  ((i * 43.71 + 17.3) % 100).toFixed(2),
  top:   ((i * 71.37 + 29.7) % 100).toFixed(2),
  size:  (1 + (i % 3)),
  dur:   (2 + (i % 4)).toFixed(1),
  delay: ((i * 0.23) % 5).toFixed(2),
}));

export default function Hero() {
  useEffect(() => {
    const id = 'hero-twinkle-style';
    if (!document.getElementById(id)) {
      const s = document.createElement('style');
      s.id = id;
      s.textContent = `
        @keyframes twinkle {
          0%, 100% { opacity: 0.15; transform: scale(1);   }
          50%       { opacity: 0.9;  transform: scale(1.5); }
        }
        @keyframes float-up {
          0%   { transform: translateY(0px); }
          50%  { transform: translateY(-8px); }
          100% { transform: translateY(0px); }
        }
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 30px rgba(6,182,212,0.4), 0 0 60px rgba(6,182,212,0.15); }
          50%       { box-shadow: 0 0 50px rgba(6,182,212,0.7), 0 0 90px rgba(6,182,212,0.3); }
        }
      `;
      document.head.appendChild(s);
    }
    return () => {
      const el = document.getElementById(id);
      if (el) el.remove();
    };
  }, []);

  // Resolve image src — handles public-folder paths on GitHub Pages
  const imgSrc = personal.image
    ? (personal.image.startsWith('http')
        ? personal.image
        : personal.image)
    : null;

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #04080f 0%, #080d1a 40%, #060b16 70%, #04080f 100%)' }}
    >
      {/* ── Star field ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {STARS.map((st, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${st.left}%`,
              top:  `${st.top}%`,
              width:  `${st.size}px`,
              height: `${st.size}px`,
              animation: `twinkle ${st.dur}s ease-in-out ${st.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* ── Background glow orbs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-[500px] h-[500px] rounded-full opacity-[0.07]"
          style={{ background:'radial-gradient(circle, #06b6d4 0%, transparent 70%)', top:'-10%', right:'5%' }} />
        <div className="absolute w-[300px] h-[300px] rounded-full opacity-[0.06]"
          style={{ background:'radial-gradient(circle, #3b82f6 0%, transparent 70%)', bottom:'10%', left:'5%' }} />
        <div className="absolute w-[200px] h-[200px] rounded-full opacity-[0.05]"
          style={{ background:'radial-gradient(circle, #8b5cf6 0%, transparent 70%)', top:'40%', left:'30%' }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* ── LEFT: Text ── */}
          <div className="order-2 lg:order-1">

            {/* Top badge pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="text-xs px-3 py-1 rounded-full font-medium"
                style={{ background:'rgba(6,182,212,0.12)', border:'1px solid rgba(6,182,212,0.4)', color:'#67e8f9' }}>
                PhD Researcher
              </span>
              <span className="text-xs px-3 py-1 rounded-full font-medium"
                style={{ background:'rgba(59,130,246,0.12)', border:'1px solid rgba(59,130,246,0.4)', color:'#93c5fd' }}>
                University of Genova
              </span>
              <span className="text-xs px-3 py-1 rounded-full font-medium"
                style={{ background:'rgba(139,92,246,0.12)', border:'1px solid rgba(139,92,246,0.4)', color:'#c4b5fd' }}>
                Horizon Europe CLOE
              </span>
            </div>

            <p className="text-xs font-bold tracking-[0.3em] uppercase mb-2" style={{ color:'#06b6d4' }}>
              Hello, I'm
            </p>

            <h1 className="font-extrabold text-white leading-tight mb-4"
              style={{ fontSize:'clamp(2.4rem, 5vw, 3.8rem)', lineHeight: 1.1 }}>
              {personal.name}
            </h1>

            <p className="font-semibold mb-5" style={{ fontSize:'1.2rem', color:'#22d3ee' }}>
              {personal.title}
            </p>

            {personal.summary && (
              <p className="text-sm leading-relaxed mb-7 max-w-xl" style={{ color:'#94a3b8' }}>
                {personal.summary.split('\n')[0].slice(0, 200)}
                {personal.summary.length > 200 ? '…' : ''}
              </p>
            )}

            {/* Research interest tags */}
            <div className="flex flex-wrap gap-2 mb-7">
              {['Reinforcement Learning','Smart Grids','Energy Communities','Federated Learning'].map(t => (
                <span key={t} className="text-xs px-3 py-1 rounded-full"
                  style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.15)', color:'#cbd5e1' }}>
                  {t}
                </span>
              ))}
            </div>

            {/* Social links */}
            <div className="flex flex-wrap gap-2 mb-8">
              {SOCIAL.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 hover:scale-105 hover:brightness-125"
                  style={{ background: s.color+'1a', border:`1px solid ${s.color}55`, color: s.color }}>
                  <span className="font-extrabold text-[11px]">{s.icon}</span>
                  {s.label}
                </a>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3">
              <a href="#research"
                className="px-7 py-3 rounded-lg font-bold text-sm text-slate-900 transition-all duration-200 hover:scale-105"
                style={{ background:'linear-gradient(135deg,#06b6d4,#3b82f6)', boxShadow:'0 0 25px rgba(6,182,212,0.35)' }}>
                View Research
              </a>
              {personal.cvUrl && (
                <a href={personal.cvUrl} target="_blank" rel="noopener noreferrer"
                  className="px-7 py-3 rounded-lg font-bold text-sm transition-all duration-200 hover:scale-105"
                  style={{ border:'1px solid rgba(255,255,255,0.2)', color:'#e2e8f0', background:'rgba(255,255,255,0.04)' }}>
                  Download CV
                </a>
              )}
            </div>
          </div>

          {/* ── RIGHT: Avatar ── */}
          <div className="order-1 lg:order-2 flex flex-col items-center">

            {/* Floating animation wrapper */}
            <div style={{ animation:'float-up 6s ease-in-out infinite' }}>

              {/* Outer glow ring */}
              <div className="relative">
                <div className="absolute inset-0 rounded-full scale-[1.15] blur-2xl"
                  style={{ background:'radial-gradient(circle, rgba(6,182,212,0.35) 0%, rgba(59,130,246,0.2) 50%, transparent 70%)' }} />

                {/* Avatar circle */}
                <div
                  className="relative overflow-hidden rounded-full"
                  style={{
                    width: 'clamp(260px, 35vw, 340px)',
                    height: 'clamp(260px, 35vw, 340px)',
                    border: '3px solid rgba(6,182,212,0.75)',
                    animation: 'glow-pulse 4s ease-in-out infinite',
                  }}
                >
                  {/* Neural-net background */}
                  <div className="absolute inset-0"
                    style={{ background:'linear-gradient(135deg,#060d1e 0%,#0a1628 100%)' }}>
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <g stroke="rgba(6,182,212,0.25)" strokeWidth="0.5" fill="none">
                        <line x1="15" y1="25" x2="55" y2="8"/>
                        <line x1="55" y1="8"  x2="88" y2="35"/>
                        <line x1="15" y1="25" x2="45" y2="58"/>
                        <line x1="45" y1="58" x2="78" y2="78"/>
                        <line x1="78" y1="78" x2="88" y2="35"/>
                        <line x1="45" y1="58" x2="88" y2="35"/>
                        <line x1="8"  y1="68" x2="45" y2="58"/>
                        <line x1="15" y1="25" x2="8"  y2="68"/>
                        <line x1="35" y1="12" x2="55" y2="8"/>
                        <line x1="68" y1="52" x2="78" y2="78"/>
                        <line x1="35" y1="12" x2="45" y2="58"/>
                        <line x1="8"  y1="68" x2="25" y2="88"/>
                        <line x1="55" y1="8"  x2="68" y2="52"/>
                        <line x1="25" y1="88" x2="45" y2="58"/>
                      </g>
                      <g fill="rgba(6,182,212,0.9)">
                        <circle cx="15" cy="25" r="1.8"/>
                        <circle cx="55" cy="8"  r="1.8"/>
                        <circle cx="88" cy="35" r="1.8"/>
                        <circle cx="45" cy="58" r="1.8"/>
                        <circle cx="78" cy="78" r="1.8"/>
                        <circle cx="8"  cy="68" r="1.8"/>
                        <circle cx="35" cy="12" r="1.8"/>
                        <circle cx="68" cy="52" r="1.8"/>
                        <circle cx="25" cy="88" r="1.8"/>
                      </g>
                    </svg>
                  </div>

                  {/* Portrait image */}
                  {imgSrc ? (
                    <img
                      src={imgSrc}
                      alt={personal.name}
                      className="absolute inset-0 w-full h-full object-cover object-top"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center"
                      style={{ fontSize:'4.5rem', fontWeight:900, color:'#06b6d4', letterSpacing:'-0.05em' }}>
                      {personal.initials || 'MAA'}
                    </div>
                  )}
                </div>

                {/* Orbiting dots */}
                <div className="absolute w-3 h-3 rounded-full"
                  style={{ background:'#06b6d4', top:'-4px', left:'50%', transform:'translateX(-50%)', boxShadow:'0 0 8px #06b6d4' }} />
                <div className="absolute w-2 h-2 rounded-full"
                  style={{ background:'#3b82f6', bottom:'10px', right:'-4px', boxShadow:'0 0 6px #3b82f6' }} />
                <div className="absolute w-2 h-2 rounded-full"
                  style={{ background:'#8b5cf6', bottom:'10px', left:'-4px', boxShadow:'0 0 6px #8b5cf6' }} />
              </div>
            </div>

            {/* Location pill */}
            {personal.location && (
              <div className="mt-6 flex items-center gap-2 px-4 py-2 rounded-full text-sm"
                style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.12)', color:'#94a3b8' }}>
                <span className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background:'#06b6d4', boxShadow:'0 0 6px #06b6d4', animation:'glow-pulse 2s ease-in-out infinite' }} />
                {personal.location}
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
