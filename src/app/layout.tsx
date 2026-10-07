import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PublicNav } from "@/components/layout/PublicNav";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { getPublicSettings } from "@/lib/public-data";
import { SITE_URL } from "@/lib/site-url";
import { DEFAULT_DESCRIPTION, socialMetadata } from "@/lib/social-metadata";
import type { SiteSettings } from "@/types";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const GOOGLE_TAG_ID = "G-YT793RCYGV";

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
  description: DEFAULT_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  ...socialMetadata({
    title: "Fix Your Gap - End-to-End Execution Partner",
    description: DEFAULT_DESCRIPTION,
    path: "/",
  }),
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
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-tag" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){window.dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GOOGLE_TAG_ID}');`}
        </Script>
      </body>
    </html>
  );
}
