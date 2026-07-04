"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  eyebrow?: string;
  title?: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
  className?: string;
}

/** Section wrapper providing consistent spacing + a scroll-reveal for headers. */
export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  className,
}: SectionProps) {
  return (
    <section id={id} className={cn("scroll-mt-20 py-20 sm:py-28", className)}>
      <div className="container">
        {(eyebrow || title) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mb-12 max-w-2xl"
          >
            {eyebrow && (
              <span className="section-eyebrow">
                <span className="h-px w-6 bg-secondary" />
                {eyebrow}
              </span>
            )}
            {title && (
              <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
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
