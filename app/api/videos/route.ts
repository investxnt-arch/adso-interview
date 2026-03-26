import { NextResponse } from 'next/server';
import { list } from '@vercel/blob';
import { auth } from '@/lib/auth';

// Listar todos los videos públicos
export async function GET() {
  try {
    const { blobs } = await list({
      prefix: 'videos/',
      limit: 100,
    });

    const videos = blobs.map(blob => ({
      id: blob.pathname,
      title: blob.pathname.split('/').pop()?.replace(/\.mp4$/, '').replace(/_/g, ' ') || 'Untitled',
      url: blob.url,
      size: blob.size,
      uploadedAt: blob.uploadedAt,
      thumbnail: '🎥'
    }));

    return NextResponse.json({ videos });
  } catch (error) {
    console.error('Error listing videos:', error);
    return NextResponse.json({ videos: [] });
  }
}

// Subir video (ya lo tenemos en /api/upload)