import { useEffect, useRef } from "react";

interface Star {
  x: number; y: number;
  vx: number; vy: number;
  size: number;
  baseOpacity: number;
  phase: number;
  twinkleSpeed: number;
  r: number; g: number; b: number;
}

export default function StarField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let W = 0, H = 0;
    const MAX_DIST = 140;   // px — max distance to draw a connection line
    const N_STARS  = 140;   // fewer stars = manageable O(n²) line checks

    let stars: Star[] = [];

    function resize() {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }

    function initStars() {
      stars = Array.from({ length: N_STARS }, (_, i) => {
        const cyan = i % 6 === 0;
        return {
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          size: Math.random() * 1.8 + 0.4,
          baseOpacity: Math.random() * 0.55 + 0.25,
          phase: Math.random() * Math.PI * 2,
          twinkleSpeed: Math.random() * 0.012 + 0.004,
          r: cyan ? 110 : 230,
          g: cyan ? 225 : 240,
          b: 255,
        };
      });
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);

      // ── Move stars ──
      for (const s of stars) {
        s.x += s.vx;
        s.y += s.vy;
        if (s.x < -5)    s.x = W + 5;
        if (s.x > W + 5) s.x = -5;
        if (s.y < -5)    s.y = H + 5;
        if (s.y > H + 5) s.y = -5;
        s.phase += s.twinkleSpeed;
      }

      // ── Draw connection lines between nearby stars (constellation effect) ──
      ctx.lineWidth = 0.5;
      for (let i = 0; i < stars.length - 1; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          // Use squared distance to avoid sqrt until we know it's close enough
          const d2 = dx * dx + dy * dy;
          if (d2 < MAX_DIST * MAX_DIST) {
            const dist = Math.sqrt(d2);
            // Line fades out as stars get farther apart
            const alpha = (1 - dist / MAX_DIST) * 0.22;
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.strokeStyle = `rgba(6,182,212,${alpha.toFixed(3)})`;
            ctx.stroke();
          }
        }
      }

      // ── Draw stars on top of lines ──
      for (const s of stars) {
        const a = s.baseOpacity * (0.3 + 0.7 * Math.abs(Math.sin(s.phase)));

        // Glow halo for larger stars
        if (s.size > 1.3) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${s.r},${s.g},${s.b},${(a * 0.12).toFixed(3)})`;
          ctx.fill();
        }

        // Star dot
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.r},${s.g},${s.b},${a.toFixed(3)})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    }

    resize();
    initStars();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0, left: 0,
        width: "100%", height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
