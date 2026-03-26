import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const title = (formData.get('title') as string) || 'Sin título';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Sanitizar nombre: espacios y caracteres especiales rompen la URL
    const ext = file.name.split('.').pop()?.toLowerCase() || 'mp4';
    const baseName = file.name
      .replace(/\.[^/.]+$/, '')
      .replace(/\s+/g, '-')
      .replace(/[^a-zA-Z0-9\-_]/g, '')
      .slice(0, 50) || 'video';

    const fileName = `videos/${Date.now()}-${baseName}.${ext}`;

    // contentType explícito — sin esto Vercel Blob guarda como
    // application/octet-stream y el browser rechaza reproducirlo
    const blob = await put(fileName, file, {
      access: 'public',
      contentType: file.type || 'video/mp4',
    });

    return NextResponse.json({
      success: true,
      url: blob.url,
      downloadUrl: blob.downloadUrl,
      title,
      contentType: file.type,
      id: `vid_${Date.now()}`,
    });

  } catch (error) {
    console.error('Upload error:', error);
    const message = error instanceof Error ? error.message : 'Upload failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}