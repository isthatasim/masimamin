import { education } from "../data/content";

export default function Education() {
  if (!education || education.length === 0) return null;
  return (
    <section id="education" className="py-20" style={{ background: 'rgba(4,8,15,0.65)' }}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-white mb-3">Education</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full" />
        </div>
        <div className="space-y-6">
          {education.map((d, i) => (
            <div key={d.id || i} className="rounded-xl p-6 border border-slate-700/40 hover:border-cyan-500/40 transition-all duration-300"
              style={{ background: 'rgba(30,41,59,0.55)' }}>
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white">{d.degree}</h3>
                  {d.specialization && <p className="text-cyan-400 font-semibold text-sm mt-0.5">{d.specialization}</p>}
                  <p className="text-slate-200 text-sm mt-1 font-medium">{d.institution}</p>
                  {d.department && <p className="text-slate-400 text-xs mt-0.5">{d.department}</p>}
                  {d.location && <p className="text-slate-500 text-xs mt-0.5 flex items-center gap-1"><span>📍</span>{d.location}</p>}
                </div>
                <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
                  <span className="text-xs px-3 py-1 rounded-full font-medium"
                    style={{background:'rgba(30,41,59,0.8)',border:'1px solid rgba(100,116,139,0.4)',color:'#cbd5e1'}}>{d.period}</span>
                  {d.gpa && (
                    <span className="text-xs px-3 py-1 rounded-full font-medium"
                      style={{background:'rgba(6,182,212,.15)',border:'1px solid rgba(6,182,212,.3)',color:'#67e8f9'}}>GPA: {d.gpa}</span>
                  )}
                </div>
              </div>
              {d.thesis && (
                <div className="mb-4 p-4 rounded-lg border-l-3 border-l-cyan-500"
                  style={{background:'rgba(4,8,15,0.5)',borderLeft:'3px solid rgba(6,182,212,.5)'}}>
                  <p className="text-xs text-cyan-400 font-bold uppercase tracking-wide mb-1">Thesis</p>
                  <p className="text-sm text-slate-200 italic leading-relaxed">"{d.thesis}"</p>
                </div>
              )}
              {d.scholarship && (
                <div className="mb-4">
                  <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-medium"
                    style={{background:'rgba(245,158,11,.15)',border:'1px solid rgba(245,158,11,.35)',color:'#fcd34d'}}>
                    🏆 {d.scholarship}
                  </span>
                </div>
              )}
              {d.highlights && d.highlights.length > 0 && (
                <ul className="space-y-2">
                  {d.highlights.map((h, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <span className="text-cyan-400 mt-0.5 text-xs shrink-0 font-bold">▸</span>
                      <span className="leading-relaxed">{h}</span>
                    </li>
                  ))}
                </ul>
              )}
              {d.pecReg && (
                <p className="mt-3 text-xs text-slate-500">PEC Registration: {d.pecReg}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
