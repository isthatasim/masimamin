import { publications } from "../data/content";
interface Pub{id?:string;authors?:string;title:string;venue?:string;year?:number|string;doi?:string;if?:number|string;note?:string;vol?:string;location?:string;}
function PubCard({pub,index,badge,bc}:{pub:Pub;index:number;badge?:string;bc?:string}){
  return(
    <div className="rounded-lg p-5 border border-slate-700/40 hover:border-cyan-500/35 transition-all duration-200" style={{background:'rgba(30,41,59,0.5)'}}>
      <div className="flex gap-3">
        <span className="font-bold text-sm shrink-0 mt-0.5" style={{color:'#06b6d4'}}>[{index+1}]</span>
        <div className="flex-1 min-w-0">
          <p className="text-white font-medium text-sm leading-relaxed mb-2">{pub.title}</p>
          {pub.authors&&<p className="text-slate-400 text-xs mb-2 leading-relaxed">{pub.authors}</p>}
          <div className="flex flex-wrap items-center gap-2">
            {pub.venue&&<span className="text-slate-300 text-xs italic">{pub.venue}</span>}
            {pub.year&&<span className="text-slate-500 text-xs">({pub.year})</span>}
            {pub.vol&&<span className="text-slate-500 text-xs">{pub.vol}</span>}
            {pub.location&&<span className="text-slate-500 text-xs">{pub.location}</span>}
            {badge&&<span className={`text-xs px-2 py-0.5 rounded-full ${bc||'bg-slate-700 text-slate-300'}`}>{badge}</span>}
            {pub.if&&<span className="text-xs px-2 py-0.5 rounded-full" style={{background:'rgba(139,92,246,.15)',border:'1px solid rgba(139,92,246,.3)',color:'#c4b5fd'}}>IF: {pub.if}</span>}
            {pub.doi&&<a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noopener noreferrer" className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors">DOI ↗</a>}
          </div>
          {pub.note&&<p className="text-slate-500 text-xs mt-2 italic">{pub.note}</p>}
        </div>
      </div>
    </div>
  );
}
function Sec({title,pubs,badge,bc}:{title:string;pubs:Pub[];badge?:string;bc?:string}){
  if(!pubs||pubs.length===0)return null;
  return(
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-5">
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <span className="text-xs px-3 py-1 rounded-full font-bold" style={{background:'rgba(6,182,212,.15)',border:'1px solid rgba(6,182,212,.3)',color:'#06b6d4'}}>{pubs.length}</span>
      </div>
      <div className="space-y-3">{pubs.map((p,i)=><PubCard key={p.id||i} pub={p} index={i} badge={badge} bc={bc}/>)}</div>
    </div>
  );
}
export default function Publications(){
  const jp=publications.journalsPublished||[];
  const jr=publications.journalsUnderReview||[];
  const sc=publications.selectedConferences||[];
  const wp=publications.workingPapers||[];
  const bc=publications.bookChapters||[];
  return(
    <section id="publications" className="py-20" style={{background:'rgba(4,8,15,0.68)'}}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-white mb-3">Publications</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full mb-6"/>
          <div className="flex flex-wrap justify-center gap-4">
            {[{n:jp.length+bc.length,l:'Peer-Reviewed',c:'#06b6d4'},{n:jr.length,l:'Under Review',c:'#f59e0b'},{n:sc.length,l:'Conferences',c:'#a855f7'},{n:wp.length,l:'Working Papers',c:'#10b981'}].map(s=>(
              <div key={s.l} className="px-5 py-3 rounded-xl border border-slate-700/40" style={{background:'rgba(30,41,59,0.6)'}}>
                <div className="text-2xl font-extrabold mb-0.5" style={{color:s.c}}>{s.n}</div>
                <p className="text-slate-400 text-xs">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
        <Sec title="Journal Articles — Published"  pubs={jp} badge="Published"    bc="text-xs px-2 py-0.5 rounded-full bg-green-500/15 text-green-300 border border-green-500/25"/>
        <Sec title="Book Chapters"                 pubs={bc} badge="Book Chapter"  bc="text-xs px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/25"/>
        <Sec title="Under Review / In Press"       pubs={jr} badge="Under Review"  bc="text-xs px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/25"/>
        <Sec title="Conference Papers"             pubs={sc} badge="Conference"    bc="text-xs px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/25"/>
        <Sec title="Working Papers"                pubs={wp} badge="Working Paper" bc="text-xs px-2 py-0.5 rounded-full bg-slate-600/50 text-slate-300 border border-slate-600/50"/>
      </div>
    </section>
  );
}
