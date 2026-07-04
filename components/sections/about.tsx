"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Section } from "@/components/section";
import { Card } from "@/components/ui/card";
import { about } from "@/lib/data";

export function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title={
        <>
          I turn open-ended AI problems into{" "}
          <span className="text-gradient">systems that run in production</span>.
        </>
      }
    >
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="space-y-5 text-muted"
        >
          {about.longBio.map((p, i) => (
            <p key={i} className="leading-relaxed">
              {p}
            </p>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-wide text-secondary">
              Focus Areas
            </h3>
            <ul className="space-y-3">
              {about.focus.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </Card>
        </motion.div>
      </div>
    </Section>
  );
}
