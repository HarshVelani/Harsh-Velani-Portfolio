import * as React from "react";
import { cn } from "@/lib/utils";
import { ParticleBorder } from "@/components/particle-border";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "group glass relative isolate rounded-2xl p-6 transition-all duration-300",
      className
    )}
    {...props}
  >
    {/* Dotted, glowing edge that replaces a solid border. */}
    <ParticleBorder radius={20} />
    {children}
  </div>
));
Card.displayName = "Card";

export { Card };
