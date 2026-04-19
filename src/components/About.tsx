import { personal, stats } from "../data/content";

export default function About() {
  const paragraphs = personal.summary
    ? personal.summary.split(/\n+/).filter(Boolean)
    : [];

  return (
    <section id="about" className="py-20 bg-slate-900/50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-white mb-3">About Me</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Bio */}
          <div className="lg:col-span-2 space-y-4">
            {paragraphs.length > 0
              ? paragraphs.map((p, i) => (
                  <p key={i} className="text-slate-300 leading-relaxed text-sm">{p}</p>
                ))
              : <p className="text-slate-300 leading-relaxed text-sm">{personal.summary}</p>
            }
            <div className="flex flex-wrap gap-3 pt-2">
              {personal.scholar && (
                <a href={personal.scholar} target="_blank" rel="noopener noreferrer"
                   className="text-xs px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded-full hover:bg-cyan-500/20 transition-colors">
                  Google Scholar ↗
                </a>
              )}
              {personal.linkedin && (
                <a href={personal.linkedin} target="_blank" rel="noopener noreferrer"
                   className="text-xs px-3 py-1.5 bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-full hover:bg-blue-500/20 transition-colors">
                  LinkedIn ↗
                </a>
              )}
              {personal.publons && (
                <a href={personal.publons} target="_blank" rel="noopener noreferrer"
                   className="text-xs px-3 py-1.5 bg-green-500/10 border border-green-500/30 text-green-400 rounded-full hover:bg-green-500/20 transition-colors">
                  Web of Science ↗
                </a>
              )}
              {personal.email && (
                <a href={`mailto:${personal.email}`}
                   className="text-xs px-3 py-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-full hover:bg-amber-500/20 transition-colors">
                  Email ↗
                </a>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-4">
            {stats && stats.map((s, i) => (
              <div key={i} className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-5 text-center hover:border-cyan-500/30 transition-colors">
                <div className="text-3xl font-bold text-cyan-400 mb-1">{s.value}</div>
                <div className="text-sm font-medium text-white mb-0.5">{s.label}</div>
                {s.sublabel && <div className="text-xs text-slate-400">{s.sublabel}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
