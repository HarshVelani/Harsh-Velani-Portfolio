import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Card — Latent Space surface: subtle fill + 1px hairline, 20px radius, blur.
 * Hover: lift 5px, cyan border, soft cyan shadow.
 */
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "glass group rounded-[20px] border border-border p-6 transition-all duration-300",
      "hover:-translate-y-[5px] hover:border-secondary/40 hover:shadow-[0_26px_64px_-32px_rgba(6,182,212,0.5)]",
      className
    )}
    {...props}
  >
    {children}
  </div>
));
Card.displayName = "Card";

export { Card };
