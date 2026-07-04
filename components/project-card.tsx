"use client";

import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/types";

/**
 * Project preview card. The whole card is clickable and opens the shared
 * case-study modal (no inline expansion). Shows company, title, tagline,
 * metric tiles, the problem, and the first six technologies.
 */
export function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: (slug: string) => void;
}) {
  return (
    <Card
      role="button"
      tabIndex={0}
      onClick={() => onOpen(project.slug)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(project.slug);
        }
      }}
      aria-label={`Open case study: ${project.title}`}
      className="flex h-full cursor-pointer flex-col"
    >
      <p className="font-mono text-xs text-secondary">{project.company}</p>
      <h3 className="mt-1 font-display text-xl font-semibold">
        {project.title}
      </h3>
      <p className="mt-1 text-sm text-muted">{project.tagline}</p>

      {project.metrics && (
        <div className="mt-4 grid grid-cols-3 gap-2">
          {project.metrics.map((m) => (
            <div
              key={m.label}
              className="rounded-xl border border-border bg-white/[0.03] p-3 text-center"
            >
              <div className="font-mono text-sm font-semibold text-fg/90">
                {m.value}
              </div>
              <div className="mt-0.5 text-[0.6rem] uppercase tracking-wide text-muted">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="mt-4 text-sm leading-relaxed text-muted">
        {project.problem}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.tech.slice(0, 6).map((t) => (
          <Badge key={t}>{t}</Badge>
        ))}
        {project.tech.length > 6 && <Badge>+{project.tech.length - 6}</Badge>}
      </div>

      <div className="mt-auto flex items-center gap-1.5 pt-5 font-medium text-secondary transition-colors group-hover:text-fg">
        Read case study
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </div>
    </Card>
  );
}
