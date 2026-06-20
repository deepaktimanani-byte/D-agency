import { cn } from "@/lib/utils";
import type { Service } from "@/types";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ServiceCardProps {
  service: Service;
  className?: string;
  featured?: boolean;
}

export function ServiceCard({ service, className, featured }: ServiceCardProps) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className={cn(
        "group flex flex-col bg-white rounded-2xl border border-border-light overflow-hidden",
        "hover:shadow-lg hover:-translate-y-1 transition-all duration-300",
        featured && "border-navy/20 shadow-sm",
        className
      )}
    >
      {/* Cover image */}
      <div className={cn("relative w-full aspect-video overflow-hidden", featured ? "bg-navy" : "bg-bg-mint")}>
        {service.coverImage ? (
          <Image
            src={service.coverImage}
            alt={service.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className={cn("w-12 h-12 rounded-2xl", featured ? "bg-white/20" : "bg-accent-teal/20")} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4 p-6 flex-1">
        <div className="flex-1">
          <h3 className={cn("font-bold text-lg mb-2 group-hover:text-navy transition-colors", featured && "text-navy")}>
            {service.title}
          </h3>
          <p className="text-body text-sm leading-relaxed line-clamp-3">
            {service.shortDescription}
          </p>
        </div>

        <div className="flex items-center gap-1 text-sm font-semibold text-navy group-hover:gap-2 transition-all">
          {service.ctaText}
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  );
}
