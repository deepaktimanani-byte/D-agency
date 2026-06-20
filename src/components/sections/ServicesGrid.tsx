import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ServiceCard } from "@/components/ui/ServiceCard";
import type { Service } from "@/types";
import Link from "next/link";

interface ServicesGridProps {
  services: Service[];
}

export function ServicesGrid({ services }: ServicesGridProps) {
  const featured = services.filter((s) => s.isFeatured).slice(0, 6);
  const display = featured.length > 0 ? featured : services.slice(0, 6);

  return (
    <section className="section-pad bg-white">
      <div className="container-main">
        {/* Header */}
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <SectionLabel align="center">What We Do</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-heading mb-4">
            What We are Doing
          </h2>
          <p className="text-body leading-relaxed">
            From strategy to execution — we cover every dimension of your
            business growth across digital, tech, marketing, and operations.
          </p>
        </div>

        {/* Grid */}
        {display.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {display.map((service, i) => (
              <ServiceCard key={service.id} service={service} featured={i === 1} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PLACEHOLDER_SERVICES.map((s, i) => (
              <div
                key={s.title}
                className={`p-6 rounded-2xl border border-border-light flex flex-col gap-4 ${
                  i === 1 ? "bg-navy text-white" : "bg-white"
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                    i === 1 ? "bg-white/20" : "bg-bg-mint"
                  }`}
                >
                  <div className="w-7 h-7 rounded-lg bg-accent-teal/40" />
                </div>
                <h3 className={`font-bold text-lg ${i === 1 ? "text-white" : "text-heading"}`}>
                  {s.title}
                </h3>
                <p className={`text-sm leading-relaxed ${i === 1 ? "text-white/70" : "text-body"}`}>
                  {s.desc}
                </p>
                <span className={`text-sm font-semibold ${i === 1 ? "text-white/90" : "text-navy"}`}>
                  Get in Touch →
                </span>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-10">
          <Button asChild variant="outline" size="lg">
            <Link href="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

const PLACEHOLDER_SERVICES = [
  { title: "Reputation Management", desc: "Protect and enhance your online reputation. We manage and improve how your business is perceived online." },
  { title: "Advertising Campaigns", desc: "Maximize ROI with strategic PPC campaigns. We fine-tune your ads for the best results." },
  { title: "Web Design & Development", desc: "Create a stunning, user-friendly website. Our designs are tailored to your company's needs." },
  { title: "SEO & Content Strategy", desc: "Rank higher, attract more leads. Data-driven SEO strategies that deliver measurable results." },
  { title: "Brand Identity", desc: "Build a brand that people remember. From logo to voice — we craft cohesive brand experiences." },
  { title: "Business Consulting", desc: "Strategic guidance for sustainable growth. We align your operations with your long-term vision." },
];
