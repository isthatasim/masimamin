import { useState } from 'react';
import { Mail, Linkedin, Github, Globe, BookOpen, Download, ExternalLink, Copy, Check } from 'lucide-react';
import { personal } from '../data/content';
import SectionTitle from './ui/SectionTitle';
import AnimatedSection, { StaggerContainer, StaggerItem } from './ui/AnimatedSection';
import GridBackground from './ui/GridBackground';

const contactLinks = [
  {
    icon: Mail,
    label: 'Email',
    value: personal.email,
    href: `mailto:${personal.email}`,
    color: 'cyan',
    description: 'Primary contact for collaboration enquiries',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/masimamin',
    href: personal.linkedin,
    color: 'indigo',
    description: 'Professional profile and publications',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/isthatasim',
    href: personal.github,
    color: 'slate',
    description: 'Code repositories and research implementations',
  },
  {
    icon: BookOpen,
    label: 'Google Scholar',
    value: 'Scholar Profile',
    href: personal.scholar,
    color: 'amber',
    description: 'Full publication record and citation metrics',
  },
  {
    icon: Globe,
    label: 'Personal Website',
    value: 'Google Sites Portfolio',
    href: personal.website,
    color: 'emerald',
    description: 'Research overview and project summaries',
  },
];

const colorConf: Record<string, { icon: string; border: string; bg: string }> = {
  cyan:   { icon: 'text-cyan-400',   border: 'border-cyan-500/25',   bg: 'bg-cyan-500/5 hover:bg-cyan-500/10' },
  indigo: { icon: 'text-indigo-400', border: 'border-indigo-500/25', bg: 'bg-indigo-500/5 hover:bg-indigo-500/10' },
  slate:  { icon: 'text-slate-300',  border: 'border-slate-600/40',  bg: 'bg-slate-800/50 hover:bg-slate-800/80' },
  amber:  { icon: 'text-amber-400',  border: 'border-amber-500/25',  bg: 'bg-amber-500/5 hover:bg-amber-500/10' },
  emerald:{ icon: 'text-emerald-400',border: 'border-emerald-500/25',bg: 'bg-emerald-500/5 hover:bg-emerald-500/10' },
};

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={copy}
      className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-cyan-400 transition-colors"
      title="Copy email"
    >
      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? 'Copied!' : 'Copy email'}
    </button>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="relative py-24 bg-navy-950 overflow-hidden">
      <GridBackground />

      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(6,182,212,0.06) 0%, transparent 60%)',
        }}
      />

      <div className="section-container relative z-10">
        <div className="flex flex-col gap-12">
          <SectionTitle
            eyebrow="Contact"
            title="Let's Collaborate"
            subtitle="Open to research collaborations, postdoctoral opportunities, and academic or industry partnerships in AI-driven energy systems."
            accentWord="Collaborate"
            align="center"
          />

          <div className="max-w-3xl mx-auto w-full flex flex-col gap-8">
            {/* Collaboration message */}
            <AnimatedSection delay={0.1} className="text-center">
              <div className="glass-card p-6">
                <p className="text-sm text-slate-300 leading-relaxed mb-4">
                  I am actively engaged in international research collaboration and welcome discussions
                  on topics spanning deep reinforcement learning for energy systems, federated AI,
                  EV charging optimization, energy community design, and renewable energy forecasting.
                  If you are a researcher, postdoctoral supervisor, or R&D team working in these areas,
                  I would be glad to connect.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <a href={`mailto:${personal.email}`} className="btn-primary text-sm">
                    <Mail className="w-4 h-4" />
                    Get in Touch
                  </a>
                  <a href={personal.cvUrl} download className="btn-outline text-sm">
                    <Download className="w-4 h-4" />
                    Download Full CV
                  </a>
                </div>
              </div>
            </AnimatedSection>

            {/* Contact links */}
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-3" staggerDelay={0.08}>
              {contactLinks.map((link) => {
                const Icon = link.icon;
                const c = colorConf[link.color] ?? colorConf['slate'];
                return (
                  <StaggerItem key={link.label}>
                    <a
                      href={link.href}
                      target={link.href.startsWith('mailto') ? undefined : '_blank'}
                      rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                      className={`flex items-start gap-4 p-4 rounded-xl border transition-all duration-200 group
                        ${c.border} ${c.bg}`}
                    >
                      <div className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center bg-slate-900/60 border ${c.border}`}>
                        <Icon className={`w-5 h-5 ${c.icon}`} />
                      </div>
                      <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-semibold text-slate-200 group-hover:text-slate-100">{link.label}</span>
                          <ExternalLink className="w-3 h-3 text-slate-600 group-hover:text-slate-400 transition-colors" />
                        </div>
                        <span className={`text-xs font-mono truncate ${c.icon}`}>{link.value}</span>
                        <span className="text-xs text-slate-500 leading-snug mt-0.5">{link.description}</span>
                      </div>
                    </a>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>

            {/* Email with copy */}
            <AnimatedSection delay={0.4} className="flex justify-center">
              <div className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-slate-800/40 border border-slate-700/40">
                <span className="font-mono text-sm text-slate-300">{personal.email}</span>
                <CopyEmail />
              </div>
            </AnimatedSection>

            {/* Location note */}
            <AnimatedSection delay={0.45} className="text-center">
              <p className="text-xs text-slate-600">
                Based in {personal.location} · Available for international collaboration and remote engagement
              </p>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
