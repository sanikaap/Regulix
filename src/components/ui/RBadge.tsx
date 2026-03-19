import * as React from "react";
import { cn } from "../../lib/utils";

type BadgeVariant = "body" | "jurisdiction" | "status" | "effort";

interface RBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantClasses: Record<BadgeVariant, string> = {
  body: "bg-muted text-foreground",
  jurisdiction: "bg-blue/10 text-blue",
  status: "bg-amber/15 text-amber",
  effort: "bg-score-green-bg text-score-green-text",
};

const RBadge = ({ className, variant = "body", ...props }: RBadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider",
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  );
};

export default RBadge;
