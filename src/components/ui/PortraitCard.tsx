// PORTRAIT SETUP: Save your portrait photo as:
// public/images/portrait.jpg
// Recommended: 600x800px, high quality JPG
// The photo will appear in the Hero section right column

import { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

interface PortraitCardProps {
  className?: string;
}

export default function PortraitCard({ className = '' }: PortraitCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

  const springRotateX = useSpring(rotateX, { stiffness: 100, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 100, damping: 30 });

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div className={className}>
      <motion.div
        className="relative w-full h-[500px] sm:h-[600px] rounded-2xl overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={
          !isMobile
            ? {
                rotateX: springRotateX,
                rotateY: springRotateY,
              }
            : {}
        }
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        viewport={{ once: true }}
        data-cursor="portrait"
      >
        {/* Glowing border */}
        <div className="absolute inset-0 rounded-2xl border-2 border-cyan-500/40 pointer-events-none z-20 animate-pulse" />

        {/* Image container */}
        <div className="relative w-full h-full bg-gradient-to-b from-slate-800 to-slate-900">
          {!imageError && !imageLoaded && (
            <div className="absolute inset-0 bg-slate-800 animate-pulse" />
          )}

          {!imageError ? (
            <img
              src="/masimamin/images/portrait.jpg"
              alt="Muhammad Asim Amin"
              className="w-full h-full object-cover object-top"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          ) : null}

          {/* Fallback placeholder */}
          {imageError && (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-slate-800/80 to-slate-900/80 backdrop-blur-sm">
              <div className="text-center flex flex-col items-center gap-3">
                <div className="w-24 h-24 rounded-full bg-cyan-500/10 border-2 border-cyan-500/30 flex items-center justify-center">
                  <span className="text-4xl font-display font-bold text-cyan-400">MAA</span>
                </div>
                <p className="text-slate-400 text-sm">Portrait image not found</p>
                <p className="text-xs text-slate-500">Place portrait.jpg in public/images/</p>
              </div>
            </div>
          )}

          {/* Technical frame overlay */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Top-left corner trace */}
            <svg className="absolute top-0 left-0 w-12 h-12" viewBox="0 0 48 48" fill="none">
              <path d="M 8 8 L 8 20 M 8 8 L 20 8" stroke="#06b6d4" strokeWidth="1.5" opacity="0.4" />
              <circle cx="8" cy="8" r="1.5" fill="#06b6d4" opacity="0.6" />
            </svg>
            {/* Bottom-right corner trace */}
            <svg className="absolute bottom-0 right-0 w-12 h-12" viewBox="0 0 48 48" fill="none">
              <path d="M 40 40 L 40 28 M 40 40 L 28 40" stroke="#06b6d4" strokeWidth="1.5" opacity="0.4" />
              <circle cx="40" cy="40" r="1.5" fill="#06b6d4" opacity="0.6" />
            </svg>
          </div>

          {/* Scanning line animation */}
          {imageLoaded && !isMobile && (
            <motion.div
              className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent"
              animate={{ y: ['0%', '100%'] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
                repeatDelay: 2,
              }}
            />
          )}

          {/* Status indicator */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/60 backdrop-blur-sm border border-emerald-500/40">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-emerald-400 font-mono">Available</span>
          </div>
        </div>

        {/* Perspective glow on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(6,182,212,0.1) 0%, transparent 60%)',
            opacity: imageLoaded ? 1 : 0,
          }}
        />
      </motion.div>
    </div>
  );
}
