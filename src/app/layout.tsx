import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PublicNav } from "@/components/layout/PublicNav";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { getPublicSettings } from "@/lib/public-data";
import type { SiteSettings } from "@/types";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const revalidate = 300;

export const metadata: Metadata = {
  title: {
    default: "Fix Your Gap - End-to-End Execution Partner",
    template: "%s | Fix Your Gap",
  },
  description:
    "We help startups, founders, and growing businesses succeed online. Digital, tech, marketing, consulting, staffing, compliance and business support.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Fix Your Gap",
  },
  twitter: { card: "summary_large_image" },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let settings: Partial<SiteSettings> = {};
  try {
    settings = await getPublicSettings();
  } catch {
    // Keep the public shell available if the settings store is temporarily down.
  }

  return (
    <html lang="en" className={jakarta.variable} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col antialiased">
        <PublicNav><Header phone={settings.company_phone} /></PublicNav>
        <main className="flex-1">{children}</main>
        <PublicNav><Footer settings={settings} /></PublicNav>
        <PublicNav><WhatsAppButton number={settings.social_whatsapp || settings.company_phone || ""} /></PublicNav>
      </body>
    </html>
  );
}
