// app/api/videos/[...id]/route.ts
import { NextResponse, NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string[] } }
) {
  try {
    const id = params.id[0]
    await prisma.videos.delete({
      where: { id: id }
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error al eliminar:', error)
    return NextResponse.json({ error: 'Error al eliminar el video' }, { status: 500 })
  }
}
