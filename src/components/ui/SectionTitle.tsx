import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  accentWord?: string; // word in title to highlight with gradient
}

export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  accentWord,
}: SectionTitleProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px 0px' });
  const alignClass = align === 'center' ? 'items-center text-center' : 'items-start';

  // Highlight accent word in title
  const renderTitle = () => {
    if (!accentWord) return title;
    const parts = title.split(accentWord);
    return (
      <>
        {parts[0]}
        <span className="text-gradient-cyan">{accentWord}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <motion.div
      ref={ref}
      className={`flex flex-col gap-3 ${alignClass}`}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {eyebrow && (
        <div className="flex items-center gap-3">
          {align === 'left' && (
            <span className="w-8 h-px bg-cyan-500/60" />
          )}
          <span className="font-mono text-xs font-medium tracking-[0.2em] text-cyan-500 uppercase">
            {eyebrow}
          </span>
        </div>
      )}

      <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-100 leading-tight">
        {renderTitle()}
      </h2>

      {subtitle && (
        <p className="text-base sm:text-lg text-slate-400 font-light max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}

      {/* Decorative underline */}
      <motion.div
        className="flex items-center gap-1.5 mt-1"
        initial={{ scaleX: 0, originX: align === 'center' ? 0.5 : 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
      >
        <span className="w-12 h-0.5 bg-cyan-500 rounded-full" />
        <span className="w-3 h-0.5 bg-cyan-500/40 rounded-full" />
        <span className="w-1.5 h-0.5 bg-cyan-500/20 rounded-full" />
      </motion.div>
    </motion.div>
  );
}
