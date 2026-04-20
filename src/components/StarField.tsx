import { useEffect, useRef } from "react";

interface Star {
  x: number; y: number;
  vx: number; vy: number;
  ox: number; oy: number;   // original velocity (for restore)
  size: number;
  baseOpacity: number;
  phase: number;
  twinkleSpeed: number;
  r: number; g: number; b: number;
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ── Sizing ──────────────────────────────────────────────────────────────
    let W = 0, H = 0;
    function resize() {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }

    // ── Star state ───────────────────────────────────────────────────────────
    const N_STARS        = 150;
    const MAX_DIST       = 140;   // star-to-star connection distance
    const REPEL_RADIUS   = 130;   // push stars away within this radius
    const CONNECT_RADIUS = 200;   // draw cursor→star lines within this radius
    const MAX_SPEED      = 2.2;

    let stars: Star[] = [];

    function initStars() {
      stars = Array.from({ length: N_STARS }, (_, i) => {
        const cyan = i % 5 === 0;
        const vx = (Math.random() - 0.5) * 0.22;
        const vy = (Math.random() - 0.5) * 0.22;
        return {
          x: Math.random() * W,   y: Math.random() * H,
          vx, vy, ox: vx, oy: vy,
          size: Math.random() * 1.8 + 0.4,
          baseOpacity: Math.random() * 0.55 + 0.25,
          phase: Math.random() * Math.PI * 2,
          twinkleSpeed: Math.random() * 0.012 + 0.004,
          r: cyan ? 100 : 220, g: cyan ? 220 : 235, b: 255,
        };
      });
    }

    // ── Mouse tracking ───────────────────────────────────────────────────────
    const mouse    = { x: -999, y: -999, active: false };
    // Smoothed cursor position (lags slightly behind real mouse)
    let cx = -999, cy = -999;

    // ── Custom cursor element ────────────────────────────────────────────────
    // We draw cursor ABOVE everything in a second overlay div.
    // A canvas with pointer-events:none at very high z-index handles the ring.
    const cursorCanvas = document.createElement("canvas");
    cursorCanvas.style.cssText = [
      "position:fixed","top:0","left:0","width:100%","height:100%",
      "pointer-events:none","z-index:99999",
    ].join(";");
    document.body.appendChild(cursorCanvas);
    const cc = cursorCanvas.getContext("2d")!;

    function resizeCursor() {
      cursorCanvas.width  = window.innerWidth;
      cursorCanvas.height = window.innerHeight;
    }

    // ── Cursor style injection (hide OS cursor) ──────────────────────────────
    const styleEl = document.createElement("style");
    styleEl.id = "star-cursor-hide";
    styleEl.textContent = "html, body, * { cursor: none !important; }";
    document.head.appendChild(styleEl);

    // ── Animation ────────────────────────────────────────────────────────────
    let raf: number;
    let t = 0;

    function draw() {
      t++;
      ctx.clearRect(0, 0, W, H);
      cc.clearRect(0, 0, cursorCanvas.width, cursorCanvas.height);

      // Lerp cursor toward real mouse (smooth lag)
      if (mouse.active) {
        cx += (mouse.x - cx) * 0.13;
        cy += (mouse.y - cy) * 0.13;
      }

      // ── Move stars ────────────────────────────────────────────────────────
      for (const s of stars) {
        if (mouse.active) {
          const dx = s.x - mouse.x;
          const dy = s.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < REPEL_RADIUS * REPEL_RADIUS && d2 > 1) {
            const dist = Math.sqrt(d2);
            const strength = ((REPEL_RADIUS - dist) / REPEL_RADIUS) * 0.5;
            s.vx += (dx / dist) * strength;
            s.vy += (dy / dist) * strength;
          }
        }
        // Damp and restore toward original drift velocity
        s.vx = s.vx * 0.96 + s.ox * 0.04;
        s.vy = s.vy * 0.96 + s.oy * 0.04;
        // Clamp speed
        const spd = Math.sqrt(s.vx * s.vx + s.vy * s.vy);
        if (spd > MAX_SPEED) { s.vx *= MAX_SPEED / spd; s.vy *= MAX_SPEED / spd; }

        s.x += s.vx;  s.y += s.vy;
        if (s.x < -6) s.x = W + 6; else if (s.x > W + 6) s.x = -6;
        if (s.y < -6) s.y = H + 6; else if (s.y > H + 6) s.y = -6;
        s.phase += s.twinkleSpeed;
      }

      // ── Star-to-star constellation lines ─────────────────────────────────
      ctx.lineWidth = 0.5;
      for (let i = 0; i < stars.length - 1; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const d2 = dx * dx + dy * dy;
          if (d2 < MAX_DIST * MAX_DIST) {
            const dist = Math.sqrt(d2);
            const alpha = (1 - dist / MAX_DIST) * 0.22;
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.strokeStyle = `rgba(6,182,212,${alpha.toFixed(3)})`;
            ctx.stroke();
          }
        }
      }

      // ── Cursor → star lines (drawn on star canvas, show through bg) ───────
      if (mouse.active) {
        for (const s of stars) {
          const dx = cx - s.x;
          const dy = cy - s.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < CONNECT_RADIUS * CONNECT_RADIUS) {
            const dist = Math.sqrt(d2);
            const alpha = (1 - dist / CONNECT_RADIUS) * 0.5;
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(s.x, s.y);
            ctx.strokeStyle = `rgba(6,182,212,${alpha.toFixed(3)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // ── Draw stars ────────────────────────────────────────────────────────
      for (const s of stars) {
        const a = s.baseOpacity * (0.3 + 0.7 * Math.abs(Math.sin(s.phase)));
        // Glow halo
        if (s.size > 1.3) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${s.r},${s.g},${s.b},${(a * 0.12).toFixed(3)})`;
          ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.r},${s.g},${s.b},${a.toFixed(3)})`;
        ctx.fill();
      }

      // ── Custom cursor ring (drawn on top canvas) ──────────────────────────
      if (mouse.active) {
        const pulse = 1 + 0.08 * Math.sin(t * 0.08);   // subtle breathing
        const R_OUTER = 16 * pulse;
        const R_INNER = 3.5;

        // Outer glow bloom
        const bloom = cc.createRadialGradient(cx, cy, R_OUTER * 0.4, cx, cy, R_OUTER * 2.2);
        bloom.addColorStop(0, "rgba(6,182,212,0.18)");
        bloom.addColorStop(1, "rgba(6,182,212,0)");
        cc.beginPath();
        cc.arc(cx, cy, R_OUTER * 2.2, 0, Math.PI * 2);
        cc.fillStyle = bloom;
        cc.fill();

        // Outer ring
        cc.beginPath();
        cc.arc(cx, cy, R_OUTER, 0, Math.PI * 2);
        cc.strokeStyle = "rgba(6,182,212,0.92)";
        cc.lineWidth = 1.5;
        cc.stroke();

        // Crosshair tick marks at 4 cardinal points
        const TICK = 4;
        const GAP  = R_OUTER + 3;
        cc.strokeStyle = "rgba(6,182,212,0.6)";
        cc.lineWidth = 1.2;
        [ [0,-1],[0,1],[-1,0],[1,0] ].forEach(([dx,dy])=>{
          cc.beginPath();
          cc.moveTo(cx + dx * GAP,        cy + dy * GAP);
          cc.lineTo(cx + dx * (GAP+TICK), cy + dy * (GAP+TICK));
          cc.stroke();
        });

        // Centre dot
        cc.beginPath();
        cc.arc(cx, cy, R_INNER, 0, Math.PI * 2);
        cc.fillStyle = "rgba(6,182,212,1)";
        cc.fill();

        // Centre glow
        cc.beginPath();
        cc.arc(cx, cy, R_INNER * 2.5, 0, Math.PI * 2);
        cc.fillStyle = "rgba(6,182,212,0.25)";
        cc.fill();
      }

      raf = requestAnimationFrame(draw);
    }

    // ── Init ─────────────────────────────────────────────────────────────────
    resize();
    resizeCursor();
    initStars();
    draw();

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!mouse.active) { cx = e.clientX; cy = e.clientY; }
      mouse.active = true;
    };
    const onLeave = () => { mouse.active = false; };
    const onResize = () => { resize(); resizeCursor(); };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", onResize);
      cursorCanvas.remove();
      styleEl.remove();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
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
