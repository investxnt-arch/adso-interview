import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

export const runtime = 'nodejs';
export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { filename, contentType } = await request.json();
    
    if (!filename) {
      return NextResponse.json({ error: 'Filename required' }, { status: 400 });
    }

    // Sanitizar nombre
    const sanitizedName = filename
      .replace(/\s+/g, '-')
      .replace(/[^a-zA-Z0-9.\-]/g, '')
      .toLowerCase();
    
    const filePath = `videos/${Date.now()}-${sanitizedName}`;
    
    // No necesitamos generateUploadUrl, usamos put directamente desde el cliente
    // Pero el cliente necesita la URL de subida, así que devolvemos un endpoint

    return NextResponse.json({
      uploadUrl: `/api/upload-direct?path=${encodeURIComponent(filePath)}&type=${encodeURIComponent(contentType || 'video/mp4')}`,
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