import { projects } from "../data/content";
export default function Projects(){
  if(!projects||projects.length===0)return null;
  return(
    <section id="projects" className="py-20" style={{background:'rgba(15,23,42,0.55)'}}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-white mb-3">Projects</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full"/>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p,i)=>(
            <div key={p.id||i} className="rounded-xl p-6 flex flex-col border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/5 hover:-translate-y-0.5"
              style={{background:'rgba(30,41,59,0.55)',...(p.color?{borderTopColor:p.color,borderTopWidth:'2px'}:{})}}>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <h3 className="text-base font-bold text-white leading-snug">{p.title}</h3>
                  {p.subtitle&&<p className="text-xs text-cyan-400 mt-0.5 font-medium">{p.subtitle}</p>}
                </div>
                {p.status&&(
                  <span className={`text-xs px-2.5 py-1 rounded-full shrink-0 font-medium ${
                    ['Completed','Published'].includes(p.status)?'bg-green-500/15 text-green-400 border border-green-500/25'
                    :['Ongoing','In Progress'].includes(p.status)?'bg-blue-500/15 text-blue-400 border border-blue-500/25'
                    :'bg-slate-700/70 text-slate-300'}`}>{p.status}</span>
                )}
              </div>
              {p.problem&&<div className="mb-3"><p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Problem</p><p className="text-sm text-slate-300 leading-relaxed">{p.problem}</p></div>}
              {p.method&&<div className="mb-3"><p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Approach</p><p className="text-sm text-slate-300 leading-relaxed">{p.method}</p></div>}
              {p.contribution&&<div className="mb-4"><p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Outcome</p><p className="text-sm text-slate-300 leading-relaxed">{p.contribution}</p></div>}
              <div className="mt-auto">
                {p.tools&&p.tools.length>0&&<div className="flex flex-wrap gap-1.5 mb-2">{p.tools.map((t,j)=><span key={j} className="text-xs px-2 py-0.5 bg-cyan-500/10 text-cyan-400 rounded border border-cyan-500/20">{t}</span>)}</div>}
                {p.tags&&p.tags.length>0&&<div className="flex flex-wrap gap-1.5">{p.tags.map((t,j)=><span key={j} className="text-xs px-2 py-0.5 rounded border border-slate-600/50" style={{background:'rgba(30,41,59,0.7)',color:'#94a3b8'}}>{t}</span>)}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
