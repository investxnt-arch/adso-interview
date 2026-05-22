import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { auth } from '@/lib/auth'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { title, description, podcastId, audioUrl } = await request.json()
    if (!title || !podcastId) return NextResponse.json({ error: 'Title and podcast are required' }, { status: 400 })

    const podcast = await prisma.podcast.findFirst({ where: { id: podcastId, userId: session.user?.id as string } })
    if (!podcast) return NextResponse.json({ error: 'Podcast not found' }, { status: 404 })

    const episode = await prisma.episode.create({
      data: { title, description: description || null, audioUrl: audioUrl || null, podcastId },
    })

    return NextResponse.json({ message: 'Episode created', episode }, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Error creating episode' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

export async function GET() {
  try {
    const session = await auth()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const episodes = await prisma.episode.findMany({
      where: { podcast: { userId: session.user?.id as string } },
      orderBy: { createdAt: 'desc' },
      include: { podcast: { select: { title: true } } },
    })

    return NextResponse.json({ episodes })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Error fetching episodes' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
