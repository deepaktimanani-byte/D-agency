export const dynamic = 'force-dynamic';

import { LeadCaptureCta } from "@/components/sections/LeadCaptureCta";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Explore our full suite of digital, technology, marketing, consulting, staffing and compliance services.",
};

async function getData() {
  const [services, categories] = await Promise.all([
    prisma.service.findMany({
      where: { status: "published" },
      include: { category: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    }),
    prisma.serviceCategory.findMany({ orderBy: { name: "asc" } }),
  ]);
  return { services, categories };
}

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category: activeSlug } = await searchParams;
  const { services, categories } = await getData();

  const filtered = activeSlug
    ? services.filter((s) => s.category?.slug === activeSlug)
    : services;

  return (
    <>
      {/* Hero */}
      <section className="section-pad bg-bg-mint">
        <div className="container-main text-center max-w-2xl mx-auto">
          <SectionLabel align="center">What We Do</SectionLabel>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-heading mb-4">
            All the Expertise You Need, Under One Roof
          </h1>
          <p className="text-body text-lg leading-relaxed">
            From digital marketing to compliance — we deliver end-to-end
            solutions that move the needle for your business.
          </p>
        </div>
      </section>

      {/* Category tabs */}
      {categories.length > 0 && (
        <section className="sticky top-16 z-10 bg-surface border-b border-border-light">
          <div className="container-main">
            <div className="flex items-center gap-2 overflow-x-auto py-3 scrollbar-hide">
              <Link
                href="/services"
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                  !activeSlug
                    ? "bg-navy text-white"
                    : "text-body hover:text-heading hover:bg-bg-mint"
                }`}
              >
                All
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/services?category=${cat.slug}`}
                  className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                    activeSlug === cat.slug
                      ? "bg-navy text-white"
                      : "text-body hover:text-heading hover:bg-bg-mint"
                  }`}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Grid */}
      <section className="section-pad bg-surface">
        <div className="container-main">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((service, i) => (
                <ServiceCard
                  key={service.id}
                  service={service as never}
                  featured={i === 1 && !activeSlug}
                />
              ))}
            </div>
          ) : (
            /* Honest empty state — never invent services the agency doesn't offer. */
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
                  <Link href="/contact-us">Talk to Us</Link>
                </Button>
                {activeSlug && (
                  <Button asChild variant="outline" size="lg">
                    <Link href="/services">View All Services</Link>
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      <LeadCaptureCta services={filtered as never} />
    </>
  );
}
