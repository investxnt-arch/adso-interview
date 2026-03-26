import { NextResponse } from 'next/server';

// Esta es una versión simplificada que no depende de @vercel/blob
// para evitar errores de importación

export async function GET() {
  try {
    // Por ahora, devolvemos videos de ejemplo
    // En producción, aquí conectarías con tu base de datos o Vercel Blob
    
    const videos = [
      {
        id: '1',
        title: 'Example Video',
        url: '/sample-video.mp4',
        size: 1024 * 1024 * 10, // 10MB
        uploadedAt: new Date().toISOString(),
        thumbnail: '🎥',
        fileType: 'MP4'
      }
    ];

    return NextResponse.json({ videos });
    
  } catch (error) {
    console.error('Error listing videos:', error);
    return NextResponse.json({ videos: [], error: 'Failed to load videos' });
  }
}