"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Download, Github, Linkedin, MapPin } from "lucide-react";
import { TypingHeadline } from "@/components/typing-headline";
import { Button } from "@/components/ui/button";
import { identity, contact } from "@/lib/data";
import { siteConfig } from "@/lib/config";

const stats = [
  { value: "1.5+", label: "Years in AI/ML" },
  { value: "9", label: "Production projects" },
  { value: "8.83", label: "M.S. CGPA" },
];

/* Agent orchestration graph (8 nodes / 11 edges). */
const NODES = [
  { id: "triage", x: 210, y: 42, label: "triage" },
  { id: "route", x: 210, y: 112, label: "route" },
  { id: "rag", x: 92, y: 184, label: "rag" },
  { id: "sql", x: 210, y: 184, label: "sql" },
  { id: "tool", x: 328, y: 184, label: "tool" },
  { id: "memory", x: 92, y: 262, label: "memory" },
  { id: "synth", x: 210, y: 256, label: "synth" },
  { id: "out", x: 210, y: 316, label: "out" },
] as const;

const NI = Object.fromEntries(NODES.map((n, i) => [n.id, i])) as Record<string, number>;

const EDGES: [string, string][] = [
  ["triage", "route"],
  ["route", "rag"],
  ["route", "sql"],
  ["route", "tool"],
  ["rag", "synth"],
  ["sql", "synth"],
  ["tool", "synth"],
  ["synth", "out"],
  ["route", "memory"],
  ["memory", "synth"],
  ["rag", "memory"],
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

function AgentTerminal() {
  const tiltRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = tiltRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.style.transition = "transform .25s cubic-bezier(.16,1,.3,1)";
    const onMove = (e: MouseEvent) => {
      if (!window.matchMedia("(min-width:760px)").matches) return;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(1000px) rotateY(${px * 7}deg) rotateX(${-py * 7}deg)`;
    };
    const onLeave = () => {
      el.style.transform = "perspective(1000px) rotateY(0) rotateX(0)";
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={tiltRef}
      className="glass overflow-hidden rounded-2xl border border-border shadow-[0_40px_120px_-40px_rgba(6,182,212,0.35)] [transform-style:preserve-3d]"
    >
      <div className="flex items-center gap-2 border-b border-border bg-white/[0.02] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-2 font-mono text-xs text-dim">agent_orchestrator.py</span>
      </div>

      <div className="p-5">
        <svg viewBox="0 0 420 350" className="w-full" role="img" aria-label="Agent orchestration graph">
          <defs>
            <radialGradient id="hero-node">
              <stop offset="0%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#2563EB" />
            </radialGradient>
          </defs>

          {EDGES.map(([a, b], i) => {
            const s = NODES[NI[a]];
            const t = NODES[NI[b]];
            return (
              <line
                key={`e-${i}`}
                x1={s.x}
                y1={s.y}
                x2={t.x}
                y2={t.y}
                stroke="#06B6D4"
                strokeWidth={1.2}
                strokeDasharray="4 6"
                className="animate-edge-pulse"
                style={{ animationDelay: `${(i % 5) * 0.35}s` }}
              />
            );
          })}

          {NODES.map((n, i) => (
            <g key={n.id}>
              <circle
                cx={n.x}
                cy={n.y}
                r={6}
                fill="url(#hero-node)"
                className="animate-node-breathe"
                style={{ transformBox: "fill-box", transformOrigin: "center", animationDelay: `${(i % 4) * 0.5}s` }}
              />
              <text x={n.x} y={n.y + 18} textAnchor="middle" className="fill-dim font-mono" style={{ fontSize: "9px" }}>
                {n.label}
              </text>
            </g>
          ))}
        </svg>

        <div className="mt-3 space-y-1 font-mono text-[0.7rem] leading-relaxed text-dim">
          <p>
            <span className="text-secondary">graph</span> = StateGraph(AgentState)
          </p>
          <p># triage &rarr; route &rarr; tools &rarr; synth &rarr; out</p>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden pt-28">
      <div className="mx-auto grid w-full max-w-[1200px] items-center gap-12 px-6 lg:grid-cols-[1.15fr_1fr]">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-secondary" />
              </span>
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-secondary">
                Available for AI/ML roles
              </span>
            </span>
          </motion.div>

          <motion.h1 variants={item} className="mt-5 font-display font-bold leading-[1.02] tracking-[-0.02em] text-[clamp(2.9rem,7.2vw,5.4rem)]">
            {identity.name}
          </motion.h1>

          <motion.div variants={item} className="mt-3 font-display text-2xl font-semibold sm:text-3xl">
            <TypingHeadline phrases={identity.roles} />
          </motion.div>

          <motion.p variants={item} className="mt-6 max-w-xl leading-relaxed text-muted">
            {identity.pitch}
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#projects">
              <Button>
                View projects <ArrowUpRight className="h-4 w-4" />
              </Button>
            </a>
            <a href={contact.resume} target="_blank" rel="noopener noreferrer">
              <Button variant="outline">
                <Download className="h-4 w-4" /> Résumé
              </Button>
            </a>
            <a href={contact.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Button variant="ghost" size="icon">
                <Github className="h-5 w-5" />
              </Button>
            </a>
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Button variant="ghost" size="icon">
                <Linkedin className="h-5 w-5" />
              </Button>
            </a>
          </motion.div>

          <motion.div variants={item} className="mt-6 flex items-center gap-1.5 text-sm text-muted">
            <MapPin className="h-4 w-4" /> {contact.location}
          </motion.div>

          <motion.dl variants={item} className="mt-10 flex flex-wrap gap-x-10 gap-y-6">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="font-mono text-3xl font-bold text-fg">{s.value}</dt>
                <dd className="mt-1 text-sm text-muted">{s.label}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {siteConfig.showAgentGraph && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="hidden min-[760px]:block"
          >
            <AgentTerminal />
          </motion.div>
        )}
      </div>
    </section>
  );
}
