// Shared content models. Everything the site renders is typed here and
// populated in lib/data.ts, so there is exactly one place to edit content.

export interface SkillGroup {
  category: string;
  icon: string; // lucide-react icon name
  skills: string[];
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  slug: string;
  title: string;
  company: string;
  category: "featured" | "aiml";
  tagline: string;
  problem: string;
  solution: string;
  impact: string;
  challenges: string;
  architecture: string[]; // ordered pipeline stages
  tech: string[];
  metrics?: ProjectMetric[];
  // AI/ML-specific fields (optional, shown only when present)
  model?: string;
  dataset?: string;
  evaluation?: string;
  links?: { github?: string; demo?: string; caseStudy?: string };
}

export interface ExperienceRole {
  company: string;
  role: string;
  location: string;
  period: string;
  summary: string;
  highlights: string[];
  tools: string[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  detail: string;
  period: string;
  location: string;
}

export interface Contact {
  email: string;
  phone?: string;
  linkedin: string;
  github: string;
  location: string;
  resume: string;
}
