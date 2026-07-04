"use client";

import { useId } from "react";

/**
 * ParticleBorder - a card/section edge drawn as a ring of small glowing dots
 * that drift slowly around the perimeter, inspired by the particle borders on
 * Google Antigravity's landing page. Replaces a solid 1px border.
 *
 * Usage: render inside a parent that is `relative isolate`. This sits at
 * -z-10 within that parent (above the card's fill, behind its content) and is
 * pointer-events-none, so it never affects layout or interaction. Because it is
 * absolutely positioned it is not a flex/grid item, so card layouts are
 * unaffected.
 *
 * The dots are a round-capped dashed SVG stroke with a blue -> cyan -> violet
 * gradient and a soft glow; motion is a CSS stroke-dashoffset animation, which
 * freezes automatically under prefers-reduced-motion (handled globally).
 * At rest the ring is gentle; it brightens on hover of the parent `group`.
 */
export function ParticleBorder({ radius = 20 }: { radius?: number }) {
  // Unique gradient id per instance (avoids duplicate ids across many cards).
  const gradId = `pb-${useId().replace(/:/g, "")}`;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 opacity-55 transition-opacity duration-300 group-hover:opacity-100"
    >
      <svg
        className="absolute inset-0 h-full w-full overflow-visible"
        preserveAspectRatio="none"
        style={{ filter: "drop-shadow(0 0 2.5px rgba(6,182,212,0.55))" }}
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="50%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
        </defs>
        <rect
          className="pb-dot"
          x="0"
          y="0"
          width="100%"
          height="100%"
          rx={radius}
          ry={radius}
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth={2.2}
          strokeLinecap="round"
          strokeDasharray="0.5 7"
        />
      </svg>
    </div>
  );
}
