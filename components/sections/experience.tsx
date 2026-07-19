"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { Section } from "@/components/section";
import { Badge } from "@/components/ui/badge";
import { experience } from "@/lib/data";

export function Experience() {
  return (
    <Section
      id="experience"
      index={3}
      eyebrow="Experience"
      title="Where I've shipped"
      intro="A short, dense timeline - three roles, one trajectory toward production AI."
    >
      <div className="relative">
        {/* Vertical spine */}
        <div className="absolute left-4 top-2 h-full w-px bg-gradient-to-b from-primary via-secondary to-accent/40 sm:left-5" />

        <div className="space-y-10">
          {experience.map((role, i) => (
            <motion.div
              key={role.company}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="relative pl-14 sm:pl-16"
            >
              {/* Node */}
              <span className="absolute left-0 top-1 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-elevated text-secondary sm:h-10 sm:w-10">
                <Briefcase className="h-4 w-4" />
              </span>

              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="font-display text-lg font-semibold">
                  {role.role}
                  <span className="text-muted"> · {role.company}</span>
                </h3>
                <span className="font-mono text-xs text-secondary">
                  {role.period}
                </span>
              </div>
              <p className="mt-0.5 text-sm text-muted">{role.location}</p>
              <p className="mt-3 text-sm text-fg/90">{role.summary}</p>

              <ul className="mt-4 space-y-2">
                {role.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-2.5 text-sm text-muted"
                  >
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-secondary" />
                    {h}
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex flex-wrap gap-2">
                {role.tools.map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
