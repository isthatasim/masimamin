import { publications } from '../data/content';

export default function Publications() {
  const pubs = (publications || []) as any[];
  return (
    <section className="py-24 border-t border-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
          <div>
            <p className="section-label">Academic Output</p>
            <h2 className="section-heading">Publications</h2>
            <p className="text-slate-500 text-sm mt-1">{pubs.length} peer-reviewed publications</p>
          </div>
          <a href="https://scholar.google.com" target="_blank" rel="noopener noreferrer" className="tag tag-cyan">Google Scholar</a>
        </div>
        <div className="space-y-3">
          {pubs.map((pub, i) => (
            <div key={i} className="card hover:border-blue-500/30" style={{padding:'1rem 1.25rem'}}>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-7 h-7 rounded bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold" style={{fontSize:'0.65rem'}}>
                  {String(i+1).padStart(2,'0')}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-slate-200 font-medium text-sm leading-snug mb-1.5">
                    {pub.url ? <a href={pub.url} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">{pub.title}</a> : pub.title}
                  </h3>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 items-center">
                    {pub.authors && <span className="text-slate-500 text-xs">{pub.authors}</span>}
                    {(pub.venue || pub.journal) && <span className="tag tag-blue">{pub.venue || pub.journal}</span>}
                    {pub.conference && <span className="tag tag-purple">{pub.conference}</span>}
                    {pub.year && <span className="tag tag-cyan">{pub.year}</span>}
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