import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read the Fix Your Gap Privacy Policy to learn how we collect, use, store, disclose and protect your information.",
};

const directInformation = [
  "Full name",
  "Email address",
  "Phone/mobile number",
  "Company or organisation name",
  "Job title/designation",
  "Website or social media profiles",
  "Service requirements",
  "Project details",
  "Budget information, where voluntarily provided",
  "Messages, enquiries and other communications",
  "Information provided through contact or enquiry forms",
  "Information provided during consultations or project discussions",
];

const automaticInformation = [
  "IP address",
  "Browser type",
  "Device type",
  "Operating system",
  "Pages visited",
  "Time spent on pages",
  "Referring website",
  "General website usage information",
  "Cookies and similar technologies",
];

const informationUses = [
  "Respond to enquiries and requests",
  "Contact you regarding your enquiry",
  "Understand your business and project requirements",
  "Provide quotations and proposals",
  "Deliver requested services",
  "Communicate regarding ongoing projects",
  "Manage client relationships",
  "Improve our website and services",
  "Analyse website usage and performance",
  "Measure advertising and marketing campaigns",
  "Send relevant business or marketing communications where permitted",
  "Prevent spam, fraud, abuse and security threats",
  "Maintain records required for business and legal purposes",
  "Comply with applicable laws and regulations",
];

const cookieUses = [
  "Keep the website functioning properly",
  "Understand how visitors use the website",
  "Improve website performance",
  "Remember certain preferences",
  "Measure advertising effectiveness",
  "Support marketing and analytics activities",
];

const platforms = [
  "Google Analytics",
  "Google Tag Manager",
  "Meta Pixel",
  "Google Ads",
  "LinkedIn advertising/analytics tools",
  "Other marketing or analytics platforms used by Fix Your Gap",
];

const informationSharing = [
  "Hosting and infrastructure providers",
  "Email service providers",
  "CRM platforms",
  "Analytics providers",
  "Advertising platforms",
  "Payment providers",
  "Technology providers",
  "Communication platforms",
  "Professional advisers",
  "Service providers or project specialists working on your project",
];

const retentionPurposes = [
  "Providing services",
  "Managing client relationships",
  "Maintaining business records",
  "Resolving disputes",
  "Meeting contractual obligations",
  "Complying with applicable legal and regulatory requirements",
];

const rights = [
  "Request access to information we hold about you",
  "Request correction of inaccurate information",
  "Request deletion of information where legally applicable",
  "Withdraw consent where processing is based on consent",
  "Request information regarding how your data is processed",
  "Object to or restrict certain processing where applicable",
  "Opt out of certain marketing communications",
];

function PolicySection({
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

function PolicyList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc pl-6 space-y-2">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="section-pad bg-bg-mint">
        <div className="container-main max-w-4xl">
          <p className="text-sm font-bold uppercase tracking-widest text-navy mb-4">
            Legal
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-heading mb-4">
            Privacy Policy
          </h1>
          <p className="text-body">Last Updated: 15th September 2026</p>
        </div>
      </section>

      <main className="section-pad bg-surface">
        <article className="container-main max-w-4xl space-y-10">
          <div className="text-body leading-relaxed space-y-4">
            <p>
              Fix Your Gap respects your privacy and is committed to protecting the
              information you share with us.
            </p>
            <p>
              This Privacy Policy explains how we collect, use, store, disclose and
              protect information when you visit fixyourgap.com, contact us, submit an
              enquiry, request a service, or otherwise interact with our services.
            </p>
            <p>
              By using our website or submitting information to us, you acknowledge that
              you have read and understood this Privacy Policy.
            </p>
          </div>

          <PolicySection number={1} title="Information We Collect">
            <p>Depending on how you interact with Fix Your Gap, we may collect:</p>
            <h3 className="font-bold text-heading">Information you provide directly</h3>
            <PolicyList items={directInformation} />
            <h3 className="font-bold text-heading">Information collected automatically</h3>
            <p>
              When you visit our website, certain information may be collected
              automatically, including:
            </p>
            <PolicyList items={automaticInformation} />
            <p>
              We may use analytics and advertising technologies such as Google Analytics,
              Google Tag Manager, Meta Pixel and similar tools to understand website usage
              and measure marketing performance.
            </p>
          </PolicySection>

          <PolicySection number={2} title="How We Use Your Information">
            <p>We may use collected information to:</p>
            <PolicyList items={informationUses} />
            <p>
              We will not use your personal information for purposes materially different
              from those described here without appropriate notice or a lawful basis where
              required.
            </p>
          </PolicySection>

          <PolicySection number={3} title="Contact and Lead Forms">
            <p>
              When you submit an enquiry through our website, we may collect information
              such as your name, phone number, email address, company name, selected service
              and message.
            </p>
            <p>
              We use this information to understand your requirements and contact you
              regarding the requested service.
            </p>
            <p>
              Submitting an enquiry does not create an obligation for either you or Fix
              Your Gap to enter into a service agreement.
            </p>
          </PolicySection>

          <PolicySection number={4} title="Cookies">
            <p>Our website may use cookies and similar technologies to:</p>
            <PolicyList items={cookieUses} />
            <p>
              You may be able to control cookies through your browser settings. Disabling
              certain cookies may affect some website functionality.
            </p>
          </PolicySection>

          <PolicySection number={5} title="Analytics and Advertising">
            <p>
              We may use third-party analytics and advertising platforms to understand
              visitor behaviour and measure marketing campaigns.
            </p>
            <p>
              These platforms may process information according to their own privacy
              policies and terms.
            </p>
            <p>Examples may include:</p>
            <PolicyList items={platforms} />
            <p>Where required, applicable consent or privacy controls will be provided.</p>
          </PolicySection>

          <PolicySection number={6} title="Sharing of Information">
            <p>We do not sell your personal information as a business practice.</p>
            <p>
              We may share information with trusted third parties when reasonably necessary
              to operate our business or provide requested services.
            </p>
            <p>These may include:</p>
            <PolicyList items={informationSharing} />
            <p>
              Where we use freelancers, contractors or specialist partners to deliver a
              project, relevant information may be shared only to the extent reasonably
              necessary for them to perform their assigned work.
            </p>
            <p>
              We may also disclose information where required by law, legal process, court
              order, governmental authority or to protect our rights, users or business.
            </p>
          </PolicySection>

          <PolicySection number={7} title="Third-Party Services">
            <p>
              Our website may contain links, integrations or references to third-party
              websites and services.
            </p>
            <p>
              We are not responsible for the privacy practices, content or security of
              third-party websites.
            </p>
            <p>
              You should review the privacy policies of third-party services before
              providing them with personal information.
            </p>
          </PolicySection>

          <PolicySection number={8} title="Data Security">
            <p>
              We take reasonable technical and organisational measures to protect
              information against unauthorised access, misuse, alteration, disclosure or
              destruction.
            </p>
            <p>
              However, no website, online service or electronic transmission can be
              guaranteed to be completely secure.
            </p>
            <p>
              Accordingly, while we take reasonable precautions, we cannot guarantee
              absolute security of information transmitted to or stored by us.
            </p>
          </PolicySection>

          <PolicySection number={9} title="Data Retention">
            <p>
              We retain personal information for as long as reasonably necessary for the
              purposes described in this Privacy Policy, including:
            </p>
            <PolicyList items={retentionPurposes} />
            <p>
              When information is no longer reasonably required, we may delete, anonymise
              or securely dispose of it, subject to applicable legal requirements.
            </p>
          </PolicySection>

          <PolicySection number={10} title="Your Rights">
            <p>
              Depending on applicable law, you may have rights regarding your personal
              information, including the right to:
            </p>
            <PolicyList items={rights} />
            <p>To exercise applicable rights, contact us using the details provided below.</p>
          </PolicySection>

          <PolicySection number={11} title="Marketing Communications">
            <p>
              If you receive promotional communications from us, you may request to stop
              receiving them.
            </p>
            <p>You can do this by:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Using an unsubscribe mechanism included in the communication, where available; or</li>
              <li>Contacting us directly.</li>
            </ul>
            <p>
              We may continue to send essential service-related or transactional
              communications where necessary.
            </p>
          </PolicySection>

          <PolicySection number={12} title="Children's Privacy">
            <p>
              Our website and services are intended primarily for businesses, professionals
              and other users capable of entering into legally binding arrangements.
            </p>
            <p>
              We do not knowingly collect personal information from children for purposes
              unrelated to providing the requested service.
            </p>
            <p>
              If you believe a child has provided personal information to us, please
              contact us so that we can review and take appropriate action.
            </p>
          </PolicySection>

          <PolicySection number={13} title="International Data Processing">
            <p>
              Some third-party service providers we use may process or store information
              outside India.
            </p>
            <p>
              Where applicable, we will take reasonable steps to ensure that such
              processing is conducted in accordance with applicable privacy and
              data-protection requirements.
            </p>
          </PolicySection>

          <PolicySection number={14} title="Changes to This Privacy Policy">
            <p>
              We may update this Privacy Policy periodically to reflect changes in our
              services, technology, legal requirements or business practices.
            </p>
            <p>
              The updated version will be posted on this page with a revised Last Updated
              date.
            </p>
          </PolicySection>

          <PolicySection number={15} title="Contact Us">
            <p>
              If you have questions, concerns or requests relating to this Privacy Policy
              or your personal information, please contact:
            </p>
            <div className="space-y-1">
              <p className="font-bold text-heading">Fix Your Gap</p>
              <p>Email: info@fixyourgap.com</p>
              <p>Website: fixyourgap.com</p>
              <p>Address: Hyderabad, Telangana.</p>
            </div>
          </PolicySection>
        </article>
      </main>
    </>
  );
}
