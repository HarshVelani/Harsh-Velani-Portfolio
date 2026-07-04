"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/section";
import { ProjectCard } from "@/components/project-card";
import { cn } from "@/lib/utils";
import { projects } from "@/lib/data";

const featured = projects.filter((p) => p.category === "featured");

// Build filter set from the tech that actually appears in featured projects.
const FILTERS = ["All", "LangGraph", "RAG", "FastAPI", "VLMs", "MySQL"] as const;

export function FeaturedProjects() {
  const [filter, setFilter] =
    React.useState<(typeof FILTERS)[number]>("All");

  const visible =
    filter === "All"
      ? featured
      : featured.filter((p) =>
          p.tech.some((t) => t.toLowerCase().includes(filter.toLowerCase()))
        );

  return (
    <Section
      id="projects"
      eyebrow="Featured Projects"
      title="Systems, not demos"
      intro="Each of these went end to end — architecture, backend, and interface. Open any card for the full case study."
    >
      {/* Filter chips */}
      <div className="mb-8 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm transition-all",
              filter === f
                ? "border-transparent bg-gradient-to-r from-primary to-accent text-white"
                : "border-border text-muted hover:border-secondary/50 hover:text-fg"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <motion.div layout className="grid gap-6 lg:grid-cols-2">
        {visible.map((p) => (
          <motion.div key={p.slug} layout>
            <ProjectCard project={p} />
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
