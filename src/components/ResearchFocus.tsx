import type { ElementType } from 'react';
import { Brain, Zap, Network, Sun, Grid3X3, Share2, Cpu } from 'lucide-react';
import { researchFocus } from '../data/content';
import SectionTitle from './ui/SectionTitle';
import { StaggerContainer, StaggerItem } from './ui/AnimatedSection';
import TiltCard from './ui/TiltCard';

const iconMap: Record<string, ElementType> = {
  brain: Brain, zap: Zap, network: Network, sun: Sun,
  grid: Grid3X3, share2: Share2, cpu: Cpu,
};

const colorTokens: Record<string, {
  border: string; bg: string; icon: string; badge: string; glow: string;
}> = {
  cyan:    { border:'border-cyan-500/25',    bg:'bg-cyan-500/[0.05]',    icon:'text-cyan-400',    badge:'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',    glow:'rgba(6,182,212,0.18)' },
  indigo:  { border:'border-indigo-500/25',  bg:'bg-indigo-500/[0.05]',  icon:'text-indigo-400',  badge:'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',  glow:'rgba(129,140,248,0.18)' },
  emerald: { border:'border-emerald-500/25', bg:'bg-emerald-500/[0.05]', icon:'text-emerald-400', badge:'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', glow:'rgba(52,211,153,0.18)' },
  amber:   { border:'border-amber-500/25',   bg:'bg-amber-500/[0.05]',   icon:'text-amber-400',   badge:'bg-amber-500/10 text-amber-400 border-amber-500/20',   glow:'rgba(251,191,36,0.18)' },
  violet:  { border:'border-violet-500/25',  bg:'bg-violet-500/[0.05]',  icon:'text-violet-400',  badge:'bg-violet-500/10 text-violet-400 border-violet-500/20',  glow:'rgba(167,139,250,0.18)' },
  pink:    { border:'border-pink-500/25',    bg:'bg-pink-500/[0.05]',    icon:'text-pink-400',    badge:'bg-pink-500/10 text-pink-400 border-pink-500/20',    glow:'rgba(244,114,182,0.18)' },
  teal:    { border:'border-teal-500/25',    bg:'bg-teal-500/[0.05]',    icon:'text-teal-400',    badge:'bg-teal-500/10 text-teal-400 border-teal-500/20',    glow:'rgba(20,184,166,0.18)' },
};

export default function ResearchFocus() {
  return (
    <section
      id="research"
      className="relative py-24 overflow-hidden"
      style={{ background: 'rgba(10,22,40,0.88)' }}
    >
      <div className="section-container relative z-10">
        <div className="flex flex-col gap-12">
          <SectionTitle
            eyebrow="Research Focus"
            title="Core Research Domains"
            subtitle="Spanning AI methodology, power engineering, and systems integration  with deployment-grade validation."
            accentWord="Research"
          />

          {/* Cards with fade-away hover group */}
          <StaggerContainer
            className="hover-fade-group grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            staggerDelay={0.06}
          >
            {researchFocus.map((item) => {
              const Icon = iconMap[item.icon] ?? Brain;
              const c = colorTokens[item.color] ?? colorTokens['cyan'];

              return (
                <StaggerItem key={item.id}>
                  <TiltCard glowColor={c.glow} maxTilt={5}>
                    <div className={`hover-fade glass-card flex flex-col gap-3.5 p-5 h-full border ${c.border}`}>
                      {/* Icon */}
                      <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${c.bg} ${c.border}`}>
                        <Icon className={`w-5 h-5 ${c.icon}`} />
                      </div>

                      {/* Title + description */}
                      <div className="flex flex-col gap-2 flex-1">
                        <h3 className="text-sm font-semibold text-slate-100 leading-snug">{item.title}</h3>
                        <p className="text-xs text-slate-400 leading-[1.7] flex-1">{item.description}</p>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {item.tags.map((tag) => (
                          <span key={tag} className={`text-[10px] px-2 py-0.5 rounded border font-mono ${c.badge}`}>
                            {tag}
                          </span>
                        ))}
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
