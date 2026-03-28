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
  cyan:   'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
  indigo: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
  emerald:'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  violet: 'text-violet-400 bg-violet-500/10 border-violet-500/20',
};

export default function About() {
  return (
    <section id="about" className="relative py-24 bg-navy-950 overflow-hidden">
      {/* Subtle gradient */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 80% 50%, rgba(129,140,248,0.04) 0%, transparent 70%)',
        }}
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
              <p className="text-slate-300 leading-relaxed text-base">
                I am a PhD candidate in Electrical Engineering at the{' '}
                <a
                  href="https://www.unige.it"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
                  data-cursor="button"
                >
                  University of Genova
                </a>
                , funded by the Marie Sklodowska-Curie Actions (MSCA) Early Stage Researcher
                fellowship under the{' '}
                <span className="text-slate-200 font-medium">CLOE Project (Horizon Europe)</span>.
                My doctoral work focuses on the thesis{' '}
                <em className="text-slate-200 not-italic font-medium">
                  "Advanced Machine Learning Enabled Modern Power System"
                </em>
                , expected for completion in June 2026.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <p className="text-slate-400 leading-relaxed text-base">
                My research sits at the intersection of advanced machine learning and modern power
                systems. I apply deep reinforcement learning, federated learning, and predictive
                analytics to real-world energy challenges — from autonomous EV charging coordination
                and energy community management to PV nowcasting and smart grid dispatch
                optimization. A central theme across my work is the translation of theory into
                operational systems: algorithms I develop are validated on real campus energy
                infrastructure and laboratory hardware-in-the-loop platforms.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <p className="text-slate-400 leading-relaxed text-base">
                With over a decade of combined academic and industry experience spanning Italy,
                China, Serbia, and Pakistan — including applied research at Tsinghua University,
                product management in the solar industry, and power grid solution engineering — I
                bring both technical depth and practical perspective to energy system challenges.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.25}>
              <div className="flex flex-wrap gap-3">
                <a
                  href={personal.scholar}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline text-xs"
                  data-cursor="button"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Google Scholar
                </a>
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline text-xs"
                  data-cursor="button"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  LinkedIn
                </a>
                <a
                  href={personal.publons}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline text-xs"
                  data-cursor="button"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Reviewer Profile
                </a>
              </div>
            </AnimatedSection>
          </div>

          {/* Right: Highlight cards */}
          <div className="flex flex-col gap-4">
            <StaggerContainer className="flex flex-col gap-4" staggerDelay={0.1}>
              {highlights.map((h) => {
                const Icon = h.icon;
                const cls = colorMap[h.color];
                return (
                  <StaggerItem key={h.label}>
                    <TiltCard glowColor={`rgba(${h.color === 'cyan' ? '6,182,212' : h.color === 'indigo' ? '129,140,248' : h.color === 'emerald' ? '16,185,129' : '139,92,246'},0.2)`}>
                      <div className="glass-card p-5 flex items-start gap-4">
                        <div className={`shrink-0 w-10 h-10 rounded-lg border flex items-center justify-center ${cls}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-1">
                            {h.label}
                          </div>
                          <div className="text-sm text-slate-200 font-medium">{h.value}</div>
                        </div>
                      </div>
                    </TiltCard>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>

            {/* Location badge */}
            <AnimatedSection delay={0.5} className="mt-2">
              <div className="glass-card p-5">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="text-slate-300 text-sm font-medium">{personal.location}</span>
                </div>
                <div className="text-xs text-slate-500 leading-relaxed">
                  Open to research collaboration, postdoctoral opportunities, and academic or
                  industry partnerships in AI-driven energy systems and smart grid technologies.
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
