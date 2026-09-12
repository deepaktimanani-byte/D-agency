import { Reveal } from "@/components/motion/Reveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import type { SiteSettings } from "@/types";

interface StatsSectionProps {
  settings: Partial<SiteSettings>;
}

const DEFAULT_STATS = [
  { value: "200+", label: "Happy Clients" },
  { value: "$2M", label: "Revenue Generated" },
  { value: "93%", label: "Success Rate" },
  { value: "50+", label: "Services Offered" },
];

export function StatsSection({ settings }: StatsSectionProps) {
  const stats = [
    { value: settings.stat_1_value, label: settings.stat_1_label },
    { value: settings.stat_2_value, label: settings.stat_2_label },
    { value: settings.stat_3_value, label: settings.stat_3_label },
    { value: settings.stat_4_value, label: settings.stat_4_label },
  ].map((s, i) => ({
    value: s.value || DEFAULT_STATS[i].value,
    label: s.label || DEFAULT_STATS[i].label,
  }));

  return (
    <section className="relative section-pad bg-surface-2 overflow-hidden">
      {/* Accent hairline along the top edge */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--color-navy), var(--color-accent-teal), transparent)",
        }}
        aria-hidden
      />
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--color-navy) 0%, transparent 70%)" }}
        aria-hidden
      />

      <div className="container-main relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-4">
          {stats.map(({ value, label }, i) => (
            <Reveal key={label} delay={i * 0.1}>
              <div className="text-center flex flex-col gap-2 lg:border-r lg:border-border-light lg:last:border-r-0">
                <AnimatedCounter
                  value={value}
                  className="text-4xl sm:text-5xl font-extrabold text-gradient tracking-tight"
                />
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                  {label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
