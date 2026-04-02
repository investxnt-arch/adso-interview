import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

// Configuración directa (para prueba)
cloudinary.config({
  cloud_name: 'dfkfqxhmv',
  api_key: '636456423598492',
  api_secret: 'J2jdM4mYnxhkhNlpaVBvaxoAG9M',
});

export const runtime = 'nodejs';
export const maxDuration = 60;

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

    console.log('📤 Uploading file:', file.name, file.size, file.type);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'auto',
          folder: 'adsotube',
          public_id: `${Date.now()}-${title.replace(/\s+/g, '-').toLowerCase().slice(0, 50)}`,
        },
        (error, result) => {
          if (error) {
            console.error('❌ Cloudinary error:', error);
            reject(error);
          } else {
            console.log('✅ Cloudinary success:', result?.secure_url);
            resolve(result);
          }
        }
      );
      uploadStream.end(buffer);
    });

    const videoUrl = (result as any).secure_url;

    return NextResponse.json({
      success: true,
      url: videoUrl,
      title,
      description,
      id: `vid_${Date.now()}`,
    });

  } catch (error) {
    console.error('❌ Upload error:', error);
    return NextResponse.json(
      { error: 'Upload failed: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    );
  }
}