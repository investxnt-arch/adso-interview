import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

export const runtime = 'nodejs';
export const maxDuration = 60;

export async function PUT(request: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const url = new URL(request.url);
    const filePath = url.searchParams.get('path');
    const contentType = url.searchParams.get('type') || 'video/mp4';

    if (!filePath) {
      return NextResponse.json({ error: 'Path required' }, { status: 400 });
    }

    const file = await request.arrayBuffer();
    
    const blob = await put(filePath, file, {
      access: 'public',
      contentType: contentType,
    });

    return NextResponse.json({
      success: true,
      url: blob.url,
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Upload failed: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    );
  }
}