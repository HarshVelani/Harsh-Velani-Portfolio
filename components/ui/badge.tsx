import * as React from "react";
import { cn } from "@/lib/utils";

/** Small pill for tech tags and labels. */
function Badge({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-elevated/60 px-2.5 py-0.5 font-mono text-[0.7rem] text-muted transition-colors hover:border-secondary/50 hover:text-fg",
        className
      )}
      {...props}
    />
  );
}

export { Badge };
