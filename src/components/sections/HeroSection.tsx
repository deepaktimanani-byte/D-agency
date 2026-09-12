"use client";
import { Magnetic } from "@/components/motion/Magnetic";
import { Reveal } from "@/components/motion/Reveal";
import { HeroAura } from "@/components/motion/HeroAura";
import { WordReveal } from "@/components/motion/WordReveal";
import { Button } from "@/components/ui/Button";
import type { SiteSettings } from "@/types";
import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import Link from "next/link";

interface HeroSectionProps {
  settings: Partial<SiteSettings>;
}

const DEFAULT_HEADLINE = "We don't sell services. We deliver outcomes.";

export function HeroSection({ settings }: HeroSectionProps) {
  const headline = settings.hero_headline || DEFAULT_HEADLINE;

  /* Accent the closing words of whatever headline the admin sets, so the
     gradient lands correctly on custom copy instead of a hard-coded word. */
  const wordCount = headline.trim().split(/\s+/).length;
  const highlightFrom = wordCount > 3 ? wordCount - 2 : undefined;

  const proof = [
    { value: settings.stat_1_value, label: settings.stat_1_label },
    { value: settings.stat_2_value, label: settings.stat_2_label },
    { value: settings.stat_3_value, label: settings.stat_3_label },
    { value: settings.stat_4_value, label: settings.stat_4_label },
  ].filter((s) => s.value && s.value.trim() !== "");

  return (
    <section className="surface-dark relative overflow-hidden">
      {/* Technical grid */}
      <div className="absolute inset-0 grid-overlay pointer-events-none" aria-hidden />

      {/* Drifting brand-colour fields behind the copy. */}
      <HeroAura />

      {/* Ambient orbs */}
      <div
        className="absolute -top-40 -left-32 w-[520px] h-[520px] rounded-full blur-3xl opacity-30 float-slow pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--color-accent-teal) 0%, transparent 70%)" }}
        aria-hidden
      />
      <div
        className="absolute -bottom-48 -right-24 w-[560px] h-[560px] rounded-full blur-3xl opacity-25 float-slow pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--color-navy-light) 0%, transparent 70%)", animationDelay: "2s" }}
        aria-hidden
      />

      <div className="container-main relative pt-32 pb-20 sm:pt-40 sm:pb-28 lg:pt-44 lg:pb-32">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">

          {/* Eyebrow pill */}
          <Reveal delay={0.05} distance={16}>
            <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/80">
              <Sparkles className="w-3.5 h-3.5 text-accent-teal" />
              {settings.company_tagline || "End-to-End Execution Partner"}
            </span>
          </Reveal>

          {/* Headline */}
          <WordReveal
            as="h1"
            text={headline}
            highlightFrom={highlightFrom}
            delay={0.25}
            className="display-xl font-extrabold text-white mt-8"
          />

          {/* Subheadline */}
          <Reveal delay={0.55} className="mt-7 max-w-2xl">
            <p className="text-lg sm:text-xl leading-relaxed text-white/60">
              {settings.hero_subheadline ||
                "Marketing, technology, consulting, staffing and compliance — run by one accountable team, measured by one number: your growth."}
            </p>
          </Reveal>

          {/* CTAs */}
          <Reveal delay={0.7} className="mt-10">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Magnetic>
                <Button asChild size="lg" variant="teal" className="group shadow-lg shadow-accent-teal/20">
                  <Link href="/contact-us">
                    {settings.hero_cta_primary || "Book a Free Strategy Call"}
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>
              </Magnetic>

              <Button asChild size="lg" className="bg-white/10 text-white rounded-full border border-white/20 hover:bg-white/20 backdrop-blur-md">
                <Link href="/success-stories" className="group">
                  <span className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center transition-colors group-hover:bg-accent-teal">
                    <Play className="w-3 h-3 fill-white text-white ml-0.5" />
                  </span>
                  {settings.hero_cta_secondary || "See Our Work"}
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>

        {/* Proof strip — SeedB2B-style hard numbers */}
        {proof.length > 0 && (
          <motion.div
            className="mt-20 sm:mt-24 grid grid-cols-2 lg:grid-cols-4 gap-px rounded-3xl overflow-hidden glass"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            {proof.map((stat, i) => (
              <div
                key={i}
                className="px-6 py-8 text-center bg-white/[0.02] hover:bg-white/[0.06] transition-colors duration-300"
              >
                <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {stat.value}
                </p>
                <p className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-white/45">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
