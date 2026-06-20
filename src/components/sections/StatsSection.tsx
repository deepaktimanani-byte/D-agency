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
    <section className="bg-navy section-pad">
      <div className="container-main">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {stats.map(({ value, label }) => (
            <div key={label} className="text-center flex flex-col gap-2">
              <AnimatedCounter
                value={value}
                className="text-4xl sm:text-5xl font-extrabold text-white"
              />
              <p className="text-white/60 text-sm font-medium">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
