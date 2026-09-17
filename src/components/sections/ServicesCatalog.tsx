"use client";

import { Button } from "@/components/ui/Button";
import { ServiceCard } from "@/components/ui/ServiceCard";
import type { Service, ServiceCategory } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ServicesCatalogProps {
  services: Service[];
  categories: ServiceCategory[];
  initialCategory?: string;
}

export function ServicesCatalog({
  services,
  categories,
  initialCategory = "",
}: ServicesCatalogProps) {
  const router = useRouter();
  const [activeSlug, setActiveSlug] = useState(initialCategory);

  const filtered = activeSlug
    ? services.filter((service) => service.category?.slug === activeSlug)
    : services;

  function selectCategory(slug: string) {
    setActiveSlug(slug);
    router.push(slug ? `/services?category=${encodeURIComponent(slug)}` : "/services", {
      scroll: false,
    });
  }

  return (
    <>
      {categories.length > 0 && (
        <section className="sticky top-16 z-10 bg-surface border-b border-border-light">
          <div className="container-main">
            <div className="flex items-center gap-2 overflow-x-auto py-3 scrollbar-hide">
              <button
                type="button"
                onClick={() => selectCategory("")}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                  !activeSlug
                    ? "bg-navy text-white"
                    : "text-body hover:text-heading hover:bg-bg-mint"
                }`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  type="button"
                  key={category.id}
                  onClick={() => selectCategory(category.slug)}
                  className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                    activeSlug === category.slug
                      ? "bg-navy text-white"
                      : "text-body hover:text-heading hover:bg-bg-mint"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section-pad bg-surface">
        <div className="container-main">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((service, index) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  featured={index === 1 && !activeSlug}
                />
              ))}
            </div>
          ) : (
            <div className="max-w-md mx-auto text-center py-10">
              <h3 className="text-xl font-bold text-heading">
                Nothing published in this category yet
              </h3>
              <p className="mt-3 text-body leading-relaxed">
                Tell us what you need and we&apos;ll say straight away whether
                it&apos;s something we take on.
              </p>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                <Button asChild size="lg">
                  <a href="/contact-us">Talk to Us</a>
                </Button>
                {activeSlug && (
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={() => selectCategory("")}
                  >
                    View All Services
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
