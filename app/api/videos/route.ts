import { NextResponse, NextRequest } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

export async function GET() {
  const { data: videos, error } = await supabase
    .from('videos')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ videos })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, url, user_id, user_name } = body

    if (!url) {
      return NextResponse.json({ error: 'La URL del video es requerida' }, { status: 400 })
    }

    const { data: video, error } = await supabase
      .from('videos')
      .insert([
        {
          title: title || 'Video sin título',
          description: description || '',
          url: url,
          user_id: user_id || 'usuario-desconocido',
          user_name: user_name || 'Usuario',
          views: 0,
          likes: 0
        }
      ])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, video }, { status: 201 })
  } catch (error) {
    console.error('Error al guardar video:', error)
    return NextResponse.json({ error: 'Error al guardar el video' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const id = url.searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID requerido' }, { status: 400 })
    }

    const { error } = await supabase.from('videos').delete().eq('id', id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error al eliminar video:', error)
    return NextResponse.json({ error: 'Error al eliminar video' }, { status: 500 })
  }
}
