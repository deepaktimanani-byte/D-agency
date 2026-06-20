import { SectionLabel } from "@/components/ui/SectionLabel";
import { StatsSection } from "@/components/sections/StatsSection";
import { TestimonialsCarousel } from "@/components/sections/TestimonialsCarousel";
import { LeadCaptureCta } from "@/components/sections/LeadCaptureCta";
import { prisma } from "@/lib/prisma";
import type { SiteSettings, TeamMember, Testimonial } from "@/types";
import { Award, Heart, Lightbulb, Target } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "We are an end-to-end execution partner for startups, founders, and growing businesses. Learn our story, values and team.",
};

const VALUES = [
  {
    icon: Target,
    title: "Results-Driven",
    desc: "Every engagement is measured against tangible business outcomes — revenue, leads, brand equity.",
  },
  {
    icon: Lightbulb,
    title: "Strategic Thinking",
    desc: "We bring senior-level strategy to businesses of every size. No cookie-cutter playbooks.",
  },
  {
    icon: Heart,
    title: "Client-First Culture",
    desc: "Your success is our success. We operate as an extension of your team, not a vendor.",
  },
  {
    icon: Award,
    title: "Excellence in Execution",
    desc: "Ideas are cheap. What matters is flawless delivery — on time, on budget, on point.",
  },
];

async function getData() {
  const [settingsRows, team, testimonials] = await Promise.all([
    prisma.siteSetting.findMany(),
    prisma.teamMember.findMany({ where: { status: "published" }, orderBy: { sortOrder: "asc" } }),
    prisma.testimonial.findMany({ where: { status: "published", displayPage: { contains: "about" } }, orderBy: { sortOrder: "asc" } }),
  ]);
  const settings = settingsRows.reduce<Partial<SiteSettings>>((acc, r) => ({ ...acc, [r.key]: r.value }), {});
  return { settings, team: team as unknown as TeamMember[], testimonials: testimonials as unknown as Testimonial[] };
}

export default async function AboutPage() {
  const { settings, team, testimonials } = await getData();

  return (
    <>
      {/* Hero */}
      <section className="section-pad bg-bg-mint">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionLabel>Our Story</SectionLabel>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-heading mb-5">
                We Help Businesses Grow — End to End
              </h1>
              <p className="text-body text-lg leading-relaxed mb-4">
                We started with a simple belief: growing businesses deserve access to
                senior talent and strategic execution — not just advice. So we built a
                firm that does both.
              </p>
              <p className="text-body leading-relaxed">
                Today we serve startups, founders, coaches, and established businesses
                across digital, technology, marketing, compliance, and operations — all
                under one roof.
              </p>
            </div>
            <div className="relative">
              <div className="rounded-3xl bg-navy aspect-video flex items-center justify-center overflow-hidden">
                <div className="text-center text-white p-10">
                  <p className="text-5xl font-extrabold mb-2">5+</p>
                  <p className="text-white/70">Years in Business</p>
                </div>
              </div>
              <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl p-5 shadow-xl">
                <p className="font-extrabold text-2xl text-navy">200+</p>
                <p className="text-body text-sm">Clients Served</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <StatsSection settings={settings} />

      {/* Values */}
      <section className="section-pad bg-white">
        <div className="container-main">
          <div className="text-center mb-12 max-w-xl mx-auto">
            <SectionLabel align="center">What We Stand For</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-heading">
              Our Core Values
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="p-6 rounded-2xl border border-border-light bg-white hover:shadow-md transition-shadow flex flex-col gap-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-bg-mint flex items-center justify-center">
                  <Icon className="w-6 h-6 text-navy" />
                </div>
                <div>
                  <h3 className="font-bold text-heading mb-1">{title}</h3>
                  <p className="text-body text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      {(team.length > 0 || true) && (
        <section className="section-pad bg-bg-mint">
          <div className="container-main">
            <div className="text-center mb-12 max-w-xl mx-auto">
              <SectionLabel align="center">The Team</SectionLabel>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-heading">
                Meet the People Behind the Work
              </h2>
            </div>
            {team.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {team.map((member) => (
                  <div key={member.id} className="flex flex-col items-center text-center gap-3">
                    <div className="w-24 h-24 rounded-full overflow-hidden bg-navy/10">
                      {member.photo ? (
                        <Image
                          src={member.photo}
                          alt={member.name}
                          width={96}
                          height={96}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-navy/30 to-accent-teal/30 flex items-center justify-center">
                          <span className="text-2xl font-bold text-white">
                            {member.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-heading">{member.name}</p>
                      <p className="text-body text-sm">{member.designation}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {PLACEHOLDER_TEAM.map((m) => (
                  <div key={m.name} className="flex flex-col items-center text-center gap-3">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-navy/30 to-accent-teal/30 flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">{m.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-bold text-heading">{m.name}</p>
                      <p className="text-body text-sm">{m.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Testimonials */}
      <TestimonialsCarousel testimonials={testimonials} />

      {/* CTA */}
      <LeadCaptureCta />
    </>
  );
}

const PLACEHOLDER_TEAM = [
  { name: "Alex Morgan", role: "Founder & CEO" },
  { name: "Jamie Lee", role: "Head of Strategy" },
  { name: "Sam Patel", role: "Technical Director" },
  { name: "Chris Wong", role: "Marketing Lead" },
];
