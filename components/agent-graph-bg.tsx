"use client";

/**
 * AgentGraphBackground — the site's signature motif.
 *
 * A directed graph of "agent" nodes connected by edges that pulse, echoing the
 * LangGraph / multi-agent orchestration that defines Harsh's work. Rendered as
 * a single inline SVG using CSS keyframe animations (no JS animation loop, no
 * canvas), so it is cheap enough to keep Lighthouse performance above 95 and
 * degrades gracefully under prefers-reduced-motion.
 */

interface Node {
  id: number;
  x: number;
  y: number;
  r: number;
}

// Hand-placed to read as a routing graph rather than random noise.
const NODES: Node[] = [
  { id: 0, x: 120, y: 90, r: 5 },
  { id: 1, x: 300, y: 60, r: 4 },
  { id: 2, x: 470, y: 140, r: 6 },
  { id: 3, x: 210, y: 220, r: 4 },
  { id: 4, x: 400, y: 280, r: 5 },
  { id: 5, x: 600, y: 220, r: 4 },
  { id: 6, x: 720, y: 110, r: 5 },
  { id: 7, x: 560, y: 340, r: 4 },
  { id: 8, x: 90, y: 300, r: 4 },
];

// Directed edges (source → target) forming plausible routing paths.
const EDGES: [number, number][] = [
  [0, 1],
  [1, 2],
  [0, 3],
  [3, 4],
  [2, 5],
  [5, 6],
  [4, 7],
  [3, 8],
  [1, 3],
  [2, 6],
  [4, 5],
];

export function AgentGraphBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {/* Soft drifting gradient wash behind the graph. */}
      <div className="absolute inset-0 animate-gradient-drift bg-[radial-gradient(60%_50%_at_20%_20%,rgba(37,99,235,0.18),transparent),radial-gradient(50%_50%_at_80%_30%,rgba(124,58,237,0.16),transparent),radial-gradient(45%_45%_at_60%_80%,rgba(6,182,212,0.12),transparent)]" />

      <svg
        viewBox="0 0 800 400"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full opacity-70"
      >
        <defs>
          <linearGradient id="edge-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="50%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
          <radialGradient id="node-grad">
            <stop offset="0%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#2563EB" />
          </radialGradient>
        </defs>

        {/* Edges with a traveling dash pulse. */}
        {EDGES.map(([a, b], i) => (
          <line
            key={`e-${i}`}
            x1={NODES[a].x}
            y1={NODES[a].y}
            x2={NODES[b].x}
            y2={NODES[b].y}
            stroke="url(#edge-grad)"
            strokeWidth={1.2}
            strokeDasharray="4 8"
            className="animate-edge-pulse"
            style={{ animationDelay: `${(i % 5) * 0.4}s` }}
          />
        ))}

        {/* Nodes that gently breathe. */}
        {NODES.map((n) => (
          <circle
            key={`n-${n.id}`}
            cx={n.x}
            cy={n.y}
            r={n.r}
            fill="url(#node-grad)"
            className="animate-node-breathe"
            style={{ animationDelay: `${(n.id % 4) * 0.6}s` }}
          />
        ))}
      </svg>

      {/* Fade the motif into the page so text stays readable. */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg/40 to-bg" />
    </div>
  );
}
