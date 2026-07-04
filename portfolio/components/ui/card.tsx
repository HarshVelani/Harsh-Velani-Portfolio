import * as React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "glass gradient-border rounded-2xl p-6 transition-all duration-300",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

export { Card };
