import { createClient } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { filename, contentType } = await request.json();
    
    const blobClient = createClient({
      token: process.env.BLOB_READ_WRITE_TOKEN!,
    });

    const sanitizedName = filename
      .replace(/\s+/g, '-')
      .replace(/[^a-zA-Z0-9.\-]/g, '')
      .toLowerCase();
    
    const filePath = `videos/${Date.now()}-${sanitizedName}`;
    
    // Generar URL de subida temporal
    const uploadUrl = await blobClient.generateUploadUrl(filePath, {
      contentType: contentType || 'video/mp4',
    });

    return NextResponse.json({
      uploadUrl: uploadUrl.url,
      filePath: filePath,
    });

  } catch (error) {
    console.error('Error generating upload URL:', error);
    return NextResponse.json(
      { error: 'Failed to generate upload URL' },
      { status: 500 }
    );
  }
}