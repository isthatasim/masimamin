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
    let stars: Star[] = [];

    function resize() {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }

    function initStars() {
      stars = Array.from({ length: 220 }, (_, i) => {
        // ~15% slightly cyan, rest white
        const cyan = i % 7 === 0;
        // spread across the full page at init, not just viewport
        return {
          x: Math.random() * W,
          y: Math.random() * H,
          // slow drift in a random direction
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          size: Math.random() * 1.6 + 0.3,
          baseOpacity: Math.random() * 0.55 + 0.2,
          phase: Math.random() * Math.PI * 2,
          twinkleSpeed: Math.random() * 0.012 + 0.004,
          r: cyan ? 120 : 255,
          g: cyan ? 230 : 255,
          b: 255,
        };
      });
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);

      for (const s of stars) {
        // drift
        s.x += s.vx;
        s.y += s.vy;
        // wrap around edges seamlessly
        if (s.x < -2)    s.x = W + 2;
        if (s.x > W + 2) s.x = -2;
        if (s.y < -2)    s.y = H + 2;
        if (s.y > H + 2) s.y = -2;

        // twinkle
        s.phase += s.twinkleSpeed;
        const a = s.baseOpacity * (0.25 + 0.75 * Math.abs(Math.sin(s.phase)));

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.r},${s.g},${s.b},${a.toFixed(3)})`;
        ctx.fill();

        // soft glow on larger stars
        if (s.size > 1.2) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${s.r},${s.g},${s.b},${(a * 0.15).toFixed(3)})`;
          ctx.fill();
        }
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
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
