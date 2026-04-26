import { useEffect, useRef } from "react";

interface Star {
  x: number; y: number;
  vx: number; vy: number;
  ox: number; oy: number;
  r: number; size: number;
  opacity: number; phase: number; speed: number;
  color: [number,number,number];
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ── Tuning ───────────────────────────────────────────────────────────────
    const N          = 160;    // star count — elegant, not overwhelming
    const LINK_DIST  = 150;    // star-star connection distance (px)
    const LINK_ALPHA = 0.30;   // max line opacity (subtle)
    const REPEL_R    = 140;    // cursor repulsion radius
    const CONN_R     = 200;    // cursor constellation radius
    const CONN_ALPHA = 0.65;   // cursor-star line brightness
    const MAX_SPEED  = 2.0;

    // Star colour palette — deep space feel
    const PALETTE: [number,number,number][] = [
      [255, 255, 255],   // pure white (most common)
      [200, 230, 255],   // cold blue-white
      [150, 210, 255],   // cyan-blue
      [6,   182, 212],   // cyan accent
      [180, 160, 255],   // soft violet
    ];

    let W = 0, H = 0;
    let stars: Star[] = [];
    const mouse = { x: -999, y: -999, on: false };
    let cx = -999, cy = -999;
    let raf: number, t = 0;

    function resize() {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }

    function initStars() {
      stars = Array.from({ length: N }, () => {
        const col = PALETTE[Math.floor(Math.random() * PALETTE.length)];
        // Mostly tiny stars, a few larger focal points
        const size = Math.random() < 0.15
          ? Math.random() * 1.4 + 1.2   // bright focal star
          : Math.random() * 0.9 + 0.3;  // tiny background star
        const vx = (Math.random() - 0.5) * 0.25;
        const vy = (Math.random() - 0.5) * 0.25;
        return {
          x: Math.random() * W, y: Math.random() * H,
          vx, vy, ox: vx, oy: vy,
          r: 0,
          size,
          opacity: Math.random() * 0.45 + 0.35,
          phase:   Math.random() * Math.PI * 2,
          speed:   Math.random() * 0.01 + 0.003,
          color: col,
        };
      });
    }

    // ── Cursor overlay canvas (top of everything) ────────────────────────────
    const cc_el = document.createElement("canvas");
    cc_el.style.cssText =
      "position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:99999;";
    document.body.appendChild(cc_el);
    const cc = cc_el.getContext("2d")!;

    function resizeCC() { cc_el.width = window.innerWidth; cc_el.height = window.innerHeight; }

    // Hide OS cursor everywhere
    const st = document.createElement("style");
    st.id = "no-cursor";
    st.textContent = "html,body,*{cursor:none!important}";
    document.head.appendChild(st);

    // ── Subtle nebula glow drawn once on background ──────────────────────────
    // We paint a couple of soft radial blobs directly on the star canvas each
    // frame at very low opacity so it adds depth without being distracting.
    function drawNebula() {
      // Top-right soft cyan cloud
      const g1 = ctx.createRadialGradient(W * 0.78, H * 0.18, 0, W * 0.78, H * 0.18, W * 0.32);
      g1.addColorStop(0, "rgba(6,182,212,0.045)");
      g1.addColorStop(1, "rgba(6,182,212,0)");
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, W, H);

      // Bottom-left soft violet cloud
      const g2 = ctx.createRadialGradient(W * 0.14, H * 0.78, 0, W * 0.14, H * 0.78, W * 0.28);
      g2.addColorStop(0, "rgba(139,92,246,0.04)");
      g2.addColorStop(1, "rgba(139,92,246,0)");
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, W, H);

      // Centre faint glow
      const g3 = ctx.createRadialGradient(W * 0.5, H * 0.5, 0, W * 0.5, H * 0.5, W * 0.4);
      g3.addColorStop(0, "rgba(6,182,212,0.02)");
      g3.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g3;
      ctx.fillRect(0, 0, W, H);
    }

    function draw() {
      t++;
      ctx.clearRect(0, 0, W, H);
      cc.clearRect(0, 0, cc_el.width, cc_el.height);

      // Nebula depth layers
      drawNebula();

      // Smooth cursor lag
      if (mouse.on) {
        cx += (mouse.x - cx) * 0.12;
        cy += (mouse.y - cy) * 0.12;
      }

      // ── Move + repel ──────────────────────────────────────────────────────
      for (const s of stars) {
        if (mouse.on) {
          const dx = s.x - mouse.x, dy = s.y - mouse.y;
          const d2 = dx*dx + dy*dy;
          if (d2 < REPEL_R*REPEL_R && d2 > 1) {
            const d   = Math.sqrt(d2);
            const str = ((REPEL_R - d) / REPEL_R) * 0.5;
            s.vx += dx/d * str;
            s.vy += dy/d * str;
          }
        }
        s.vx = s.vx * 0.96 + s.ox * 0.04;
        s.vy = s.vy * 0.96 + s.oy * 0.04;
        const sp = Math.sqrt(s.vx*s.vx + s.vy*s.vy);
        if (sp > MAX_SPEED) { s.vx *= MAX_SPEED/sp; s.vy *= MAX_SPEED/sp; }
        s.x += s.vx; s.y += s.vy;
        if (s.x < -8) s.x = W+8; else if (s.x > W+8) s.x = -8;
        if (s.y < -8) s.y = H+8; else if (s.y > H+8) s.y = -8;
        s.phase += s.speed;
      }

      // ── Star-star lines ───────────────────────────────────────────────────
      ctx.lineWidth = 0.5;
      for (let i = 0; i < stars.length-1; i++) {
        for (let j = i+1; j < stars.length; j++) {
          const dx = stars[i].x-stars[j].x, dy = stars[i].y-stars[j].y;
          const d2 = dx*dx + dy*dy;
          if (d2 < LINK_DIST*LINK_DIST) {
            const alpha = (1 - Math.sqrt(d2)/LINK_DIST) * LINK_ALPHA;
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.strokeStyle = `rgba(6,182,212,${alpha.toFixed(3)})`;
            ctx.stroke();
          }
        }
      }

      // ── Cursor-star lines ─────────────────────────────────────────────────
      if (mouse.on) {
        ctx.lineWidth = 0.9;
        for (const s of stars) {
          const dx = cx-s.x, dy = cy-s.y;
          const d2 = dx*dx + dy*dy;
          if (d2 < CONN_R*CONN_R) {
            const alpha = (1 - Math.sqrt(d2)/CONN_R) * CONN_ALPHA;
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(s.x, s.y);
            ctx.strokeStyle = `rgba(6,182,212,${alpha.toFixed(3)})`;
            ctx.stroke();
          }
        }
      }

      // ── Draw stars ────────────────────────────────────────────────────────
      for (const s of stars) {
        const [r,g,b] = s.color;
        const a = s.opacity * (0.45 + 0.55 * Math.abs(Math.sin(s.phase)));

        // Focal stars get a soft radial glow
        if (s.size > 1.2) {
          const gr = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.size * 5);
          gr.addColorStop(0, `rgba(${r},${g},${b},${(a*0.3).toFixed(3)})`);
          gr.addColorStop(1, `rgba(${r},${g},${b},0)`);
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size * 5, 0, Math.PI*2);
          ctx.fillStyle = gr;
          ctx.fill();
        }

        // Core dot
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI*2);
        ctx.fillStyle = `rgba(${r},${g},${b},${a.toFixed(3)})`;
        ctx.fill();
      }

      // ── Custom cursor (separate top canvas) ───────────────────────────────
      if (mouse.on) {
        const pulse = 1 + 0.07 * Math.sin(t * 0.07);
        const RO    = 15 * pulse;

        // Bloom
        const bl = cc.createRadialGradient(cx, cy, 0, cx, cy, RO * 3.5);
        bl.addColorStop(0,   "rgba(6,182,212,0.18)");
        bl.addColorStop(0.5, "rgba(6,182,212,0.06)");
        bl.addColorStop(1,   "rgba(6,182,212,0)");
        cc.beginPath(); cc.arc(cx, cy, RO*3.5, 0, Math.PI*2);
        cc.fillStyle = bl; cc.fill();

        // Outer ring
        cc.beginPath(); cc.arc(cx, cy, RO, 0, Math.PI*2);
        cc.strokeStyle = "rgba(6,182,212,0.92)";
        cc.lineWidth = 1.4; cc.stroke();

        // 4 tick marks
        const GAP = RO+4, TK = 5;
        cc.strokeStyle = "rgba(6,182,212,0.6)";
        cc.lineWidth = 1.1;
        [[0,-1],[0,1],[-1,0],[1,0]].forEach(([dx,dy])=>{
          cc.beginPath();
          cc.moveTo(cx+dx*GAP,      cy+dy*GAP);
          cc.lineTo(cx+dx*(GAP+TK), cy+dy*(GAP+TK));
          cc.stroke();
        });

        // Centre dot
        cc.beginPath(); cc.arc(cx, cy, 3, 0, Math.PI*2);
        cc.fillStyle = "#06b6d4"; cc.fill();
      }

      raf = requestAnimationFrame(draw);
    }

    resize(); resizeCC(); initStars(); draw();

    const onMove  = (e: MouseEvent) => { mouse.x=e.clientX; mouse.y=e.clientY; if(!mouse.on){cx=e.clientX;cy=e.clientY;} mouse.on=true; };
    const onLeave = () => { mouse.on=false; };
    const onResize= () => { resize(); resizeCC(); };

    window.addEventListener("mousemove",  onMove);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize",     onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove",  onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize",     onResize);
      cc_el.remove(); st.remove();
    };
  }, []);

  return (
    <canvas ref={canvasRef} aria-hidden="true"
      style={{position:"fixed",top:0,left:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:0}}
    />
  );
}
