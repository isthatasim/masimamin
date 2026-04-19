import * as content from"../data/content";

function flatten(val: any): any[] {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  if (typeof val === "object") {
    return Object.values(val).reduce((acc: any[], v: any) => {
      if (Array.isArray(v)) return acc.concat(v);
      return acc;
    }, []);
  }
  return [];
}

const raw = (content as any).projects || (content as any).portfolio || (content as any).works || [];
const projs = flatten(raw);

export default function Projects() {
  return (
    <section className="py-24 border-t border-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <p className="section-label">Work</p>
          <h2 className="section-heading">Projects</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {projs.map((p: any, i: number) => (
            <div key={i} className="card flex flex-col">
              <div className="flex items-start justify-between mb-3">
                <div className="w-9 h-9 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 text-xs font-bold">
                  P{i+1}
                </div>
                {p.github && (
                  <a href={p.github} target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-slate-300 text-xs font-mono">GH</a>
                )}
              </div>
              <h3 className="text-slate-200 font-semibold text-sm mb-2">{p.title||p.name||""}</h3>
              <p className="text-slate-500 text-xs leading-relaxed flex-1">
                {Array.isArray(p.description) ? p.description.join(" ") : (p.description||"")}
              </p>
              {(p.tech||p.tags||p.technologies||[]).length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-slate-800">
                  {(p.tech||p.tags||p.technologies||[]).slice(0,5).map((t: string) => (
                    <span key={t} className="tag tag-purple">{t}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}