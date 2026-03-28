import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if touch device
    const isTouchDevice = () => {
      return (
        (typeof window !== 'undefined' &&
          navigator.maxTouchPoints &&
          navigator.maxTouchPoints > 2) ||
        (typeof window !== 'undefined' && (navigator as any).msMaxTouchPoints && (navigator as any).msMaxTouchPoints > 2)
      );
    };

    if (isTouchDevice()) return;

    // Hide default cursor
    document.body.style.cursor = 'none';

    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;

      // Update dot position
      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = `${clientX}px`;
        cursorDotRef.current.style.top = `${clientY}px`;
      }

      // Update motion values for spring animation
      mouseX.set(clientX);
      mouseY.set(clientY);

      // Check if hovering over interactive element
      const target = document.elementFromPoint(clientX, clientY);
      const isInteractive = target?.matches(
        'a, button, [data-cursor="button"], [data-cursor="portrait"], input, textarea, .cursor-interactive'
      );

      if (cursorRingRef.current) {
        if (isInteractive) {
          cursorRingRef.current.style.width = '48px';
          cursorRingRef.current.style.height = '48px';
          cursorRingRef.current.style.borderColor = '#3b82f6';
          cursorRingRef.current.style.opacity = '0.8';
        } else {
          cursorRingRef.current.style.width = '32px';
          cursorRingRef.current.style.height = '32px';
          cursorRingRef.current.style.borderColor = '#06b6d4';
          cursorRingRef.current.style.opacity = '0.6';
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.style.cursor = 'auto';
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Dot */}
      <div
        ref={cursorDotRef}
        className="cursor-dot"
        style={{
          transform: 'translate(-50%, -50%)',
        }}
      />
      {/* Ring with spring lag */}
      <motion.div
        ref={cursorRingRef}
        className="cursor-ring"
        style={{
          left: ringX,
          top: ringY,
          transform: 'translate(-50%, -50%)',
        }}
      />
    </>
  );
}
