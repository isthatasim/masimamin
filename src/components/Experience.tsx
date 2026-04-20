import { experience } from "../data/content";

export default function Experience() {
  if (!experience || experience.length === 0) return null;
  return (
    <section id="experience" className="py-20 bg-slate-900/50">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-white mb-3">Experience</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full" />
        </div>
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-slate-700/50 hidden md:block" />
          <div className="space-y-8">
            {experience.map((e, i) => (
              <div key={e.id || i} className="relative md:pl-16">
                <div className="absolute left-4 top-6 w-4 h-4 rounded-full border-2 border-cyan-400 bg-slate-900 hidden md:block" />
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 hover:border-cyan-500/30 transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="text-lg font-bold text-white">{e.role}</h3>
                        {e.current && <span className="text-xs px-2 py-0.5 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full">Current</span>}
                      </div>
                      <p className="text-cyan-400 font-medium text-sm">{e.org}</p>
                      {e.department && <p className="text-slate-400 text-xs mt-0.5">{e.department}</p>}
                      {e.location && <p className="text-slate-500 text-xs mt-0.5">📍 {e.location}</p>}
                    </div>
                    <div className="flex flex-col items-start md:items-end gap-1.5 shrink-0">
                      <span className="text-xs px-3 py-1 bg-slate-700 text-slate-300 rounded-full">{e.period}</span>
                      {e.type && <span className="text-xs px-3 py-1 bg-blue-500/15 text-blue-400 rounded-full border border-blue-500/25">{e.type}</span>}
                    </div>
                  </div>
                  {e.highlights && e.highlights.length > 0 && (
                    <ul className="space-y-2 mb-4">
                      {e.highlights.map((h, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-slate-300">
                          <span className="text-cyan-500 mt-1 text-xs shrink-0">▸</span><span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {e.tags && e.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {e.tags.map((t, j) => (
                        <span key={j} className="text-xs px-2 py-1 bg-slate-700/60 text-slate-400 rounded-md border border-slate-600/50">{t}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
