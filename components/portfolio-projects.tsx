"use client";

import { FeaturedProjects } from "@/components/sections/featured-projects";
import { AIProjects } from "@/components/sections/ai-projects";
import { CaseStudyModal } from "@/components/case-study-modal";
import { useCaseStudyModal } from "@/hooks/use-case-study-modal";
import { projects } from "@/lib/data";

/**
 * Groups both project sections with one shared case-study modal. Clicking any
 * project card opens the modal (prev/next cycles across all projects).
 */
export function PortfolioProjects() {
  const modal = useCaseStudyModal(projects);

  return (
    <>
      <FeaturedProjects onOpen={modal.open} />
      <AIProjects onOpen={modal.open} />
      <CaseStudyModal
        project={modal.active}
        index={modal.index}
        total={modal.total}
        onClose={modal.close}
        onPrev={modal.prev}
        onNext={modal.next}
      />
    </>
  );
}
