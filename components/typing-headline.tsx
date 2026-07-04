"use client";

import * as React from "react";

/**
 * Typewriter effect that cycles through role phrases. Uses a blinking caret
 * and types/deletes each phrase. Pauses fully under prefers-reduced-motion by
 * showing the first phrase statically.
 */
export function TypingHeadline({ phrases }: { phrases: readonly string[] }) {
  const [reduced, setReduced] = React.useState(false);
  const [text, setText] = React.useState("");
  const [phraseIdx, setPhraseIdx] = React.useState(0);
  const [deleting, setDeleting] = React.useState(false);

  React.useEffect(() => {
    setReduced(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  React.useEffect(() => {
    if (reduced) {
      setText(phrases[0]);
      return;
    }
    const current = phrases[phraseIdx % phrases.length];
    const done = text === current;
    const empty = text === "";

    let delay = deleting ? 45 : 90;
    if (done && !deleting) delay = 1600; // hold full phrase
    if (empty && deleting) delay = 300;

    const t = setTimeout(() => {
      if (!deleting && done) {
        setDeleting(true);
      } else if (deleting && empty) {
        setDeleting(false);
        setPhraseIdx((i) => (i + 1) % phrases.length);
      } else {
        setText(
          deleting
            ? current.slice(0, text.length - 1)
            : current.slice(0, text.length + 1)
        );
      }
    }, delay);

    return () => clearTimeout(t);
  }, [text, deleting, phraseIdx, phrases, reduced]);

  return (
    <span className="text-gradient">
      {text || "\u00A0"}
      <span
        className="ml-0.5 inline-block h-[1em] w-[3px] translate-y-[0.1em] animate-pulse bg-secondary"
        aria-hidden
      />
    </span>
  );
}
