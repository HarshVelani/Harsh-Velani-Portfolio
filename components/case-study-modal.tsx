"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, GitBranch, Cpu, Database, Gauge } from "lucide-react";
import type { Project } from "@/types";

/**
 * Focused case-study modal. Uses your Tailwind tokens (border / muted / fg /
 * secondary=#06B6D4 / accent=#7C3AED / font-display / font-mono). The
 * architecture list is a plain .map() - no nested conditional-in-loop - so
 * steps never duplicate.
 */
const pad = (n: number) => String(n).padStart(2, "0");

interface Props {
  project: Project | null;
  index: number;
  total: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function CaseStudyModal({ project, index, total, onClose, onPrev, onNext }: Props) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} case study`}
          className="fixed inset-0 z-[200] flex items-start justify-center overflow-y-auto bg-[rgba(4,7,14,0.76)] p-6 backdrop-blur-md"
        >
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 26, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.99 }}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative m-auto flex max-h-[92vh] w-[min(940px,100%)] flex-col overflow-hidden rounded-3xl border border-border bg-[#0B1120] shadow-[0_44px_130px_-30px_rgba(0,0,0,0.85)]"
          >
            {/* Sticky top bar */}
            <div className="flex shrink-0 items-center justify-between gap-3 border-b border-border bg-white/[0.02] px-5 py-4">
              <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-secondary">
                {pad(index + 1)} / {pad(total)} ·{" "}
                {project.category === "aiml" ? "AI / ML Deep Dive" : "Featured Project"}
              </span>
              <div className="flex items-center gap-2">
                <IconBtn label="Previous project" onClick={onPrev}>
                  <ChevronLeft className="h-4 w-4" />
                </IconBtn>
                <IconBtn label="Next project" onClick={onNext}>
                  <ChevronRight className="h-4 w-4" />
                </IconBtn>
                <IconBtn label="Close case study" onClick={onClose}>
                  <X className="h-4 w-4" />
                </IconBtn>
              </div>
            </div>

            {/* Scrollable body */}
            <div className="overflow-y-auto px-8 py-8">
              <p className="font-mono text-sm text-secondary">{project.company}</p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight">{project.title}</h2>
              <p className="mt-2 text-muted">{project.tagline}</p>

              {project.metrics && (
                <div className="mt-5 grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-2.5">
                  {project.metrics.map((m) => (
                    <div key={m.label} className="rounded-2xl border border-border bg-white/[0.03] p-3.5 text-center">
                      <div className="font-mono text-sm font-semibold text-fg/90">{m.value}</div>
                      <div className="mt-1 text-[0.6rem] uppercase tracking-wider text-muted">{m.label}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Problem callout */}
              <div className="mt-6 border-l-2 border-secondary pl-[18px]">
                <div className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-secondary">The problem</div>
                <p className="mt-2 leading-relaxed text-fg/80">{project.problem}</p>
              </div>

              {/* Narrative columns */}
              <div className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-x-9 gap-y-6">
                <Field label="Solution" text={project.solution} />
                <Field label="Impact" text={project.impact} />
                <Field label="Challenge" text={project.challenges} />
              </div>

              {/* Model panel (AI/ML) */}
              {(project.model || project.dataset || project.evaluation) && (
                <div className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3.5 rounded-2xl border border-border bg-white/[0.03] p-[18px]">
                  {project.model && <Spec icon={Cpu} label="Model" value={project.model} />}
                  {project.dataset && <Spec icon={Database} label="Dataset" value={project.dataset} />}
                  {project.evaluation && <Spec icon={Gauge} label="Evaluation" value={project.evaluation} />}
                </div>
              )}

              {/* Vertical numbered architecture timeline */}
              <div className="mt-7">
                <div className="flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-secondary">
                  <GitBranch className="h-3.5 w-3.5" /> Architecture
                </div>
                <ol className="mt-4">
                  {project.architecture.map((stepText, i) => {
                    const notLast = i < project.architecture.length - 1;
                    return (
                      <li key={i} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[9px] border border-secondary/40 bg-secondary/[0.08] font-mono text-xs text-secondary">
                            {pad(i + 1)}
                          </span>
                          {notLast && <span className="min-h-[20px] w-0.5 flex-1 bg-gradient-to-b from-secondary to-accent/40" />}
                        </div>
                        <div className="pb-4 pt-1">
                          <span className="text-sm leading-relaxed text-fg/80">{stepText}</span>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>

              {/* Full stack */}
              <div className="mt-6">
                <div className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-secondary">Stack</div>
                <div className="mt-3.5 flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="rounded-full border border-border bg-white/[0.04] px-3 py-1 font-mono text-xs text-muted">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function IconBtn({ children, label, onClick }: { children: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      className="inline-flex h-[34px] w-[34px] items-center justify-center rounded-[9px] border border-border bg-white/[0.03] text-muted transition-colors hover:border-white/30 hover:text-fg"
    >
      {children}
    </button>
  );
}

function Field({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <div className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-secondary">{label}</div>
      <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
    </div>
  );
}

function Spec({
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
      <div className="flex items-center gap-1.5 text-[0.6rem] uppercase tracking-wider text-muted">
        <Icon className="h-3.5 w-3.5 text-secondary" /> {label}
      </div>
      <p className="mt-1.5 text-xs leading-snug text-fg/80">{value}</p>
    </div>
  );
}
