"use client";

import * as React from "react";

/**
 * VectorSearch (hero panel 3b) - cursor-driven RAG retrieval.
 *
 * The cursor is the query point; when idle it drifts slowly on its own. Each
 * frame finds the 5 nearest embeddings, draws links, and renders a ranked
 * similarity list below. Pure canvas, reduced-motion safe, pauses when hidden.
 */
const DOCS = ["billing_faq", "api_keys_07", "reset_flow", "auth_guide", "webhooks", "rate_limits", "sdk_python", "oauth_scopes", "quotas_v2", "errors_ref", "tenancy", "audit_log", "sso_setup", "cache_ttl", "vectors_faq", "gdpr_note"];
const CLUSTERS: [number, number][] = [[0.24, 0.32], [0.72, 0.28], [0.36, 0.72], [0.68, 0.68], [0.5, 0.48]];

export function VectorSearch() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const listRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current!, list = listRef.current!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rgba = (hex: string, a: number) => { const n = parseInt(hex.slice(1), 16); return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`; };
    const pts = Array.from({ length: 44 }, (_, i) => { const c = CLUSTERS[i % CLUSTERS.length]; return { bx: c[0] + (Math.random() - 0.5) * 0.28, by: c[1] + (Math.random() - 0.5) * 0.28, ph: Math.random() * 6.28, doc: DOCS[i % DOCS.length] }; });
    let q: { x: number; y: number } | null = null, t = 0, raf = 0;

    const fit = () => { const w = canvas.clientWidth, h = canvas.clientHeight; canvas.width = Math.floor(w * dpr); canvas.height = Math.floor(h * dpr); const ctx = canvas.getContext("2d")!; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); return { ctx, w, h }; };

    const draw = () => {
      const { ctx, w, h } = fit();
      ctx.clearRect(0, 0, w, h);
      const tt = t * 0.02, at = t * 0.0075; // slow idle drift
      const auto = { x: 0.5 + Math.cos(at) * 0.27, y: 0.5 + Math.sin(at * 1.35) * 0.22 };
      const Q = q || auto, qx = Q.x * w, qy = Q.y * h;
      const arr = pts.map((p) => { const px = p.bx * w + Math.cos(p.ph + tt) * 3, py = p.by * h + Math.sin(p.ph + tt) * 3; const dx = px - qx, dy = py - qy; return { px, py, d: Math.hypot(dx, dy), doc: p.doc }; });
      arr.sort((a, b) => a.d - b.d);
      const near = arr.slice(0, 5), maxd = Math.hypot(w, h);
      ctx.lineCap = "round";
      for (const p of arr) { const isN = near.includes(p); ctx.fillStyle = rgba(isN ? "#22D3EE" : "#2563EB", isN ? 0.95 : 0.32); ctx.beginPath(); ctx.arc(p.px, p.py, isN ? 3.6 : 2.1, 0, 6.283); ctx.fill(); }
      for (const p of near) { ctx.strokeStyle = rgba("#22D3EE", 0.4); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(qx, qy); ctx.lineTo(p.px, p.py); ctx.stroke(); }
      const g = ctx.createRadialGradient(qx, qy, 0, qx, qy, 13); g.addColorStop(0, rgba("#E2E8F0", 0.5)); g.addColorStop(1, rgba("#E2E8F0", 0));
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(qx, qy, 13, 0, 6.283); ctx.fill();
      ctx.fillStyle = "#E2E8F0"; ctx.beginPath(); ctx.arc(qx, qy, 3.4, 0, 6.283); ctx.fill();
      if (t % 6 === 0) list.innerHTML = near.map((p, i) => { const sim = (1 - p.d / maxd).toFixed(2), bw = Math.round((0.4 + (1 - p.d / maxd) * 0.6) * 100); return `<div style="display:flex;align-items:center;gap:8px;margin-bottom:3px"><span style="color:#556074;width:12px">${i + 1}</span><span style="color:#CBD5E1;width:84px">${p.doc}</span><span style="flex:1;height:5px;background:rgba(255,255,255,.06);border-radius:9px;overflow:hidden"><span style="display:block;height:100%;width:${bw}%;background:linear-gradient(90deg,#2563EB,#22D3EE)"></span></span><span style="color:#22D3EE;width:34px;text-align:right">${sim}</span></div>`; }).join("");
    };

    const loop = () => { t++; draw(); raf = requestAnimationFrame(loop); };
    const move = (e: MouseEvent) => { const r = canvas.getBoundingClientRect(); q = { x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height }; };
    const leave = () => { q = null; };
    const onVis = () => { if (document.hidden) { cancelAnimationFrame(raf); raf = 0; } else if (!reduce && !raf) raf = requestAnimationFrame(loop); };
    canvas.addEventListener("mousemove", move); canvas.addEventListener("mouseleave", leave); document.addEventListener("visibilitychange", onVis);
    if (reduce) draw(); else raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); canvas.removeEventListener("mousemove", move); canvas.removeEventListener("mouseleave", leave); document.removeEventListener("visibilitychange", onVis); };
  }, []);

  return (
    <div className="relative overflow-hidden rounded-[20px] border border-border bg-[rgba(13,18,30,0.6)] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)] backdrop-blur-xl">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <span className="h-[11px] w-[11px] rounded-full bg-[#ff5f57] opacity-85" />
        <span className="h-[11px] w-[11px] rounded-full bg-[#febc2e] opacity-85" />
        <span className="h-[11px] w-[11px] rounded-full bg-[#28c840] opacity-85" />
        <span className="ml-2 font-mono text-xs text-slate-400">retriever.query()</span>
        <span className="ml-auto font-mono text-[0.64rem] text-slate-500">move cursor</span>
      </div>
      <canvas ref={canvasRef} className="block h-[180px] w-full cursor-crosshair" />
      <div ref={listRef} className="px-4 pb-1.5 pt-2.5 font-mono text-[0.72rem]" />
      <div className="flex items-center justify-between border-t border-border px-4 pb-3.5 pt-2 font-mono text-[0.66rem] text-slate-500">
        <span>top_k = 5</span><span className="text-secondary">cosine similarity</span>
      </div>
    </div>
  );
}
