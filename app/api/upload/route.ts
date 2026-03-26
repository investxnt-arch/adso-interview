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

    // Validaciones
    const validTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/webm'];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json({ 
        error: 'Invalid file type. Please upload MP4, MOV, AVI, or WEBM' 
      }, { status: 400 });
    }

    // Generar nombre único y seguro
    const timestamp = Date.now();
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const fileName = `${timestamp}-${safeName}`;

    console.log(`Uploading video: ${fileName} (${(file.size / (1024 * 1024)).toFixed(2)} MB)`);

    // Subir a Vercel Blob
    const blob = await put(`videos/${fileName}`, file, {
      access: 'public',
      addRandomSuffix: false,
    });

    console.log(`Video uploaded successfully: ${blob.url}`);

    return NextResponse.json({
      success: true,
      url: blob.url,
      title,
      description,
      fileType: file.type,
      size: file.size,
      fileName: fileName
    });
    
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: `Upload failed: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}