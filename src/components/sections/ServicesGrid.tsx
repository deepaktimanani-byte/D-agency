import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ServiceBentoCard } from "@/components/ui/ServiceBentoCard";
import type { Service } from "@/types";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface ServicesGridProps {
  services: Service[];
  variant?: "white" | "mint";
  /** Set to false where the page already supplies its own section heading
      (e.g. the "Related Services" block on a service detail page). */
  showHeader?: boolean;
  /** Drop the section's own padding when embedded inside another section. */
  bare?: boolean;
}

export function ServicesGrid({
  services,
  variant = "white",
  showHeader = true,
  bare = false,
}: ServicesGridProps) {
  const featured = services.filter((s) => s.isFeatured).slice(0, 5);
  const display = featured.length > 0 ? featured : services.slice(0, 5);

  // Nothing published yet — render nothing rather than inventing services.
  if (display.length === 0) return null;

  return (
    <section
      className={
        bare
          ? ""
          : `section-pad ${variant === "mint" ? "bg-bg-mint" : "bg-surface"}`
      }
    >
      <div className={bare ? "" : "container-main"}>
        {/* Header — editorial split, heading left / action right */}
        {showHeader && (
        <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal className="max-w-2xl">
            <SectionLabel>What We Do</SectionLabel>
            <h2 className="display-lg font-extrabold text-heading">
              One partner.
              <br />
              Every discipline you need.
            </h2>
          </Reveal>

          <Reveal delay={0.15} className="max-w-md">
            <p className="leading-relaxed text-body">
              Most companies juggle five vendors who blame each other. We run
              strategy, build, marketing and operations under one roof — and one
              point of accountability.
            </p>
          </Reveal>
        </div>
        )}

        {/* Bento grid — first tile anchors the layout */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[minmax(0,1fr)]">
          {display.map((service, i) => (
            <Reveal
              key={service.id}
              delay={Math.min(i, 4) * 0.08}
              className={i === 0 ? "sm:col-span-2 lg:row-span-2 flex" : "flex"}
            >
              <ServiceBentoCard
                service={service}
                size={i === 0 ? "hero" : "default"}
                className="w-full"
              />
            </Reveal>
          ))}
        </div>

        {/* CTA */}
        <Reveal delay={0.1} className="mt-12 text-center">
          <Button asChild variant="outline" size="lg" className="group">
            <Link href="/services">
              View All Services
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
