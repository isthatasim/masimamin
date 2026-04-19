import * as content from "../data/content";
type Pub={title?:string;name?:string;authors?:string;author?:string;venue?:string;journal?:string;booktitle?:string;conference?:string;year?:string|number;date?:string;url?:string;doi?:string;type?:string;status?:string;note?:string;abstract?:string;};
type Buckets={journals:Pub[];conferences:Pub[];ongoing:Pub[];other:Pub[]};
function getPubs():Buckets{
  const out:Buckets={journals:[],conferences:[],ongoing:[],other:[]};
  const raw=(content as any).publications||(content as any).publication||(content as any).papers||(content as any).research||(content as any).academicWork||null;
  if(!raw)return out;
  if(!Array.isArray(raw)&&typeof raw==="object"){
    const r=raw as Record<string,any>;
    out.journals=Array.isArray(r.journals)?r.journals:Array.isArray(r.journal)?r.journal:[];
    out.conferences=Array.isArray(r.conferences)?r.conferences:Array.isArray(r.conference)?r.conference:[];
    out.ongoing=Array.isArray(r.ongoing)?r.ongoing:Array.isArray(r.underReview)?r.underReview:Array.isArray(r.preprints)?r.preprints:Array.isArray(r.inProgress)?r.inProgress:[];
    out.other=Array.isArray(r.other)?r.other:Array.isArray(r.books)?r.books:[];
    return out;
  }
  if(Array.isArray(raw)){
    (raw as Pub[]).forEach(p=>{
      const t=((p.type||p.status||"")as string).toLowerCase();
      if(t.includes("journal")) out.journals.push(p);
      else if(t.includes("conference")||t.includes("workshop")) out.conferences.push(p);
      else if(t.includes("ongoing")||t.includes("review")||t.includes("preprint")||t.includes("submit")) out.ongoing.push(p);
      else if(p.journal||(p.venue&&!p.conference)) out.journals.push(p);
      else if(p.conference||p.booktitle) out.conferences.push(p);
      else out.other.push(p);
    });
  }
  return out;
}
const cats=getPubs();
const total=cats.journals.length+cats.conferences.length+cats.ongoing.length+cats.other.length;
function PubCard({pub,idx}:{pub:Pub;idx:number}){
  const href=pub.url||(pub.doi?"https://doi.org/"+pub.doi:undefined);
  return(
    <div className="card hover:border-blue-500/30" style={{padding:"1rem 1.25rem"}}>
      <div className="flex gap-3">
        <div className="flex-shrink-0 w-7 h-7 rounded bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold" style={{fontSize:"0.65rem"}}>
          {String(idx+1).padStart(2,"0")}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-slate-200 font-medium text-sm leading-snug mb-1.5">
            {href?<a href={href} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400">{pub.title||pub.name}</a>:(pub.title||pub.name)}
          </h3>
          {pub.abstract&&<p className="text-slate-500 text-xs mb-1.5 line-clamp-2">{pub.abstract}</p>}
          <div className="flex flex-wrap gap-x-3 gap-y-1 items-center">
            {(pub.authors||pub.author)&&<span className="text-slate-500 text-xs">{pub.authors||pub.author}</span>}
            {(pub.venue||pub.journal||pub.booktitle)&&<span className="tag tag-blue">{pub.venue||pub.journal||pub.booktitle}</span>}
            {pub.conference&&<span className="tag tag-purple">{pub.conference}</span>}
            {(pub.year||pub.date)&&<span className="tag tag-cyan">{String(pub.year||pub.date)}</span>}
            {pub.note&&<span className="tag tag-amber">{pub.note}</span>}
            {pub.status&&<span className="tag tag-green">{pub.status}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
interface CatProps{title:string;color:string;badge:string;pubs:Pub[];}
function CatSection({title,color,badge,pubs}:CatProps){
  if(!pubs.length)return null;
  return(
    <div className="mb-10">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
          style={{background:color+"18",border:"1px solid "+color+"45",color}}>
          {badge}
        </div>
        <h3 className="text-slate-200 font-semibold text-sm">{title}</h3>
        <span className="tag tag-cyan">{pubs.length}</span>
        <div className="flex-1 h-px bg-slate-800 ml-1"/>
      </div>
      <div className="space-y-2">
        {pubs.map((p,i)=><PubCard key={i} pub={p} idx={i}/>)}
      </div>
    </div>
  );
}
export default function Publications(){
  return(
    <section className="py-24 border-t border-slate-900" id="publications">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
          <div>
            <p className="section-label">Academic Output</p>
            <h2 className="section-heading">Publications</h2>
            <p className="text-slate-500 text-sm mt-1">{total} peer-reviewed publications</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <a href="https://scholar.google.com/citations?user=YOURID" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 tag tag-cyan"><span className="font-mono text-xs">GS</span> Google Scholar</a>
            <a href="https://www.researchgate.net/profile/YOURPROFILE" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 tag tag-green"><span className="font-mono text-xs">RG</span> ResearchGate</a>
          </div>
        </div>
        <CatSection title="Journal Articles" color="#3b82f6" badge="J" pubs={cats.journals}/>
        <CatSection title="Conference Papers" color="#8b5cf6" badge="C" pubs={cats.conferences}/>
        <CatSection title="Ongoing / Under Review" color="#f59e0b" badge="~" pubs={cats.ongoing}/>
        <CatSection title="Other Publications" color="#10b981" badge="+" pubs={cats.other}/>
        {total===0&&<p className="text-slate-600 text-sm text-center py-12">No publications found — check content.ts key names.</p>}
      </div>
    </section>
  );
}