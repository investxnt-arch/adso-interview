// app/api/videos/route.ts
import { NextResponse, NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET - Obtener todos los videos desde Supabase
export async function GET() {
  try {
    const videos = await prisma.videos.findMany({
      orderBy: { created_at: 'desc' }
    })
    return NextResponse.json({ videos })
  } catch (error) {
    console.error('Error al obtener videos:', error)
    return NextResponse.json({ error: 'Error al obtener videos' }, { status: 500 })
  }
}

// POST - Guardar video en Supabase
export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const session = cookieStore.get('session')
    
    if (!session) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const body = await request.json()
    const { title, description, url, user_name, user_id } = body

    if (!url) {
      return NextResponse.json({ error: 'La URL del video es requerida' }, { status: 400 })
    }

    // ✅ Guardar en Supabase correctamente
    const video = await prisma.videos.create({
      data: {
        title: title || 'Video sin título',
        description: description || '',
        url: url,
        user_id: user_id || 'usuario-desconocido',
        user_name: user_name || 'Usuario',
        views: 0,
        likes: 0
      }
    })

    return NextResponse.json({ success: true, video }, { status: 201 })
  } catch (error) {
    console.error('Error al guardar video:', error)
    return NextResponse.json({ error: 'Error al guardar el video' }, { status: 500 })
  }
}

// DELETE - Eliminar video de Supabase
export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const id = url.searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'ID requerido' }, { status: 400 })
    }

    await prisma.videos.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error al eliminar video:', error)
    return NextResponse.json({ error: 'Error al eliminar video' }, { status: 500 })
  }
}
