import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "navy" | "teal" | "green" | "muted";
  className?: string;
}

export function Badge({ children, variant = "teal", className }: BadgeProps) {
  const variants = {
    navy: "bg-navy/10 text-navy",
    teal: "bg-accent-teal/10 text-accent-teal",
    green: "bg-accent-green/20 text-green-700",
    muted: "bg-border-light text-body",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
