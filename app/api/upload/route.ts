import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Subir a Vercel Blob
    const blob = await put(`videos/${Date.now()}-${file.name}`, file, {
      access: 'public',
      addRandomSuffix: true,
    });

    // Aquí guardarías en tu base de datos
    // Por ahora, solo devolvemos la URL

    return NextResponse.json({
      success: true,
      url: blob.url,
      title,
      description,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    );
  }
}