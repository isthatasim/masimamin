import * as content from"../data/content";
const exp=(content as any).experience||(content as any).experiences||(content as any).workExperience||[];
export default function Experience(){
  return(
    <section className="py-24 border-t border-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <p className="section-label">Career</p>
          <h2 className="section-heading">Experience</h2>
        </div>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-slate-800 hidden md:block"/>
          <div className="space-y-5">
            {exp.map((e:any,i:number)=>(
              <div key={i} className="relative md:pl-12">
                <div className="absolute left-2.5 top-6 w-3 h-3 rounded-full bg-cyan-500/30 border-2 border-cyan-500 hidden md:block"/>
                <div className="card hover:border-cyan-500/30">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 className="text-slate-200 font-semibold">{e.title||e.role||e.position||e.name||""}</h3>
                      <div className="text-cyan-400 text-sm">{e.organization||e.company||e.institution||""}</div>
                    </div>
                    <span className="tag tag-blue flex-shrink-0">{e.period||e.date||e.duration||e.year||""}</span>
                  </div>
                  {e.description&&<p className="text-slate-400 text-sm leading-relaxed">{Array.isArray(e.description)?e.description.join(" "):e.description}</p>}
                  {(e.highlights||e.achievements||[]).length>0&&(
                    <ul className="mt-3 space-y-1">
                      {(e.highlights||e.achievements||[]).map((h:string,j:number)=>(
                        <li key={j} className="text-slate-500 text-xs flex gap-2"><span className="text-cyan-500">·</span>{h}</li>
                      ))}
                    </ul>
                  )}
                  {(e.tags||e.skills||[]).length>0&&(
                    <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-slate-800">
                      {(e.tags||e.skills||[]).map((t:string)=><span key={t} className="tag tag-cyan">{t}</span>)}
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