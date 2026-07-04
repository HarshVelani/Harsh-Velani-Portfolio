"use client";

import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Section } from "@/components/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { skillGroups } from "@/lib/data";

const pad = (n: number) => String(n).padStart(2, "0");

function Icon({ name, className }: { name: string; className?: string }) {
  const C = (Icons as unknown as Record<string, LucideIcon>)[name] ?? Icons.Code;
  return <C className={className} />;
}

export function Skills() {
  return (
    <Section
      id="skills"
      index={2}
      eyebrow="Skills"
      title="The stack I build with"
      intro="From agent orchestration down to the databases and deployment underneath it."
    >
      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
        {skillGroups.map((group, i) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <Card className="h-full">
              <div className="mb-4 flex items-center gap-3">
                <span className="icon-tile h-[42px] w-[42px]">
                  <Icon name={group.icon} className="h-5 w-5" />
                </span>
                <div>
                  <span className="font-mono text-[0.7rem] text-dim">
                    {pad(i + 1)}
                  </span>
                  <h3 className="font-display font-semibold leading-tight">
                    {group.category}
                  </h3>
                </div>
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
