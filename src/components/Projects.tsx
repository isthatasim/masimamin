import { projects } from "../data/content";

export default function Projects() {
  if (!projects || projects.length === 0) return null;

  return (
    <section id="projects" className="py-20 bg-slate-900/50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-white mb-3">Projects</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <div
              key={p.id || i}
              className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/5 hover:-translate-y-0.5 flex flex-col"
              style={{ borderTopColor: p.color || undefined, borderTopWidth: p.color ? '2px' : undefined }}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <h3 className="text-base font-bold text-white leading-snug">{p.title}</h3>
                  {p.subtitle && (
                    <p className="text-xs text-cyan-400 mt-0.5 font-medium">{p.subtitle}</p>
                  )}
                </div>
                {p.status && (
                  <span className={`text-xs px-2.5 py-1 rounded-full shrink-0 font-medium ${
                    p.status === 'Completed' || p.status === 'Published'
                      ? 'bg-green-500/15 text-green-400 border border-green-500/25'
                      : p.status === 'Ongoing' || p.status === 'In Progress'
                      ? 'bg-blue-500/15 text-blue-400 border border-blue-500/25'
                      : 'bg-slate-700 text-slate-300'
                  }`}>
                    {p.status}
                  </span>
                )}
              </div>

              {/* Problem */}
              {p.problem && (
                <div className="mb-3">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Problem</p>
                  <p className="text-sm text-slate-300 leading-relaxed">{p.problem}</p>
                </div>
              )}

              {/* Method / Approach */}
              {p.method && (
                <div className="mb-3">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Approach</p>
                  <p className="text-sm text-slate-300 leading-relaxed">{p.method}</p>
                </div>
              )}

              {/* Contribution / Outcome */}
              {p.contribution && (
                <div className="mb-4">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Outcome</p>
                  <p className="text-sm text-slate-300 leading-relaxed">{p.contribution}</p>
                </div>
              )}

              {/* Tools / Tags */}
              <div className="mt-auto">
                {p.tools && p.tools.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {p.tools.map((t, j) => (
                      <span key={j} className="text-xs px-2 py-0.5 bg-cyan-500/10 text-cyan-400 rounded border border-cyan-500/20">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
                {p.tags && p.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.map((t, j) => (
                      <span key={j} className="text-xs px-2 py-0.5 bg-slate-700/60 text-slate-400 rounded border border-slate-600/50">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
