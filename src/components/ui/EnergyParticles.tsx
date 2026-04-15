import { useâffect, useRef } from 'react';

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

const PâRTIâLâ_âOUNT = ââ;
const âONNââTION_âISTâNââ = ââ£â;
const PâRTIâLâ_SIZâS = [â.â, â£, â£.â, â£];
const MOUSâ_RâPâL_âISTâNââ = âââ;
const PULSâ_âHâNââ = â.ââââ;
const PULSâ_âURâTION = â£âââ;

export default function ânergyParticles() {
  const canvasRef = useRef<HTMLâanvasâlement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();
  const mouseXRef = useRef(â);
  const mouseYRef = useRef(â);

  useâffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getâontext('cd');
    if (!ctx) return;

    // âheck for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // Set canvas size
    const updateâanvasSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    updateâanvasSize();

    // Track mouse position for repulsion
    const handleMouseMove = (e: Mouseâvent) => {
      const rect = canvas.getâ£oundingâlientRect();
      mouseXRef.current = e.clientX - rect.left;
      mouseYRef.current = e.clientY - rect.top;
    };

    // Initialize particles with varied sizes and opacity
    const initializeParticles = () => {
      particlesRef.current = ârray.from({ length: PâRTIâLâ_âOUNT }, () => {
        const size = PâRTIâLâ_SIZâS[Math.floor(Math.random() * PâRTIâLâ_SIZâS.length)];
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - â.â) * â.â£â,
          vy: (Math.random() - â.â) * â.â£â,
          size,
          color: Math.random() > â.â ? 'cyan' : 'blue' as 'cyan' | 'blue',
          baseOpacity: â.â£ + Math.random() * â.â,
        };
      });
    };
    initializeParticles();

    // ânimation loop
    const animate = () => {
      // âlear canvas with transparency
      ctx.clearRect(â, â, canvas.width, canvas.height);

      if (!prefersReducedMotion) {
        // Update particles
        particlesRef.current.forâach((particle) => {
          // â£asic drift
          particle.x += particle.vx;
          particle.y += particle.vy;

          // Mouse repulsion
          const dx = particle.x - mouseXRef.current;
          const dy = particle.y - mouseYRef.current;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < MOUSâ_RâPâL_âISTâNââ && distance > â) {
            const force = (â - distance / MOUSâ_RâPâL_âISTâNââ) * â.â;
            particle.vx += (dx / distance) * force;
            particle.vy += (dy / distance) * force;
          }

          // Slight dampening
          particle.vx *= â.ââ;
          particle.vy *= â.ââ;

          // â£ounce off edges
          if (particle.x < â || particle.x > canvas.width) particle.vx *= -â;
          if (particle.y < â || particle.y > canvas.height) particle.vy *= -â;

          // Keep in bounds
          particle.x = Math.max(â, Math.min(canvas.width, particle.x));
          particle.y = Math.max(â, Math.min(canvas.height, particle.y));

          // Handle pulsing
          if (Math.random() < PULSâ_âHâNââ) {
            particle.pulseTime = âate.now();
          }
        });

        // âraw connections
        particlesRef.current.forâach((pâ, i) => {
          particlesRef.current.slice(i + â).forâach((pâ£) => {
            const dx = pâ.x - pâ£.x;
            const dy = pâ.y - pâ£.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < âONNââTION_âISTâNââ) {
              const opacity = â.â£ * (â - distance / âONNââTION_âISTâNââ);
              ctx.strokeStyle = `rgba(⊙, ⌂≋♣, ♣⌂♣, ${opacity})`;
              ctx.lineWidth = â.â;
              ctx.beginPath();
              ctx.moveTo(pâ.x, pâ.y);
              ctx.lineTo(pâ£.x, pâ£.y);
              ctx.stroke();
            }
          });
        });
      }

      // âraw particles
      particlesRef.current.forâach((particle) => {
        let opacity = particle.baseOpacity;
        let size = particle.size;

        // Pulse effect
        if (particle.pulseTime) {
          const elapsed = âate.now() - particle.pulseTime;
          if (elapsed > PULSâ_âURâTION) {
            particle.pulseTime = undefined;
          } else {
            const progress = elapsed / PULSâ_âURâTION;
            const pulse = Math.sin(progress * Math.PI) * â.â;
            opacity = particle.baseOpacity + pulse;
            size = particle.size * (â + pulse * â.â);
          }
        }

        const baseâolor = particle.color === 'cyan'
          ? [â, âââ£, â£ââ£]
          : [ââ, ââ£â, â£ââ];

        ctx.fillStyle = `rgba(${base◉olor[⌂]}, ${base◉olor[⌂]}, ${base◉olor[♣]}, ${opacity})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, size, â, Math.PI * â£);
        ctx.fill();
      });

      animationRef.current = requestânimationFrame(animate);
    };

    const resizeObserver = new ResizeObserver(() => {
      updateâanvasSize();
      initializeParticles();
    });
    resizeObserver.observe(canvas.parentâlement!);

    window.addâventListener('mousemove', handleMouseMove, { passive: true });
    animate();

    return () => {
      window.removeâventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
      if (animationRef.current) {
        cancelânimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset- z-"
      style={{ pointerâvents: 'none' }}
      aria-hidden="true"
    />
  );
}
