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

export function WhyChooseUs() {
  return (
    <section className="section-pad bg-bg-mint">
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left — visual */}
          <div className="relative order-2 lg:order-1">
            <div className="rounded-3xl overflow-hidden bg-navy aspect-[4/3] flex items-center justify-center">
              <div className="text-center text-white p-10">
                <p className="text-6xl font-extrabold mb-2">93%</p>
                <p className="text-white/70 text-lg">Client Satisfaction Rate</p>
                <p className="text-white/50 text-sm mt-1">Over the last 5 years</p>
              </div>
            </div>
            {/* Floating card */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-5 shadow-xl max-w-[200px]">
              <p className="font-extrabold text-2xl text-navy">68%</p>
              <p className="text-body text-sm mt-1">Extra growth for your company</p>
            </div>
          </div>

          {/* Right — content */}
          <div className="order-1 lg:order-2">
            <SectionLabel>Why Choose Us</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-heading mb-4">
              Finding it Tough to Get Your Business Noticed Online?
            </h2>
            <p className="text-body leading-relaxed mb-8">
              Struggling to connect with customers in a crowded digital landscape?
              We provide the strategy, technology, and execution to make you
              impossible to ignore.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {DIFFERENTIATORS.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex gap-3">
                  <div className="w-10 h-10 rounded-xl bg-navy/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="w-5 h-5 text-navy" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-heading text-sm mb-1">{title}</h4>
                    <p className="text-body text-xs leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
