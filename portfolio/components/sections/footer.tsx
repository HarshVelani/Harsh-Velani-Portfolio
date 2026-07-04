"use client";

import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import { navLinks, identity, contact } from "@/lib/data";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="container">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="max-w-xs">
            <a href="#" className="font-display text-lg font-bold">
              {identity.name}
              <span className="text-gradient">.</span>
            </a>
            <p className="mt-3 text-sm text-muted">
              AI/ML Engineer building production agentic systems, RAG pipelines,
              and fine-tuned LLMs.
            </p>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer">
            <h3 className="mb-3 text-xs uppercase tracking-wide text-muted">
              Navigate
            </h3>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-muted transition-colors hover:text-fg"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Socials + resume */}
          <div>
            <h3 className="mb-3 text-xs uppercase tracking-wide text-muted">
              Connect
            </h3>
            <div className="flex items-center gap-2">
              <a href={`mailto:${contact.email}`} aria-label="Email">
                <Button variant="ghost" size="icon">
                  <Mail className="h-5 w-5" />
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
            </div>
            <a
              href={contact.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block"
            >
              <Button variant="outline" size="sm">
                Download Résumé
              </Button>
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-muted">
            {/* Year is intentionally client-current; isolating it in a
                suppressHydrationWarning span lets the build-time and runtime
                years differ (e.g. across New Year) without a hydration error. */}
            © <span suppressHydrationWarning>{new Date().getFullYear()}</span>{" "}
            {identity.name}. Built with Next.js & Tailwind CSS.
          </p>
          <a href="#top">
            <Button variant="ghost" size="sm">
              Back to top <ArrowUp className="h-4 w-4" />
            </Button>
          </a>
        </div>
      </div>
    </footer>
  );
}
