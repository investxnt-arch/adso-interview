import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { folder, public_id, timestamp } = await request.json();

    // Generar firma para subida presignada
    const signature = cloudinary.utils.api_sign_request(
      { timestamp, folder, public_id },
      process.env.CLOUDINARY_API_SECRET!
    );

    return NextResponse.json({
      signature,
      api_key: process.env.CLOUDINARY_API_KEY,
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      timestamp,
    });
  } catch (error) {
    console.error('Signature error:', error);
    return NextResponse.json({ error: 'Error generating signature' }, { status: 500 });
  }
}