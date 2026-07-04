"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks, identity, contact } from "@/lib/data";

/**
 * Nav + left section-progress rail.
 *
 * - Desktop links / hamburger visibility is driven by Tailwind breakpoints
 *   (md:) — CSS media queries, NOT JS width reads (that race was a real bug).
 * - Glass-on-scroll via a scroll listener (a visual effect, fine in JS).
 * - The fixed left rail (vertical 01–NN) appears only >=1320px so it never
 *   overlaps the centered 1200px content.
 * - One IntersectionObserver spy highlights the in-view section in both the
 *   top nav and the rail. Accent uses var(--accent) with a cyan fallback.
 *
 * Requires each section to have an id matching navLinks hrefs
 * (#about → id="about", etc.).
 */
const pad = (i: number) => String(i + 1).padStart(2, "0");
const idOf = (href: string) => href.replace("#", "");

export function Nav() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState<string>(idOf(navLinks[0].href));

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 22);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    const spy = new IntersectionObserver(
      (ents) => ents.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { threshold: 0.35 }
    );
    navLinks.forEach((l) => {
      const el = document.getElementById(idOf(l.href));
      if (el) spy.observe(el);
    });
    return () => spy.disconnect();
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? "border-b border-border bg-[rgba(8,11,20,0.72)] py-3 backdrop-blur-md" : "py-5"
        }`}
      >
        <nav className="mx-auto flex max-w-[1200px] items-center justify-between px-6">
          <a href="#top" aria-label="Home" className="font-display text-lg font-bold tracking-tight">
            {identity.firstName}
            <span className="text-secondary">.</span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={`rounded-lg px-3 py-2 text-sm transition-colors ${
                    active === idOf(l.href) ? "text-fg" : "text-muted hover:text-fg"
                  }`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href={contact.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-xl bg-gradient-to-br from-primary to-accent px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-transform hover:-translate-y-0.5 md:inline-flex"
            >
              Resume
            </a>
            <button
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-white/[0.03] text-fg md:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="mx-4 mt-3 overflow-hidden rounded-2xl border border-border bg-[rgba(10,14,24,0.92)] backdrop-blur-xl md:hidden"
            >
              <ul className="flex flex-col gap-1 p-3">
                {navLinks.map((l, i) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-lg px-3.5 py-3 text-[0.95rem] text-slate-300 hover:bg-white/[0.05] hover:text-white"
                    >
                      <span className="mr-2.5 font-mono text-xs text-secondary">{pad(i)}</span>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Left section-progress rail (desktop >= 1320px) */}
      <nav
        aria-label="Section navigation"
        className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-4 min-[1320px]:flex"
      >
        {navLinks.map((l, i) => {
          const on = active === idOf(l.href);
          return (
            <a
              key={l.href}
              href={l.href}
              title={l.label}
              className="flex h-4 items-center gap-2.5 border-l-2 pl-2.5 font-mono text-[0.62rem] tracking-wider transition-colors"
              style={{
                borderColor: on ? "var(--accent,#06B6D4)" : "rgba(255,255,255,0.12)",
                color: on ? "var(--accent,#06B6D4)" : "#5A6478",
              }}
            >
              {pad(i)}
            </a>
          );
        })}
      </nav>
    </>
  );
}
