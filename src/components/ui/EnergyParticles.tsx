import { useEffect, useRef } from 'react';

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

const PARTICLE_COUNT = 60;
const CONNECTION_DISTANCE = 120;
const PARTICLE_SIZES = [1.5, 2, 2.5, 3];
const MOUSE_REPEL_DISTANCE = 100;
const PULSE_CHANCE = 0.0005;
const PULSE_DURATION = 2000;

export default function EnergyParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();
  const mouseXRef = useRef(0);
  const mouseYRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // Set canvas size
    const updateCanvasSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    updateCanvasSize();

    // Track mouse position for repulsion
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseXRef.current = e.clientX - rect.left;
      mouseYRef.current = e.clientY - rect.top;
    };

    // Initialize particles with varied sizes and opacity
    const initializeParticles = () => {
      particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => {
        const size = PARTICLE_SIZES[Math.floor(Math.random() * PARTICLE_SIZES.length)];
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          size,
          color: Math.random() > 0.5 ? 'cyan' : 'blue' as 'cyan' | 'blue',
          baseOpacity: 0.3 + Math.random() * 0.4,
        };
      });
    };
    initializeParticles();

    // Animation loop
    const animate = () => {
      // Clear canvas with transparency
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!prefersReducedMotion) {
        // Update particles
        particlesRef.current.forEach((particle) => {
          // Basic drift
          particle.x += particle.vx;
          particle.y += particle.vy;

          // Mouse repulsion
          const dx = particle.x - mouseXRef.current;
          const dy = particle.y - mouseYRef.current;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < MOUSE_REPEL_DISTANCE && distance > 0) {
            const force = (1 - distance / MOUSE_REPEL_DISTANCE) * 0.5;
            particle.vx += (dx / distance) * force;
            particle.vy += (dy / distance) * force;
          }

          // Slight dampening
          particle.vx *= 0.99;
          particle.vy *= 0.99;

          // Bounce off edges
          if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
          if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

          // Keep in bounds
          particle.x = Math.max(0, Math.min(canvas.width, particle.x));
          particle.y = Math.max(0, Math.min(canvas.height, particle.y));

          // Handle pulsing
          if (Math.random() < PULSE_CHANCE) {
            particle.pulseTime = Date.now();
          }
        });

        // Draw connections
        particlesRef.current.forEach((p1, i) => {
          particlesRef.current.slice(i + 1).forEach((p2) => {
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < CONNECTION_DISTANCE) {
              const opacity = 0.2 * (1 - distance / CONNECTION_DISTANCE);
              ctx.strokeStyle = `rgba(6, 182, 212, ${opacity})`;
              ctx.lineWidth = 0.8;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          });
        });
      }

      // Draw particles
      particlesRef.current.forEach((particle) => {
        let opacity = particle.baseOpacity;
        let size = particle.size;

        // Pulse effect
        if (particle.pulseTime) {
          const elapsed = Date.now() - particle.pulseTime;
          if (elapsed > PULSE_DURATION) {
            particle.pulseTime = undefined;
          } else {
            const progress = elapsed / PULSE_DURATION;
            const pulse = Math.sin(progress * Math.PI) * 0.6;
            opacity = particle.baseOpacity + pulse;
            size = particle.size * (1 + pulse * 0.4);
          }
        }

        const baseColor = particle.color === 'cyan'
          ? [6, 182, 212]
          : [59, 130, 246];

        ctx.fillStyle = `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, ${opacity})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    const resizeObserver = new ResizeObserver(() => {
      updateCanvasSize();
      initializeParticles();
    });
    resizeObserver.observe(canvas.parentElement!);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      style={{ pointerEvents: 'none' }}
      aria-hidden="true"
    />
  );
}
