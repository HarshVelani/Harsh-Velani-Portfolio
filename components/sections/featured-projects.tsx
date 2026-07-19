"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/section";
import { ProjectCard } from "@/components/project-card";
import { cn } from "@/lib/utils";
import { projects } from "@/lib/data";

const featured = projects.filter((p) => p.category === "featured");

// Label + the terms each filter matches. Matching runs against the whole
// project (title, tagline, tech, problem, solution) so conceptual filters like
// "RAG" catch projects that never list "RAG" as a raw tech tag.
const FILTERS: { label: string; match: string[] | null }[] = [
  { label: "All", match: null },
  { label: "LangChain & LangGraph", match: ["langchain", "langgraph"] },
  { label: "RAG", match: ["rag", "retrieval", "hybrid search"] },
  { label: "FastAPI", match: ["fastapi"] },
  { label: "VLMs", match: ["vlm"] },
  { label: "MySQL", match: ["mysql"] },
];

const haystack = (p: (typeof featured)[number]) =>
  `${p.title} ${p.tagline} ${p.tech.join(" ")} ${p.problem ?? ""} ${p.solution ?? ""}`.toLowerCase();

export function FeaturedProjects({
  onOpen,
}: {
  onOpen: (slug: string) => void;
}) {
  const [filter, setFilter] = React.useState<string>("All");

  const terms = FILTERS.find((f) => f.label === filter)?.match ?? null;
  const visible = !terms
    ? featured
    : featured.filter((p) => {
        const h = haystack(p);
        return terms.some((t) => h.includes(t));
      });

  return (
    <Section
      id="projects"
      index={4}
      eyebrow="Featured Projects"
      title="Systems, not demos"
      intro="Each of these went end to end. Click any card for the full case study."
    >
      <div className="mb-8 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.label}
            onClick={() => setFilter(f.label)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm transition-all",
              filter === f.label
                ? "border-transparent bg-gradient-to-r from-primary to-accent text-white"
                : "border-border text-muted hover:border-secondary/50 hover:text-fg"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <motion.div layout className="grid gap-6 lg:grid-cols-2">
        {visible.map((p) => (
          <motion.div key={p.slug} layout>
            <ProjectCard project={p} onOpen={onOpen} />
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
