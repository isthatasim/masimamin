import { projects } from "../data/content";
export default function Projects(){
  if(!projects||projects.length===0)return null;
  return(
    <section id="projects" className="py-20" style={{background:'rgba(15,23,42,0.6)'}}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-white mb-3">Projects</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full"/>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p,i)=>(
            <div key={p.id||i} className="rounded-xl p-6 flex flex-col border border-slate-700/40 hover:border-cyan-500/40 transition-all duration-300 hover:-translate-y-1"
              style={{background:'rgba(30,41,59,0.55)',...(p.color?{borderTopColor:p.color,borderTopWidth:'2px'}:{})}}>
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <h3 className="text-base font-bold text-white leading-snug">{p.title}</h3>
                  {p.subtitle&&<p className="text-xs font-semibold mt-0.5" style={{color:'#22d3ee'}}>{p.subtitle}</p>}
                </div>
                {p.status&&(
                  <span className="text-xs px-2.5 py-1 rounded-full shrink-0 font-semibold"
                    style={
                      ['Completed','Published'].includes(p.status)?{background:'rgba(16,185,129,.15)',border:'1px solid rgba(16,185,129,.3)',color:'#6ee7b7'}
                      :['Ongoing','In Progress'].includes(p.status)?{background:'rgba(59,130,246,.15)',border:'1px solid rgba(59,130,246,.3)',color:'#93c5fd'}
                      :{background:'rgba(100,116,139,.15)',border:'1px solid rgba(100,116,139,.3)',color:'#94a3b8'}
                    }>{p.status}</span>
                )}
              </div>
              {p.problem&&<div className="mb-3"><p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Problem</p><p className="text-sm text-slate-300 leading-relaxed">{p.problem}</p></div>}
              {p.method&&<div className="mb-3"><p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Approach</p><p className="text-sm text-slate-300 leading-relaxed">{p.method}</p></div>}
              {p.contribution&&<div className="mb-4"><p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Outcome</p><p className="text-sm text-slate-300 leading-relaxed">{p.contribution}</p></div>}
              <div className="mt-auto pt-2 space-y-2">
                {p.tools&&p.tools.length>0&&<div className="flex flex-wrap gap-1.5">{p.tools.map((t,j)=><span key={j} className="text-xs px-2 py-0.5 rounded" style={{background:'rgba(6,182,212,.1)',border:'1px solid rgba(6,182,212,.25)',color:'#67e8f9'}}>{t}</span>)}</div>}
                {p.tags&&p.tags.length>0&&<div className="flex flex-wrap gap-1.5">{p.tags.map((t,j)=><span key={j} className="text-xs px-2 py-0.5 rounded" style={{background:'rgba(15,23,42,.7)',border:'1px solid rgba(100,116,139,.3)',color:'#94a3b8'}}>{t}</span>)}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
