"use client";

import { Badge } from "@/components/ui/badge";
import { techStack } from "@/lib/data";

/**
 * A dual-row marquee of the full tech stack. CSS-only scroll (no JS timer);
 * pauses on hover and under reduced motion (handled globally).
 */
export function TechStack() {
  const half = Math.ceil(techStack.length / 2);
  const rows = [techStack.slice(0, half), techStack.slice(half)];

  return (
    <section className="relative py-14">
      <div className="dot-divider absolute inset-x-0 top-0" />
      <div className="dot-divider absolute inset-x-0 bottom-0" />
      <div className="container mb-8">
        <span className="section-eyebrow">
          <span className="h-px w-6 bg-secondary" />
          Tech Stack
        </span>
        <h2 className="font-display text-2xl font-bold sm:text-3xl">
          Everything in the toolbox
        </h2>
      </div>

      <div className="space-y-4 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        {rows.map((row, r) => (
          <div key={r} className="tech-marquee-row flex overflow-hidden">
            {/* Duplicate the row twice for a seamless loop. */}
            {[0, 1].map((dup) => (
              <div
                key={dup}
                className={`flex shrink-0 items-center gap-3 pr-3 ${
                  r % 2 === 0 ? "marquee-l" : "marquee-r"
                }`}
              >
                {row.map((t) => (
                  <Badge
                    key={`${dup}-${t}`}
                    className="px-3.5 py-1.5 text-xs"
                  >
                    {t}
                  </Badge>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
