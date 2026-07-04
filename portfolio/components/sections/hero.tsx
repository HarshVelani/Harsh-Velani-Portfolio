"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Download,
  Github,
  Linkedin,
  MapPin,
} from "lucide-react";
import { AgentGraphBackground } from "@/components/agent-graph-bg";
import { TypingHeadline } from "@/components/typing-headline";
import { Button } from "@/components/ui/button";
import { identity, contact, about } from "@/lib/data";

const stats = [
  { value: "1.5+", label: "Years in AI/ML" },
  { value: "9", label: "Production projects" },
  { value: "8.83", label: "M.S. CGPA" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden pt-24"
    >
      <AgentGraphBackground />

      <div className="container">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-3xl"
        >
          <motion.div variants={item}>
            <span className="section-eyebrow">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-secondary" />
              </span>
              Available for AI/ML roles
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          >
            {identity.name}
          </motion.h1>

          <motion.div
            variants={item}
            className="mt-4 font-display text-2xl font-semibold sm:text-3xl lg:text-4xl"
          >
            <TypingHeadline phrases={identity.roles} />
          </motion.div>

          <motion.p
            variants={item}
            className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
          >
            {identity.pitch}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a href="#projects">
              <Button>
                View Projects <ArrowUpRight className="h-4 w-4" />
              </Button>
            </a>
            <a href={contact.resume} download>
              <Button variant="outline">
                <Download className="h-4 w-4" /> Resume
              </Button>
            </a>
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Button variant="ghost" size="icon">
                <Github className="h-5 w-5" />
              </Button>
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Button variant="ghost" size="icon">
                <Linkedin className="h-5 w-5" />
              </Button>
            </a>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-6 flex items-center gap-1.5 text-sm text-muted"
          >
            <MapPin className="h-4 w-4" /> {contact.location}
          </motion.div>

          {/* Stat chips */}
          <motion.dl
            variants={item}
            className="mt-12 flex flex-wrap gap-x-10 gap-y-6"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="font-mono text-3xl font-bold text-fg">
                  {s.value}
                </dt>
                <dd className="mt-1 text-sm text-muted">{s.label}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </div>
    </section>
  );
}
