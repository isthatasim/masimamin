import { personal } from "../data/content";

interface SocialLink { label: string; href: string; color: string; icon: string; }

const SOCIAL: SocialLink[] = [
  { label: "Scholar",  href: "https://scholar.google.com/citations?user=qq7dHikAAAAJ&hl=en", color: "#06b6d4", icon: "GS" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/masim40",                           color: "#3b82f6", icon: "in" },
  { label: "GitHub",   href: "https://github.com/isthatasim",                                color: "#8b5cf6", icon: "GH" },
  { label: "Publons",  href: "https://www.webofscience.com/wos/author/record/AAF-2199-2021",  color: "#10b981", icon: "WS" },
  { label: "Email",    href: "mailto:masim.amin@yahoo.com",                                     color: "#f59e0b", icon: "@"  },
];

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Avatar */}
        <div className="mb-6 flex justify-center">
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white text-3xl font-bold shadow-2xl border-4 border-cyan-400/30">
            {personal.initials || "MAA"}
          </div>
        </div>

        {/* Name & title */}
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3 tracking-tight">
          {personal.name}
        </h1>
        <p className="text-lg sm:text-xl text-cyan-400 font-medium mb-2">
          {personal.title}
        </p>
        <p className="text-sm text-slate-400 mb-8 flex items-center justify-center gap-2">
          <span>📍</span> {personal.location}
        </p>

        {/* Social links */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {SOCIAL.map(s => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white transition-all duration-200 hover:scale-105 hover:shadow-lg"
              style={{ backgroundColor: s.color + '22', border: `1px solid ${s.color}55`, color: s.color }}
            >
              <span className="font-bold text-xs">{s.icon}</span>
              {s.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="#research"
            className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/25"
          >
            View Research
          </a>
          <a
            href="#contact"
            className="px-6 py-3 border border-cyan-500/50 hover:border-cyan-400 text-cyan-400 hover:text-cyan-300 font-semibold rounded-lg transition-all duration-200"
          >
            Get in Touch
          </a>
          {personal.cvUrl && (
            <a
              href={personal.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white font-semibold rounded-lg transition-all duration-200"
            >
              Download CV
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
