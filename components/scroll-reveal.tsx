"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * ScrollReveal — wrap any block to fade + rise it into view on scroll.
 * Uses Framer Motion's whileInView (no manual IntersectionObserver). Content
 * is never stranded hidden: under prefers-reduced-motion it renders visible
 * with no animation.
 *
 *   <ScrollReveal><h2>…</h2></ScrollReveal>
 *   <ScrollReveal delay={0.12}>…</ScrollReveal>
 */
export function ScrollReveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
