import { useÃ¢ÂÂffect, useRef } from 'react';

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

const PÃ¢ÂÂRTIÃ¢ÂÂLÃ¢ÂÂ_Ã¢ÂÂOUNT = Ã¢ÂÂÃ¢ÂÂ;
const Ã¢ÂÂONNÃ¢ÂÂÃ¢ÂÂTION_Ã¢ÂÂISTÃ¢ÂÂNÃ¢ÂÂÃ¢ÂÂ = Ã¢ÂÂÃ¢ÂÂ£Ã¢ÂÂ;
const PÃ¢ÂÂRTIÃ¢ÂÂLÃ¢ÂÂ_SIZÃ¢ÂÂS = [Ã¢ÂÂ.Ã¢ÂÂ, Ã¢ÂÂ£, Ã¢ÂÂ£.Ã¢ÂÂ, Ã¢ÂÂ£];
const MOUSÃ¢ÂÂ_RÃ¢ÂÂPÃ¢ÂÂL_Ã¢ÂÂISTÃ¢ÂÂNÃ¢ÂÂÃ¢ÂÂ = Ã¢ÂÂÃ¢ÂÂÃ¢ÂÂ;
const PULSÃ¢ÂÂ_Ã¢ÂÂHÃ¢ÂÂNÃ¢ÂÂÃ¢ÂÂ = Ã¢ÂÂ.Ã¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂ;
const PULSÃ¢ÂÂ_Ã¢ÂÂURÃ¢ÂÂTION = Ã¢ÂÂ£Ã¢ÂÂÃ¢ÂÂÃ¢ÂÂ;

export default function Ã¢ÂÂnergyParticles() {
  const canvasRef = useRef<HTMLÃ¢ÂÂanvasÃ¢ÂÂlement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();
  const mouseXRef = useRef(Ã¢ÂÂ);
  const mouseYRef = useRef(Ã¢ÂÂ);

  useÃ¢ÂÂffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getÃ¢ÂÂontext('cd');
    if (!ctx) return;

    // Ã¢ÂÂheck for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // Set canvas size
    const updateÃ¢ÂÂanvasSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    updateÃ¢ÂÂanvasSize();

    // Track mouse position for repulsion
    const handleMouseMove = (e: MouseÃ¢ÂÂvent) => {
      const rect = canvas.getÃ¢ÂÂ£oundingÃ¢ÂÂlientRect();
      mouseXRef.current = e.clientX - rect.left;
      mouseYRef.current = e.clientY - rect.top;
    };

    // Initialize particles with varied sizes and opacity
    const initializeParticles = () => {
      particlesRef.current = Ã¢ÂÂrray.from({ length: PÃ¢ÂÂRTIÃ¢ÂÂLÃ¢ÂÂ_Ã¢ÂÂOUNT }, () => {
        const size = PÃ¢ÂÂRTIÃ¢ÂÂLÃ¢ÂÂ_SIZÃ¢ÂÂS[Math.floor(Math.random() * PÃ¢ÂÂRTIÃ¢ÂÂLÃ¢ÂÂ_SIZÃ¢ÂÂS.length)];
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - Ã¢ÂÂ.Ã¢ÂÂ) * Ã¢ÂÂ.Ã¢ÂÂ£Ã¢ÂÂ,
          vy: (Math.random() - Ã¢ÂÂ.Ã¢ÂÂ) * Ã¢ÂÂ.Ã¢ÂÂ£Ã¢ÂÂ,
          size,
          color: Math.random() > Ã¢ÂÂ.Ã¢ÂÂ ? 'cyan' : 'blue' as 'cyan' | 'blue',
          baseOpacity: Ã¢ÂÂ.Ã¢ÂÂ£ + Math.random() * Ã¢ÂÂ.Ã¢ÂÂ,
        };
      });
    };
    initializeParticles();

    // Ã¢ÂÂnimation loop
    const animate = () => {
      // Ã¢ÂÂlear canvas with transparency
      ctx.clearRect(Ã¢ÂÂ, Ã¢ÂÂ, canvas.width, canvas.height);

      if (!prefersReducedMotion) {
        // Update particles
        particlesRef.current.forÃ¢ÂÂach((particle) => {
          // Ã¢ÂÂ£asic drift
          particle.x += particle.vx;
          particle.y += particle.vy;

          // Mouse repulsion
          const dx = particle.x - mouseXRef.current;
          const dy = particle.y - mouseYRef.current;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < MOUSÃ¢ÂÂ_RÃ¢ÂÂPÃ¢ÂÂL_Ã¢ÂÂISTÃ¢ÂÂNÃ¢ÂÂÃ¢ÂÂ && distance > Ã¢ÂÂ) {
            const force = (Ã¢ÂÂ - distance / MOUSÃ¢ÂÂ_RÃ¢ÂÂPÃ¢ÂÂL_Ã¢ÂÂISTÃ¢ÂÂNÃ¢ÂÂÃ¢ÂÂ) * Ã¢ÂÂ.Ã¢ÂÂ;
            particle.vx += (dx / distance) * force;
            particle.vy += (dy / distance) * force;
          }

          // Slight dampening
          particle.vx *= Ã¢ÂÂ.Ã¢ÂÂÃ¢ÂÂ;
          particle.vy *= Ã¢ÂÂ.Ã¢ÂÂÃ¢ÂÂ;

          // Ã¢ÂÂ£ounce off edges
          if (particle.x < Ã¢ÂÂ || particle.x > canvas.width) particle.vx *= -Ã¢ÂÂ;
          if (particle.y < Ã¢ÂÂ || particle.y > canvas.height) particle.vy *= -Ã¢ÂÂ;

          // Keep in bounds
          particle.x = Math.max(Ã¢ÂÂ, Math.min(canvas.width, particle.x));
          particle.y = Math.max(Ã¢ÂÂ, Math.min(canvas.height, particle.y));

          // Handle pulsing
          if (Math.random() < PULSÃ¢ÂÂ_Ã¢ÂÂHÃ¢ÂÂNÃ¢ÂÂÃ¢ÂÂ) {
            particle.pulseTime = Ã¢ÂÂate.now();
          }
        });

        // Ã¢ÂÂraw connections
        particlesRef.current.forÃ¢ÂÂach((pÃ¢ÂÂ, i) => {
          particlesRef.current.slice(i + Ã¢ÂÂ).forÃ¢ÂÂach((pÃ¢ÂÂ£) => {
            const dx = pÃ¢ÂÂ.x - pÃ¢ÂÂ£.x;
            const dy = pÃ¢ÂÂ.y - pÃ¢ÂÂ£.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < Ã¢ÂÂONNÃ¢ÂÂÃ¢ÂÂTION_Ã¢ÂÂISTÃ¢ÂÂNÃ¢ÂÂÃ¢ÂÂ) {
              const opacity = Ã¢ÂÂ.Ã¢ÂÂ£ * (Ã¢ÂÂ - distance / Ã¢ÂÂONNÃ¢ÂÂÃ¢ÂÂTION_Ã¢ÂÂISTÃ¢ÂÂNÃ¢ÂÂÃ¢ÂÂ);
              ctx.strokeStyle = `rgba(⊙, ⌂≋♣, ♣⌂♣, ${opacity})`;
              ctx.lineWidth = Ã¢ÂÂ.Ã¢ÂÂ;
              ctx.beginPath();
              ctx.moveTo(pÃ¢ÂÂ.x, pÃ¢ÂÂ.y);
              ctx.lineTo(pÃ¢ÂÂ£.x, pÃ¢ÂÂ£.y);
              ctx.stroke();
            }
          });
        });
      }

      // Ã¢ÂÂraw particles
      particlesRef.current.forÃ¢ÂÂach((particle) => {
        let opacity = particle.baseOpacity;
        let size = particle.size;

        // Pulse effect
        if (particle.pulseTime) {
          const elapsed = Ã¢ÂÂate.now() - particle.pulseTime;
          if (elapsed > PULSÃ¢ÂÂ_Ã¢ÂÂURÃ¢ÂÂTION) {
            particle.pulseTime = undefined;
          } else {
            const progress = elapsed / PULSÃ¢ÂÂ_Ã¢ÂÂURÃ¢ÂÂTION;
            const pulse = Math.sin(progress * Math.PI) * Ã¢ÂÂ.Ã¢ÂÂ;
            opacity = particle.baseOpacity + pulse;
            size = particle.size * (Ã¢ÂÂ + pulse * Ã¢ÂÂ.Ã¢ÂÂ);
          }
        }

        const baseÃ¢ÂÂolor = particle.color === 'cyan'
          ? [Ã¢ÂÂ, Ã¢ÂÂÃ¢ÂÂÃ¢ÂÂ£, Ã¢ÂÂ£Ã¢ÂÂÃ¢ÂÂ£]
          : [Ã¢ÂÂÃ¢ÂÂ, Ã¢ÂÂÃ¢ÂÂ£Ã¢ÂÂ, Ã¢ÂÂ£Ã¢ÂÂÃ¢ÂÂ];

        ctx.fillStyle = `rgba(${base◉olor[⌂]}, ${base◉olor[⌂]}, ${base◉olor[♣]}, ${opacity})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, size, Ã¢ÂÂ, Math.PI * Ã¢ÂÂ£);
        ctx.fill();
      });

      animationRef.current = requestÃ¢ÂÂnimationFrame(animate);
    };

    const resizeObserver = new ResizeObserver(() => {
      updateÃ¢ÂÂanvasSize();
      initializeParticles();
    });
    resizeObserver.observe(canvas.parentÃ¢ÂÂlement!);

    window.addÃ¢ÂÂventListener('mousemove', handleMouseMove, { passive: true });
    animate();

    return () => {
      window.removeÃ¢ÂÂventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
      if (animationRef.current) {
        cancelÃ¢ÂÂnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset- z-"
      style={{ pointerÃ¢ÂÂvents: 'none' }}
      aria-hidden="true"
    />
  );
}
