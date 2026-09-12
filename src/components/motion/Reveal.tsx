"use client";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger offset in seconds — use i * 0.08 inside lists. */
  delay?: number;
  direction?: Direction;
  /** Travel distance in px. */
  distance?: number;
  once?: boolean;
}

const offset = (d: Direction, px: number) => {
  switch (d) {
    case "up": return { y: px };
    case "down": return { y: -px };
    case "left": return { x: px };
    case "right": return { x: -px };
    default: return {};
  }
};

/** Fades + slides content into view on scroll. The workhorse of the new UI. */
export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  distance = 28,
  once = true,
}: RevealProps) {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offset(direction, distance) }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
