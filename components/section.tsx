"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  index?: number; // section number for the mono eyebrow (e.g. 1 -> "01")
  eyebrow?: string;
  title?: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
  className?: string;
}

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Editorial section wrapper: a mono eyebrow (accent rule + NN / Name) and a
 * Space Grotesk title, with a scroll reveal for the header.
 */
export function Section({
  id,
  index,
  eyebrow,
  title,
  intro,
  children,
  className,
}: SectionProps) {
  return (
    <section id={id} className={cn("scroll-mt-24 py-20 sm:py-28", className)}>
      <div className="mx-auto w-full max-w-[1200px] px-6">
        {(eyebrow || title) && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12 max-w-2xl"
          >
            {eyebrow && (
              <span className="section-eyebrow">
                <span className="h-px w-[26px] bg-secondary" />
                {index != null ? `${pad(index)} / ${eyebrow}` : eyebrow}
              </span>
            )}
            {title && (
              <h2 className="mt-4 font-display font-bold leading-[1.05] tracking-[-0.02em] text-[clamp(1.9rem,3.8vw,2.9rem)]">
                {title}
              </h2>
            )}
            {intro && <p className="mt-4 text-muted">{intro}</p>}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}
