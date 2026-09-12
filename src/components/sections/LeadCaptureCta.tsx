import { Reveal } from "@/components/motion/Reveal";
import { WordReveal } from "@/components/motion/WordReveal";
import { LeadForm } from "@/components/ui/LeadForm";
import type { Service } from "@/types";
import { Check } from "lucide-react";

interface LeadCtaProps {
  services?: Service[];
}

const PROMISES = [
  "A 30-minute call — no deck, no pitch",
  "An honest read on what is actually broken",
  "A written next step, whether you hire us or not",
];

export function LeadCaptureCta({ services = [] }: LeadCtaProps) {
  const serviceOptions = services.map((s) => ({ id: s.id, title: s.title }));

  return (
    <section className="surface-dark relative overflow-hidden section-pad">
      <div className="absolute inset-0 grid-overlay pointer-events-none" aria-hidden />
      <div
        className="absolute -bottom-40 left-1/4 w-[600px] h-[600px] rounded-full blur-3xl opacity-25 float-slow pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--color-accent-teal) 0%, transparent 70%)" }}
        aria-hidden
      />

      <div className="container-main relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-16 items-center">

          {/* ── Left: the statement ── */}
          <div>
            <WordReveal
              as="h2"
              text="So — what can we build?"
              highlight={["build?"]}
              className="display-lg font-extrabold text-white"
            />

            <Reveal delay={0.25} className="mt-6 max-w-md">
              <p className="text-lg leading-relaxed text-white/55">
                Tell us where you are stuck. We will tell you straight whether we
                are the right team for it.
              </p>
            </Reveal>

            <Reveal delay={0.35} className="mt-10">
              <ul className="flex flex-col gap-4">
                {PROMISES.map((line) => (
                  <li key={line} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-teal/20">
                      <Check className="h-3 w-3 text-accent-teal" />
                    </span>
                    <span className="text-sm leading-relaxed text-white/70">{line}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* ── Right: the form ── */}
          <Reveal delay={0.2} direction="left" distance={36}>
            <div className="glass rounded-3xl p-6 sm:p-9 shadow-2xl shadow-black/30">
              <LeadForm
                variant="full"
                services={serviceOptions}
                redirectOnSuccess={true}
                submitVariant="teal"
              />
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
