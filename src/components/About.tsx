import { motion } from 'framer-motion';
import { MapPin, GraduationCap, BookOpen, FlaskConical, Users, ExternalLink } from 'lucide-react';
import { personal } from '../data/content';
import SectionTitle from './ui/SectionTitle';
import AnimatedSection, { StaggerContainer, StaggerItem } from './ui/AnimatedSection';
import TiltCard from './ui/TiltCard';

const highlights = [
  {
    icon: GraduationCap,
    label: 'MSCA Fellowship',
    value: 'Horizon Europe CLOE Project',
    color: 'cyan',
  },
  {
    icon: BookOpen,
    label: 'Research Output',
    value: '6 Journals · 17 Conferences · 1 Book Chapter',
    color: 'indigo',
  },
  {
    icon: FlaskConical,
    label: 'PhD Thesis',
    value: 'Advanced ML Enabled Modern Power System',
    color: 'emerald',
  },
  {
    icon: Users,
    label: 'International Footprint',
    value: 'Italy · China · Serbia · Pakistan',
    color: 'violet',
  },
];

const colorMap: Record<string, string> = {
  cyan:    'text-cyan-400   bg-cyan-500/10   border-cyan-500/25',
  indigo:  'text-indigo-400 bg-indigo-500/10 border-indigo-500/25',
  emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25',
  violet:  'text-violet-400 bg-violet-500/10 border-violet-500/25',
};

export default function About() {
  return (
    <section
      id="about"
      className="relative py-24 overflow-hidden"
      style={{ background: 'rgba(11,21,37,0.90)' }}
    >
      {/* Subtle radial gradient accent */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 55% 40% at 80% 50%, rgba(129,140,248,0.04) 0%, transparent 70%)' }}
      />

      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left: Text */}
          <div className="flex flex-col gap-8">
            <SectionTitle
              eyebrow="About"
              title="Where AI Meets the Power Grid"
              accentWord="AI"
            />

            <AnimatedSection delay={0.1}>
              <p className="text-slate-300 leading-[1.85] text-base">
                I am a PhD candidate in Electrical Engineering at the{' '}
                <a href="https://www.unige.it" target="_blank" rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 transition-colors" data-cursor="button">
                  University of Genova
                </a>
                , funded by the Marie Sklodowska-Curie Actions (MSCA) Early Stage Researcher
                fellowship under the{' '}
                <span className="text-slate-100 font-medium">CLOE Project (Horizon Europe)</span>.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.18}>
              <p className="text-slate-400 leading-[1.85] text-base">
                My doctoral work focuses on{' '}
                <span className="text-slate-200 font-medium">Advanced Machine Learning Enabled Modern Power Systems</span>.
                I design and deploy deep reinforcement learning algorithms for autonomous energy management,
                EV charging coordination, and peer-to-peer energy trading within renewable energy communities.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.24}>
              <p className="text-slate-400 leading-[1.85] text-base">
                With over a decade of combined academic and industry experience spanning{' '}
                <span className="text-slate-300">Italy, China, Serbia, and Pakistan</span>,
                I bridge rigorous theoretical work with real-world engineering ÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ from
                hardware-in-the-loop lab validation to deployed energy community platforms.
                Expected PhD graduation: <span className="text-slate-200 font-medium">June 2026</span>.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="flex flex-wrap gap-2 pt-1">
                {[
                  'Deep Reinforcement Learning',
                  'Federated Learning',
                  'EV Charging Optimization',
                  'Smart Grid Control',
                  'Energy Forecasting',
                  'Digital Twin / HIL',
                ].map((t) => (
                  <span key={t} className="tag-chip">{t}</span>
                ))}
              </div>
            </AnimatedSection>

            {/* Location */}
            <AnimatedSection delay={0.35}>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <MapPin className="w-4 h-4 text-cyan-400/70" />
                <span>{personal.location} · <a href={personal.linkedin} target="_blank"
                  rel="noopener noreferrer" className="text-cyan-400/80 hover:text-cyan-400 transition-colors" data-cursor="button">
                  LinkedIn <ExternalLink className="inline w-3 h-3" />
                </a></span>
              </div>
            </AnimatedSection>
          </div>

          {/* Right: Highlight cards with fade-away group */}
          <div className="flex flex-col gap-4">
            <StaggerContainer className="hover-fade-group grid grid-cols-1 sm:grid-cols-2 gap-4" staggerDelay={0.1}>
              {highlights.map((h) => {
                const Icon = h.icon;
                const c = colorMap[h.color];
                return (
                  <StaggerItem key={h.label}>
                    <TiltCard glowColor={`rgba(6,182,212,0.18)`}>
                      <div className={`hover-fade glass-card p-5 flex flex-col gap-3 h-full`}>
                        <div className={`w-9 h-9 rounded-lg border flex items-center justify-center ${c}`}>
                          <Icon className="w-4.5 h-4.5" />
                        </div>
                        <div>
                          <p className="text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-1">{h.label}</p>
                          <p className="text-sm text-slate-200 font-medium leading-snug">{h.value}</p>
                        </div>
                      </div>
                    </TiltCard>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>

            {/* PhD thesis box */}
            <AnimatedSection delay={0.45}>
              <div className="glass-card p-5 border-l-2 border-cyan-500/40">
                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-2">PhD Thesis</p>
                <p className="text-sm text-slate-200 font-medium leading-snug italic">
                  "Advanced Machine Learning Enabled Modern Power System"
                </p>
                <p className="text-xs text-slate-500 mt-2">University of Genova · DITEN Dept. · Expected Jun 2026</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
