// ── Site Settings ────────────────────────────────────────────────────────────
export interface SiteSettings {
  company_name: string;
  company_tagline: string;
  company_address: string;
  company_phone: string;
  company_email: string;
  social_linkedin: string;
  social_instagram: string;
  social_twitter: string;
  social_whatsapp: string;
  hero_headline: string;
  hero_subheadline: string;
  hero_cta_primary: string;
  hero_cta_secondary: string;
  stat_1_value: string;
  stat_1_label: string;
  stat_2_value: string;
  stat_2_label: string;
  stat_3_value: string;
  stat_3_label: string;
  stat_4_value: string;
  stat_4_label: string;
  footer_tagline: string;
  seo_default_title: string;
  seo_default_description: string;
  [key: string]: string;
}

// ── Service ───────────────────────────────────────────────────────────────────
export interface ServiceCategory {
  id: string;
  name: string;
  slug: string;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  icon?: string | null;
  coverImage?: string | null;
  category?: ServiceCategory | null;
  features: string[];
  processSteps: { title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  pricing?: string | null;
  timeline?: string | null;
  targetAudience?: string | null;
  ctaText: string;
  isFeatured: boolean;
  sortOrder: number;
  metaTitle?: string | null;
  metaDescription?: string | null;
  status: string;
  createdAt: string;
}

// ── Blog ─────────────────────────────────────────────────────────────────────
export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
}

export interface BlogAuthor {
  id: string;
  name: string;
  photo?: string | null;
  designation?: string | null;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string | null;
  featuredImage?: string | null;
  author?: BlogAuthor | null;
  category?: BlogCategory | null;
  tags: string[];
  readTimeMinutes: number;
  publishedAt?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  status: string;
  createdAt: string;
}

// ── Success Story ─────────────────────────────────────────────────────────────
export interface StoryResult {
  id: string;
  metric: string;
  value: string;
  description?: string | null;
  sortOrder: number;
}

export interface SuccessStory {
  id: string;
  title: string;
  slug: string;
  clientName?: string | null;
  clientLogo?: string | null;
  industry?: string | null;
  categoryId?: string | null;
  category?: { id: string; name: string; slug: string } | null;
  challenge: string;
  solution: string;
  testimonial?: string | null;
  testimonialAuthorName?: string | null;
  testimonialAuthorRole?: string | null;
  gallery: string[];
  isFeatured: boolean;
  results: StoryResult[];
  services: { service: Pick<Service, "id" | "title" | "slug"> }[];
  metaTitle?: string | null;
  metaDescription?: string | null;
  status: string;
  createdAt: string;
}

// ── Testimonial ───────────────────────────────────────────────────────────────
export interface Testimonial {
  id: string;
  name: string;
  company?: string | null;
  role?: string | null;
  message: string;
  avatar?: string | null;
  rating: number;
  displayPage: string;
  sortOrder: number;
}

// ── Team Member ───────────────────────────────────────────────────────────────
export interface TeamMember {
  id: string;
  name: string;
  designation: string;
  bio?: string | null;
  photo?: string | null;
  linkedinUrl?: string | null;
  sortOrder: number;
}
