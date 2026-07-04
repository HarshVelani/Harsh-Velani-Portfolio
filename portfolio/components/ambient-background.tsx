"use client";

import { useEffect, useRef } from "react";

/**
 * AmbientBackground - the hero's signature atmosphere.
 *
 * A sparse field of small drifting dashes, evoking points in an embedding /
 * latent space (a nod to the vector databases at the core of the stack).
 * Inspired by Google Antigravity's landing field, tuned down: low density,
 * slow drift, no connecting lines.
 *
 * Cursor interaction: dashes within a radius of the pointer are pushed
 * outward, rotate to orient around it (like iron filings around a magnet),
 * and brighten. Displacement is spring-damped, so everything eases back to
 * rest when the pointer leaves. The whole effect is skipped for reduced-motion
 * users and pauses while the tab is hidden.
 *
 * Tunables (top of the effect): INTERACT_RADIUS, PUSH, SPRING, DAMP.
 */

const COLORS = ["#2563EB", "#06B6D4", "#7C3AED"];

interface Dash {
  homeX: number;
  homeY: number;
  vx: number;
  vy: number;
  baseAngle: number;
  len: number;
  alpha: number;
  twinkle: number;
  twinkleSpeed: number;
  color: string;
  width: number;
  offX: number;
  offY: number;
  offVx: number;
  offVy: number;
  falloff: number; // 0..1 proximity to cursor, computed each frame
}

function hexToRgba(hex: string, a: number): string {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
}

export function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !parent || !ctx) return;

    // ---- Interaction tunables ----
    const INTERACT_RADIUS = 150; // px around the cursor that feels the push
    const PUSH = 0.6; // outward acceleration strength
    const SPRING = 0.06; // pull back toward rest position
    const DAMP = 0.82; // velocity damping (keeps it stable)

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let dashes: Dash[] = [];
    let raf = 0;

    // Cursor state (in CSS px relative to the canvas). Starts inactive.
    let cx = -9999;
    let cy = -9999;
    let active = false;
    let rect = parent.getBoundingClientRect();

    const dashCount = () =>
      Math.min(90, Math.max(26, Math.round((width * height) / 16000)));

    const makeDash = (): Dash => {
      const dir = -Math.PI / 3 + (Math.random() - 0.5) * 1.2;
      const speed = 0.05 + Math.random() * 0.12;
      return {
        homeX: Math.random() * width,
        homeY: Math.random() * height,
        vx: Math.cos(dir) * speed,
        vy: Math.sin(dir) * speed,
        baseAngle: Math.random() * Math.PI,
        len: 6 + Math.random() * 10,
        alpha: 0.16 + Math.random() * 0.34,
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.005 + Math.random() * 0.01,
        color: COLORS[(Math.random() * COLORS.length) | 0],
        width: Math.random() < 0.2 ? 1.6 : 1,
        offX: 0,
        offY: 0,
        offVx: 0,
        offVy: 0,
        falloff: 0,
      };
    };

    const seed = () => {
      dashes = Array.from({ length: dashCount() }, makeDash);
    };

    const resize = () => {
      rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const step = () => {
      const margin = 24;
      for (const d of dashes) {
        // Ambient drift of the rest position, wrapping at the edges.
        d.homeX += d.vx;
        d.homeY += d.vy;
        if (d.homeX < -margin) d.homeX = width + margin;
        else if (d.homeX > width + margin) d.homeX = -margin;
        if (d.homeY < -margin) d.homeY = height + margin;
        else if (d.homeY > height + margin) d.homeY = -margin;

        const x = d.homeX + d.offX;
        const y = d.homeY + d.offY;

        // Cursor repulsion.
        d.falloff = 0;
        if (active) {
          const dx = x - cx;
          const dy = y - cy;
          const dist = Math.hypot(dx, dy);
          if (dist > 0 && dist < INTERACT_RADIUS) {
            const f = 1 - dist / INTERACT_RADIUS;
            d.falloff = f;
            const push = f * PUSH;
            d.offVx += (dx / dist) * push;
            d.offVy += (dy / dist) * push;
          }
        }

        // Spring back to rest + damping.
        d.offVx += -d.offX * SPRING;
        d.offVy += -d.offY * SPRING;
        d.offVx *= DAMP;
        d.offVy *= DAMP;
        d.offX += d.offVx;
        d.offY += d.offVy;

        d.twinkle += d.twinkleSpeed;
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.lineCap = "round";
      for (const d of dashes) {
        const x = d.homeX + d.offX;
        const y = d.homeY + d.offY;
        const f = d.falloff;

        // Orientation: blend the dash's base direction toward pointing away
        // from the cursor as it gets closer. Blending vectors (not angles)
        // sidesteps wraparound; a dash is symmetric so direction sign is moot.
        let dirX = Math.cos(d.baseAngle);
        let dirY = Math.sin(d.baseAngle);
        if (active && f > 0) {
          let ax = x - cx;
          let ay = y - cy;
          const m = Math.hypot(ax, ay) || 1;
          ax /= m;
          ay /= m;
          dirX = dirX * (1 - f) + ax * f;
          dirY = dirY * (1 - f) + ay * f;
          const dm = Math.hypot(dirX, dirY) || 1;
          dirX /= dm;
          dirY /= dm;
        }

        const len = d.len * (1 + f * 0.4); // grow slightly near cursor
        const alpha =
          d.alpha * (0.6 + 0.4 * Math.sin(d.twinkle)) * (1 + f * 0.9); // brighten near cursor

        ctx.strokeStyle = hexToRgba(d.color, Math.min(alpha, 1));
        ctx.lineWidth = d.width;
        const hx = (dirX * len) / 2;
        const hy = (dirY * len) / 2;
        ctx.beginPath();
        ctx.moveTo(x - hx, y - hy);
        ctx.lineTo(x + hx, y + hy);
        ctx.stroke();
      }
    };

    const loop = () => {
      step();
      draw();
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: MouseEvent) => {
      cx = e.clientX - rect.left;
      cy = e.clientY - rect.top;
      active =
        cx >= 0 && cx <= width && cy >= 0 && cy <= height;
    };

    const onLeave = () => {
      active = false;
    };

    const onScroll = () => {
      rect = parent.getBoundingClientRect();
    };

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else if (!reduce && !raf) {
        raf = requestAnimationFrame(loop);
      }
    };

    resize();

    if (reduce) {
      draw(); // one static frame, no animation, no interaction
    } else {
      window.addEventListener("mousemove", onMove, { passive: true });
      window.addEventListener("mouseleave", onLeave);
      window.addEventListener("scroll", onScroll, { passive: true });
      document.addEventListener("visibilitychange", onVisibility);
      raf = requestAnimationFrame(loop);
    }

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
      clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {/* Soft drifting gradient wash for depth behind the dashes. */}
      <div className="absolute inset-0 animate-gradient-drift bg-[radial-gradient(60%_50%_at_20%_20%,rgba(37,99,235,0.16),transparent),radial-gradient(50%_50%_at_80%_30%,rgba(124,58,237,0.14),transparent),radial-gradient(45%_45%_at_60%_80%,rgba(6,182,212,0.10),transparent)]" />

      {/* The interactive dash field. */}
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Fade the field into the page so text stays readable. */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg/30 to-bg" />
    </div>
  );
}
