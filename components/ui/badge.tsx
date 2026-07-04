import * as React from "react";
import { cn } from "@/lib/utils";

/** Pill badge: mono .7rem, hairline border, faint fill. */
function Badge({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[0.7rem] text-muted transition-colors",
        "border-white/10 bg-white/[0.04] hover:border-secondary/50 hover:text-fg",
        className
      )}
      {...props}
    />
  );
}

export { Badge };
