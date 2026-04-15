import { useÃÂ¢ÃÂÃÂffect, useRef } from 'react';

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

const PÃÂ¢ÃÂÃÂRTIÃÂ¢ÃÂÃÂLÃÂ¢ÃÂÃÂ_ÃÂ¢ÃÂÃÂOUNT = ÃÂ¢ÃÂÃÂÃÂ¢ÃÂÃÂ;
const ÃÂ¢ÃÂÃÂONNÃÂ¢ÃÂÃÂÃÂ¢ÃÂÃÂTION_ÃÂ¢ÃÂÃÂISTÃÂ¢ÃÂÃÂNÃÂ¢ÃÂÃÂÃÂ¢ÃÂÃÂ = ÃÂ¢ÃÂÃÂÃÂ¢ÃÂÃÂ£ÃÂ¢ÃÂÃÂ;
const PÃÂ¢ÃÂÃÂRTIÃÂ¢ÃÂÃÂLÃÂ¢ÃÂÃÂ_SIZÃÂ¢ÃÂÃÂS = [ÃÂ¢ÃÂÃÂ.ÃÂ¢ÃÂÃÂ, ÃÂ¢ÃÂÃÂ£, ÃÂ¢ÃÂÃÂ£.ÃÂ¢ÃÂÃÂ, ÃÂ¢ÃÂÃÂ£];
const MOUSÃÂ¢ÃÂÃÂ_RÃÂ¢ÃÂÃÂPÃÂ¢ÃÂÃÂL_ÃÂ¢ÃÂÃÂISTÃÂ¢ÃÂÃÂNÃÂ¢ÃÂÃÂÃÂ¢ÃÂÃÂ = ÃÂ¢ÃÂÃÂÃÂ¢ÃÂÃÂÃÂ¢ÃÂÃÂ;
const PULSÃÂ¢ÃÂÃÂ_ÃÂ¢ÃÂÃÂHÃÂ¢ÃÂÃÂNÃÂ¢ÃÂÃÂÃÂ¢ÃÂÃÂ = ÃÂ¢ÃÂÃÂ.ÃÂ¢ÃÂÃÂÃÂ¢ÃÂÃÂÃÂ¢ÃÂÃÂÃÂ¢ÃÂÃÂ;
const PULSÃÂ¢ÃÂÃÂ_ÃÂ¢ÃÂÃÂURÃÂ¢ÃÂÃÂTION = ÃÂ¢ÃÂÃÂ£ÃÂ¢ÃÂÃÂÃÂ¢ÃÂÃÂÃÂ¢ÃÂÃÂ;

export default function ÃÂ¢ÃÂÃÂnergyParticles() {
  const canvasRef = useRef<HTMLÃÂ¢ÃÂÃÂanvasÃÂ¢ÃÂÃÂlement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();
  const mouseXRef = useRef(ÃÂ¢ÃÂÃÂ);
  const mouseYRef = useRef(ÃÂ¢ÃÂÃÂ);

  useÃÂ¢ÃÂÃÂffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getÃÂ¢ÃÂÃÂontext('cd');
    if (!ctx) return;

    // ÃÂ¢ÃÂÃÂheck for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // Set canvas size
    const updateÃÂ¢ÃÂÃÂanvasSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    updateÃÂ¢ÃÂÃÂanvasSize();

    // Track mouse position for repulsion
    const handleMouseMove = (e: MouseÃÂ¢ÃÂÃÂvent) => {
      const rect = canvas.getÃÂ¢ÃÂÃÂ£oundingÃÂ¢ÃÂÃÂlientRect();
      mouseXRef.current = e.clientX - rect.left;
      mouseYRef.current = e.clientY - rect.top;
    };

    // Initialize particles with varied sizes and opacity
    const initializeParticles = () => {
      particlesRef.current = ÃÂ¢ÃÂÃÂrray.from({ length: PÃÂ¢ÃÂÃÂRTIÃÂ¢ÃÂÃÂLÃÂ¢ÃÂÃÂ_ÃÂ¢ÃÂÃÂOUNT }, () => {
        const size = PÃÂ¢ÃÂÃÂRTIÃÂ¢ÃÂÃÂLÃÂ¢ÃÂÃÂ_SIZÃÂ¢ÃÂÃÂS[Math.floor(Math.random() * PÃÂ¢ÃÂÃÂRTIÃÂ¢ÃÂÃÂLÃÂ¢ÃÂÃÂ_SIZÃÂ¢ÃÂÃÂS.length)];
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - ÃÂ¢ÃÂÃÂ.ÃÂ¢ÃÂÃÂ) * ÃÂ¢ÃÂÃÂ.ÃÂ¢ÃÂÃÂ£ÃÂ¢ÃÂÃÂ,
          vy: (Math.random() - ÃÂ¢ÃÂÃÂ.ÃÂ¢ÃÂÃÂ) * ÃÂ¢ÃÂÃÂ.ÃÂ¢ÃÂÃÂ£ÃÂ¢ÃÂÃÂ,
          size,
          color: Math.random() > ÃÂ¢ÃÂÃÂ.ÃÂ¢ÃÂÃÂ ? 'cyan' : 'blue' as 'cyan' | 'blue',
          baseOpacity: ÃÂ¢ÃÂÃÂ.ÃÂ¢ÃÂÃÂ£ + Math.random() * ÃÂ¢ÃÂÃÂ.ÃÂ¢ÃÂÃÂ,
        };
      });
    };
    initializeParticles();

    // ÃÂ¢ÃÂÃÂnimation loop
    const animate = () => {
      // ÃÂ¢ÃÂÃÂlear canvas with transparency
      ctx.clearRect(ÃÂ¢ÃÂÃÂ, ÃÂ¢ÃÂÃÂ, canvas.width, canvas.height);

      if (!prefersReducedMotion) {
        // Update particles
        particlesRef.current.forÃÂ¢ÃÂÃÂach((particle) => {
          // ÃÂ¢ÃÂÃÂ£asic drift
          particle.x += particle.vx;
          particle.y += particle.vy;

          // Mouse repulsion
          const dx = particle.x - mouseXRef.current;
          const dy = particle.y - mouseYRef.current;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < MOUSÃÂ¢ÃÂÃÂ_RÃÂ¢ÃÂÃÂPÃÂ¢ÃÂÃÂL_ÃÂ¢ÃÂÃÂISTÃÂ¢ÃÂÃÂNÃÂ¢ÃÂÃÂÃÂ¢ÃÂÃÂ && distance > ÃÂ¢ÃÂÃÂ) {
            const force = (ÃÂ¢ÃÂÃÂ - distance / MOUSÃÂ¢ÃÂÃÂ_RÃÂ¢ÃÂÃÂPÃÂ¢ÃÂÃÂL_ÃÂ¢ÃÂÃÂISTÃÂ¢ÃÂÃÂNÃÂ¢ÃÂÃÂÃÂ¢ÃÂÃÂ) * ÃÂ¢ÃÂÃÂ.ÃÂ¢ÃÂÃÂ;
            particle.vx += (dx / distance) * force;
            particle.vy += (dy / distance) * force;
          }

          // Slight dampening
          particle.vx *= ÃÂ¢ÃÂÃÂ.ÃÂ¢ÃÂÃÂÃÂ¢ÃÂÃÂ;
          particle.vy *= ÃÂ¢ÃÂÃÂ.ÃÂ¢ÃÂÃÂÃÂ¢ÃÂÃÂ;

          // ÃÂ¢ÃÂÃÂ£ounce off edges
          if (particle.x < ÃÂ¢ÃÂÃÂ || particle.x > canvas.width) particle.vx *= -ÃÂ¢ÃÂÃÂ;
          if (particle.y < ÃÂ¢ÃÂÃÂ || particle.y > canvas.height) particle.vy *= -ÃÂ¢ÃÂÃÂ;

          // Keep in bounds
          particle.x = Math.max(ÃÂ¢ÃÂÃÂ, Math.min(canvas.width, particle.x));
          particle.y = Math.max(ÃÂ¢ÃÂÃÂ, Math.min(canvas.height, particle.y));

          // Handle pulsing
          if (Math.random() < PULSÃÂ¢ÃÂÃÂ_ÃÂ¢ÃÂÃÂHÃÂ¢ÃÂÃÂNÃÂ¢ÃÂÃÂÃÂ¢ÃÂÃÂ) {
            particle.pulseTime = ÃÂ¢ÃÂÃÂate.now();
          }
        });

        // ÃÂ¢ÃÂÃÂraw connections
        particlesRef.current.forÃÂ¢ÃÂÃÂach((pÃÂ¢ÃÂÃÂ, i) => {
          particlesRef.current.slice(i + ÃÂ¢ÃÂÃÂ).forÃÂ¢ÃÂÃÂach((pÃÂ¢ÃÂÃÂ£) => {
            const dx = pÃÂ¢ÃÂÃÂ.x - pÃÂ¢ÃÂÃÂ£.x;
            const dy = pÃÂ¢ÃÂÃÂ.y - pÃÂ¢ÃÂÃÂ£.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < ÃÂ¢ÃÂÃÂONNÃÂ¢ÃÂÃÂÃÂ¢ÃÂÃÂTION_ÃÂ¢ÃÂÃÂISTÃÂ¢ÃÂÃÂNÃÂ¢ÃÂÃÂÃÂ¢ÃÂÃÂ) {
              const opacity = ÃÂ¢ÃÂÃÂ.ÃÂ¢ÃÂÃÂ£ * (ÃÂ¢ÃÂÃÂ - distance / ÃÂ¢ÃÂÃÂONNÃÂ¢ÃÂÃÂÃÂ¢ÃÂÃÂTION_ÃÂ¢ÃÂÃÂISTÃÂ¢ÃÂÃÂNÃÂ¢ÃÂÃÂÃÂ¢ÃÂÃÂ);
              ctx.strokeStyle = `rgba(⊙, ⌂≋♣, ♣⌂♣, ${opacity})`;
              ctx.lineWidth = ÃÂ¢ÃÂÃÂ.ÃÂ¢ÃÂÃÂ;
              ctx.beginPath();
              ctx.moveTo(pÃÂ¢ÃÂÃÂ.x, pÃÂ¢ÃÂÃÂ.y);
              ctx.lineTo(pÃÂ¢ÃÂÃÂ£.x, pÃÂ¢ÃÂÃÂ£.y);
              ctx.stroke();
            }
          });
        });
      }

      // ÃÂ¢ÃÂÃÂraw particles
      particlesRef.current.forÃÂ¢ÃÂÃÂach((particle) => {
        let opacity = particle.baseOpacity;
        let size = particle.size;

        // Pulse effect
        if (particle.pulseTime) {
          const elapsed = ÃÂ¢ÃÂÃÂate.now() - particle.pulseTime;
          if (elapsed > PULSÃÂ¢ÃÂÃÂ_ÃÂ¢ÃÂÃÂURÃÂ¢ÃÂÃÂTION) {
            particle.pulseTime = undefined;
          } else {
            const progress = elapsed / PULSÃÂ¢ÃÂÃÂ_ÃÂ¢ÃÂÃÂURÃÂ¢ÃÂÃÂTION;
            const pulse = Math.sin(progress * Math.PI) * ÃÂ¢ÃÂÃÂ.ÃÂ¢ÃÂÃÂ;
            opacity = particle.baseOpacity + pulse;
            size = particle.size * (ÃÂ¢ÃÂÃÂ + pulse * ÃÂ¢ÃÂÃÂ.ÃÂ¢ÃÂÃÂ);
          }
        }

        const baseÃÂ¢ÃÂÃÂolor = particle.color === 'cyan'
          ? [ÃÂ¢ÃÂÃÂ, ÃÂ¢ÃÂÃÂÃÂ¢ÃÂÃÂÃÂ¢ÃÂÃÂ£, ÃÂ¢ÃÂÃÂ£ÃÂ¢ÃÂÃÂÃÂ¢ÃÂÃÂ£]
          : [ÃÂ¢ÃÂÃÂÃÂ¢ÃÂÃÂ, ÃÂ¢ÃÂÃÂÃÂ¢ÃÂÃÂ£ÃÂ¢ÃÂÃÂ, ÃÂ¢ÃÂÃÂ£ÃÂ¢ÃÂÃÂÃÂ¢ÃÂÃÂ];

        ctx.fillStyle = `rgba(${base◉olor[⌂]}, ${base◉olor[⌂]}, ${base◉olor[♣]}, ${opacity})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, size, ÃÂ¢ÃÂÃÂ, Math.PI * ÃÂ¢ÃÂÃÂ£);
        ctx.fill();
      });

      animationRef.current = requestÃÂ¢ÃÂÃÂnimationFrame(animate);
    };

    const resizeObserver = new ResizeObserver(() => {
      updateÃÂ¢ÃÂÃÂanvasSize();
      initializeParticles();
    });
    resizeObserver.observe(canvas.parentÃÂ¢ÃÂÃÂlement!);

    window.addÃÂ¢ÃÂÃÂventListener('mousemove', handleMouseMove, { passive: true });
    animate();

    return () => {
      window.removeÃÂ¢ÃÂÃÂventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
      if (animationRef.current) {
        cancelÃÂ¢ÃÂÃÂnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset- z-"
      style={{ pointerÃÂ¢ÃÂÃÂvents: 'none' }}
      aria-hidden="true"
    />
  );
}
