/**
 * Publications  clean academic layout.
 * Removed: status badges, IF badges, bracket ID tags.
 * Kept: authors (MAA highlighted), title, venue, year, DOI.
 */
import { useState } from 'react';
import type { ElementType } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ChevronDown, ExternalLink, FileText, BookMarked, Microscope } from 'lucide-react';
import { publications } from '../data/content';
import SectionTitle from './ui/SectionTitle';
import AnimatedSection from './ui/AnimatedSection';

type Tab = 'published' | 'review' | 'conferences' | 'other';

const tabs: { id: Tab; label: string; icon: ElementType }[] = [
  { id: 'published',   label: 'Published Journals',  icon: BookOpen   },
  { id: 'review',      label: 'Under Review',         icon: FileText   },
  { id: 'conferences', label: 'Conference Papers',    icon: FileText   },
  { id: 'other',       label: 'Book Chapter & WIP',   icon: BookMarked },
];

function renderAuthors(raw: string) {
  const parts = raw.split('M. Asim Amin');
  if (parts.length === 1) return <span className="text-slate-400 text-xs leading-relaxed">{raw}</span>;
  return (
    <span className="text-slate-400 text-xs leading-relaxed">
      {parts[0]}
      <span className="font-semibold text-slate-200">M. Asim Amin</span>
      {parts[1]}
    </span>
  );
}

function PubEntry({
  authors, title, venue, year, vol, doi,
}: {
  authors: string; title: string; venue: string;
  year?: number; vol?: string; doi?: string;
}) {
  return (
    <div className="pub-entry hover:bg-white/[0.015]">
      <div className="flex flex-col gap-1.5">
        {/* Authors */}
        <div className="leading-relaxed">{renderAuthors(authors)}</div>

        {/* Title */}
        <p className="text-sm text-slate-100 font-medium leading-snug">{title}</p>

        {/* Venue + meta */}
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
          <span className="text-xs text-cyan-400 font-medium italic">{venue}</span>
          {vol  && <span className="text-xs text-slate-500">{vol}</span>}
          {year && <span className="text-xs text-slate-500 font-mono">{year}</span>}
          {doi  && (
            <a
              href={`https://doi.org/${doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-0.5 text-xs text-slate-500 hover:text-cyan-400 transition-colors"
              data-cursor="button"
            >
              DOI <ExternalLink className="w-2.5 h-2.5" />
            </a>
          )}
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
    : publications.selectedConferences.slice(0, 5);

  return (
    <section
      id="publications"
      className="relative py-24 overflow-hidden"
      style={{ background: 'rgba(10,22,40,0.92)' }}
    >
      <div className="section-container relative z-10">
        <div className="flex flex-col gap-10">

          {/* Header row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <SectionTitle
              eyebrow="Publications"
              title="Research Output"
              subtitle="Peer-reviewed journals, conference proceedings, and book chapters."
              accentWord="Research"
            />

            <AnimatedSection delay={0.2} className="shrink-0">
              <div className="glass-card p-4 flex gap-5">
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
            <div className="flex flex-wrap gap-1 border-b border-white/[0.06] pb-0">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-t-lg transition-all duration-200 ${
                      isActive
                        ? 'text-cyan-400 bg-white/[0.04] border border-b-0 border-white/[0.07]'
                        : 'text-slate-500 hover:text-slate-300 hover:bg-white/[0.02]'
                    }`}
                    data-cursor="button"
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
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
              transition={{ duration: 0.22 }}
            >
              {activeTab === 'published' && (
                <div className="flex flex-col gap-1.5">
                  {publications.journalsPublished.map((p, i) => (
                    <PubEntry
                      key={i}
                      authors={p.authors}
                      title={p.title}
                      venue={p.venue}
                      year={(p as any).year}
                      vol={(p as any).vol}
                      doi={(p as any).doi}
                    />
                  ))}
                </div>
              )}

              {activeTab === 'review' && (
                <div className="flex flex-col gap-1.5">
                  {publications.journalsUnderReview.map((p, i) => (
                    <PubEntry
                      key={i}
                      authors={p.authors}
                      title={p.title}
                      venue={p.venue}
                    />
                  ))}
                </div>
              )}

              {activeTab === 'conferences' && (
                <div className="flex flex-col gap-1.5">
                  {confToShow.map((p, i) => (
                    <PubEntry
                      key={i}
                      authors={p.authors}
                      title={p.title}
                      venue={`${p.venue}${(p as any).location ? `, ${(p as any).location}` : ''}`}
                      year={p.year}
                    />
                  ))}
                  {!showAllConf && publications.selectedConferences.length > 5 && (
                    <button
                      onClick={() => setShowAllConf(true)}
                      className="flex items-center gap-2 text-sm text-slate-500 hover:text-cyan-400 transition-colors mt-3 self-start"
                      data-cursor="button"
                    >
                      <ChevronDown className="w-4 h-4" />
                      Show all {publications.selectedConferences.length} selected papers
                    </button>
                  )}
                  <p className="text-xs text-slate-600 mt-3 font-mono">
                    17 total conference papers (20212025). Showing selected highlights.
                  </p>
                </div>
              )}

              {activeTab === 'other' && (
                <div className="flex flex-col gap-6">
                  <div>
                    <p className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <BookMarked className="w-3.5 h-3.5" />
                      Book Chapter
                    </p>
                    <div className="flex flex-col gap-1.5">
                      {publications.bookChapters.map((p, i) => (
                        <PubEntry
                          key={i}
                          authors={p.authors}
                          title={p.title}
                          venue={p.venue}
                          year={(p as any).year}
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Microscope className="w-3.5 h-3.5" />
                      Working Papers
                    </p>
                    <div className="flex flex-col gap-2">
                      {publications.workingPapers.map((p, i) => (
                        <div key={i} className="pub-entry border-l-2 border-indigo-500/25">
                          <p className="text-sm text-slate-200 font-medium leading-snug">{p.title}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Peer review service */}
          <AnimatedSection delay={0.2} className="mt-2">
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
                  'Machine Learning  Springer',
                  'Frontiers in Energy Research',
                ].map((v) => (
                  <span key={v} className="text-xs px-2.5 py-1 rounded border border-white/[0.07] text-slate-400 bg-white/[0.02]">
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
