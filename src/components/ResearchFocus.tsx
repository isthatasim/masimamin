import type { ElementType } from 'react';
import { Brain, Zap, Network, Sun, Grid3X3, Share2, Cpu } from 'lucide-react';
import { researchFocus } from '../data/content';
import SectionTitle from './ui/SectionTitle';
import { StaggerContainer, StaggerItem } from './ui/AnimatedSection';
import GridBackground from './ui/GridBackground';

const iconMap: Record<string, ElementType> = {
  brain:  Brain,
  zap:    Zap,
  network:Network,
  sun:    Sun,
  grid:   Grid3X3,
  share2: Share2,
  cpu:    Cpu,
};

const colorTokens: Record<string, {
  border: string; bg: string; icon: string; badge: string; glow: string;
}> = {
  cyan:    { border: 'border-cyan-500/25',    bg: 'bg-cyan-500/5',    icon: 'text-cyan-400',    badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',    glow: 'shadow-[0_0_20px_rgba(6,182,212,0.08)]' },
  indigo:  { border: 'border-indigo-500/25',  bg: 'bg-indigo-500/5',  icon: 'text-indigo-400',  badge: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',  glow: 'shadow-[0_0_20px_rgba(129,140,248,0.08)]' },
  emerald: { border: 'border-emerald-500/25', bg: 'bg-emerald-500/5', icon: 'text-emerald-400', badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', glow: 'shadow-[0_0_20px_rgba(52,211,153,0.08)]' },
  amber:   { border: 'border-amber-500/25',   bg: 'bg-amber-500/5',   icon: 'text-amber-400',   badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',   glow: 'shadow-[0_0_20px_rgba(251,191,36,0.08)]' },
  violet:  { border: 'border-violet-500/25',  bg: 'bg-violet-500/5',  icon: 'text-violet-400',  badge: 'bg-violet-500/10 text-violet-400 border-violet-500/20',  glow: 'shadow-[0_0_20px_rgba(167,139,250,0.08)]' },
  pink:    { border: 'border-pink-500/25',    bg: 'bg-pink-500/5',    icon: 'text-pink-400',    badge: 'bg-pink-500/10 text-pink-400 border-pink-500/20',    glow: 'shadow-[0_0_20px_rgba(244,114,182,0.08)]' },
  teal:    { border: 'border-teal-500/25',    bg: 'bg-teal-500/5',    icon: 'text-teal-400',    badge: 'bg-teal-500/10 text-teal-400 border-teal-500/20',    glow: 'shadow-[0_0_20px_rgba(20,184,166,0.08)]' },
};

export default function ResearchFocus() {
  return (
    <section id="research" className="relative py-24 bg-[#060e1c] overflow-hidden">
      <GridBackground />

      <div className="section-container relative z-10">
        <div className="flex flex-col gap-12">
          <SectionTitle
            eyebrow="Research Focus"
            title="Core Research Domains"
            subtitle="Spanning AI methodology, power engineering, and systems integration — with deployment-grade validation."
            accentWord="Research"
          />

          <StaggerContainer
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            staggerDelay={0.07}
          >
            {researchFocus.map((item) => {
              const Icon = iconMap[item.icon] ?? Brain;
              const c = colorTokens[item.color] ?? colorTokens['cyan'];
              return (
                <StaggerItem key={item.id}>
                  <div
                    className={`
                      relative flex flex-col h-full rounded-xl border p-5 gap-4
                      bg-slate-900/50 backdrop-blur-sm
                      transition-all duration-300 group cursor-default
                      hover:-translate-y-1 hover:border-opacity-60
                      ${c.border} ${c.glow}
                    `}
                  >
                    {/* Icon */}
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${c.bg} border ${c.border}`}>
                      <Icon className={`w-5 h-5 ${c.icon}`} />
                    </div>

                    {/* Title */}
                    <h3 className="font-display font-semibold text-sm text-slate-100 leading-snug">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-slate-400 leading-relaxed flex-1">
                      {item.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`inline-flex px-2 py-0.5 rounded text-[10px] font-mono font-medium border ${c.badge}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Hover glow overlay */}
                    <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${c.bg} pointer-events-none`} />
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
