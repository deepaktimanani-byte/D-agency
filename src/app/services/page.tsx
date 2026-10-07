export const revalidate = 300;

import { LeadCaptureCta } from "@/components/sections/LeadCaptureCta";
import { ServicesCatalog } from "@/components/sections/ServicesCatalog";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { getPublishedServices, getServiceCategories } from "@/lib/public-data";
import { socialMetadata } from "@/lib/social-metadata";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Explore our full suite of digital, technology, marketing, consulting, staffing and compliance services.",
  ...socialMetadata({
    title: "Our Services | Fix Your Gap",
    description: "Explore our full suite of digital, technology, marketing, consulting, staffing and compliance services.",
    path: "/services",
  }),
};

async function getData() {
  const [services, categories] = await Promise.all([
    getPublishedServices(),
    getServiceCategories(),
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
            From digital marketing to compliance, we deliver end to end
            solutions that move the needle for your business.
          </p>
        </div>
      </section>

      <ServicesCatalog
        key={activeSlug}
        services={services as never}
        categories={categories as never}
        initialCategory={activeSlug}
      />

      <LeadCaptureCta services={services as never} />
    </>
  );
}
