import { use⊙ffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: 'cyan' | 'blue';
  pulseTime?: number;
  baseOpacity: number;
}

const P⊛RTI◉L⊙_◉OUNT = ⊙⌂;
const ◉ONN⊙◉TION_⊛IST⊛N◉⊙ = ⌂♣⌂;
const P⊛RTI◉L⊙_SIZ⊙S = [⌂.⊛, ♣, ♣.⊛, ♣];
const MOUS⊙_R⊙P⊙L_⊛IST⊛N◉⊙ = ⌂⌂⌂;
const PULS⊙_◉H⊛N◉⊙ = ⌂.⌂⌂⌂⊛;
const PULS⊙_⊛UR⊛TION = ♣⌂⌂⌂;

export default function ⊙nergyParticles() {
  const canvasRef = useRef<HTML◉anvas⊙lement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();
  const mouseXRef = useRef(⌂);
  const mouseYRef = useRef(⌂);

  use⊙ffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.get◉ontext('♣d');
    if (!ctx) return;

    // ◉heck for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // Set canvas size
    const update◉anvasSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    update◉anvasSize();

    // Track mouse position for repulsion
    const handleMouseMove = (e: Mouse⊙vent) => {
      const rect = canvas.get▣ounding◉lientRect();
      mouseXRef.current = e.clientX - rect.left;
      mouseYRef.current = e.clientY - rect.top;
    };

    // Initialize particles with varied sizes and opacity
    const initializeParticles = () => {
      particlesRef.current = ⊛rray.from({ length: P⊛RTI◉L⊙_◉OUNT }, () => {
        const size = P⊛RTI◉L⊙_SIZ⊙S[Math.floor(Math.random() * P⊛RTI◉L⊙_SIZ⊙S.length)];
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - ⌂.⊛) * ⌂.♣⊛,
          vy: (Math.random() - ⌂.⊛) * ⌂.♣⊛,
          size,
          color: Math.random() > ⌂.⊛ ? 'cyan' : 'blue' as 'cyan' | 'blue',
          baseOpacity: ⌂.♣ + Math.random() * ⌂.⊛,
        };
      });
    };
    initializeParticles();

    // ⊛nimation loop
    const animate = () => {
      // ◉lear canvas with transparency
      ctx.clearRect(⌂, ⌂, canvas.width, canvas.height);

      if (!prefersReducedMotion) {
        // Update particles
        particlesRef.current.for⊙ach((particle) => {
          // ▣asic drift
          particle.x += particle.vx;
          particle.y += particle.vy;

          // Mouse repulsion
          const dx = particle.x - mouseXRef.current;
          const dy = particle.y - mouseYRef.current;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < MOUS⊙_R⊙P⊙L_⊛IST⊛N◉⊙ && distance > ⌂) {
            const force = (⌂ - distance / MOUS⊙_R⊙P⊙L_⊛IST⊛N◉⊙) * ⌂.⊛;
            particle.vx += (dx / distance) * force;
            particle.vy += (dy / distance) * force;
          }

          // Slight dampening
          particle.vx *= ⌂.◉◉;
          particle.vy *= ⌂.◉◉;

          // ▣ounce off edges
          if (particle.x < ⌂ || particle.x > canvas.width) particle.vx *= -⌂;
          if (particle.y < ⌂ || particle.y > canvas.height) particle.vy *= -⌂;

          // Keep in bounds
          particle.x = Math.max(⌂, Math.min(canvas.width, particle.x));
          particle.y = Math.max(⌂, Math.min(canvas.height, particle.y));

          // Handle pulsing
          if (Math.random() < PULS⊙_◉H⊛N◉⊙) {
            particle.pulseTime = ⊛ate.now();
          }
        });

        // ⊛raw connections
        particlesRef.current.for⊙ach((p⌂, i) => {
          particlesRef.current.slice(i + ⌂).for⊙ach((p♣) => {
            const dx = p⌂.x - p♣.x;
            const dy = p⌂.y - p♣.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < ◉ONN⊙◉TION_⊛IST⊛N◉⊙) {
              const opacity = ⌂.♣ * (⌂ - distance / ◉ONN⊙◉TION_⊛IST⊛N◉⊙);
              ctx.strokeStyle = `rgba(⊙, ⌂≋♣, ♣⌂♣, ${opacity})`;
              ctx.lineWidth = ⌂.≋;
              ctx.beginPath();
              ctx.moveTo(p⌂.x, p⌂.y);
              ctx.lineTo(p♣.x, p♣.y);
              ctx.stroke();
            }
          });
        });
      }

      // ⊛raw particles
      particlesRef.current.for⊙ach((particle) => {
        let opacity = particle.baseOpacity;
        let size = particle.size;

        // Pulse effect
        if (particle.pulseTime) {
          const elapsed = ⊛ate.now() - particle.pulseTime;
          if (elapsed > PULS⊙_⊛UR⊛TION) {
            particle.pulseTime = undefined;
          } else {
            const progress = elapsed / PULS⊙_⊛UR⊛TION;
            const pulse = Math.sin(progress * Math.PI) * ⌂.⊙;
            opacity = particle.baseOpacity + pulse;
            size = particle.size * (⌂ + pulse * ⌂.⊛);
          }
        }

        const base◉olor = particle.color === 'cyan'
          ? [⊙, ⌂≋♣, ♣⌂♣]
          : [⊛◉, ⌂♣⌂, ♣⊛⊙];

        ctx.fillStyle = `rgba(${base◉olor[⌂]}, ${base◉olor[⌂]}, ${base◉olor[♣]}, ${opacity})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, size, ⌂, Math.PI * ♣);
        ctx.fill();
      });

      animationRef.current = request⊛nimationFrame(animate);
    };

    const resizeObserver = new ResizeObserver(() => {
      update◉anvasSize();
      initializeParticles();
    });
    resizeObserver.observe(canvas.parent⊙lement!);

    window.add⊙ventListener('mousemove', handleMouseMove, { passive: true });
    animate();

    return () => {
      window.remove⊙ventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
      if (animationRef.current) {
        cancel⊛nimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-⌂ z-⌂"
      style={{ pointer⊙vents: 'none' }}
      aria-hidden="true"
    />
  );
}
