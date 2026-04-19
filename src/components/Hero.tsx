import { personal } from "../data/content";

const KEYWORDS = ["Reinforcement Learning", "Smart Grids", "Energy Communities", "Federated Learning"];

interface SocialLink { label: string; href: string; color: string; icon: string; }

const SOCIAL: SocialLink[] = [
  { label: "Scholar",      href: "https://scholar.google.com/citations?user=YOURID",    color: "#06b6d4", icon: "GS" },
  { label: "ResearchGate", href: "https://www.researchgate.net/profile/YOURPROFILE",    color: "#10b981", icon: "RG" },
  { label: "GitHub",       href: "https://github.com/isthatasim",                       color: "#8b5cf6", icon: "GH" },
  { label: "LinkedIn",     href: "https://linkedin.com/in/YOURPROFILE",                 color: "#3b82f6", icon: "in" },
  { label: "Email",        href: "mailto:masim.amin@yahoo.com",                         color: "#f59e0b", icon: "@"  },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">

          {/* Left: Text */}
          <div className="space-y-6 order-2 lg:order-1">
            <div className="flex flex-wrap gap-2">
              <span className="tag tag-cyan">PhD Researcher</span>
              <span className="tag tag-blue">University of Genova</span>
              <span className="tag tag-purple">Horizon Europe CLOE</span>
            </div>
            <div>
              <p className="section-label">Hello, I'm</p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-2">
                {personal.name}
              </h1>
              <h2 className="text-xl sm:text-2xl font-medium text-cyan-400">
                AI-Driven Energy Systems Researcher
              </h2>
            </div>
            <p className="text-slate-400 text-base leading-relaxed max-w-xl">
              Applying deep reinforcement learning and federated intelligence to transform
              energy communities and smart grids.
            </p>
            <div className="flex flex-wrap gap-2">
              {KEYWORDS.map(k => (
                <span key={k} className="tag tag-cyan">{k}</span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <a href="#research" className="px-6 py-2.5 rounded-full bg-cyan-500 text-slate-950 font-semibold text-sm hover:bg-cyan-400 transition-all">
                View Research
              </a>
              <a href={personal.cvUrl} target="_blank" rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-full border border-slate-600 text-slate-300 font-medium text-sm hover:border-cyan-500/60 hover:text-cyan-400 transition-all">
                Download CV
              </a>
            </div>
          </div>

          {/* Right: Portrait + Social Links */}
          <div className="flex flex-col items-center gap-5 order-1 lg:order-2">
            <div className="relative">
              <div className="absolute inset-0 rounded-full blur-3xl bg-cyan-500/10 scale-110" />
              <div className="relative w-56 h-56 sm:w-72 sm:h-72 rounded-full overflow-hidden border-2 border-cyan-500/30 shadow-2xl shadow-cyan-500/10">
                {personal.image ? (
                  <img src={personal.image} alt={personal.name}
                    className="w-full h-full object-cover object-top"
                    onError={(e: any) => { e.target.style.display = "none"; }}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
                    <span className="text-4xl font-bold text-cyan-400">{personal.initials}</span>
                  </div>
                )}
              </div>
            </div>
            {/* Social links under portrait */}
            <div className="flex items-center gap-2 flex-wrap justify-center">
              {SOCIAL.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  title={s.label}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all hover:scale-105"
                  style={{ color: s.color, borderColor: s.color + "50", background: s.color + "12" }}
                >
                  <span className="font-mono text-xs">{s.icon}</span>
                  {s.label}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/60 border border-slate-800 text-xs text-slate-500">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse flex-shrink-0" />
              University of Genova &middot; Genoa, Italy
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}