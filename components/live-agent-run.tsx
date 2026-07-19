"use client";

import * as React from "react";

/**
 * LiveAgentRun (hero panel 3a) - a self-playing agent run.
 *
 * Each cycle randomly picks ONE of three routes (rag / sql / tool), types its
 * query, lights ONLY that path in the graph (triage -> route -> tool -> synth
 * -> out), streams route-specific verbose log lines, then streams the answer.
 * Click to replay. Reduced-motion: renders a static completed run.
 *
 * Pure SVG + refs, no libraries. Colors use var(--accent) with cyan fallback.
 */
type Scn = {
  tool: "rag" | "sql" | "tool";
  q: string;
  intent: string;
  route: string;
  steps: [string, string];
  answer: string;
};

const SCENARIOS: Scn[] = [
  { tool: "rag", q: "How do I rotate an API key?", intent: "support", route: "retriever (RAG)", steps: ["retrieve · 5 chunks · hybrid", "rerank · top_k=3"], answer: "Open Settings, API Keys, then Rotate; update the secret in your env. The old key stays valid for 24h." },
  { tool: "sql", q: "What's my total spend this quarter?", intent: "analytics", route: "sql", steps: ["nl→sql · SELECT sum(amount)", "execute · 1 row · 42ms"], answer: "Q3 spend is $12,480 across 318 invoices, up 9% from Q2." },
  { tool: "tool", q: "Book a demo for next Tuesday 3pm.", intent: "action", route: "calendar", steps: ["tool.call · create_event()", "confirm · slot free"], answer: "Booked. Demo confirmed for Tue 3:00pm; the invite is in your inbox." },
];

const NODES = ["triage", "route", "rag", "sql", "tool", "synth", "out"] as const;
const EDGES = ["triage-route", "route-rag", "route-sql", "route-tool", "rag-synth", "sql-synth", "tool-synth", "synth-out"] as const;

export function LiveAgentRun() {
  const svgRef = React.useRef<SVGSVGElement>(null);
  const logRef = React.useRef<HTMLDivElement>(null);
  const ansRef = React.useRef<HTMLDivElement>(null);
  const qRef = React.useRef<HTMLSpanElement>(null);
  const caretRef = React.useRef<HTMLSpanElement>(null);
  const stop = React.useRef(false);
  const timers = React.useRef<ReturnType<typeof setTimeout>[]>([]);
  const last = React.useRef(-1);
  const [runKey, setRunKey] = React.useState(0);

  React.useEffect(() => {
    stop.current = false;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wait = (ms: number) => new Promise<void>((res) => timers.current.push(setTimeout(res, ms)));
    const svg = svgRef.current!, log = logRef.current!, ans = ansRef.current!, q = qRef.current!, caret = caretRef.current!;
    const setNode = (id: string, s: 0 | 0.5 | 1) => { const el = svg.querySelector(`[data-node="${id}"]`); if (el) { el.setAttribute("fill", s ? "#22D3EE" : "#2563EB"); el.setAttribute("opacity", s === 1 ? "1" : s === 0.5 ? ".55" : ".35"); } };
    const setEdge = (id: string, on: boolean) => { const el = svg.querySelector(`[data-edge="${id}"]`); if (el) { el.setAttribute("stroke", on ? "#22D3EE" : "#2E3A52"); el.setAttribute("stroke-width", on ? "2" : "1.4"); } };
    const reset = () => { NODES.forEach((n) => setNode(n, 0)); EDGES.forEach((e) => setEdge(e, false)); log.innerHTML = ""; ans.textContent = ""; q.textContent = ""; };
    const line = (html: string) => { const d = document.createElement("div"); d.style.animation = "lineIn .4s ease both"; d.innerHTML = html; log.appendChild(d); log.scrollTop = log.scrollHeight; };
    const TK = '<span style="color:#22D3EE">&#9656;</span> ', OK = ' <span style="color:#34D399">&#10003;</span>';
    const pick = () => { let i = (Math.random() * SCENARIOS.length) | 0; if (i === last.current) i = (i + 1) % SCENARIOS.length; last.current = i; return SCENARIOS[i]; };

    const cycle = async () => {
      const sc = pick(), T = sc.tool;
      reset();
      caret.style.display = "inline-block";
      for (let i = 0; i < sc.q.length; i++) { q.textContent = sc.q.slice(0, i + 1); await wait(32); if (stop.current) return; }
      caret.style.display = "none"; await wait(300);
      setNode("triage", 1); line(TK + `<span style="color:#CBD5E1">triage</span> <span style="color:#556074">intent=${sc.intent}</span>` + OK); await wait(520); if (stop.current) return;
      setNode("triage", 0.5); setEdge("triage-route", true); setNode("route", 1); line(TK + `<span style="color:#CBD5E1">route</span> <span style="color:#556074">tool=${sc.route}</span>` + OK); await wait(520); if (stop.current) return;
      setNode("route", 0.5); setEdge(`route-${T}`, true); setNode(T, 1); line(TK + `<span style="color:#CBD5E1">${sc.steps[0]}</span>` + OK); await wait(520); if (stop.current) return;
      line(TK + `<span style="color:#CBD5E1">${sc.steps[1]}</span>` + OK); await wait(520); if (stop.current) return;
      setEdge(`${T}-synth`, true); setNode("synth", 1); line(TK + '<span style="color:#CBD5E1">synthesize</span> <span style="color:#556074">streaming…</span>'); await wait(480); if (stop.current) return;
      setEdge("synth-out", true); setNode("out", 1);
      for (let i = 0; i < sc.answer.length; i++) { ans.textContent = sc.answer.slice(0, i + 1); ans.scrollTop = ans.scrollHeight; await wait(17); if (stop.current) return; }
      await wait(3000); if (!stop.current) cycle();
    };

    if (reduce) { const sc = SCENARIOS[0]; reset(); q.textContent = sc.q; ["triage", "route", "rag", "synth", "out"].forEach((n) => setNode(n, 1)); ["triage-route", "route-rag", "rag-synth", "synth-out"].forEach((e) => setEdge(e, true)); ans.textContent = sc.answer; }
    else cycle();

    return () => { stop.current = true; timers.current.forEach(clearTimeout); timers.current = []; };
  }, [runKey]);

  return (
    <div
      onClick={() => setRunKey((k) => k + 1)}
      title="Click to replay"
      className="relative cursor-pointer overflow-hidden rounded-[20px] border border-border bg-[rgba(13,18,30,0.6)] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)] backdrop-blur-xl"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_30%_0%,rgba(6,182,212,0.12),transparent_70%)]" />
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <Dot c="#ff5f57" /><Dot c="#febc2e" /><Dot c="#28c840" />
        <span className="ml-2 font-mono text-xs text-slate-400">agent_run</span>
        <span className="ml-auto inline-flex items-center gap-1.5 font-mono text-[0.66rem] text-secondary">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-secondary" />live
        </span>
      </div>
      <svg ref={svgRef} viewBox="0 0 400 118" className="block w-full px-1.5 pt-2.5" aria-label="Live agent routing">
        <g stroke="#2E3A52" strokeWidth="1.4" fill="none" strokeLinecap="round">
          <line data-edge="triage-route" x1="42" y1="59" x2="120" y2="59" />
          <line data-edge="route-rag" x1="120" y1="59" x2="210" y2="26" />
          <line data-edge="route-sql" x1="120" y1="59" x2="210" y2="59" />
          <line data-edge="route-tool" x1="120" y1="59" x2="210" y2="92" />
          <line data-edge="rag-synth" x1="210" y1="26" x2="300" y2="59" />
          <line data-edge="sql-synth" x1="210" y1="59" x2="300" y2="59" />
          <line data-edge="tool-synth" x1="210" y1="92" x2="300" y2="59" />
          <line data-edge="synth-out" x1="300" y1="59" x2="366" y2="59" />
        </g>
        <g fontFamily="var(--font-mono),monospace" fontSize="8.5" fill="#7B8698" textAnchor="middle">
          <circle data-node="triage" cx="42" cy="59" r="6" fill="#2563EB" opacity=".35" /><text x="42" y="80">triage</text>
          <circle data-node="route" cx="120" cy="59" r="6" fill="#2563EB" opacity=".35" /><text x="120" y="80">route</text>
          <circle data-node="rag" cx="210" cy="26" r="5.5" fill="#2563EB" opacity=".35" /><text x="210" y="16">rag</text>
          <circle data-node="sql" cx="210" cy="59" r="5.5" fill="#2563EB" opacity=".35" /><text x="236" y="56">sql</text>
          <circle data-node="tool" cx="210" cy="92" r="5.5" fill="#2563EB" opacity=".35" /><text x="210" y="107">tool</text>
          <circle data-node="synth" cx="300" cy="59" r="6" fill="#2563EB" opacity=".35" /><text x="300" y="80">synth</text>
          <circle data-node="out" cx="366" cy="59" r="6" fill="#2563EB" opacity=".35" /><text x="366" y="80">out</text>
        </g>
      </svg>
      <div className="px-4 pb-2 pt-1 font-mono text-[0.74rem] leading-[1.8]">
        <div className="text-slate-500">$ <span ref={qRef} /><span ref={caretRef} className="ml-0.5 hidden h-3 w-[7px] animate-[caretBlink_1s_step-end_infinite] bg-secondary align-[-1px]" style={{ display: "none" }} /></div>
        <div ref={logRef} className="h-[92px] overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" />
      </div>
      <div className="mx-3.5 mb-3.5 h-[84px] overflow-hidden rounded-xl border border-secondary/25 bg-secondary/5 px-3.5 py-2.5">
        <span className="font-mono text-[0.62rem] uppercase tracking-wider text-secondary">answer</span>
        <div ref={ansRef} className="mt-1 max-h-[46px] overflow-y-auto text-[0.86rem] leading-relaxed text-slate-200 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" />
      </div>
    </div>
  );
}

function Dot({ c }: { c: string }) {
  return <span className="h-[11px] w-[11px] rounded-full opacity-85" style={{ background: c }} />;
}
