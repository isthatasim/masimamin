import { publications } from "../data/content";

interface Pub {
  id?: string;
  authors?: string;
  title: string;
  venue?: string;
  year?: number | string;
  status?: string;
  doi?: string;
  if?: number | string;
  note?: string;
  vol?: string;
  location?: string;
}

function PubCard({ pub, index, badge, badgeColor }: {
  pub: Pub; index: number; badge?: string; badgeColor?: string;
}) {
  return (
    <div className="bg-slate-800/40 border border-slate-700/50 rounded-lg p-5 hover:border-cyan-500/30 transition-all duration-200">
      <div className="flex gap-3">
        <span className="text-cyan-400 font-bold text-sm shrink-0 mt-0.5">[{index + 1}]</span>
        <div className="flex-1 min-w-0">
          <p className="text-white font-medium text-sm leading-relaxed mb-1.5">{pub.title}</p>
          {pub.authors && <p className="text-slate-400 text-xs mb-1">{pub.authors}</p>}
          <div className="flex flex-wrap items-center gap-2">
            {pub.venue && <span className="text-slate-300 text-xs italic">{pub.venue}</span>}
            {pub.year  && <span className="text-slate-500 text-xs">({pub.year})</span>}
            {pub.vol   && <span className="text-slate-500 text-xs">{pub.vol}</span>}
            {badge && (
              <span className={`text-xs px-2 py-0.5 rounded-full ${badgeColor || 'bg-slate-700 text-slate-300'}`}>
                {badge}
              </span>
            )}
            {pub.if && (
              <span className="text-xs px-2 py-0.5 bg-purple-500/15 text-purple-400 rounded-full border border-purple-500/25">
                IF: {pub.if}
              </span>
            )}
            {pub.doi && (
              <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noopener noreferrer"
                 className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors">
                DOI ↗
              </a>
            )}
          </div>
          {pub.note && <p className="text-slate-500 text-xs mt-1 italic">{pub.note}</p>}
        </div>
      </div>
    </div>
  );
}

function PubSection({ title, pubs, badge, badgeColor }: {
  title: string; pubs: Pub[]; badge?: string; badgeColor?: string;
}) {
  if (!pubs || pubs.length === 0) return null;
  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-5">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <span className="text-xs px-2.5 py-1 bg-cyan-500/15 text-cyan-400 rounded-full border border-cyan-500/25 font-medium">
          {pubs.length}
        </span>
      </div>
      <div className="space-y-3">
        {pubs.map((pub, i) => (
          <PubCard key={pub.id || i} pub={pub} index={i} badge={badge} badgeColor={badgeColor} />
        ))}
      </div>
    </div>
  );
}

export default function Publications() {
  const journalsPublished   = publications.journalsPublished   || [];
  const journalsUnderReview = publications.journalsUnderReview || [];
  const selectedConferences = publications.selectedConferences || [];
  const workingPapers       = publications.workingPapers       || [];
  const bookChapters        = publications.bookChapters        || [];
  const totalPublished      = journalsPublished.length + bookChapters.length;

  return (
    <section id="publications" className="py-20 bg-slate-950">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-white mb-3">Publications</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full mb-5" />
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="px-4 py-2 bg-slate-800/60 border border-slate-700/50 rounded-lg">
              <div className="text-2xl font-bold text-cyan-400">{totalPublished}</div>
              <p className="text-slate-400 text-xs">Peer-Reviewed</p>
            </div>
            <div className="px-4 py-2 bg-slate-800/60 border border-slate-700/50 rounded-lg">
              <div className="text-2xl font-bold text-amber-400">{journalsUnderReview.length}</div>
              <p className="text-slate-400 text-xs">Under Review</p>
            </div>
            <div className="px-4 py-2 bg-slate-800/60 border border-slate-700/50 rounded-lg">
              <div className="text-2xl font-bold text-purple-400">{selectedConferences.length}</div>
              <p className="text-slate-400 text-xs">Conferences</p>
            </div>
            <div className="px-4 py-2 bg-slate-800/60 border border-slate-700/50 rounded-lg">
              <div className="text-2xl font-bold text-green-400">{workingPapers.length}</div>
              <p className="text-slate-400 text-xs">Working Papers</p>
            </div>
          </div>
        </div>

        <PubSection title="Journal Articles — Published"
          pubs={journalsPublished} badge="Published"
          badgeColor="bg-green-500/15 text-green-400 border border-green-500/25" />

        <PubSection title="Book Chapters"
          pubs={bookChapters} badge="Book Chapter"
          badgeColor="bg-blue-500/15 text-blue-400 border border-blue-500/25" />

        <PubSection title="Under Review / In Press"
          pubs={journalsUnderReview} badge="Under Review"
          badgeColor="bg-amber-500/15 text-amber-400 border border-amber-500/25" />

        <PubSection title="Conference Papers"
          pubs={selectedConferences} badge="Conference"
          badgeColor="bg-purple-500/15 text-purple-400 border border-purple-500/25" />

        <PubSection title="Working Papers"
          pubs={workingPapers} badge="Working Paper"
          badgeColor="bg-slate-600/50 text-slate-300 border border-slate-600/50" />
      </div>
    </section>
  );
}
