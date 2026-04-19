import * as content from"../data/content";

function flatten(val: any): any[] {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  // Object with category keys like { journals:[...], conferences:[...] }
  if (typeof val === "object") {
    return Object.values(val).reduce((acc: any[], v: any) => {
      if (Array.isArray(v)) return acc.concat(v);
      return acc;
    }, []);
  }
  return [];
}

const raw = (content as any).publications || (content as any).papers || (content as any).research || [];
const pubs = flatten(raw);

export default function Publications() {
  return (
    <section className="py-24 border-t border-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
          <div>
            <p className="section-label">Academic Output</p>
            <h2 className="section-heading">Publications</h2>
            <p className="text-slate-500 text-sm mt-1">{pubs.length} peer-reviewed publications</p>
          </div>
        </div>
        <div className="space-y-3">
          {pubs.map((p: any, i: number) => (
            <div key={i} className="card hover:border-blue-500/30" style={{padding:"1rem 1.25rem"}}>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-7 h-7 rounded bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold" style={{fontSize:"0.65rem"}}>
                  {String(i+1).padStart(2,"0")}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-slate-200 font-medium text-sm leading-snug mb-1.5">
                    {p.url
                      ? <a href={p.url} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">{p.title}</a>
                      : (p.title || p.name || "")
                    }
                  </h3>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 items-center">
                    {(p.authors||p.author) && <span className="text-slate-500 text-xs">{p.authors||p.author}</span>}
                    {(p.venue||p.journal||p.booktitle) && <span className="tag tag-blue">{p.venue||p.journal||p.booktitle}</span>}
                    {p.conference && <span className="tag tag-purple">{p.conference}</span>}
                    {(p.year||p.date) && <span className="tag tag-cyan">{p.year||p.date}</span>}
                    {p.type && <span className="tag tag-green">{p.type}</span>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}