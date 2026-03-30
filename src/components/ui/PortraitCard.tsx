/**
 * PortraitCard — professional animated portrait for the Hero section.
 * Loads: /masimamin/images/portrait.jpg
 * Fallback: styled placeholder with initials MAA.
 */
import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

interface PortraitCardProps {
  className?: string;
}

export default function PortraitCard({ className = '' }: PortraitCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError,  setImageError]  = useState(false);
  const [isMobile,    setIsMobile]    = useState(false);
  const [scanActive,  setScanActive]  = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX  = useTransform(mouseY, [-280, 280], [8, -8]);
  const rotateY  = useTransform(mouseX, [-280, 280], [-8, 8]);
  const sRotateX = useSpring(rotateX, { stiffness: 90, damping: 28 });
  const sRotateY = useSpring(rotateY, { stiffness: 90, damping: 28 });

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width  / 2);
    mouseY.set(e.clientY - rect.top  - rect.height / 2);
  };
  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); };

  const handleImageLoad = () => {
    setImageLoaded(true);
    setScanActive(true);
    setTimeout(() => setScanActive(false), 4000);
  };

  return (
    <div className={className}>
      <motion.div
        animate={{ y: [0, -10, -6, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', times: [0,0.35,0.5,0.65,1] }}
      >
        <motion.div
          ref={cardRef}
          className="relative"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={!isMobile ? { rotateX: sRotateX, rotateY: sRotateY, transformStyle: 'preserve-3d', perspective: '1000px' } : {}}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
          data-cursor="portrait"
        >
          {/* Glow halo behind */}
          <div className="absolute -inset-6 rounded-[28px] pointer-events-none" aria-hidden>
            <motion.div
              className="absolute inset-0 rounded-[28px]"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              style={{ background: 'radial-gradient(ellipse at 50% 60%, rgba(6,182,212,0.14) 0%, transparent 68%)' }}
            />
          </div>

          <motion.div
            className="absolute -inset-3 rounded-2xl pointer-events-none"
            aria-hidden
            animate={{ opacity: [0.25, 0.5, 0.25] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ boxShadow: '0 0 40px rgba(6,182,212,0.18), 0 0 80px rgba(59,130,246,0.08)' }}
          />

          <div className="relative w-full overflow-hidden rounded-2xl" style={{ height: 480 }}>

            {/* Animated outer border */}
            <motion.div
              className="absolute inset-0 rounded-2xl pointer-events-none z-20"
              animate={{ opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              style={{ border: '1.5px solid rgba(6,182,212,0.4)' }}
            />

            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-800/60 to-slate-900/90" />

            {/* Portrait image */}
            {!imageError && (
              <img
                src="/masimamin/images/portrait.jpg"
                alt="Muhammad Asim Amin"
                className="absolute inset-0 w-full h-full object-cover object-top"
                style={{ opacity: imageLoaded ? 1 : 0, transition: 'opacity 0.6s ease' }}
                onLoad={handleImageLoad}
                onError={() => setImageError(true)}
              />
            )}

            {/* Bottom gradient depth */}
            {imageLoaded && (
              <div
                className="absolute inset-0 pointer-events-none z-10"
                style={{ background: 'linear-gradient(to top, rgba(10,22,40,0.88) 0%, rgba(10,22,40,0.18) 42%, transparent 65%)' }}
              />
            )}

            {/* Scanline pass */}
            {scanActive && (
              <div
                className="absolute inset-x-0 pointer-events-none z-30"
                style={{
                  height: 2,
                  background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.5), transparent)',
                  animation: 'scanline 3s ease-in-out forwards',
                  top: 0,
                }}
              />
            )}

            {/* Fallback placeholder */}
            {imageError && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 z-10">
                <motion.div
                  className="relative w-32 h-32 rounded-full border border-cyan-500/30 flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%)' }}
                >
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-400" />
                </motion.div>
                <div className="text-center">
                  <div className="text-5xl font-display font-bold text-gradient-cyan">MAA</div>
                  <p className="text-slate-400 text-xs mt-2 font-mono">Muhammad Asim Amin</p>
                  <p className="text-slate-500 text-[10px] mt-1">Upload portrait.jpg → public/images/</p>
                </div>
              </div>
            )}

            {/* Technical corner frames */}
            <div className="absolute inset-0 pointer-events-none z-25" aria-hidden>
              <svg className="absolute top-3 left-3 w-10 h-10" viewBox="0 0 40 40" fill="none">
                <path d="M6 6 L6 18 M6 6 L18 6" stroke="rgba(6,182,212,0.6)" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="6" cy="6" r="1.5" fill="rgba(6,182,212,0.8)"/>
              </svg>
              <svg className="absolute top-3 right-3 w-10 h-10" viewBox="0 0 40 40" fill="none">
                <path d="M34 6 L34 18 M34 6 L22 6" stroke="rgba(6,182,212,0.6)" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="34" cy="6" r="1.5" fill="rgba(6,182,212,0.8)"/>
              </svg>
              <svg className="absolute bottom-16 left-3 w-10 h-10" viewBox="0 0 40 40" fill="none">
                <path d="M6 34 L6 22 M6 34 L18 34" stroke="rgba(6,182,212,0.6)" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="6" cy="34" r="1.5" fill="rgba(6,182,212,0.8)"/>
              </svg>
              <svg className="absolute bottom-16 right-3 w-10 h-10" viewBox="0 0 40 40" fill="none">
                <path d="M34 34 L34 22 M34 34 L22 34" stroke="rgba(6,182,212,0.6)" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="34" cy="34" r="1.5" fill="rgba(6,182,212,0.8)"/>
              </svg>
            </div>

            {/* Bottom metadata bar */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-20">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/55 backdrop-blur-sm border border-emerald-500/35">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] text-emerald-400 font-mono tracking-wider">Available</span>
              </div>
              <div className="px-3 py-1.5 rounded-full bg-black/55 backdrop-blur-sm border border-cyan-500/25">
                <span className="text-[10px] text-cyan-400 font-mono">PhD · Genova, Italy</span>
              </div>
            </div>

            {/* Perspective inner glow */}
            <motion.div
              className="absolute inset-0 rounded-2xl pointer-events-none z-5"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ background: 'radial-gradient(ellipse at 30% 25%, rgba(6,182,212,0.07) 0%, transparent 55%)' }}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
