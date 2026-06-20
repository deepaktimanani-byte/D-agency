"use client";
import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  value: string;
  className?: string;
}

export function AnimatedCounter({ value, className }: AnimatedCounterProps) {
  const [displayed, setDisplayed] = useState("0");
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          // Extract numeric part
          const match = value.match(/[\d.]+/);
          if (!match) { setDisplayed(value); return; }
          const end = parseFloat(match[0]);
          const prefix = value.slice(0, value.indexOf(match[0]));
          const suffix = value.slice(value.indexOf(match[0]) + match[0].length);
          const duration = 1800;
          const start = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = end * eased;
            const formatted = Number.isInteger(end)
              ? Math.round(current).toString()
              : current.toFixed(1);
            setDisplayed(`${prefix}${formatted}${suffix}`);
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {displayed || value}
    </span>
  );
}
