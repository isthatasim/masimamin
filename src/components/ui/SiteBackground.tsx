/**
 * SiteBackground — full-viewport fixed canvas
 * Renders a subtle animated node-link network mesh inspired by
 * scientific/engineering visualization aesthetics.
 * z-index: 0, pointer-events: none, opacity: 0.55
 * Sections sit above this on z-10.
 * Respects prefers-reduced-motion.
 */
import { useEffect, useRef } from 'react';

interface MeshNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  opacity: number;
  phase: number;
  kind: 0 | 1 | 2; // 0=cyan, 1=indigo, 2=blue
}

const COUNT = 65;
const MAX_LINK = 170;
const SPEED = 0.18;

function mkNodes(w: number, h: number): MeshNode[] {
  return Array.from({ length: COUNT }, () => {
    const kind = (Math.random() < 0.55 ? 0 : Math.random() < 0.6 ? 1 : 2) as 0 | 1 | 2;
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * SPEED,
      vy: (Math.random() - 0.5) * SPEED,
      r: 0.8 + Math.random() * 1.8,
      opacity: 0.18 + Math.random() * 0.30,
      phase: Math.random() * Math.PI * 2,
      kind,
    };
  });
}

const COLORS = [
  [6,  182, 212],  // cyan-500
  [99, 102, 241],  // indigo-500
  [59, 130, 246],  // blue-500
];

export default function SiteBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 0, H = 0;
    let nodes: MeshNode[] = [];
    let raf = 0;
    let t = 0;
    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width  = W;
      canvas.height = H;
      nodes = mkNodes(W, H);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    const onMouse = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', onMouse, { passive: true });

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      t += 0.004;

      // subtle dot-grid overlay
      ctx.fillStyle = 'rgba(6,182,212,0.025)';
      const step = 72;
      for (let gx = step; gx < W; gx += step) {
        for (let gy = step; gy < H; gy += step) {
          ctx.beginPath();
          ctx.arc(gx, gy, 0.7, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Move nodes
      nodes.forEach(n => {
        n.x += n.vx;
        n.y += n.vy;
        // Soft bounce
        if (n.x < 0)  { n.x = 0;  n.vx *= -1; }
        if (n.x > W)  { n.x = W;  n.vx *= -1; }
        if (n.y < 0)  { n.y = 0;  n.vy *= -1; }
        if (n.y > H)  { n.y = H;  n.vy *= -1; }
        // Gentle mouse attract
        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < 220 && d > 0) {
          const f = (1 - d / 220) * 0.0008;
          n.vx += (dx / d) * f;
          n.vy += (dy / d) * f;
        }
        // Dampen
        n.vx *= 0.9985;
        n.vy *= 0.9985;
        const spd = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
        if (spd > SPEED * 1.8) { n.vx = (n.vx / spd) * SPEED * 1.8; n.vy = (n.vy / spd) * SPEED * 1.8; }
      });

      // Edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < MAX_LINK) {
            const alpha = (1 - d / MAX_LINK) * 0.09;
            const [r, g, bv] = COLORS[a.kind];
            ctx.strokeStyle = `rgba(${r},${g},${bv},${alpha})`;
            ctx.lineWidth   = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Nodes
      nodes.forEach(n => {
        const pulse   = 0.85 + 0.15 * Math.sin(t * 1.2 + n.phase);
        const opacity = n.opacity * pulse;
        const [r, g, b] = COLORS[n.kind];
        ctx.fillStyle = `rgba(${r},${g},${b},${opacity})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * (0.9 + 0.1 * pulse), 0, Math.PI * 2);
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouse);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, opacity: 0.55 }}
    />
  );
}
