import { education } from "../data/content";

export default function Education() {
  if (!education||education.length===0) return null;
  return (
    <section id="education" className="py-20" style={{background:'rgba(4,8,15,0.6)'}}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-white mb-3">Education</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full"/>
        </div>
        <div className="space-y-6">
          {education.map((d,i)=>(
            <div key={d.id||i} className="rounded-xl p-6 border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300"
              style={{background:'rgba(30,41,59,0.55)'}}>
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white">{d.degree}</h3>
                  {d.specialization&&<p className="text-cyan-400 font-medium text-sm mt-0.5">{d.specialization}</p>}
                  <p className="text-slate-300 text-sm mt-1">{d.institution}{d.department&&<span className="text-slate-400"> — {d.department}</span>}</p>
                  {d.location&&<p className="text-slate-500 text-xs mt-0.5">📍 {d.location}</p>}
                </div>
                <div className="flex flex-col items-start md:items-end gap-1.5 shrink-0">
                  <span className="text-xs px-3 py-1 bg-slate-700/70 text-slate-300 rounded-full">{d.period}</span>
                  {d.gpa&&<span className="text-xs px-3 py-1 bg-cyan-500/15 text-cyan-400 rounded-full border border-cyan-500/25">GPA: {d.gpa}</span>}
                </div>
              </div>
              {d.thesis&&<div className="mb-3 p-3 rounded-lg border-l-2 border-cyan-500/50" style={{background:'rgba(4,8,15,0.5)'}}><p className="text-xs text-slate-400 font-medium mb-0.5">Thesis</p><p className="text-sm text-slate-300 italic">"{d.thesis}"</p></div>}
              {d.scholarship&&<div className="mb-3"><span className="text-xs px-2 py-1 bg-amber-500/15 border border-amber-500/30 text-amber-400 rounded-full">🏆 {d.scholarship}</span></div>}
              {d.highlights&&d.highlights.length>0&&(
                <ul className="space-y-1.5">
                  {d.highlights.map((h,j)=><li key={j} className="flex items-start gap-2 text-sm text-slate-300"><span className="text-cyan-500 mt-1 text-xs shrink-0">▸</span><span>{h}</span></li>)}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
