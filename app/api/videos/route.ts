import { NextResponse, NextRequest } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

export async function GET() {
  const { data: videos, error } = await supabase
    .from('videos')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  return NextResponse.json({ videos: videos || [] })
}

export async function POST(request: NextRequest) {
  try {
    const { title, url, user_name } = await request.json()
    
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
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    return NextResponse.json({ success: true, video: data }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Error al guardar' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const id = new URL(request.url).searchParams.get('id')
    if (!id) {
      return NextResponse.json({ error: 'ID requerido' }, { status: 400 })
    }
    
    await supabase.from('videos').delete().eq('id', id)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Error al eliminar' }, { status: 500 })
  }
}
