import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ok, err } from '@/lib/api-helpers';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.name || !body.email) return err('Name and email are required');

    const enquiry = await prisma.enquiry.create({ data: body });

    // Fire-and-forget email notification
    sendNotification(enquiry).catch(() => {});

    return ok(enquiry);
  } catch {
    return err('Failed to submit enquiry', 500);
  }
}

async function sendNotification(enquiry: {
  name: string; email: string; phone?: string | null; company?: string | null;
  serviceInterest?: string | null; message?: string | null; sourcePage?: string | null;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFICATION_EMAIL;
  if (!apiKey || !to) return;

  const { Resend } = await import('resend');
  const resend = new Resend(apiKey);
  await resend.emails.send({
    from: 'Agency <noreply@youragency.com>',
    to,
    subject: `New Enquiry from ${enquiry.name}`,
    html: `
      <h2>New Lead Received</h2>
      <p><strong>Name:</strong> ${enquiry.name}</p>
      <p><strong>Email:</strong> ${enquiry.email}</p>
      <p><strong>Phone:</strong> ${enquiry.phone || 'N/A'}</p>
      <p><strong>Company:</strong> ${enquiry.company || 'N/A'}</p>
      <p><strong>Service Interest:</strong> ${enquiry.serviceInterest || 'N/A'}</p>
      <p><strong>Message:</strong> ${enquiry.message || 'N/A'}</p>
      <p><strong>Source:</strong> ${enquiry.sourcePage || 'N/A'}</p>
    `,
  });
}
