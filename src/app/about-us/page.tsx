export const revalidate = 300;

import { SectionLabel } from "@/components/ui/SectionLabel";
import { TestimonialsCarousel } from "@/components/sections/TestimonialsCarousel";
import { LeadCaptureCta } from "@/components/sections/LeadCaptureCta";
import {
  getPublicSettings,
  getPublishedTeam,
  getPublishedTestimonials,
} from "@/lib/public-data";
import type { TeamMember, Testimonial } from "@/types";
import { Award, Heart, Lightbulb, Target } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export const metadata: Metadata = {
  title: "About Us",
  description:
    "We are an end-to-end execution partner for startups, founders, and growing businesses. Learn our story, values and team.",
};

const VALUES = [
  {
    icon: Target,
    title: "Results-Driven",
    desc: "Every strategy has a purpose — to create measurable impact, meaningful growth, and lasting business value.",
  },
  {
    icon: Lightbulb,
    title: "Strategic Thinking",
    desc: "We look beyond the brief to understand the bigger picture, creating thoughtful strategies tailored to where your business wants to go.",
  },
  {
    icon: Heart,
    title: "Client-First Culture",
    desc: "We build partnerships, not just projects. By staying close, communicating openly, and understanding your ambitions, we create better work together.",
  },
  {
    icon: Award,
    title: "Excellence in Execution",
    desc: "Great ideas deserve great execution. We bring care, clarity, and attention to every detail from concept to completion.",
  },
];

async function getData() {
  const [settingsRows, team, testimonials] = await Promise.all([
    getPublicSettings(),
    getPublishedTeam(),
    getPublishedTestimonials("about"),
  ]);
  return { settings: settingsRows, team: team as unknown as TeamMember[], testimonials: testimonials as unknown as Testimonial[] };
}

export default async function AboutPage() {
  const { settings, team, testimonials } = await getData();

  return (
    <>
      {/* Hero */}
      <section className="section-pad bg-bg-mint">
        <div className="container-main">
          <div className="max-w-3xl mx-auto">
            <div>
              <SectionLabel>Our Story</SectionLabel>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-heading mb-5">
                We Help Businesses Grow - End to End
              </h1>
              <p className="text-body text-lg leading-relaxed mb-4">
                We started with a simple belief: growing businesses deserve access to
                senior talent and strategic execution - not just advice. So we built a
                firm that does both.
              </p>
              <p className="text-body leading-relaxed">
                Today we serve startups, founders, coaches, and established businesses
                across digital, technology, marketing, compliance, and operations - all
                under one roof.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-pad !pt-[clamp(3.5rem,7vw,6rem)] bg-surface">
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
                className="p-6 rounded-2xl border border-border-light bg-surface hover:shadow-md transition-shadow flex flex-col gap-4"
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
                  <div
                    key={member.id}
                    className="group flex h-[360px] flex-col items-center overflow-hidden rounded-3xl border border-border-light bg-surface-2/80 p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:border-navy/40 hover:shadow-xl"
                  >
                    <div className="flex h-full w-full flex-col items-center gap-4">
                      <div className="h-28 w-28 min-h-28 min-w-28 shrink-0 aspect-square overflow-hidden rounded-full bg-navy/10 ring-4 ring-bg-mint">
                        {member.photo ? (
                          <Image
                            src={member.photo}
                            alt={member.name}
                            width={112}
                            height={112}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-navy/30 to-accent-teal/30">
                            <span className="text-3xl font-bold text-white">
                              {member.name.charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex h-full w-full flex-col">
                        <div className="flex items-center justify-center gap-2">
                          <p className="font-bold text-heading">{member.name}</p>
                          {member.linkedinUrl && (
                            <a
                              href={member.linkedinUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${member.name} on LinkedIn`}
                              className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy/10 text-navy transition-colors hover:bg-navy hover:text-white"
                            >
                              <LinkedinIcon className="h-3.5 w-3.5" />
                            </a>
                          )}
                        </div>
                        <p className="min-h-10 text-body text-sm">{member.designation}</p>
                        <p className="mt-3 min-h-24 text-left text-sm leading-relaxed text-body line-clamp-4">
                          {member.bio || " "}
                        </p>
                      </div>
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
