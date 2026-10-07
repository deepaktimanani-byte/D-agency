import { SITE_URL } from "@/lib/site-url";
import type { Metadata } from "next";

export const DEFAULT_SOCIAL_IMAGE = "/images/social-card.png";
export const DEFAULT_DESCRIPTION =
  "We help startups, founders, and growing businesses succeed online. Digital, tech, marketing, consulting, staffing, compliance and business support.";

export function socialMetadata({
  title,
  description,
  path,
  image = DEFAULT_SOCIAL_IMAGE,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
}): Pick<Metadata, "alternates" | "openGraph" | "twitter"> {
  const url = new URL(path, SITE_URL).toString();
  const imageUrl = new URL(image, SITE_URL).toString();

  return {
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Fix Your Gap",
      locale: "en_US",
      type,
      images: [
        image === DEFAULT_SOCIAL_IMAGE
          ? { url: imageUrl, width: 1200, height: 630, alt: "Fix Your Gap" }
          : { url: imageUrl },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}
