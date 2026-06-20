import { NextRequest } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { prisma } from '@/lib/prisma';
import { ok, err, requireAdmin } from '@/lib/api-helpers';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  const denied = requireAdmin(req);
  if (denied) return denied;

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    if (!file) return err('No file provided');

    const buffer = Buffer.from(await file.arrayBuffer());

    const result = await new Promise<{ secure_url: string; public_id: string }>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: 'agency' }, (error, res) => {
          if (error || !res) reject(error);
          else resolve(res);
        })
        .end(buffer);
    });

    const media = await prisma.media.create({
      data: {
        filename: file.name,
        url: result.secure_url,
        publicId: result.public_id,
        mimeType: file.type,
        size: file.size,
      },
    });

    return ok(media);
  } catch {
    return err('Upload failed', 500);
  }
}
