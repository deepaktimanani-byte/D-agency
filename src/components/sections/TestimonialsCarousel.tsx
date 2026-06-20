"use client";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import type { Testimonial } from "@/types";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback } from "react";

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
}

const PLACEHOLDER: Testimonial[] = [
  { id: "1", name: "Sarah M.", company: "TechStart", role: "Founder", message: "This agency is amazing. They helped us scale from zero to 10K customers in just 8 months. Their end-to-end approach is exactly what a startup needs.", rating: 5, avatar: "", displayPage: "home", sortOrder: 0 },
  { id: "2", name: "James K.", company: "GrowthCo", role: "CEO", message: "Working with this team transformed our digital presence completely. Professional, fast, and results-driven. Highly recommend to any growing business.", rating: 5, avatar: "", displayPage: "home", sortOrder: 1 },
  { id: "3", name: "Priya L.", company: "BrandBuilders", role: "CMO", message: "The ROI we've seen from their campaigns is unmatched. They understand both strategy and execution — a rare combination.", rating: 5, avatar: "", displayPage: "home", sortOrder: 2 },
  { id: "4", name: "Alex R.", company: "ScaleUp Inc", role: "Director", message: "From web development to compliance, they handled everything. Saved us time and money while delivering exceptional quality.", rating: 5, avatar: "", displayPage: "home", sortOrder: 3 },
];

export function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps) {
  const items = testimonials.length > 0 ? testimonials : PLACEHOLDER;

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" }, [
    Autoplay({ delay: 4000, stopOnInteraction: false }),
  ]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="section-pad bg-bg-mint">
      <div className="container-main">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <SectionLabel>Testimonials</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-heading">
              What&apos;s Our Client Saying
            </h2>
          </div>
          <div className="flex gap-3">
            <button
              onClick={scrollPrev}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-navy hover:text-white hover:border-navy transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollNext}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-navy hover:text-white hover:border-navy transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {items.map((t) => (
              <div key={t.id} className="flex-[0_0_320px] sm:flex-[0_0_360px]">
                <TestimonialCard testimonial={t} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
