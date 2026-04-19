import * as content from "../data/content";
type Deg={degree?:string;title?:string;name?:string;field?:string;major?:string;subject?:string;program?:string;institution?:string;university?:string;school?:string;organization?:string;period?:string;date?:string;year?:string|number;duration?:string;location?:string;country?:string;description?:string|string[];thesis?:string;dissertation?:string;gpa?:string|number;grade?:string;highlights?:string[];achievements?:string[];tags?:string[];skills?:string[];};
function getEdu():Deg[]{
  const raw=(content as any).education||(content as any).educations||(content as any).degrees||(content as any).academic||(content as any).academicBackground||[];
  if(Array.isArray(raw))return raw;
  if(typeof raw==="object")return Object.values(raw).reduce((a:Deg[],v:any)=>Array.isArray(v)?a.concat(v):a,[]);
  return[];
}
const degrees=getEdu();
const LBL=["PhD","MSc","BSc","MA","BA","MEng","BEng"];
function lbl(d:Deg,i:number){const t=(d.degree||d.title||d.name||"").toLowerCase();for(const l of LBL)if(t.includes(l.toLowerCase()))return l;return LBL[i]||"Deg";}
export default function Education(){
  if(!degrees.length)return null;
  return(
    <section className="py-24 border-t border-slate-900" id="education">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <p className="section-label">Academic Background</p>
          <h2 className="section-heading">Education</h2>
        </div>
        <div className="space-y-6">
          {degrees.map((d:Deg,i:number)=>(
            <div key={i} className="card hover:border-cyan-500/30">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex gap-4 flex-1 min-w-0">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                    <span className="text-cyan-400 font-bold text-xs font-mono">{lbl(d,i)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-slate-100 font-semibold text-base">{d.degree||d.title||d.name||""}</h3>
                    {(d.field||d.major||d.subject||d.program)&&<p className="text-cyan-400 text-sm mt-0.5">{d.field||d.major||d.subject||d.program}</p>}
                    <p className="text-slate-400 text-sm mt-1">{d.institution||d.university||d.school||d.organization||""}{(d.location||d.country)&&<span className="text-slate-600"> &middot; {d.location||d.country}</span>}</p>
                    {(d.thesis||d.dissertation)&&<p className="text-slate-500 text-xs mt-2 italic">Thesis: {d.thesis||d.dissertation}</p>}
                    {d.description&&<p className="text-slate-400 text-sm mt-2 leading-relaxed">{Array.isArray(d.description)?d.description.join(" "):d.description}</p>}
                    {(d.highlights||d.achievements||[]).length>0&&(
                      <ul className="mt-3 space-y-1">
                        {(d.highlights||d.achievements||[]).map((h:string,j:number)=>(
                          <li key={j} className="text-slate-500 text-xs flex gap-2"><span className="text-cyan-500">&middot;</span>{h}</li>
                        ))}
                      </ul>
                    )}
                    {(d.tags||d.skills||[]).length>0&&(
                      <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-slate-800">
                        {(d.tags||d.skills||[]).map((t:string)=>(<span key={t} className="tag tag-cyan">{t}</span>))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  {(d.period||d.date||d.duration||d.year)&&<span className="tag tag-blue">{d.period||d.date||d.duration||String(d.year)}</span>}
                  {(d.gpa||d.grade)&&<span className="tag tag-green">GPA: {d.gpa||d.grade}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}