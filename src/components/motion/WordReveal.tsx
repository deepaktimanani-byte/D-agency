"use client";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

interface WordRevealProps {
  text: string;
  className?: string;
  /** Words listed here get the gradient accent treatment. */
  highlight?: string[];
  /** Gradient every word from this index onward — exact, so repeated words stay safe. */
  highlightFrom?: number;
  delay?: number;
  as?: "h1" | "h2" | "p";
}

const container = (delay: number): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: 0.055, delayChildren: delay } },
});

const word: Variants = {
  hidden: { y: "105%", opacity: 0 },
  show: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const normalize = (w: string) => w.toLowerCase().replace(/[^a-z0-9]/gi, "");

/** Headline that reveals word-by-word — the signature hero motion. */
export function WordReveal({
  text,
  className,
  highlight = [],
  highlightFrom,
  delay = 0,
  as = "h1",
}: WordRevealProps) {
  const reduced = useReducedMotion();
  const words = text.trim().split(/\s+/);
  const hot = new Set(highlight.map(normalize));

  const children: ReactNode = words.map((w, i) => (
    <span key={`${w}-${i}`} className="inline-block overflow-hidden align-bottom">
      <motion.span
        className={cn(
          "inline-block",
          (hot.has(normalize(w)) ||
            (highlightFrom !== undefined && i >= highlightFrom)) &&
            "text-gradient"
        )}
        variants={reduced ? undefined : word}
      >
        {w}
      </motion.span>
      {i < words.length - 1 && <span>&nbsp;</span>}
    </span>
  ));

  const anim = reduced
    ? {}
    : { initial: "hidden" as const, animate: "show" as const, variants: container(delay) };

  if (as === "h1") return <motion.h1 className={className} {...anim}>{children}</motion.h1>;
  if (as === "h2") return <motion.h2 className={className} {...anim}>{children}</motion.h2>;
  return <motion.p className={className} {...anim}>{children}</motion.p>;
}
