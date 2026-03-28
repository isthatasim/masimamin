import { motion } from 'framer-motion';
import { ArrowRight, Download, Mail, ChevronDown } from 'lucide-react';
import { personal, stats } from '../data/content';
import GridBackground from './ui/GridBackground';

// ── Smart-Grid Network SVG ──────────────────────────────────────────────────
// 7 outer nodes (Solar, Wind, EV, Prosumer, Storage, Grid, Community)
// + 1 central AI-EMS node
// All coordinates on a 400×400 viewBox

const cx = 200; const cy = 200; const r = 155;
const nodeCount = 7;

const nodeData = [
  { label: 'Solar PV',   symbol: '☀',  color: '#fbbf24', glow: 'rgba(251,191,36,0.5)'  },
  { label: 'Wind',       symbol: '⟳',  color: '#22d3ee', glow: 'rgba(34,211,238,0.5)'  },
  { label: 'EV Fleet',   symbol: '⚡',  color: '#818cf8', glow: 'rgba(129,140,248,0.5)' },
  { label: 'Prosumer',   symbol: '🏠', color: '#34d399', glow: 'rgba(52,211,153,0.5)'  },
  { label: 'Storage',    symbol: '▣',  color: '#f472b6', glow: 'rgba(244,114,182,0.5)' },
  { label: 'Grid',       symbol: '≋',  color: '#06b6d4', glow: 'rgba(6,182,212,0.5)'   },
  { label: 'Community',  symbol: '◉',  color: '#a78bfa', glow: 'rgba(167,139,250,0.5)' },
];

// Compute positions (start at top, clockwise)
const nodes = nodeData.map((n, i) => {
  const angle = (Math.PI * 2 * i) / nodeCount - Math.PI / 2; // start top
  return { ...n, x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
});

// Which pairs get cross-connections (between adjacent outer nodes)
const crossEdges = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 0],
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
};

const itemVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] } },
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-navy-950"
    >
      <GridBackground />

      {/* Ambient glow blobs */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full bg-cyan-500/[0.04] blur-3xl" />
        <div className="absolute top-1/2 -right-60 w-[600px] h-[600px] rounded-full bg-indigo-500/[0.04] blur-3xl" />
      </div>

      <div className="section-container relative z-10 pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* ── Left Column: Text ─────────────────────────────────────── */}
          <motion.div
            className="flex flex-col gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Eyebrow badge */}
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/25 bg-cyan-500/5 text-xs font-mono text-cyan-400 tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                MSCA Early Stage Researcher · Horizon Europe CLOE Project
              </span>
            </motion.div>

            {/* Name */}
            <motion.div variants={itemVariants}>
              <h1 className="font-display font-bold leading-[1.05] text-slate-100">
                <span className="text-4xl sm:text-5xl lg:text-6xl block">Muhammad</span>
                <span className="text-4xl sm:text-5xl lg:text-6xl block">
                  Asim{' '}
                  <span className="text-gradient-cyan">Amin</span>
                </span>
              </h1>
            </motion.div>

            {/* Title */}
            <motion.div variants={itemVariants} className="flex flex-col gap-1">
              <p className="text-lg sm:text-xl text-slate-300 font-medium leading-snug">
                PhD Researcher · AI-Driven Power Systems & Smart Grids
              </p>
              <p className="text-sm text-slate-500">
                University of Genova · DITEN Department · Genoa, Italy
              </p>
            </motion.div>

            {/* Value prop */}
            <motion.p variants={itemVariants} className="text-slate-400 text-base leading-relaxed max-w-lg">
              Applying deep reinforcement learning, federated AI, and predictive analytics
              to energy communities, EV charging coordination, and smart grid optimization —
              bridging theoretical research with real-world deployment.
            </motion.p>

            {/* CTA buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
              <button
                onClick={() => document.getElementById('publications')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary"
              >
                View Research
                <ArrowRight className="w-4 h-4" />
              </button>
              <a href={personal.cvUrl} download className="btn-outline">
                <Download className="w-4 h-4" />
                Download CV
              </a>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-outline"
              >
                <Mail className="w-4 h-4" />
                Contact Me
              </button>
            </motion.div>

            {/* Stats row */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2"
            >
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="glass-card px-3 py-3 flex flex-col gap-0.5"
                >
                  <span className="font-display font-bold text-2xl text-cyan-400">
                    {s.value}
                  </span>
                  <span className="text-xs text-slate-300 font-medium leading-tight">{s.label}</span>
                  <span className="text-[10px] text-slate-500">{s.sublabel}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right Column: SVG Energy Grid Visual ──────────────────── */}
          <motion.div
            className="flex justify-center items-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <div className="relative w-[340px] h-[340px] sm:w-[400px] sm:h-[400px] animate-float">
              <EnergyGridSVG />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-xs text-slate-600 font-mono tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5 text-slate-600" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ── Energy Grid SVG Component ─────────────────────────────────────────────
function EnergyGridSVG() {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-label="Smart grid network topology visualization"
    >
      <defs>
        {/* Glow filter for nodes */}
        <filter id="glow-cyan" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="glow-center" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>

        {/* Animated gradient for center node */}
        <radialGradient id="center-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#06b6d4" stopOpacity="0.9" />
          <stop offset="60%"  stopColor="#0e7490" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#082f49" stopOpacity="0" />
        </radialGradient>

        {/* Dashed marker for flow lines */}
        <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#06b6d4" opacity="0.5" />
        </marker>
      </defs>

      {/* Outer orbit ring */}
      <circle cx={cx} cy={cy} r={r} stroke="#1e3a5f" strokeWidth="0.5" strokeDasharray="3 8" />

      {/* Inner orbit ring */}
      <circle cx={cx} cy={cy} r={r * 0.55} stroke="#1e293b" strokeWidth="0.5" strokeDasharray="2 6" />

      {/* Cross-connections (outer ring edges) */}
      {crossEdges.map(([a, b], i) => (
        <line
          key={`cross-${i}`}
          x1={nodes[a].x} y1={nodes[a].y}
          x2={nodes[b].x} y2={nodes[b].y}
          stroke="#1e3a5f"
          strokeWidth="0.8"
          strokeDasharray="3 6"
        />
      ))}

      {/* Spokes: outer node → center */}
      {nodes.map((n, i) => (
        <g key={`spoke-${i}`}>
          {/* Static spoke */}
          <line
            x1={n.x} y1={n.y}
            x2={cx}  y2={cy}
            stroke="#0c2340"
            strokeWidth="1.2"
          />
          {/* Animated flow dashes */}
          <line
            x1={n.x} y1={n.y}
            x2={cx}  y2={cy}
            stroke={n.color}
            strokeWidth="1"
            strokeOpacity="0.5"
            strokeDasharray="6 8"
            className="dash-flow"
            style={{ animationDelay: `${i * 0.18}s`, animationDuration: `${1.8 + i * 0.15}s` }}
          />
        </g>
      ))}

      {/* Center glow blob */}
      <circle cx={cx} cy={cy} r="60" fill="url(#center-grad)" opacity="0.4" />

      {/* Center pulsing rings */}
      {[40, 52, 65].map((rr, i) => (
        <circle
          key={`pulse-ring-${i}`}
          cx={cx} cy={cy} r={rr}
          stroke="#06b6d4"
          strokeWidth="0.5"
          strokeOpacity={0.15 - i * 0.04}
          fill="none"
          className="animate-pulse-slower"
          style={{ animationDelay: `${i * 0.5}s` }}
        />
      ))}

      {/* Center node */}
      <circle cx={cx} cy={cy} r="28" fill="#020f1e" stroke="#06b6d4" strokeWidth="1.5" filter="url(#glow-center)" />
      <circle cx={cx} cy={cy} r="20" fill="#041828" stroke="#06b6d4" strokeWidth="0.5" strokeOpacity="0.4" />
      <text x={cx} y={cy - 4}  textAnchor="middle" fill="#06b6d4" fontSize="8" fontFamily="JetBrains Mono, monospace" fontWeight="600">AI-EMS</text>
      <text x={cx} y={cy + 7}  textAnchor="middle" fill="#22d3ee" fontSize="6.5" fontFamily="JetBrains Mono, monospace" opacity="0.7">RL Engine</text>

      {/* Outer nodes */}
      {nodes.map((n, i) => (
        <g key={`node-${i}`} filter="url(#glow-cyan)">
          {/* Pulsing halo */}
          <circle
            cx={n.x} cy={n.y} r="20"
            fill="none"
            stroke={n.color}
            strokeWidth="0.5"
            strokeOpacity="0.2"
            className="animate-pulse-slow"
            style={{ animationDelay: `${i * 0.4}s` }}
          />
          {/* Node bg */}
          <circle cx={n.x} cy={n.y} r="14" fill="#050d1a" stroke={n.color} strokeWidth="1.2" strokeOpacity="0.8" />
          {/* Symbol */}
          <text
            x={n.x} y={n.y + 1.5}
            textAnchor="middle"
            dominantBaseline="middle"
            fill={n.color}
            fontSize="10"
            fontFamily="system-ui, sans-serif"
          >
            {n.symbol}
          </text>
          {/* Label */}
          <text
            x={n.x}
            y={n.y + (n.y > cy ? 28 : -22)}
            textAnchor="middle"
            fill="#94a3b8"
            fontSize="8"
            fontFamily="JetBrains Mono, monospace"
          >
            {n.label}
          </text>
        </g>
      ))}

      {/* Corner decoration */}
      <text x="8" y="16" fill="#1e3a5f" fontSize="7" fontFamily="JetBrains Mono, monospace">Energy Community Topology</text>
      <text x="8" y="390" fill="#1e3a5f" fontSize="7" fontFamily="JetBrains Mono, monospace">v1.0 · MSCA CLOE · UniGe</text>
    </svg>
  );
}
