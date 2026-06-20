import { ok, err } from '@/lib/api-helpers';
import { prisma } from '@/lib/prisma';

const PUBLIC_KEYS = [
  'company_name', 'company_tagline', 'company_address', 'company_phone',
  'company_email', 'social_facebook', 'social_instagram', 'social_linkedin',
  'social_twitter', 'social_youtube', 'social_whatsapp',
  'hero_headline', 'hero_subheadline', 'hero_cta_primary', 'hero_cta_secondary',
  'stat_1_value', 'stat_1_label', 'stat_2_value', 'stat_2_label',
  'stat_3_value', 'stat_3_label', 'stat_4_value', 'stat_4_label',
  'footer_tagline', 'seo_default_title', 'seo_default_description',
];

export async function GET() {
  try {
    const settings = await prisma.siteSetting.findMany({ where: { key: { in: PUBLIC_KEYS } } });
    return ok(Object.fromEntries(settings.map((s) => [s.key, s.value])));
  } catch {
    return err('Failed to load settings', 500);
  }
}
