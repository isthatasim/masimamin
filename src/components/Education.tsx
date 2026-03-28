import { GraduationCap, Award, MapPin } from 'lucide-react';
import { education } from '../data/content';
import SectionTitle from './ui/SectionTitle';
import { StaggerContainer, StaggerItem } from './ui/AnimatedSection';
import TiltCard from './ui/TiltCard';

const degreeColors = ['cyan', 'indigo', 'emerald'] as const;

const colorClasses = {
  cyan:    { border: 'border-cyan-500/30',   iconBg: 'bg-cyan-500/10',   icon: 'text-cyan-400',   badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',   num: 'text-cyan-400', glow: 'rgba(6,182,212,0.2)' },
  indigo:  { border: 'border-indigo-500/30', iconBg: 'bg-indigo-500/10', icon: 'text-indigo-400', badge: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20', num: 'text-indigo-400', glow: 'rgba(129,140,248,0.2)' },
  emerald: { border: 'border-emerald-500/30',iconBg: 'bg-emerald-500/10',icon: 'text-emerald-400',badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',num: 'text-emerald-400', glow: 'rgba(52,211,153,0.2)' },
};

export default function Education() {
  return (
    <section id="education" className="relative py-24 bg-navy-900 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 50% 40% at 90% 30%, rgba(52,211,153,0.03) 0%, transparent 70%)',
        }}
      />

      <div className="section-container relative z-10">
        <div className="flex flex-col gap-12">
          <SectionTitle
            eyebrow="Education"
            title="Academic Background"
            subtitle="Three degrees across three continents — from Pakistan to China to Italy."
            accentWord="Academic"
          />

          <StaggerContainer className="flex flex-col gap-5" staggerDelay={0.12}>
            {education.map((edu, idx) => {
              const colorKey = degreeColors[idx];
              const c = colorClasses[colorKey];

              return (
                <StaggerItem key={edu.id}>
                  <TiltCard glowColor={c.glow}>
                    <div className={`glass-card hover:-translate-y-0.5 transition-transform duration-200 overflow-hidden border ${c.border}`}>
                      <div className="p-6 flex gap-5">
                        {/* Icon */}
                        <div className={`shrink-0 w-12 h-12 rounded-xl ${c.iconBg} border ${c.border} flex items-center justify-center`}>
                          <GraduationCap className={`w-6 h-6 ${c.icon}`} />
                        </div>

                        {/* Content */}
                        <div className="flex flex-col gap-2 min-w-0 flex-1">
                          {/* Degree title */}
                          <div className="flex flex-wrap items-start justify-between gap-2">
                            <div>
                              <h3 className="font-display font-semibold text-slate-100 text-base sm:text-lg leading-tight">
                                {edu.degree}
                              </h3>
                              {edu.specialization && (
                                <p className={`text-sm font-medium ${c.num} mt-0.5`}>
                                  {edu.specialization}
                                </p>
                              )}
                            </div>
                            <span className="shrink-0 font-mono text-xs text-slate-500 bg-slate-800/60 px-2.5 py-1 rounded-md">
                              {edu.period}
                            </span>
                          </div>

                          {/* Institution + location */}
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                            <span className={`text-sm font-semibold ${c.num}`}>{edu.institution}</span>
                            <span className="flex items-center gap-1 text-xs text-slate-500">
                              <MapPin className="w-3 h-3" />
                              {edu.location}
                            </span>
                            {edu.gpa && (
                              <span className="text-xs text-slate-500">GPA: {edu.gpa}</span>
                            )}
                          </div>

                          {/* Department */}
                          {edu.department && (
                            <p className="text-xs text-slate-500">{edu.department}</p>
                          )}

                          {/* Scholarship badge */}
                          {edu.scholarship && (
                            <div className={`inline-flex items-center gap-1.5 self-start px-2.5 py-1 rounded-md border text-xs font-medium ${c.badge}`}>
                              <Award className="w-3 h-3 shrink-0" />
                              {edu.scholarship}
                            </div>
                          )}

                          {/* Thesis */}
                          <div className="mt-1 pt-3 border-t border-slate-800/60">
                            <p className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-1.5">
                              Thesis
                            </p>
                            <p className="text-sm text-slate-300 leading-relaxed italic">
                              "{edu.thesis}"
                            </p>
                          </div>

                          {/* Highlights */}
                          <div className="flex flex-col gap-1.5 mt-1">
                            {edu.highlights.map((h, i) => (
                              <div key={i} className="flex items-start gap-2 text-xs text-slate-400">
                                <span className={`shrink-0 mt-1.5 w-1 h-1 rounded-full ${c.iconBg.replace('bg-', 'bg-').replace('/10', '/80')}`} />
                                {h}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
