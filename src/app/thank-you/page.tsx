import { Button } from "@/components/ui/Button";
import { CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thank You",
  description: "We've received your enquiry and will be in touch shortly.",
  robots: { index: false },
};

export default function ThankYouPage() {
  return (
    <section className="section-pad bg-bg-mint flex-1 flex items-center">
      <div className="container-main">
        <div className="max-w-lg mx-auto text-center flex flex-col items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-accent-teal/15 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-accent-teal" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-heading mb-3">
              Message Received!
            </h1>
            <p className="text-body leading-relaxed">
              Thanks for reaching out. One of our team members will review your
              enquiry and get back to you within <strong>1 business day</strong>.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Button asChild size="lg">
              <Link href="/">Back to Home</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/services">Explore Services</Link>
            </Button>
          </div>
          <p className="text-muted text-sm">
            Need to reach us immediately?{" "}
            <a href="/contact-us" className="text-navy font-semibold hover:underline">
              View contact details
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
