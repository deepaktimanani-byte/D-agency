import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const passwordHash = await bcrypt.hash(
    process.env.ADMIN_PASSWORD || 'Admin@123456',
    12,
  );

  await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || 'admin@agency.com' },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || 'admin@agency.com',
      passwordHash,
      name: process.env.ADMIN_NAME || 'Admin',
      role: 'admin',
    },
  });

  // Seed default site settings
  const defaults: Record<string, string> = {
    company_name: 'Your Agency',
    company_tagline: 'End-to-End Execution Partner',
    company_address: '123 Business Ave, City, Country',
    company_phone: '+1 (234) 567 890',
    company_email: 'hello@youragency.com',
    social_linkedin: '',
    social_instagram: '',
    social_twitter: '',
    social_whatsapp: '+1234567890',
    hero_headline: 'Bright Ideas, Brilliant Results',
    hero_subheadline: 'Turn Likes into Loyalty. Discover Why Businesses Trust Us With Their Growth Journey.',
    hero_cta_primary: 'Get a Free Consultation',
    hero_cta_secondary: 'See Our Work',
    stat_1_value: '200+',
    stat_1_label: 'Happy Clients',
    stat_2_value: '$2M',
    stat_2_label: 'Revenue Generated',
    stat_3_value: '93%',
    stat_3_label: 'Success Rate',
    stat_4_value: '50+',
    stat_4_label: 'Services Offered',
    footer_tagline: 'Your end-to-end partner for digital growth.',
    seo_default_title: 'Your Agency — Digital Growth Partner',
    seo_default_description: 'We help startups, founders, and growing businesses succeed online.',
  };

  for (const [key, value] of Object.entries(defaults)) {
    await prisma.siteSetting.upsert({
      where: { key },
      update: {},
      create: { key, value },
    });
  }

  // Seed a service category
  await prisma.serviceCategory.upsert({
    where: { slug: 'digital-marketing' },
    update: {},
    create: { name: 'Digital Marketing', slug: 'digital-marketing' },
  });

  console.log('Seed complete — admin user and default settings created.');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
