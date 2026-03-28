import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Wrench, Target, Lightbulb, Tag, CheckCircle2, Clock, BookOpen } from 'lucide-react';
import { projects } from '../data/content';
import SectionTitle from './ui/SectionTitle';
import { StaggerContainer, StaggerItem } from './ui/AnimatedSection';

const colorTokens: Record<string, {
  border: string; icon: string; badge: string; statusBg: string;
}> = {
  cyan:    { border: 'border-cyan-500/30',    icon: 'text-cyan-400',    badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',    statusBg: 'bg-cyan-500/5' },
  indigo:  { border: 'border-indigo-500/30',  icon: 'text-indigo-400',  badge: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',  statusBg: 'bg-indigo-500/5' },
  amber:   { border: 'border-amber-500/30',   icon: 'text-amber-400',   badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',   statusBg: 'bg-amber-500/5' },
  emerald: { border: 'border-emerald-500/30', icon: 'text-emerald-400', badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', statusBg: 'bg-emerald-500/5' },
  teal:    { border: 'border-teal-500/30',    icon: 'text-teal-400',    badge: 'bg-teal-500/10 text-teal-400 border-teal-500/20',    statusBg: 'bg-teal-500/5' },
  violet:  { border: 'border-violet-500/30',  icon: 'text-violet-400',  badge: 'bg-violet-500/10 text-violet-400 border-violet-500/20',  statusBg: 'bg-violet-500/5' },
};

function StatusBadge({ status }: { status: string }) {
  const icon = status.includes('Ongoing')
    ? <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
    : status.includes('Review')
    ? <Clock className="w-2.5 h-2.5" />
    : status.includes('Published')
    ? <BookOpen className="w-2.5 h-2.5" />
    : <CheckCircle2 className="w-2.5 h-2.5" />;

  const colorCls = status.includes('Ongoing')
    ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/25'
    : status.includes('Review')
    ? 'bg-amber-500/10 text-amber-400 border-amber-500/25'
    : status.includes('Published')
    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25'
    : 'bg-slate-800 text-slate-400 border-slate-700';

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-mono font-medium ${colorCls}`}>
      {icon} {status}
    </span>
  );
}

export default function Projects() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section id="projects" className="relative py-24 bg-[#060e1c] overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 80%, rgba(6,182,212,0.03) 0%, transparent 70%)',
        }}
      />

      <div className="section-container relative z-10">
        <div className="flex flex-col gap-12">
          <SectionTitle
            eyebrow="Projects"
            title="Selected Research Projects"
            subtitle="Core research projects with direct deployment relevance — from campus energy communities to federated charging networks."
            accentWord="Research"
          />

          <StaggerContainer
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
            staggerDelay={0.08}
          >
            {projects.map((proj) => {
              const c = colorTokens[proj.color] ?? colorTokens['cyan'];
              const isExpanded = expandedId === proj.id;

              return (
                <StaggerItem key={proj.id}>
                  <motion.div
                    className={`glass-card flex flex-col overflow-hidden cursor-pointer h-full border ${c.border}
                      hover:-translate-y-1 transition-transform duration-200`}
                    onClick={() => setExpandedId(isExpanded ? null : proj.id)}
                    layout
                  >
                    {/* Header */}
                    <div className="p-5 flex flex-col gap-3">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-display font-semibold text-slate-100 text-sm leading-snug">
                            {proj.title}
                          </h3>
                          <p className="text-xs text-slate-500 mt-1">{proj.subtitle}</p>
                        </div>
                        <ChevronDown className={`shrink-0 w-4 h-4 text-slate-500 transition-transform duration-300 mt-0.5 ${isExpanded ? 'rotate-180' : ''}`} />
                      </div>
                      <StatusBadge status={proj.status} />

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {proj.tags.slice(0, 3).map((t) => (
                          <span key={t} className={`inline-flex px-2 py-0.5 rounded text-[10px] font-mono border ${c.badge}`}>
                            {t}
                          </span>
                        ))}
                        {proj.tags.length > 3 && (
                          <span className="text-[10px] text-slate-500 font-mono py-0.5">+{proj.tags.length - 3}</span>
                        )}
                      </div>
                    </div>

                    {/* Expandable detail */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 border-t border-slate-800/60 pt-4 flex flex-col gap-4">
                            {/* Problem */}
                            <div className="flex gap-2.5">
                              <Target className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${c.icon}`} />
                              <div>
                                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1">Problem</p>
                                <p className="text-xs text-slate-400 leading-relaxed">{proj.problem}</p>
                              </div>
                            </div>

                            {/* Method */}
                            <div className="flex gap-2.5">
                              <Lightbulb className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${c.icon}`} />
                              <div>
                                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1">Approach</p>
                                <p className="text-xs text-slate-400 leading-relaxed">{proj.method}</p>
                              </div>
                            </div>

                            {/* Tools */}
                            <div className="flex gap-2.5">
                              <Wrench className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${c.icon}`} />
                              <div>
                                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1.5">Tools</p>
                                <div className="flex flex-wrap gap-1">
                                  {proj.tools.map((t) => (
                                    <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 border border-slate-700/60 text-slate-400 font-mono">
                                      {t}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Contribution */}
                            <div className="flex gap-2.5">
                              <Tag className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${c.icon}`} />
                              <div>
                                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1">Contribution</p>
                                <p className="text-xs text-slate-300 leading-relaxed font-medium">{proj.contribution}</p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          <p className="text-xs text-slate-600 text-center mt-2">
            Click any project card to expand details.
          </p>
        </div>
      </div>
    </section>
  );
}
