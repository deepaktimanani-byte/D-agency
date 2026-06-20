import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PublicNav } from "@/components/layout/PublicNav";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { ThemeProvider } from "@/components/ThemeProvider";
import { prisma } from "@/lib/prisma";
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

export const metadata: Metadata = {
  title: {
    default: "Agency — End-to-End Execution Partner",
    template: "%s | Agency",
  },
  description:
    "We help startups, founders, and growing businesses succeed online. Digital, tech, marketing, consulting, staffing, compliance and business support.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Agency",
  },
  twitter: { card: "summary_large_image" },
};

async function getSettings(): Promise<Partial<SiteSettings>> {
  try {
    const rows = await prisma.siteSetting.findMany();
    return rows.reduce<Partial<SiteSettings>>((acc, r) => ({ ...acc, [r.key]: r.value }), {});
  } catch {
    return {};
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();

  return (
    <html lang="en" className={jakarta.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){var m={navy:["#1B2D5E","#0F1F42","#2D4A9A","#EDF7F3","#4DBFA0","#0D1B35"],orange:["#E8621A","#C4501A","#F07A3A","#FFF4EF","#F59E0B","#431407"],emerald:["#059669","#047857","#10B981","#ECFDF5","#34D399","#022C22"],purple:["#7C3AED","#6D28D9","#8B5CF6","#F5F3FF","#A78BFA","#1E0A3C"],sunset:["#F97316","#EA6C0A","#FB923C","#FFF7ED","#EC4899","#431407"]};var t=localStorage.getItem('site-theme')||'navy';var v=m[t]||m.navy;var s=document.documentElement.style;s.setProperty('--color-navy',v[0]);s.setProperty('--color-navy-dark',v[1]);s.setProperty('--color-navy-light',v[2]);s.setProperty('--color-bg-mint',v[3]);s.setProperty('--color-accent-teal',v[4]);s.setProperty('--color-bg-dark',v[5]);})();` }} />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <ThemeProvider>
          <PublicNav><Header phone={settings.company_phone} /></PublicNav>
          <main className="flex-1">{children}</main>
          <PublicNav><Footer settings={settings} /></PublicNav>
          <PublicNav><WhatsAppButton number={settings.social_whatsapp || settings.company_phone || ""} /></PublicNav>
        </ThemeProvider>
      </body>
    </html>
  );
}
