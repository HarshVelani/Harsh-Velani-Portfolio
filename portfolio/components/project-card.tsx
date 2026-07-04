"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  Github,
  ExternalLink,
  FileText,
  GitBranch,
  Cpu,
  Database,
  Gauge,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

/**
 * ProjectCard renders a project summary that expands to a full case study.
 * When AI/ML fields (model/dataset/evaluation) are present it also surfaces a
 * model panel, so one component serves both project sections.
 */
export function ProjectCard({ project }: { project: Project }) {
  const [open, setOpen] = React.useState(false);
  const contentId = `project-${project.slug}`;
  const isAiml = project.category === "aiml";

  return (
    <Card className="flex h-full flex-col hover:-translate-y-1">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs text-secondary">{project.company}</p>
          <h3 className="mt-1 font-display text-xl font-semibold">
            {project.title}
          </h3>
          <p className="mt-1 text-sm text-muted">{project.tagline}</p>
        </div>
      </div>

      {/* Metrics row (if present) */}
      {project.metrics && (
        <div className="mt-4 grid grid-cols-3 gap-2">
          {project.metrics.map((m) => (
            <div
              key={m.label}
              className="rounded-xl border border-border bg-elevated/40 p-3 text-center"
            >
              <div className="font-mono text-sm font-semibold text-fg">
                {m.value}
              </div>
              <div className="mt-0.5 text-[0.65rem] uppercase tracking-wide text-muted">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Problem → always visible */}
      <p className="mt-4 text-sm leading-relaxed text-muted">
        {project.problem}
      </p>

      {/* Tech tags */}
      <div className="mt-4 flex flex-wrap gap-2">
        {project.tech.slice(0, 6).map((t) => (
          <Badge key={t}>{t}</Badge>
        ))}
        {project.tech.length > 6 && (
          <Badge>+{project.tech.length - 6}</Badge>
        )}
      </div>

      {/* Expandable case study */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={contentId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden"
          >
            <div className="mt-5 space-y-4 border-t border-border pt-5 text-sm">
              <Detail label="Solution" text={project.solution} />
              <Detail label="Impact" text={project.impact} />
              <Detail label="Challenge" text={project.challenges} />

              {/* AI/ML model panel */}
              {isAiml && (project.model || project.dataset || project.evaluation) && (
                <div className="grid gap-3 rounded-xl border border-border bg-elevated/40 p-4 sm:grid-cols-3">
                  {project.model && (
                    <ModelBit icon={Cpu} label="Model" value={project.model} />
                  )}
                  {project.dataset && (
                    <ModelBit
                      icon={Database}
                      label="Dataset"
                      value={project.dataset}
                    />
                  )}
                  {project.evaluation && (
                    <ModelBit
                      icon={Gauge}
                      label="Evaluation"
                      value={project.evaluation}
                    />
                  )}
                </div>
              )}

              {/* Architecture pipeline */}
              <div>
                <p className="mb-2 flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-secondary">
                  <GitBranch className="h-3.5 w-3.5" /> Architecture
                </p>
                <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-2">
                  {project.architecture.map((step, i) => (
                    <li key={step} className="flex items-center gap-1.5">
                      <span className="rounded-lg border border-border bg-elevated/60 px-2.5 py-1 text-xs text-fg/90">
                        {step}
                      </span>
                      {i < project.architecture.length - 1 && (
                        <span className="text-muted">→</span>
                      )}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer actions */}
      <div className="mt-auto flex items-center justify-between gap-2 pt-5">
        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={contentId}
          className="inline-flex items-center gap-1 text-sm font-medium text-secondary transition-colors hover:text-fg"
        >
          {open ? "Show less" : "Case study"}
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform",
              open && "rotate-180"
            )}
          />
        </button>

        <div className="flex items-center gap-1">
          <LinkBtn href={project.links?.github} label="GitHub">
            <Github className="h-4 w-4" />
          </LinkBtn>
          <LinkBtn href={project.links?.demo} label="Live demo">
            <ExternalLink className="h-4 w-4" />
          </LinkBtn>
          <LinkBtn href={project.links?.caseStudy} label="Case study doc">
            <FileText className="h-4 w-4" />
          </LinkBtn>
        </div>
      </div>
    </Card>
  );
}

function Detail({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <span className="font-mono text-xs uppercase tracking-wide text-secondary">
        {label}
      </span>
      <p className="mt-1 leading-relaxed text-muted">{text}</p>
    </div>
  );
}

function ModelBit({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="flex items-center gap-1.5 text-[0.65rem] uppercase tracking-wide text-muted">
        <Icon className="h-3.5 w-3.5" /> {label}
      </p>
      <p className="mt-1 text-xs text-fg/90">{value}</p>
    </div>
  );
}

/** Renders a disabled-looking icon button when no link exists yet. */
function LinkBtn({
  href,
  label,
  children,
}: {
  href?: string;
  label: string;
  children: React.ReactNode;
}) {
  if (!href) {
    return (
      <span
        className="inline-flex h-9 w-9 cursor-not-allowed items-center justify-center rounded-lg text-muted/40"
        title={`${label} — coming soon`}
        aria-hidden
      >
        {children}
      </span>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
      <Button variant="ghost" size="icon">
        {children}
      </Button>
    </a>
  );
}
