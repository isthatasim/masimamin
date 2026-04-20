import { experience } from "../data/content";

export default function Experience() {
  if (!experience || experience.length === 0) return null;
  return (
    <section id="experience" className="py-20" style={{ background: 'rgba(15,23,42,0.6)' }}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-white mb-3">Experience</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full" />
        </div>
        <div className="relative">
          <div className="absolute left-6 top-2 bottom-2 w-px hidden md:block" style={{background:'linear-gradient(to bottom,transparent,rgba(6,182,212,.3) 10%,rgba(6,182,212,.3) 90%,transparent)'}}/>
          <div className="space-y-8">
            {experience.map((e, i) => (
              <div key={e.id || i} className="relative md:pl-16">
                <div className="absolute left-3.5 top-7 w-5 h-5 rounded-full flex items-center justify-center hidden md:flex"
                  style={{border:'2px solid rgba(6,182,212,.7)',background:'#04080f',boxShadow:'0 0 10px rgba(6,182,212,.3)'}}>
                  <div className="w-2 h-2 rounded-full bg-cyan-400"/>
                </div>
                <div className="rounded-xl p-6 border border-slate-700/40 hover:border-cyan-500/40 transition-all duration-300"
                  style={{ background: 'rgba(30,41,59,0.55)' }}>
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="text-base font-bold text-white">{e.role}</h3>
                        {e.current && (
                          <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                            style={{background:'rgba(16,185,129,.2)',border:'1px solid rgba(16,185,129,.4)',color:'#6ee7b7'}}>
                            ● Current
                          </span>
                        )}
                      </div>
                      <p className="text-cyan-300 font-semibold text-sm">{e.org}</p>
                      {e.department && <p className="text-slate-400 text-xs mt-0.5">{e.department}</p>}
                      {e.location && <p className="text-slate-500 text-xs mt-0.5">📍 {e.location}</p>}
                    </div>
                    <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
                      <span className="text-xs px-3 py-1 rounded-full"
                        style={{background:'rgba(30,41,59,0.8)',border:'1px solid rgba(100,116,139,0.4)',color:'#cbd5e1'}}>{e.period}</span>
                      {e.type && (
                        <span className="text-xs px-3 py-1 rounded-full"
                          style={{background:'rgba(59,130,246,.15)',border:'1px solid rgba(59,130,246,.3)',color:'#93c5fd'}}>{e.type}</span>
                      )}
                    </div>
                  </div>
                  {e.highlights && e.highlights.length > 0 && (
                    <ul className="space-y-2 mb-4">
                      {e.highlights.map((h, j) => (
                        <li key={j} className="flex items-start gap-2.5 text-sm text-slate-300">
                          <span className="text-cyan-400 mt-0.5 text-xs shrink-0 font-bold">▸</span>
                          <span className="leading-relaxed">{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {e.tags && e.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {e.tags.map((t, j) => (
                        <span key={j} className="text-xs px-2.5 py-1 rounded-md"
                          style={{background:'rgba(15,23,42,0.7)',border:'1px solid rgba(100,116,139,0.3)',color:'#94a3b8'}}>{t}</span>
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
