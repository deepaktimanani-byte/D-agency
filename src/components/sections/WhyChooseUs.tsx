import { SectionLabel } from "@/components/ui/SectionLabel";
import { CheckCircle2, Layers, Rocket, Shield, Users2, Zap } from "lucide-react";

const DIFFERENTIATORS = [
  {
    icon: Rocket,
    title: "End-to-End Execution",
    desc: "We don't just advise — we roll up our sleeves and deliver results across every function of your business.",
  },
  {
    icon: Layers,
    title: "Multi-Service Under One Roof",
    desc: "Digital, tech, marketing, consulting, staffing, compliance — all coordinated by one team.",
  },
  {
    icon: Users2,
    title: "Startup-Friendly Approach",
    desc: "We understand the pace of early-stage businesses. Fast turnarounds, flexible engagements, real results.",
  },
  {
    icon: Zap,
    title: "Data-Driven Strategy",
    desc: "Every decision is backed by data. We measure what matters and optimize relentlessly.",
  },
  {
    icon: Shield,
    title: "Compliance Ready",
    desc: "We ensure your business operations meet regulatory requirements across all markets.",
  },
  {
    icon: CheckCircle2,
    title: "Proven Track Record",
    desc: "93% client success rate with measurable outcomes — revenue growth, lead generation, brand equity.",
  },
];

interface WhyChooseUsProps {
  variant?: "white" | "mint";
}

export function WhyChooseUs({ variant = "mint" }: WhyChooseUsProps) {
  return (
    <section className={`section-pad ${variant === "mint" ? "bg-bg-mint" : "bg-white"}`}>
      <div className="container-main">

        {/* Centered header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <SectionLabel>Why Choose Us</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-heading mb-4">
            Finding it Tough to Get Your Business Noticed Online?
          </h2>
          <p className="text-body leading-relaxed">
            Struggling to connect with customers in a crowded digital landscape?
            We provide the strategy, technology, and execution to make you impossible to ignore.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DIFFERENTIATORS.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group flex flex-col gap-4 p-6 rounded-3xl bg-white border border-gray-100 hover:border-navy/20 hover:shadow-xl transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-navy/10 flex items-center justify-center group-hover:bg-navy transition-colors duration-300">
                <Icon className="w-6 h-6 text-navy group-hover:text-white transition-colors duration-300" />
              </div>
              <div>
                <h4 className="font-bold text-heading text-base mb-2">{title}</h4>
                <p className="text-body text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
