import { useState } from 'react';
import type { ElementType } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ChevronDown, Briefcase, FlaskConical } from 'lucide-react';
import { experience } from '../data/content';
import SectionTitle from './ui/SectionTitle';
import AnimatedSection, { StaggerContainer, StaggerItem } from './ui/AnimatedSection';

const typeConfig: Record<string, { icon: ElementType; color: string; label: string }> = {
  'Academic Research': { icon: FlaskConical, color: 'text-cyan-400',   label: 'Academic Research' },
  'Visiting Research': { icon: FlaskConical, color: 'text-indigo-400', label: 'Visiting Research' },
  'Industry':          { icon: Briefcase,    color: 'text-amber-400',  label: 'Industry' },
};

export default function Experience() {
  const [expandedId, setExpandedId] = useState<string | null>('unige-phd');

  return (
    <section id="experience" className="relative py-24 bg-navy-950 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 50% 60% at 10% 50%, rgba(6,182,212,0.03) 0%, transparent 70%)',
        }}
      />

      <div className="section-container relative z-10">
        <div className="flex flex-col gap-12">
          <SectionTitle
            eyebrow="Career"
            title="Experience Timeline"
            subtitle="A decade of academic research and industry work across four countries."
            accentWord="Experience"
          />

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 sm:left-5 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/40 via-slate-700/40 to-transparent" />

            <StaggerContainer className="flex flex-col gap-3" staggerDelay={0.1}>
              {experience.map((exp) => {
                const tc = typeConfig[exp.type] ?? typeConfig['Industry'];
                const TypeIcon = tc.icon;
                const isExpanded = expandedId === exp.id;
                const isCurrent = exp.current;

                return (
                  <StaggerItem key={exp.id}>
                    <div className="relative pl-12 sm:pl-14">
                      {/* Timeline dot */}
                      <div
                        className={`absolute left-1.5 sm:left-2 top-4 w-5 h-5 rounded-full flex items-center justify-center
                          ${isCurrent
                            ? 'bg-cyan-500 shadow-glow-cyan'
                            : 'bg-navy-950 border-2 border-slate-600'
                          }`}
                      >
                        {isCurrent && (
                          <span className="w-2 h-2 rounded-full bg-navy-950" />
                        )}
                      </div>

                      {/* Pulsing ring for current */}
                      {isCurrent && (
                        <motion.div
                          className="absolute left-1.5 sm:left-2 top-4 w-5 h-5 rounded-full border border-cyan-500/40"
                          animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
                        />
                      )}

                      {/* Card */}
                      <div
                        className={`glass-card overflow-hidden transition-all duration-200
                          ${isCurrent ? 'border-cyan-500/30' : ''}
                          ${isExpanded ? 'border-slate-600/60' : ''}
                        `}
                      >
                        {/* Header row — always visible */}
                        <button
                          className="w-full text-left p-5 flex items-start justify-between gap-3 group"
                          onClick={() => setExpandedId(isExpanded ? null : exp.id)}
                          aria-expanded={isExpanded}
                        >
                          <div className="flex flex-col gap-1.5 min-w-0">
                            {/* Role + type badge */}
                            <div className="flex items-center flex-wrap gap-2">
                              <span className="font-display font-semibold text-slate-100 text-sm sm:text-base leading-tight">
                                {exp.role}
                              </span>
                              {isCurrent && (
                                <span className="shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[10px] font-mono text-cyan-400">
                                  <span className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse" />
                                  Current
                                </span>
                              )}
                            </div>

                            {/* Org + location + period */}
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                              <span className="text-sm font-medium text-cyan-400">{exp.org}</span>
                              {exp.department && (
                                <span className="text-xs text-slate-500">{exp.department}</span>
                              )}
                            </div>
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                              <span className="flex items-center gap-1 text-xs text-slate-500">
                                <MapPin className="w-3 h-3" />
                                {exp.location}
                              </span>
                              <span className="text-xs text-slate-500 font-mono">{exp.period}</span>
                              <span className={`flex items-center gap-1 text-xs ${tc.color}`}>
                                <TypeIcon className="w-3 h-3" />
                                {tc.label}
                              </span>
                            </div>
                          </div>

                          <ChevronDown
                            className={`shrink-0 w-5 h-5 text-slate-500 group-hover:text-slate-300 transition-all duration-300 mt-1 ${isExpanded ? 'rotate-180' : ''}`}
                          />
                        </button>

                        {/* Expanded content */}
                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: 'easeInOut' }}
                              className="overflow-hidden"
                            >
                              <div className="px-5 pb-5 border-t border-slate-800/60">
                                <ul className="mt-4 flex flex-col gap-2.5">
                                  {exp.highlights.map((h, i) => (
                                    <li key={i} className="flex items-start gap-2.5 text-xs text-slate-400 leading-relaxed">
                                      <span className="shrink-0 mt-1.5 w-1 h-1 rounded-full bg-cyan-500/60" />
                                      {h}
                                    </li>
                                  ))}
                                </ul>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-slate-800/40">
                                  {exp.tags.map((tag) => (
                                    <span key={tag} className="tag-chip">{tag}</span>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
