import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
  align?: "left" | "center";
}

export function SectionLabel({
  children,
  className,
  align = "left",
}: SectionLabelProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 mb-4",
        align === "center" && "justify-center w-full",
        className
      )}
    >
      <span className="w-2 h-2 rounded-full bg-accent-teal" />
      <span className="text-xs font-bold uppercase tracking-[0.18em] text-accent-teal">
        {children}
      </span>
    </div>
  );
}
