"use client";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const FAQS = [
  {
    q: "What is the process for getting started with your services?",
    a: "We begin with an initial consultation to understand your goals, followed by a customized proposal. Once approved, our team kicks off onboarding and gets started immediately.",
  },
  {
    q: "How long does it take to see results from digital marketing?",
    a: "Results vary by channel and strategy. Paid advertising can show results within days, while SEO and content marketing typically deliver significant results within 3–6 months.",
  },
  {
    q: "What makes your agency different from others?",
    a: "We are a true end-to-end execution partner — not just a consultancy. We handle strategy, implementation, and ongoing optimization across digital, tech, marketing, compliance, and operations.",
  },
  {
    q: "Do you work with startups and small businesses?",
    a: "Absolutely. We specifically designed our services to be flexible and startup-friendly. We work with businesses at every stage — from pre-launch to scale-up.",
  },
  {
    q: "What is the cost of your services?",
    a: "Pricing depends on the scope and services required. We offer flexible engagement models including project-based, retainer, and performance-based arrangements. Contact us for a custom quote.",
  },
];

interface FaqSectionProps {
  variant?: "white" | "mint";
}

export function FaqSection({ variant = "mint" }: FaqSectionProps) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className={`section-pad ${variant === "mint" ? "bg-bg-mint" : "bg-white"}`}>
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left */}
          <div>
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-heading mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-body leading-relaxed">
              Can&apos;t find the answer you&apos;re looking for? Feel free to{" "}
              <a href="/contact-us" className="text-navy font-semibold hover:underline">
                contact us
              </a>{" "}
              directly.
            </p>
          </div>

          {/* Right — accordion */}
          <div className="flex flex-col gap-3">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="border border-border-light rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-bg-mint transition-colors"
                >
                  <span className="font-semibold text-heading text-sm leading-snug">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={cn(
                      "w-5 h-5 text-navy flex-shrink-0 transition-transform duration-200",
                      open === i && "rotate-180"
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300",
                    open === i ? "max-h-48" : "max-h-0"
                  )}
                >
                  <p className="px-5 pb-5 text-body text-sm leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
