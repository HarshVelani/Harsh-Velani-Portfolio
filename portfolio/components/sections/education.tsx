"use client";

import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { GraduationCap, BadgeCheck } from "lucide-react";
import { Section } from "@/components/section";
import { Card } from "@/components/ui/card";
import { education, achievements, certifications } from "@/lib/data";

function DynIcon({ name, className }: { name: string; className?: string }) {
  const C = (Icons as unknown as Record<string, LucideIcon>)[name] ?? Icons.Star;
  return <C className={className} />;
}

export function Education() {
  return (
    <Section
      id="education"
      eyebrow="Education & Credentials"
      title="Foundations"
    >
      {/* Achievements */}
      <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {achievements.map((a, i) => (
          <motion.div
            key={a.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: (i % 4) * 0.07 }}
          >
            <Card className="h-full text-center hover:-translate-y-1">
              <span className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 text-secondary">
                <DynIcon name={a.icon} className="h-5 w-5" />
              </span>
              <div className="font-display font-semibold">{a.title}</div>
              <p className="mt-1 text-xs text-muted">{a.detail}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45 }}
        >
          <Card className="h-full">
            <h3 className="mb-4 flex items-center gap-2 font-display font-semibold">
              <GraduationCap className="h-5 w-5 text-secondary" /> Education
            </h3>
            {education.map((e) => (
              <div key={e.institution}>
                <div className="flex items-baseline justify-between gap-3">
                  <h4 className="font-medium">{e.degree}</h4>
                  <span className="font-mono text-xs text-muted">
                    {e.period}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted">{e.institution}</p>
                <p className="mt-1 text-sm text-secondary">{e.detail}</p>
                <p className="mt-0.5 text-xs text-muted">{e.location}</p>
              </div>
            ))}
          </Card>
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, delay: 0.1 }}
        >
          <Card className="h-full">
            <h3 className="mb-4 flex items-center gap-2 font-display font-semibold">
              <BadgeCheck className="h-5 w-5 text-secondary" /> Certifications
            </h3>
            <ul className="space-y-3">
              {certifications.map((c) => (
                <li key={c} className="flex items-start gap-2.5 text-sm">
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                  <span className="text-muted">{c}</span>
                </li>
              ))}
            </ul>
          </Card>
        </motion.div>
      </div>
    </Section>
  );
}
