import { NextResponse, NextRequest } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, url, user_name } = body

    if (!url) {
      return NextResponse.json({ error: 'URL del video requerida' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('videos')
      .insert({
        title: title || 'Video sin título',
        description: '',
        url: url,
        user_id: 'anonymous',
        user_name: user_name || 'Usuario',
        views: 0,
        likes: 0
      })
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, video: data?.[0] }, { status: 201 })
  } catch (error) {
    console.error('Error en POST /api/videos:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
