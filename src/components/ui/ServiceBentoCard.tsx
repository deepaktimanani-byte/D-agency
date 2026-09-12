import { cn } from "@/lib/utils";
import type { Service } from "@/types";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ServiceBentoCardProps {
  service: Service;
  /** "hero" is the oversized tile that anchors the bento grid. */
  size?: "hero" | "default";
  className?: string;
}

export function ServiceBentoCard({ service, size = "default", className }: ServiceBentoCardProps) {
  const hero = size === "hero";

  return (
    <Link
      href={`/services/${service.slug}`}
      // Feeds the custom cursor, so hovering a card shows its own call to action.
      data-cursor-label={service.ctaText || "Explore"}
      className={cn(
        "group relative isolate flex flex-col justify-end overflow-hidden rounded-3xl",
        "bg-bg-dark ring-1 ring-white/10 transition-all duration-500",
        "hover:ring-accent-teal/50 hover:-translate-y-1 hover:shadow-2xl hover:shadow-navy/20",
        hero ? "min-h-[420px] lg:min-h-[520px]" : "min-h-[260px]",
        className
      )}
    >
      {/* Cover image */}
      {service.coverImage ? (
        <Image
          src={service.coverImage}
          alt={service.title}
          fill
          className="object-cover opacity-55 transition-transform duration-700 ease-out group-hover:scale-105 group-hover:opacity-70 -z-10"
          sizes={hero ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 1024px) 100vw, 33vw"}
          unoptimized
        />
      ) : (
        <div className="absolute inset-0 -z-10 surface-dark" />
      )}

      {/* Readability scrim */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-t from-bg-dark via-bg-dark/70 to-transparent"
        aria-hidden
      />

      <div className={cn("relative flex flex-col gap-3", hero ? "p-8 lg:p-10" : "p-6")}>
        {service.category?.name && (
          <span className="self-start rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70 backdrop-blur-sm">
            {service.category.name}
          </span>
        )}

        <h3
          className={cn(
            "font-extrabold tracking-tight text-white",
            hero ? "text-3xl lg:text-4xl" : "text-xl"
          )}
        >
          {service.title}
        </h3>

        <p
          className={cn(
            "leading-relaxed text-white/55",
            hero ? "text-base max-w-lg line-clamp-3" : "text-sm line-clamp-2"
          )}
        >
          {service.shortDescription}
        </p>

        <span className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-accent-teal">
          {service.ctaText || "Explore"}
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </span>
      </div>
    </Link>
  );
}
