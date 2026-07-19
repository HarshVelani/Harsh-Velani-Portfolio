"use client";

import { useEffect, useRef } from "react";

/**
 * AmbientBackground - a page-wide "neural field" (inspired by Google
 * Antigravity's whole-page particle system, tuned for AI/ML content).
 *
 * - Uniform, edge-to-edge particles that drift gently UPWARD ("anti-gravity")
 *   and wrap; a free-flowing constellation of nearest-neighbour links.
 * - Cursor repulsion (particles push away, spring back).
 * - A periodic RAG / vector-search pulse: a random "query" point lights up,
 *   connects to its nearest neighbours, and an expanding similarity ring pulses
 *   out, then fades (~every 6s).
 *
 * Pure canvas, capped by viewport area, ResizeObserver-sized (robust to late
 * layout), paused when the tab is hidden, single static frame under
 * prefers-reduced-motion. Drop-in replacement for components/ambient-background.tsx.
 */
interface Props {
  accent?: string;
  enabled?: boolean;
}

export function AmbientBackground({ accent = "#06B6D4", enabled = true }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !enabled) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const COLORS = [accent, "#2563EB", "#7C3AED"];
    const rgba = (hex: string, a: number) => {
      const n = parseInt(hex.slice(1), 16);
      return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
    };

    type P = { x: number; y: number; vx: number; vy: number; r: number; c: string; tw: number; ts: number; ox: number; oy: number; ovx: number; ovy: number };
    let W = 0, H = 0, pts: P[] = [], cx = -9999, cy = -9999, active = false, raf = 0;
    let qIdx = -1, qClock = 0, qNbr: number[] = [];
    const R = 150, LINKD = 132;

    const rnd = (a: number, b: number) => a + Math.random() * (b - a);
    const count = () => Math.min(190, Math.max(60, Math.round((W * H) / 9000)));
    const make = (): P => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: rnd(-0.07, 0.07), vy: rnd(-0.12, -0.02), // drift upward, slow
      r: rnd(0.6, 1.9), c: COLORS[(Math.random() * COLORS.length) | 0],
      tw: Math.random() * 6.28, ts: 0.003 + Math.random() * 0.006,
      ox: 0, oy: 0, ovx: 0, ovy: 0,
    });
    const seed = () => { pts = Array.from({ length: count() }, make); qIdx = -1; qClock = 0; };
    const resize = () => {
      // Only react to real VIEWPORT changes. The canvas is fixed to the
      // viewport, but the observer also fires when page height changes (e.g.
      // the hero's live panels stream text and grow/shrink). Reseeding on those
      // made the whole field jump. Bail out when width/height are unchanged.
      const nw = window.innerWidth, nh = window.innerHeight;
      if (nw === W && nh === H) return;
      W = nw; H = nh;
      canvas.width = Math.floor(W * dpr); canvas.height = Math.floor(H * dpr);
      canvas.style.width = W + "px"; canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); seed();
    };

    const step = () => {
      const m = 20;
      for (const d of pts) {
        d.x += d.vx; d.y += d.vy;
        if (d.x < -m) d.x = W + m; else if (d.x > W + m) d.x = -m;
        if (d.y < -m) d.y = H + m; else if (d.y > H + m) d.y = -m;
        if (active) {
          const px = d.x + d.ox, py = d.y + d.oy, dx = px - cx, dy = py - cy, dist = Math.hypot(dx, dy);
          if (dist > 0 && dist < R) { const f = (1 - dist / R) * 0.55; d.ovx += (dx / dist) * f; d.ovy += (dy / dist) * f; }
        }
        d.ovx += -d.ox * 0.05; d.ovy += -d.oy * 0.05; d.ovx *= 0.86; d.ovy *= 0.86;
        d.ox += d.ovx; d.oy += d.ovy; d.tw += d.ts;
      }
      // RAG retrieval pulse: new query ~every 380 frames
      qClock++;
      if (qIdx < 0 || qClock > 380) {
        qClock = 0; qIdx = pts.length ? (Math.random() * pts.length) | 0 : -1;
        if (qIdx >= 0) {
          const q = pts[qIdx], qx = q.x + q.ox, qy = q.y + q.oy;
          const arr: [number, number][] = [];
          for (let i = 0; i < pts.length; i++) {
            if (i === qIdx) continue;
            const b = pts[i], dx = (b.x + b.ox) - qx, dy = (b.y + b.oy) - qy;
            arr.push([i, dx * dx + dy * dy]);
          }
          arr.sort((a, b) => a[1] - b[1]);
          qNbr = arr.slice(0, 5).map((a) => a[0]);
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H); ctx.lineCap = "round";
      const n = pts.length, L2 = LINKD * LINKD;
      for (let i = 0; i < n; i++) {
        const a = pts[i], ax = a.x + a.ox, ay = a.y + a.oy;
        for (let j = i + 1; j < n; j++) {
          const b = pts[j], bx = b.x + b.ox, by = b.y + b.oy, dx = ax - bx, dy = ay - by, d2 = dx * dx + dy * dy;
          if (d2 < L2) {
            const al = (1 - Math.sqrt(d2) / LINKD) * 0.16;
            if (al > 0.012) { ctx.strokeStyle = rgba(a.c, al); ctx.lineWidth = 0.6; ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.stroke(); }
          }
        }
      }
      for (let i = 0; i < n; i++) {
        const p = pts[i], x = p.x + p.ox, y = p.y + p.oy;
        ctx.fillStyle = rgba(p.c, 0.28 + 0.32 * (0.5 + 0.5 * Math.sin(p.tw)));
        ctx.beginPath(); ctx.arc(x, y, p.r, 0, 6.283); ctx.fill();
      }
      if (qIdx >= 0 && qIdx < pts.length) {
        const ph = qClock, ramp = Math.min(ph / 20, 1), fade = 1 - Math.max(0, (ph - 120) / 55), pulse = Math.max(0, ramp * fade);
        if (pulse > 0.02) {
          const q = pts[qIdx], AC = COLORS[0], qx = q.x + q.ox, qy = q.y + q.oy;
          for (const ni of qNbr) {
            const b = pts[ni]; if (!b) continue;
            const bx = b.x + b.ox, by = b.y + b.oy;
            ctx.strokeStyle = rgba(AC, pulse * 0.5); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(qx, qy); ctx.lineTo(bx, by); ctx.stroke();
            ctx.fillStyle = rgba(AC, pulse * 0.8); ctx.beginPath(); ctx.arc(bx, by, 2.4, 0, 6.283); ctx.fill();
          }
          const g = ctx.createRadialGradient(qx, qy, 0, qx, qy, 12);
          g.addColorStop(0, rgba(AC, pulse * 0.5)); g.addColorStop(1, rgba(AC, 0));
          ctx.fillStyle = g; ctx.beginPath(); ctx.arc(qx, qy, 12, 0, 6.283); ctx.fill();
          ctx.fillStyle = rgba(AC, Math.min(pulse, 0.95)); ctx.beginPath(); ctx.arc(qx, qy, 3.2, 0, 6.283); ctx.fill();
          ctx.strokeStyle = rgba(AC, pulse * 0.4); ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(qx, qy, 6 + ph * 0.5, 0, 6.283); ctx.stroke();
        }
      }
    };

    const loop = () => { step(); draw(); raf = requestAnimationFrame(loop); };
    const onMove = (e: MouseEvent) => { cx = e.clientX; cy = e.clientY; active = true; };
    const onLeave = () => { active = false; };
    const onVis = () => {
      if (document.hidden) { cancelAnimationFrame(raf); raf = 0; }
      else if (!reduce && !raf) { raf = requestAnimationFrame(loop); }
    };
    let rt: ReturnType<typeof setTimeout>;
    const onResize = () => { clearTimeout(rt); rt = setTimeout(() => { resize(); if (reduce) draw(); }, 150); };

    resize();
    let ro: ResizeObserver | undefined;
    if (reduce) { draw(); }
    else {
      window.addEventListener("mousemove", onMove, { passive: true });
      window.addEventListener("mouseleave", onLeave);
      document.addEventListener("visibilitychange", onVis);
      raf = requestAnimationFrame(loop);
    }
    window.addEventListener("resize", onResize);
    if ("ResizeObserver" in window) { ro = new ResizeObserver(() => onResize()); ro.observe(document.documentElement); }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("resize", onResize);
      ro?.disconnect();
      clearTimeout(rt);
    };
  }, [accent, enabled]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(58%_48%_at_14%_12%,rgba(37,99,235,0.11),transparent_62%),radial-gradient(52%_50%_at_86%_20%,rgba(124,58,237,0.09),transparent_62%),radial-gradient(50%_46%_at_62%_92%,rgba(6,182,212,0.07),transparent_60%)]" />
      <canvas ref={ref} className="absolute inset-0" />
    </div>
  );
}
