import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

export const runtime = 'nodejs';
export const maxDuration = 60; // 60 segundos para subidas grandes

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Sanitizar nombre del archivo
    const sanitizedName = file.name
      .replace(/\s+/g, '-')
      .replace(/[^a-zA-Z0-9.\-]/g, '')
      .toLowerCase();
    
    const fileName = `videos/${Date.now()}-${sanitizedName}`;

    // Subir con multipart support
    const blob = await put(fileName, file, {
      access: 'public',
      contentType: file.type || 'video/mp4',
      multipart: true, // ✅ HABILITAR SUBIDA EN PARTES
    });

    console.log('✅ Video uploaded:', blob.url);

    return NextResponse.json({
      success: true,
      url: blob.url,
      title,
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Upload failed: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    );
  }
}