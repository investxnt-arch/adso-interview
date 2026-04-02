import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { createClient } from '@supabase/supabase-js';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
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

    // Subir a Cloudinary
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'auto',
          folder: 'adsotube',
          upload_preset: 'adsotube_upload',
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

    // ✅ Crear cliente de Supabase directamente en la API
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing Supabase env vars');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data, error: supabaseError } = await supabase
      .from('videos')
      .insert({
        title,
        description,
        url: videoUrl,
        user_id: session.user.id,
        user_name: session.user.name || 'Anonymous',
        views: 0,
        likes: 0,
      })
      .select();

    if (supabaseError) {
      console.error('❌ Supabase error:', supabaseError);
      return NextResponse.json({ error: 'Database error: ' + supabaseError.message }, { status: 500 });
    }

    console.log('✅ Saved to Supabase:', data);

    return NextResponse.json({
      success: true,
      url: videoUrl,
      title,
      description,
      id: data?.[0]?.id,
    });

  } catch (error) {
    console.error('❌ Upload error:', error);
    return NextResponse.json(
      { error: 'Upload failed: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    );
  }
}