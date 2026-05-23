import { NextResponse, NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { supabase } from '@/lib/supabaseClient'

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('session')

    if (!sessionCookie) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    let sessionData
    try {
      sessionData = JSON.parse(Buffer.from(sessionCookie.value, 'base64').toString())
      if (sessionData.expires < Date.now()) {
        return NextResponse.json({ error: 'Sesión expirada' }, { status: 401 })
      }
    } catch {
      return NextResponse.json({ error: 'Sesión inválida' }, { status: 401 })
    }

    const body = await request.json()
    const { title, description, url, user_name } = body

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
          user_id: sessionData.userId || 'desconocido',
          user_name: user_name || sessionData.email?.split('@')[0] || 'Usuario',
          views: 0,
          likes: 0
        }
      ])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({
      success: true,
      message: 'Video subido correctamente',
      video
    }, { status: 201 })

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Error al subir el video' }, { status: 500 })
  }
}
