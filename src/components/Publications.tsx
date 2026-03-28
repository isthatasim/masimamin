import { useState } from 'react';
import type { ElementType } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Clock, ChevronDown, ExternalLink, FileText, BookMarked, Microscope } from 'lucide-react';
import { publications } from '../data/content';
import SectionTitle from './ui/SectionTitle';
import AnimatedSection from './ui/AnimatedSection';
import GridBackground from './ui/GridBackground';

type Tab = 'published' | 'review' | 'conferences' | 'other';

const tabs: { id: Tab; label: string; icon: ElementType; count: number }[] = [
  { id: 'published',   label: 'Published Journals',  icon: BookOpen,    count: publications.journalsPublished.length },
  { id: 'review',      label: 'Under Review',         icon: Clock,       count: publications.journalsUnderReview.length },
  { id: 'conferences', label: 'Conference Papers',    icon: FileText,    count: 17 },
  { id: 'other',       label: 'Book Chapter & WIP',   icon: BookMarked,  count: publications.bookChapters.length + publications.workingPapers.length },
];

function IFBadge({ value }: { value?: number }) {
  if (!value) return null;
  return (
    <span className="shrink-0 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
      IF {value}
    </span>
  );
}

function PubEntry({
  id, authors, title, venue, year, vol, doi, status, ifVal, note
}: {
  id: string; authors: string; title: string; venue: string;
  year?: number; vol?: string; doi?: string; status?: string;
  ifVal?: number; note?: string;
}) {
  const isMyName = (a: string) => a.includes('M. Asim Amin');

  const renderAuthors = (raw: string) => {
    const parts = raw.split('M. Asim Amin');
    if (parts.length === 1) return <span className="text-slate-400 text-xs">{raw}</span>;
    return (
      <span className="text-slate-400 text-xs">
        {parts[0]}
        <span className="font-semibold text-slate-200">M. Asim Amin</span>
        {parts[1]}
      </span>
    );
  };

  return (
    <div className="pub-entry group hover:bg-slate-800/20 transition-colors duration-150 rounded-r-lg pr-3">
      <div className="flex flex-col gap-1.5">
        {/* Authors */}
        <div className="leading-snug">{renderAuthors(authors)}</div>

        {/* Title */}
        <p className="text-sm text-slate-200 font-medium leading-snug">
          {title}
        </p>

        {/* Venue + meta */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="text-xs text-cyan-400 font-medium italic">{venue}</span>
          {vol && <span className="text-xs text-slate-500">{vol}</span>}
          {year && <span className="text-xs text-slate-500 font-mono">{year}</span>}
          {doi && (
            <a
              href={`https://doi.org/${doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-0.5 text-xs text-slate-500 hover:text-cyan-400 transition-colors"
            >
              DOI <ExternalLink className="w-2.5 h-2.5" />
            </a>
          )}
        </div>

        {/* Status / IF row */}
        <div className="flex flex-wrap items-center gap-2">
          {status && (
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
              status.includes('Published')
                ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-400'
                : status.includes('Review')
                ? 'bg-amber-500/5 border-amber-500/20 text-amber-400'
                : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}>
              {status}
            </span>
          )}
          <IFBadge value={ifVal} />
          <span className="text-[10px] font-mono text-slate-600">[{id}]</span>
        </div>
      </div>
    </div>
  );
}

export default function Publications() {
  const [activeTab, setActiveTab] = useState<Tab>('published');
  const [showAllConf, setShowAllConf] = useState(false);

  const confToShow = showAllConf
    ? publications.selectedConferences
    : publications.selectedConferences.slice(0, 4);

  return (
    <section id="publications" className="relative py-24 bg-navy-950 overflow-hidden">
      <GridBackground />

      <div className="section-container relative z-10">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <SectionTitle
              eyebrow="Publications"
              title="Research Output"
              subtitle="Peer-reviewed journals, conference proceedings, book chapters, and working papers."
              accentWord="Research"
            />

            {/* Stats summary */}
            <AnimatedSection delay={0.2} className="shrink-0">
              <div className="glass-card p-4 flex gap-4">
                {[
                  { v: '6',  l: 'Published' },
                  { v: '4',  l: 'Under Review' },
                  { v: '17', l: 'Conferences' },
                  { v: '1',  l: 'Book Chapter' },
                ].map((s) => (
                  <div key={s.l} className="text-center">
                    <div className="font-display font-bold text-xl text-cyan-400">{s.v}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{s.l}</div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>

          {/* Tabs */}
          <AnimatedSection delay={0.1}>
            <div className="flex flex-wrap gap-2 border-b border-slate-800/60 pb-0">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-t-lg transition-all duration-200 ${
                      isActive
                        ? 'text-cyan-400 bg-slate-900/80 border border-b-0 border-slate-700/60'
                        : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/30'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                      isActive ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800 text-slate-500'
                    }`}>
                      {tab.count}
                    </span>
                    {isActive && (
                      <motion.div
                        className="absolute bottom-0 inset-x-0 h-px bg-cyan-500"
                        layoutId="tab-indicator"
                        transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </AnimatedSection>

          {/* Tab content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
            >
              {activeTab === 'published' && (
                <div className="flex flex-col gap-2">
                  {publications.journalsPublished.map((p) => (
                    <PubEntry
                      key={p.id} id={p.id} authors={p.authors} title={p.title}
                      venue={p.venue} year={p.year} vol={(p as any).vol} doi={(p as any).doi}
                      status={p.status} ifVal={(p as any).if} note={(p as any).note}
                    />
                  ))}
                </div>
              )}

              {activeTab === 'review' && (
                <div className="flex flex-col gap-6">
                  {/* Under Review journals */}
                  <div>
                    <p className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5" />
                      Journals Under Review — cumulative IF up to 11.9
                    </p>
                    <div className="flex flex-col gap-2">
                      {publications.journalsUnderReview.map((p) => (
                        <PubEntry
                          key={p.id} id={p.id} authors={p.authors} title={p.title}
                          venue={p.venue} status={p.status} ifVal={p.if}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Book chapter */}
                  <div>
                    <p className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <BookMarked className="w-3.5 h-3.5" />
                      Book Chapter (Under Review)
                    </p>
                    <div className="flex flex-col gap-2">
                      {publications.bookChapters.map((p) => (
                        <PubEntry
                          key={p.id} id={p.id} authors={p.authors} title={p.title}
                          venue={p.venue} year={p.year} status={p.status}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'conferences' && (
                <div className="flex flex-col gap-3">
                  <p className="text-xs text-slate-500 mb-2">
                    17 conference papers total (2021–2025). Showing selected highlights.
                  </p>
                  <div className="flex flex-col gap-2">
                    {confToShow.map((p) => (
                      <PubEntry
                        key={p.id} id={p.id}
                        authors={p.authors}
                        title={p.title}
                        venue={`${p.venue}${p.location ? `, ${p.location}` : ''}`}
                        year={p.year}
                        status="Published"
                      />
                    ))}
                  </div>
                  {!showAllConf && publications.selectedConferences.length > 4 && (
                    <button
                      onClick={() => setShowAllConf(true)}
                      className="flex items-center gap-2 text-sm text-slate-500 hover:text-cyan-400 transition-colors mt-2 self-start"
                    >
                      <ChevronDown className="w-4 h-4" />
                      Show all {publications.selectedConferences.length} selected papers
                    </button>
                  )}
                </div>
              )}

              {activeTab === 'other' && (
                <div className="flex flex-col gap-6">
                  <div>
                    <p className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <BookMarked className="w-3.5 h-3.5" />
                      Book Chapter
                    </p>
                    <div className="flex flex-col gap-2">
                      {publications.bookChapters.map((p) => (
                        <PubEntry
                          key={p.id} id={p.id} authors={p.authors} title={p.title}
                          venue={p.venue} year={p.year} status={p.status}
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Microscope className="w-3.5 h-3.5" />
                      Working Papers
                    </p>
                    <div className="flex flex-col gap-3">
                      {publications.workingPapers.map((p) => (
                        <div key={p.id} className="pub-entry">
                          <p className="text-sm text-slate-200 font-medium leading-snug">{p.title}</p>
                          <span className="text-[10px] font-mono text-slate-500 mt-1 inline-block">[{p.id}] · {p.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Peer review service */}
          <AnimatedSection delay={0.2} className="mt-4">
            <div className="glass-card p-5">
              <div className="flex items-center gap-2 mb-3">
                <Microscope className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-semibold text-slate-200">Peer Review Service</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  'CSEE Journal of Power & Energy Systems',
                  'IEEE Access',
                  'IEEE Industry Application Society',
                  'Computers & Electrical Engineering',
                  'Renewable & Sustainable Energy Reviews',
                  'Energy Reports',
                  'Machine Learning — Springer',
                  'Frontiers in Energy Research',
                ].map((v) => (
                  <span key={v} className="text-xs px-2.5 py-1 rounded border border-slate-700/60 text-slate-400 bg-slate-800/40">
                    {v}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
