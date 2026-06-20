import { cn } from "@/lib/utils";
import type { Testimonial } from "@/types";
import { Star } from "lucide-react";
import Image from "next/image";

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

export function TestimonialCard({ testimonial, className }: TestimonialCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 p-6 bg-white rounded-2xl border border-border-light shadow-sm",
        className
      )}
    >
      {/* Stars */}
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              "w-4 h-4",
              i < testimonial.rating
                ? "fill-amber-400 text-amber-400"
                : "text-border"
            )}
          />
        ))}
      </div>

      {/* Quote */}
      <p className="text-body text-sm leading-relaxed flex-1 line-clamp-4">
        &ldquo;{testimonial.message}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-2 border-t border-border-light">
        <div className="w-10 h-10 rounded-full bg-bg-mint overflow-hidden flex-shrink-0">
          {testimonial.avatar ? (
            <Image
              src={testimonial.avatar}
              alt={testimonial.name}
              width={40}
              height={40}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-navy/30 to-accent-teal/30" />
          )}
        </div>
        <div>
          <p className="font-semibold text-sm text-heading">{testimonial.name}</p>
          {(testimonial.role || testimonial.company) && (
            <p className="text-xs text-muted">
              {[testimonial.role, testimonial.company].filter(Boolean).join(", ")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
