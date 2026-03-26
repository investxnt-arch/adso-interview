import { NextResponse } from 'next/server';
import { list } from '@vercel/blob';

export async function GET() {
  try {
    console.log('Fetching videos from Vercel Blob...');
    
    const { blobs } = await list({
      prefix: 'videos/',
      limit: 100,
    });

    console.log(`Found ${blobs.length} videos`);

    const videos = blobs.map(blob => {
      // Extraer título del nombre del archivo
      let title = blob.pathname.split('/').pop() || '';
      title = title.replace(/^\d+-/, '').replace(/\.(mp4|mov|avi|webm)$/i, '').replace(/_/g, ' ');
      title = title.charAt(0).toUpperCase() + title.slice(1);
      
      return {
        id: blob.pathname,
        title: title || 'Untitled Video',
        url: blob.url,
        size: blob.size,
        uploadedAt: blob.uploadedAt,
        thumbnail: '🎥',
        fileType: blob.pathname.split('.').pop()?.toUpperCase() || 'MP4'
      };
    });

    return NextResponse.json({ videos });
    
  } catch (error) {
    console.error('Error listing videos:', error);
    return NextResponse.json({ videos: [], error: (error as Error).message });
  }
}