"use client";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import type { SiteSettings } from "@/types";
import { motion } from "framer-motion";
import { Play, Star, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface HeroSectionProps {
  settings: Partial<SiteSettings>;
}

export function HeroSection({ settings }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Mint blob — top right, matches CalmCreative */}
      <div className="absolute top-0 right-0 w-[640px] h-[640px] bg-bg-mint rounded-full translate-x-1/3 -translate-y-1/4 -z-10" />
      <div className="absolute bottom-0 left-0 w-[320px] h-[320px] bg-accent-teal/8 rounded-full -translate-x-1/2 translate-y-1/4 -z-10" />

      <div className="container-main pt-4 pb-16 sm:pt-6 sm:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-6 items-center">

          {/* ── Left: copy ── */}
          <motion.div
            className="flex flex-col gap-6 max-w-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel>Let&apos;s Create</SectionLabel>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight text-heading">
              {settings.hero_headline || (
                <>
                  Bright Ideas,
                  <br />
                  <span className="text-navy">Brilliant Results</span>
                </>
              )}
            </h1>

            <p className="text-body text-lg leading-relaxed max-w-md">
              {settings.hero_subheadline ||
                "Turn Likes into Loyalty. Discover Why Businesses Trust Us With Their Growth Journey."}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <Button asChild size="lg">
                <Link href="/contact-us">
                  {settings.hero_cta_primary || "Make Your Mark"}
                </Link>
              </Button>
              <Button variant="ghost" size="lg" asChild>
                <Link href="/success-stories" className="flex items-center gap-2">
                  <span className="w-10 h-10 rounded-full bg-navy/10 flex items-center justify-center">
                    <Play className="w-4 h-4 text-navy fill-navy ml-0.5" />
                  </span>
                  {settings.hero_cta_secondary || "See Our Work"}
                </Link>
              </Button>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-4 pt-2">
              <div className="flex -space-x-2">
                {[
                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&q=80",
                  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&q=80",
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80",
                  "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=80&q=80",
                ].map((src, i) => (
                  <div key={i} className="w-9 h-9 rounded-full border-2 border-white overflow-hidden relative">
                    <Image src={src} alt="customer" fill className="object-cover" sizes="36px" />
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-body font-medium">
                  10M+ Happy Customers &nbsp;·&nbsp; 4.9 (15K Reviews)
                </p>
              </div>
            </div>
          </motion.div>

          {/* ── Right: hero visual ── */}
          <motion.div
            className="relative flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative w-[340px] h-[400px] sm:w-[440px] sm:h-[500px]">
              <Image
                src="/images/hero-person.png"
                alt="Agency expert"
                fill
                className="object-contain object-center"
                priority
                sizes="(max-width: 640px) 340px, 440px"
              />
            </div>

            {/* Floating card — bottom-right */}
            <motion.div
              className="absolute -right-6 bottom-16 bg-white rounded-2xl px-4 py-3 shadow-xl flex items-center gap-3"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <div className="w-9 h-9 rounded-xl bg-navy/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-navy" />
              </div>
              <div>
                <p className="font-extrabold text-heading text-sm leading-none">
                  {settings.stat_3_value || "93%"}
                </p>
                <p className="text-xs text-muted mt-0.5">
                  {settings.stat_3_label || "Success Rate"}
                </p>
              </div>
            </motion.div>

            {/* Floating dark pill — bottom-left */}
            <motion.div
              className="absolute -left-6 bottom-8 bg-navy-dark text-white rounded-2xl px-4 py-3 shadow-xl"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <p className="font-extrabold text-lg leading-none">
                {settings.stat_2_value || "$2M"}
              </p>
              <p className="text-xs text-white/70 mt-0.5">Revenue Generated</p>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
