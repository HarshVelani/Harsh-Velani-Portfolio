"use client";

import * as React from "react";
import type { Project } from "@/types";

/**
 * Drives the shared case-study modal: which project is open, prev/next
 * cycling across ALL projects, Escape/Arrow keys, and body scroll-lock.
 *
 * Usage (in a client component, e.g. page wrapper):
 *   const modal = useCaseStudyModal(projects);
 *   <FeaturedProjects onOpen={modal.open} />
 *   <AIProjects onOpen={modal.open} />
 *   <CaseStudyModal project={modal.active} index={modal.index}
 *     total={modal.total} onClose={modal.close} onPrev={modal.prev} onNext={modal.next} />
 */
export function useCaseStudyModal(projects: Project[]) {
  const [openSlug, setOpenSlug] = React.useState<string | null>(null);

  const open = React.useCallback((slug: string) => setOpenSlug(slug), []);
  const close = React.useCallback(() => setOpenSlug(null), []);

  const go = React.useCallback(
    (dir: number) =>
      setOpenSlug((s) => {
        if (!s) return s;
        const i = projects.findIndex((p) => p.slug === s);
        const n = projects.length;
        return projects[(i + dir + n) % n].slug;
      }),
    [projects]
  );
  const prev = React.useCallback(() => go(-1), [go]);
  const next = React.useCallback(() => go(1), [go]);

  const index = openSlug ? projects.findIndex((p) => p.slug === openSlug) : -1;
  const active = index >= 0 ? projects[index] : null;

  React.useEffect(() => {
    if (!openSlug) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [openSlug, close, prev, next]);

  return { openSlug, active, index, total: projects.length, open, close, prev, next };
}
