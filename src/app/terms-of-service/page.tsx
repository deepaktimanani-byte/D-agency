import type { Metadata } from "next";
import { socialMetadata } from "@/lib/social-metadata";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Read the Fix Your Gap Terms & Conditions governing website use and professional services.",
  ...socialMetadata({
    title: "Terms & Conditions | Fix Your Gap",
    description: "Read the Fix Your Gap Terms & Conditions governing website use and professional services.",
    path: "/terms-of-service",
  }),
};

const services = [
  "AI & Automation",
  "Branding & Content",
  "Design & Creative",
  "Digital Marketing",
  "Product & Business Solutions",
  "Sales & Lead Generation",
  "Websites & Technology",
  "Photography & Videography",
  "Finance & FinTech",
  "Testing & QA",
  "Staffing & Recruitment",
  "Consulting & Strategy",
  "Data & Analytics",
  "E-commerce & Marketplace Solutions",
  "PR & Communications",
];

const prohibitedUses = [
  "Use the website for fraudulent or unlawful activities",
  "Attempt to gain unauthorised access to the website or its systems",
  "Introduce malicious software or code",
  "Interfere with website functionality",
  "Copy or misuse website content",
  "Impersonate another person or organisation",
  "Submit false or misleading information",
  "Use the website to harm or exploit others",
];

const timelineFactors = [
  "Scope of work",
  "Client approvals",
  "Availability of required information",
  "Content and assets supplied by the client",
  "Third-party platforms",
  "Technical dependencies",
  "Revisions",
  "Changes in project requirements",
];

const clientResponsibilities = [
  "Information",
  "Content",
  "Brand assets",
  "Credentials/access",
  "Approvals",
  "Feedback",
  "Technical requirements",
];

const thirdPartyPlatforms = [
  "Google",
  "Meta",
  "LinkedIn",
  "WhatsApp",
  "Hosting providers",
  "Payment gateways",
  "App stores",
  "CRM platforms",
  "Email platforms",
  "AI platforms",
  "Cloud services",
];

const marketingExclusions = [
  "A specific number of leads",
  "A specific revenue amount",
  "A specific return on advertising spend",
  "Search-engine rankings",
  "Social-media reach",
  "Advertising approval",
  "Conversion rates",
  "Specific business outcomes",
];

const forceMajeureEvents = [
  "Natural disasters",
  "Internet or infrastructure failures",
  "Government actions",
  "Cybersecurity incidents",
  "Platform outages",
  "Third-party service failures",
  "Strikes",
  "War or civil disturbance",
  "Power failures",
  "Other unforeseen circumstances",
];

function TermsSection({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-border-light pt-8">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-heading mb-4">
        <span className="text-navy mr-2">{number}.</span>
        {title}
      </h2>
      <div className="text-body leading-relaxed space-y-4">{children}</div>
    </section>
  );
}

function TermsList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc pl-6 space-y-2">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default function TermsOfServicePage() {
  return (
    <>
      <section className="section-pad bg-bg-mint">
        <div className="container-main max-w-4xl">
          <p className="text-sm font-bold uppercase tracking-widest text-navy mb-4">
            Legal
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-heading mb-4">
            Terms &amp; Conditions
          </h1>
          <p className="text-body">Last Updated: 15th September 2026</p>
        </div>
      </section>

      <main className="section-pad bg-surface">
        <article className="container-main max-w-4xl space-y-10">
          <div className="text-body leading-relaxed space-y-4">
            <p>Welcome to Fix Your Gap.</p>
            <p>
              These Terms &amp; Conditions ("Terms") govern your use of the fixyourgap.com
              website and your interaction with Fix Your Gap and its services.
            </p>
            <p>
              By accessing our website or engaging Fix Your Gap for services, you agree to
              these Terms.
            </p>
            <p>
              If you do not agree with these Terms, please do not use our website or engage
              our services.
            </p>
          </div>

          <TermsSection number={1} title="About Fix Your Gap">
            <p>
              Fix Your Gap is a multi-service agency providing business, digital,
              technology, marketing, creative and related professional services.
            </p>
            <p>Our services may include:</p>
            <TermsList items={services} />
            <p>
              The availability of a service on our website does not guarantee that the
              service will be accepted or undertaken for every enquiry.
            </p>
          </TermsSection>

          <TermsSection number={2} title="Website Use">
            <p>You agree to use this website only for lawful purposes.</p>
            <p>You must not:</p>
            <TermsList items={prohibitedUses} />
            <p>
              We reserve the right to restrict or terminate access where we reasonably
              believe these Terms have been violated.
            </p>
          </TermsSection>

          <TermsSection number={3} title="Service Enquiries">
            <p>
              Submitting an enquiry through our website does not constitute a service
              agreement.
            </p>
            <p>After receiving an enquiry, Fix Your Gap may:</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Review your requirements</li>
              <li>Contact you for additional information</li>
              <li>Discuss possible solutions</li>
              <li>Provide a quotation or proposal</li>
              <li>Agree on scope, pricing and timelines</li>
              <li>Enter into a separate service agreement or statement of work</li>
            </ol>
            <p>
              A project will generally begin only after the relevant commercial terms have
              been accepted and any required advance payment has been received.
            </p>
          </TermsSection>

          <TermsSection number={4} title="Scope of Services">
            <p>
              The exact services, deliverables, timelines, pricing and responsibilities for
              a project will be determined by the applicable quotation, proposal, statement
              of work or service agreement.
            </p>
            <p>
              Website descriptions are general descriptions and should not be interpreted as
              a guarantee that every listed feature or deliverable is included in every
              project.
            </p>
          </TermsSection>

          <TermsSection number={5} title="Pricing">
            <p>Unless explicitly stated otherwise:</p>
            <TermsList
              items={[
                "Prices are provided based on the specific project scope.",
                "Quotations may change if project requirements change.",
                "Third-party software, subscriptions, hosting, domains, advertising spend, licences, plugins, APIs, stock assets or other external costs may be charged separately.",
                "Applicable taxes may be added where required.",
                "A quotation is valid for the period specified in the quotation.",
              ]}
            />
          </TermsSection>

          <TermsSection number={6} title="Project Timelines">
            <p>We aim to deliver projects within the timelines communicated to clients.</p>
            <p>Timelines may depend on:</p>
            <TermsList items={timelineFactors} />
            <p>
              Where delays are caused by factors outside Fix Your Gap&apos;s reasonable
              control, the delivery timeline may be adjusted.
            </p>
          </TermsSection>

          <TermsSection number={7} title="Client Responsibilities">
            <p>Clients are responsible for providing accurate and timely:</p>
            <TermsList items={clientResponsibilities} />
            <p>
              Delays in providing required information or approvals may affect project
              timelines.
            </p>
          </TermsSection>

          <TermsSection number={8} title="Revisions and Changes">
            <p>
              The number of revisions included in a project will depend on the agreed scope.
            </p>
            <p>
              Requests that materially change the original scope may be treated as
              additional work and may result in:
            </p>
            <TermsList
              items={["Additional charges", "Revised timelines", "A change request or revised scope"]}
            />
          </TermsSection>

          <TermsSection number={9} title="Third-Party Platforms">
            <p>
              Some services depend on third-party platforms, including but not limited to:
            </p>
            <TermsList items={thirdPartyPlatforms} />
            <p>
              Fix Your Gap does not control third-party platforms and cannot guarantee their
              continued availability, policies, algorithms, approval decisions or
              performance.
            </p>
            <p>
              For example, advertising results may be affected by changes to
              advertising-platform policies, auctions, algorithms, competition or account
              restrictions.
            </p>
          </TermsSection>

          <TermsSection number={10} title="Digital Marketing & Advertising">
            <p>
              Digital marketing and advertising services involve variables outside our
              control.
            </p>
            <p>We do not guarantee:</p>
            <TermsList items={marketingExclusions} />
            <p>
              Where performance targets or guarantees are agreed, they must be expressly
              stated in the applicable written agreement.
            </p>
          </TermsSection>

          <TermsSection number={11} title="Website, Software & Technology Services">
            <p>For website, software, app, API, automation and technology projects:</p>
            <TermsList
              items={[
                "Final deliverables will depend on the agreed scope.",
                "Hosting and third-party software costs may be separate.",
                "Client-requested changes after approval may incur additional charges.",
                "Third-party APIs and services may have their own limitations.",
                "Security and performance depend partly on the infrastructure and third-party systems used.",
              ]}
            />
            <p>
              Unless otherwise agreed, maintenance, hosting, ongoing development and future
              feature additions are not automatically included after project completion.
            </p>
          </TermsSection>

          <TermsSection number={12} title="AI Services">
            <p>
              AI-powered solutions can produce inaccurate, incomplete or unexpected results.
            </p>
            <p>
              Clients should independently review important AI-generated outputs before
              relying on them for business, financial, legal, medical or other high-impact
              decisions.
            </p>
            <p>
              Fix Your Gap does not guarantee that AI-generated content or outputs will
              always be accurate, complete, unbiased or suitable for a particular purpose.
            </p>
          </TermsSection>

          <TermsSection number={13} title="Intellectual Property">
            <p>Unless otherwise agreed in writing:</p>
            <TermsList
              items={[
                "Client-owned materials remain the property of the client.",
                "Third-party assets remain subject to their respective licences.",
                "Fix Your Gap retains rights to its pre-existing tools, frameworks, methodologies, templates and know-how.",
                "Ownership or licensing of final project deliverables will be determined by the applicable project agreement.",
              ]}
            />
            <p>
              Payment terms and intellectual-property transfer conditions may be specified
              separately for individual projects.
            </p>
          </TermsSection>

          <TermsSection number={14} title="Client Content">
            <p>
              You confirm that you have the necessary rights, permissions and licences to
              provide content, images, videos, logos, trademarks, data and other materials
              to Fix Your Gap.
            </p>
            <p>
              You are responsible for ensuring that materials you provide do not infringe
              third-party rights or applicable laws.
            </p>
          </TermsSection>

          <TermsSection number={15} title="Portfolio & Case Studies">
            <p>
              Unless otherwise agreed in writing, Fix Your Gap may request permission to
              showcase completed work in its portfolio, website, social media or marketing
              materials.
            </p>
            <p>We will respect confidentiality restrictions agreed with clients.</p>
          </TermsSection>

          <TermsSection number={16} title="Confidentiality">
            <p>
              We will take reasonable steps to keep confidential information shared for the
              purpose of a project confidential.
            </p>
            <p>Confidential information does not include information that:</p>
            <TermsList
              items={[
                "Is already publicly available",
                "Becomes publicly available without breach of confidentiality",
                "Was lawfully known to us before disclosure",
                "Is independently developed",
                "Must be disclosed by law or lawful authority",
              ]}
            />
            <p>
              Where a project requires additional confidentiality obligations, the parties
              may enter into a separate NDA.
            </p>
          </TermsSection>

          <TermsSection number={17} title="Payments">
            <p>
              Payment schedules will be specified in the applicable quotation, proposal or
              agreement.
            </p>
            <p>
              Where an advance payment is required, work may begin after the agreed advance
              has been received.
            </p>
            <p>Failure to make payments when due may result in:</p>
            <TermsList
              items={[
                "Suspension of work",
                "Delayed delivery",
                "Suspension of access to deliverables",
                "Additional charges where agreed",
                "Termination of the project",
              ]}
            />
          </TermsSection>

          <TermsSection number={18} title="Cancellation & Termination">
            <p>
              Either party may terminate a project according to the terms agreed in the
              applicable service agreement.
            </p>
            <p>
              If a client terminates a project after work has commenced, the client may be
              responsible for payment for work already completed, committed third-party
              expenses and other applicable charges.
            </p>
            <p>Specific refund and cancellation terms may vary by project.</p>
          </TermsSection>

          <TermsSection number={19} title="Refunds">
            <p>
              Refund eligibility will depend on the nature of the service, work completed,
              applicable agreement and circumstances of cancellation.
            </p>
            <p>
              Custom development, consulting, design, content, advertising setup and other
              work already performed may not be refundable once delivered or commenced,
              subject to applicable law and the agreed commercial terms.
            </p>
          </TermsSection>

          <TermsSection number={20} title="No Guarantee of Business Results">
            <p>
              Fix Your Gap provides professional services intended to support business
              objectives.
            </p>
            <p>
              However, business outcomes can depend on numerous factors outside our control,
              including:
            </p>
            <TermsList
              items={[
                "Market conditions",
                "Competition",
                "Pricing",
                "Client operations",
                "Customer behaviour",
                "Advertising platforms",
                "Economic conditions",
                "Third-party services",
                "Client implementation",
              ]}
            />
            <p>
              Accordingly, unless expressly guaranteed in writing, we do not guarantee a
              particular business result.
            </p>
          </TermsSection>

          <TermsSection number={21} title="Limitation of Liability">
            <p>
              To the maximum extent permitted by applicable law, Fix Your Gap will not be
              responsible for indirect, incidental, special or consequential losses arising
              from the use of our website or services.
            </p>
            <p>
              Nothing in these Terms excludes liability that cannot legally be excluded
              under applicable law.
            </p>
            <p>
              Where permitted by law and subject to the applicable service agreement, Fix
              Your Gap&apos;s aggregate liability relating to a particular service may be
              limited to the amount actually paid by the client for that service.
            </p>
          </TermsSection>

          <TermsSection number={22} title="Website Content">
            <p>
              We make reasonable efforts to keep website information accurate and current.
            </p>
            <p>
              However, service descriptions, pricing information, availability, examples
              and other website content may change without prior notice.
            </p>
            <p>
              Website content should not be treated as a binding quotation unless expressly
              stated otherwise.
            </p>
          </TermsSection>

          <TermsSection number={23} title="External Links">
            <p>
              Our website may contain links to third-party websites.
            </p>
            <p>
              These links are provided for convenience and do not mean that Fix Your Gap
              endorses or controls those websites.
            </p>
            <p>
              We are not responsible for third-party websites or their content, security or
              privacy practices.
            </p>
          </TermsSection>

          <TermsSection number={24} title="Force Majeure">
            <p>
              Fix Your Gap will not be responsible for delays or failure to perform caused
              by circumstances beyond our reasonable control, including:
            </p>
            <TermsList items={forceMajeureEvents} />
          </TermsSection>

          <TermsSection number={25} title="Changes to These Terms">
            <p>We may update these Terms periodically.</p>
            <p>
              Updated Terms will be published on this page with a revised Last Updated
              date.
            </p>
            <p>
              Your continued use of the website after an update constitutes acceptance of
              the updated Terms to the extent permitted by applicable law.
            </p>
          </TermsSection>

          <TermsSection number={26} title="Governing Law">
            <p>These Terms shall be governed by the laws applicable in India.</p>
            <p>
              Any disputes shall be subject to the jurisdiction of the courts having
              appropriate jurisdiction over [Hyderabad, Telangana, India], unless otherwise
              agreed in writing or required by applicable law.
            </p>
          </TermsSection>

          <TermsSection number={27} title="Contact Us">
            <p>For questions regarding these Terms:</p>
            <div className="space-y-1">
              <p className="font-bold text-heading">Fix Your Gap</p>
              <p>Email: info@fixyourgap.com</p>
              <p>Website: fixyourgap.com</p>
              <p>Address: Hyderabad, Telangana.</p>
            </div>
          </TermsSection>
        </article>
      </main>
    </>
  );
}
