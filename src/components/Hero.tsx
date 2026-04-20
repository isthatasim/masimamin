import { useEffect } from "react";
import { personal } from "../data/content";

const SOCIAL = [
  { label: "Scholar",      href: "https://scholar.google.com/citations?user=qq7dHikAAAAJ&hl=en", color: "#06b6d4", icon: "GS" },
  { label: "ResearchGate", href: "https://www.researchgate.net/profile/Muhammad-Asim-Amin-2",  color: "#00ccbb", icon: "RG" },
  { label: "GitHub",       href: "https://github.com/isthatasim",                               color: "#8b5cf6", icon: "GH" },
  { label: "LinkedIn",     href: "https://www.linkedin.com/in/masim40",                         color: "#3b82f6", icon: "in" },
  { label: "Email",        href: `mailto:${personal.email}`,                                   color: "#f59e0b", icon: "@"  },
];

export default function Hero() {
  useEffect(() => {
    const id = 'hero-anims';
    if (!document.getElementById(id)) {
      const s = document.createElement('style');
      s.id = id;
      s.textContent = `
        @keyframes float-hero { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes glow-ring { 0%,100%{box-shadow:0 0 30px rgba(6,182,212,.45),0 0 60px rgba(6,182,212,.18)} 50%{box-shadow:0 0 55px rgba(6,182,212,.8),0 0 90px rgba(6,182,212,.35)} }
      `;
      document.head.appendChild(s);
    }
    return () => document.getElementById('hero-anims')?.remove();
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Subtle depth glows — sit above the canvas */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-[500px] h-[500px] rounded-full" style={{background:'radial-gradient(circle,rgba(6,182,212,.07) 0%,transparent 70%)',top:'-10%',right:'5%'}}/>
        <div className="absolute w-[300px] h-[300px] rounded-full" style={{background:'radial-gradient(circle,rgba(59,130,246,.05) 0%,transparent 70%)',bottom:'15%',left:'5%'}}/>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* LEFT */}
          <div className="order-2 lg:order-1">
            <div className="flex flex-wrap gap-2 mb-6">
              {[
                {l:'PhD Researcher',      bg:'rgba(6,182,212,.12)',  bo:'rgba(6,182,212,.4)',  c:'#67e8f9'},
                {l:'University of Genova',bg:'rgba(59,130,246,.12)', bo:'rgba(59,130,246,.4)', c:'#93c5fd'},
                {l:'Horizon Europe CLOE', bg:'rgba(139,92,246,.12)', bo:'rgba(139,92,246,.4)', c:'#c4b5fd'},
              ].map(b=>(
                <span key={b.l} className="text-xs px-3 py-1 rounded-full font-medium"
                  style={{background:b.bg,border:`1px solid ${b.bo}`,color:b.c}}>{b.l}</span>
              ))}
            </div>

            <p className="text-xs font-bold tracking-[.3em] uppercase mb-2" style={{color:'#06b6d4'}}>Hello, I'm</p>
            <h1 className="font-extrabold text-white leading-[1.08] mb-4" style={{fontSize:'clamp(2.4rem,5vw,3.8rem)'}}>
              {personal.name}
            </h1>
            <p className="font-semibold mb-5" style={{fontSize:'1.2rem',color:'#22d3ee'}}>{personal.title}</p>

            {personal.summary && (
              <p className="text-sm leading-relaxed mb-7 max-w-xl" style={{color:'#94a3b8'}}>
                {personal.summary.split('\n')[0].slice(0,220)}{personal.summary.length>220?'…':''}
              </p>
            )}

            <div className="flex flex-wrap gap-2 mb-7">
              {['Reinforcement Learning','Smart Grids','Energy Communities','Federated Learning'].map(t=>(
                <span key={t} className="text-xs px-3 py-1 rounded-full"
                  style={{background:'rgba(255,255,255,.05)',border:'1px solid rgba(255,255,255,.15)',color:'#cbd5e1'}}>{t}</span>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {SOCIAL.map(s=>(
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all hover:scale-105 hover:brightness-125"
                  style={{background:s.color+'1a',border:`1px solid ${s.color}55`,color:s.color}}>
                  <span className="font-extrabold text-[11px]">{s.icon}</span>{s.label}
                </a>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <a href="#research" className="px-7 py-3 rounded-lg font-bold text-sm text-slate-900 transition-all hover:scale-105"
                style={{background:'linear-gradient(135deg,#06b6d4,#3b82f6)',boxShadow:'0 0 25px rgba(6,182,212,.35)'}}>
                View Research
              </a>
              {personal.cvUrl && (
                <a href={personal.cvUrl} target="_blank" rel="noopener noreferrer"
                  className="px-7 py-3 rounded-lg font-bold text-sm transition-all hover:scale-105"
                  style={{border:'1px solid rgba(255,255,255,.2)',color:'#e2e8f0',background:'rgba(255,255,255,.04)'}}>
                  Download CV
                </a>
              )}
            </div>
          </div>

          {/* RIGHT — Avatar */}
          <div className="order-1 lg:order-2 flex flex-col items-center">
            <div style={{animation:'float-hero 6s ease-in-out infinite'}}>
              <div className="relative">
                <div className="absolute inset-0 rounded-full scale-[1.2] blur-3xl"
                  style={{background:'radial-gradient(circle,rgba(6,182,212,.28) 0%,rgba(59,130,246,.12) 60%,transparent 80%)'}}/>
                <div className="relative overflow-hidden rounded-full"
                  style={{width:'clamp(260px,32vw,330px)',height:'clamp(260px,32vw,330px)',
                    border:'3px solid rgba(6,182,212,.75)',animation:'glow-ring 4s ease-in-out infinite'}}>
                  <div className="absolute inset-0" style={{background:'linear-gradient(135deg,#060d1e,#0a1628)'}}>
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <g stroke="rgba(6,182,212,.2)" strokeWidth="0.5" fill="none">
                        <line x1="15" y1="25" x2="55" y2="8"/>  <line x1="55" y1="8"  x2="88" y2="35"/>
                        <line x1="15" y1="25" x2="45" y2="58"/> <line x1="45" y1="58" x2="78" y2="78"/>
                        <line x1="78" y1="78" x2="88" y2="35"/> <line x1="45" y1="58" x2="88" y2="35"/>
                        <line x1="8"  y1="68" x2="45" y2="58"/> <line x1="15" y1="25" x2="8"  y2="68"/>
                        <line x1="35" y1="12" x2="55" y2="8"/>  <line x1="68" y1="52" x2="78" y2="78"/>
                        <line x1="55" y1="8"  x2="68" y2="52"/> <line x1="8"  y1="68" x2="25" y2="88"/>
                      </g>
                      <g fill="rgba(6,182,212,.85)">
                        <circle cx="15" cy="25" r="1.8"/><circle cx="55" cy="8"  r="1.8"/>
                        <circle cx="88" cy="35" r="1.8"/><circle cx="45" cy="58" r="1.8"/>
                        <circle cx="78" cy="78" r="1.8"/><circle cx="8"  cy="68" r="1.8"/>
                        <circle cx="35" cy="12" r="1.8"/><circle cx="68" cy="52" r="1.8"/>
                        <circle cx="25" cy="88" r="1.8"/>
                      </g>
                    </svg>
                  </div>
                  {personal.image ? (
                    <img src={personal.image} alt={personal.name}
                      className="absolute inset-0 w-full h-full object-cover object-top"
                      onError={(e)=>{(e.target as HTMLImageElement).style.display='none';}}/>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center"
                      style={{fontSize:'4.5rem',fontWeight:900,color:'#06b6d4'}}>
                      {personal.initials||'MAA'}
                    </div>
                  )}
                </div>
                <div className="absolute w-3 h-3 rounded-full" style={{background:'#06b6d4',top:'-4px',left:'50%',transform:'translateX(-50%)',boxShadow:'0 0 8px #06b6d4'}}/>
                <div className="absolute w-2 h-2 rounded-full" style={{background:'#3b82f6',bottom:'10px',right:'-4px',boxShadow:'0 0 6px #3b82f6'}}/>
                <div className="absolute w-2 h-2 rounded-full" style={{background:'#8b5cf6',bottom:'10px',left:'-4px',boxShadow:'0 0 6px #8b5cf6'}}/>
              </div>
            </div>
            {personal.location&&(
              <div className="mt-6 flex items-center gap-2 px-4 py-2 rounded-full text-sm"
                style={{background:'rgba(255,255,255,.05)',border:'1px solid rgba(255,255,255,.12)',color:'#94a3b8'}}>
                <span className="w-2 h-2 rounded-full flex-shrink-0 animate-pulse" style={{background:'#06b6d4',boxShadow:'0 0 6px #06b6d4'}}/>
                {personal.location}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
