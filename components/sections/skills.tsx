"use client";

import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Section } from "@/components/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { skillGroups } from "@/lib/data";

/** Resolve an icon name from data into a lucide component, with a fallback. */
function Icon({ name, className }: { name: string; className?: string }) {
  const C = (Icons as unknown as Record<string, LucideIcon>)[name] ?? Icons.Code;
  return <C className={className} />;
}

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="The stack I build with"
      intro="From agent orchestration down to the databases and deployment underneath it."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
          >
            <Card className="h-full hover:-translate-y-1">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 text-secondary">
                  <Icon name={group.icon} className="h-5 w-5" />
                </span>
                <h3 className="font-display font-semibold">{group.category}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((s) => (
                  <Badge key={s}>{s}</Badge>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
