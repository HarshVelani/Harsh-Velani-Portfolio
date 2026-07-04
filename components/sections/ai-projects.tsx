"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/section";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/lib/data";

const aiml = projects.filter((p) => p.category === "aiml");

export function AIProjects({ onOpen }: { onOpen: (slug: string) => void }) {
  return (
    <Section
      id="ai-projects"
      index={5}
      eyebrow="AI · ML Deep Dives"
      title="Models, pipelines & fine-tunes"
      intro="Model-centric work, from QLoRA fine-tuning to real-time speech-to-speech and computer vision."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {aiml.map((p, i) => (
          <motion.div
            key={p.slug}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: (i % 2) * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <ProjectCard project={p} onOpen={onOpen} />
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
