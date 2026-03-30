import { motion } from 'framer-motion';
import { ArrowRight, Download, Mail, ChevronDown } from 'lucide-react';
import { personal, stats } from '../data/content';
import PortraitCard from './ui/PortraitCard';
import EnergyParticles from './ui/EnergyParticles';

// ── Smart-Grid Network Diagram ─────────────────────────────────
const cx = 220; const cy = 220; const r = 165;
const nodeCount = 7;

const nodeData = [
  { label: 'Solar PV',   symbol: '☀',  color: '#fbbf24', glow: 'rgba(251,191,36,0.55)'  },
  { label: 'Wind',       symbol: '⟳',  color: '#22d3ee', glow: 'rgba(34,211,238,0.55)'  },
  { label: 'EV Fleet',   symbol: '⚡',  color: '#818cf8', glow: 'rgba(129,140,248,0.55)' },
  { label: 'Prosumer',   symbol: '⌂',  color: '#34d399', glow: 'rgba(52,211,153,0.55)'  },
  { label: 'Storage',    symbol: '▣',  color: '#f472b6', glow: 'rgba(244,114,182,0.55)' },
  { label: 'Grid',       symbol: '≋',  color: '#06b6d4', glow: 'rgba(6,182,212,0.55)'   },
  { label: 'Community',  symbol: '◉',  color: '#a78bfa', glow: 'rgba(167,139,250,0.55)' },
];

const nodes = nodeData.map((n, i) => {
  const angle = (Math.PI * 2 * i) / nodeCount - Math.PI / 2;
  return { ...n, x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
});

const crossEdges: [number, number][] = [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,0]];

// Stagger animations
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.2 } },
};
const itemVariants = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.21,0.47,0.32,0.98] as number[] } },
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: 'rgba(10,22,40,0.90)' }}
    >
      <EnergyParticles />

      {/* Radial ambient glows */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-48 -left-48 w-[800px] h-[800px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 65%)' }} />
        <div className="absolute top-1/2 -right-64 w-[700px] h-[700px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 65%)' }} />
        <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[900px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(6,182,212,0.03) 0%, transparent 65%)' }} />
      </div>

      <div className="section-container relative z-10 pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-6 items-center">

          {/* ── Left Column: Text ─────────────────────────────────── */}
          <motion.div
            className="flex flex-col gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/25 bg-cyan-500/[0.07] text-xs font-mono text-cyan-400 tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                MSCA Early Stage Researcher · Horizon Europe CLOE
              </span>
            </motion.div>

            {/* Name */}
            <motion.div variants={itemVariants} className="flex flex-col gap-0.5">
              <div className="text-sm text-slate-500 font-mono tracking-widest uppercase mb-1">
                Muhammad Asim Amin
              </div>
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-display font-bold leading-[1.08] tracking-tight">
                <span className="text-gradient-primary">AI-Driven</span>
                <br />
                <span className="text-slate-100">Power Systems</span>
                <br />
                <span className="text-gradient-cyan">Researcher</span>
              </h1>
            </motion.div>

            {/* Tagline */}
            <motion.p variants={itemVariants} className="text-slate-400 text-base leading-relaxed max-w-lg">
              PhD candidate at <span className="text-slate-200 font-medium">University of Genova</span>, applying deep reinforcement learning, federated learning, and predictive analytics to modern power systems, EV charging, and energy communities.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
              <a href="#publications" className="btn-primary" data-cursor="button">
                View Research <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#contact" className="btn-outline" data-cursor="button">
                <Mail className="w-4 h-4" /> Contact
              </a>
              {personal.cvUrl && (
                <a href={personal.cvUrl} download className="btn-outline" data-cursor="button">
                  <Download className="w-4 h-4" /> Download CV
                </a>
              )}
            </motion.div>

            {/* Stats */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="glass-card p-3 flex flex-col gap-0.5"
                  style={{ background: 'rgba(255,255,255,0.03)' }}
                >
                  <span className="font-display font-bold text-2xl text-cyan-400">{s.value}</span>
                  <span className="text-[11px] text-slate-400 leading-tight">{s.label}</span>
                  {s.sublabel && (
                    <span className="text-[10px] text-slate-600 font-mono">{s.sublabel}</span>
                  )}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right Column: Diagram + Portrait ──────────────────── */}
          <div className="relative flex flex-col items-center gap-6">

            {/* Smart-Grid Network Diagram — big and central */}
            <motion.div
              className="relative w-full"
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 0.61, 0.36, 1] as number[] }}
            >
              {/* Outer glow behind SVG */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden>
                <div
                  className="w-80 h-80 rounded-full"
                  style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.09) 0%, transparent 70%)' }}
                />
              </div>

              <svg
                viewBox="0 0 440 440"
                className="w-full max-w-[460px] mx-auto"
                aria-label="Smart-grid network diagram"
                role="img"
              >
                {/* Outer decorative rings */}
                <motion.circle
                  cx={cx} cy={cy} r={r + 26}
                  fill="none" stroke="rgba(6,182,212,0.07)" strokeWidth="1"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                  strokeDa!� '4 12'
                  style={{ transformOrigin: `${cx}px ${cy}px` }}
                />
                <motion.circle
                  cx={cx} cy={cy} r={r + 48}
                  fill="none" stroke="rgba(99,102,241,0.05)" strokeWidth="0.8"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                  strokeDa!� '2 18'
                  style={{ transformOrigin: `${cx}px ${cy}px` }}
                />

                {/* Background circle */}
                <circle cx={cx} cy={cy} r={r + 12}
                  fill="rgba(6,182,212,0.025)" stroke="rgba(6,182,212,0.08)" strokeWidth="1" />

                {/* Cross edges (outer ring connections) */}
                {crossEdges.map(([a, b], idx) => (
                  <motion.line
                    key={`edge-${idx}`}
                    x1={nodes[a].x} y1={nodes[a].y}
                    x2={nodes[b].x} y2={nodes[b].y}
                    stroke="rgba(6,182,212,0.18)" strokeWidth="1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.4, delay: 0.6 + idx * 0.08, ease: 'easeOut' }}
                  />
                ))}

                {/* Spokes to center */}
                {nodes.map((n, i) => (
                  <motion.line
                    key={`spoke-${i}`}
                    x1={n.x} y1={n.y}
                    x2={cx} y2={cy}
                    stroke={`${n.color}30`} strokeWidth="1"
                    className="dash-flow"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
                  />
                ))}

                {/* Outer nodes */}
                {nodes.map((n, i) => (
                  <motion.g
                     key={`node-${i}`}
                     initial={{ scale: 0, opacity: 0 }}
                     animate={{ scale: 1, opacity: 1 }}
                     transition={{ duration: 0.5, delay: 0.5 + i * 0.1, ease: 'backOut' }}
                     style={{ transformOrigin: `${n.x}px ${n.y}px` }}
                  >
                    {/* Pulse ring — uses scale instead of r animation for TypeScript compat */}
                    <motion.circle
                      cx={n.x} cy={n.y} r={16}
                      fill="none" stroke={n.color} strokeWidth="0.8"
                      animate={{ scale: [0.6, 1.4], opacity: [0.6, 0] }}
                      transition={{ duration: 2.5, delay: i * 0.4, repeat: Infinity, ease: 'easeOut' }}
                      style={{ transformOrigin: `${n.x}px ${n.y}px` }}
                    />
                    {/* Outer glow */}
                    <circle cx={n.x} cy={n.y} r="15"
                      fill={`${n.color}18`} stroke={`${n.color}40`} strokeWidth="1" />
                    {/* Inner fill */}
                    <circle cx={n.x} cy={n.y} r="10"
                      fill="rgba(10,22,40,0.85)" stroke={n.color} strokeWidth="1.5" />
                    {/* Symbol */}
                    <text
                      x={n.x} y={n.y + 0.5}
                      textAnchor="middle" dominantBaseline="middle"
                      fill={n.color} fontSize="8" fontFamily="system-ui"
                    >
                      {n.symbol}
                    </text>
                    {/* Label */}
                    <text
                      x={n.x} y={n.y + 26}
                      textAnchor="middle" dominantBaseline="middle"
                      fill="rgba(148,163,184,0.9)" fontSize="7.5" fontFamily="Inter, system-ui"
                      fontWeight="500"
                    >
                      {n.label}
                    </text>
                  </motion.g>
                ))}

                {/* Central AI-EMS node */}
                <motion.g
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.2, ease: 'backOut' }}
                  style={{ transformOrigin: `${cx}px ${cy}px` }}
                >
                  {/* Multi-layer glow — scale pulse instead of r animation */}
                  <motion.circle
                    cx={cx} cy={cy} r={43}
                    fill="none" stroke="rgba(6,182,212,0.12)"
                    animate={{ scale: [0.84, 1.16], opacity: [0.4, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeOut' }}
                    style={{ transformOrigin: `${cx}px ${cy}px` }}
                  />
                  <circle cx={cx} cy={cy} r="32"
                    fill="rgba(6,182,212,0.06)" stroke="rgba(6,182,212,0.25)" strokeWidth="1" />
                  <circle cx={cx} cy={cy} r="24"
                    fill="rgba(10,22,40,0.9)" stroke="rgba(6,182,212,0.5)" strokeWidth="1.5" />
                  <text x={cx} y={cy - 5}
                    textAnchor="middle" dominantBaseline="middle"
                    fill="#06b6d4" fontSize="10" fontFamily="Space Grotesk, system-ui" fontWeight="700"
                  >
                    AI-EMS
                  </text>
                  <text x={cx} y={cy + 8}
                    textAnchor="middle" dominantBaseline="middle"
                    fill="rgba(148,163,184,0.7)" fontSize="6.5" fontFamily="Inter, system-ui"
                  >
                    Deep RL
                  </text>
                </motion.g>

                {/* Data-flow labels on edges */}
                {[
                  { label: 'DRL',   x: (cx + nodes[0].x)/2 + 8,  y: (cy + nodes[0].y)/2 - 6 },
                  { label: 'Fed.',  x: (cx + nodes[2].x)/2 - 14, y: (cy + nodes[2].y)/2     },
                  { label: 'P2P',   x: (cx + nodes[4].x)/2 + 8,  y: (cy + nodes[4].y) /2 + 6 },
                ].map((lbl, i) => (
                  <text key={i} x={lbl.x} y={lbl.y}
                    textAnchor="middle"
                    fill="rgba(6,182,212,0.55)" fontSize="6" fontFamily="JetBrains Mono, monospace"
                  >
                    {lbl.label}
                  </text>
                ))}
                </svg>

                {/* Research area chips below diagram */}
                <motion.div
                  className="flex flex-wrap justify-center gap-2 mt-1"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.8 }}
                >
                  {['Deep RL', 'Federated Learning', 'EV Charging', 'PV Forecasting', 'Energy Communities'].map(t => (
                    <span key={t} className="tag-chip text-[10px]">{t}</span>
                  ))}
                </motion.div>
              </motion.div>

              {/* Portrait — smaller, below diagram on mobile; overlapping on desktop */}
              <motion.div
                className="w-full max-w-[300px] mx-auto lg:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.0 }}
              >
                <PortraitCard />
              </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-slate-600"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-[10px] font-mono tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </div>

      {/* Portrait overlaid at top-right on large screens */}
      <motion.div
        className="absolute top-24 right-0 hidden lg:block w-[260px] xl:w-[300px] pr-8 xl:pr-12 z-20"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.0, delay: 0.8 }}
      >
        <PortraitCard />
      </motion.div>
    </section>
  );
}
