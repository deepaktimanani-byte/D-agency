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
  icon?: string;
  coverImage?: string;
  category?: ServiceCategory;
  features: string[];
  processSteps: { title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  pricing?: string;
  timeline?: string;
  targetAudience?: string;
  ctaText: string;
  isFeatured: boolean;
  sortOrder: number;
  metaTitle?: string;
  metaDescription?: string;
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
  photo?: string;
  designation?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featuredImage?: string;
  author?: BlogAuthor;
  category?: BlogCategory;
  tags: string[];
  readTimeMinutes: number;
  publishedAt?: string;
  metaTitle?: string;
  metaDescription?: string;
  status: string;
  createdAt: string;
}

// ── Success Story ─────────────────────────────────────────────────────────────
export interface StoryResult {
  id: string;
  metric: string;
  value: string;
  description?: string;
  sortOrder: number;
}

export interface SuccessStory {
  id: string;
  title: string;
  slug: string;
  clientName?: string;
  clientLogo?: string;
  industry?: string;
  categoryId?: string;
  category?: { id: string; name: string; slug: string };
  challenge: string;
  solution: string;
  testimonial?: string;
  testimonialAuthorName?: string;
  testimonialAuthorRole?: string;
  gallery: string[];
  isFeatured: boolean;
  results: StoryResult[];
  services: { service: Pick<Service, "id" | "title" | "slug"> }[];
  metaTitle?: string;
  metaDescription?: string;
  status: string;
  createdAt: string;
}

// ── Testimonial ───────────────────────────────────────────────────────────────
export interface Testimonial {
  id: string;
  name: string;
  company?: string;
  role?: string;
  message: string;
  avatar?: string;
  rating: number;
  displayPage: string;
  sortOrder: number;
}

// ── Team Member ───────────────────────────────────────────────────────────────
export interface TeamMember {
  id: string;
  name: string;
  designation: string;
  bio?: string;
  photo?: string;
  linkedinUrl?: string;
  sortOrder: number;
}
