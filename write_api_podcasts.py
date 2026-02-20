with open('app/api/podcasts/route.ts', 'w', encoding='utf-8') as f:
    f.write("""import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { auth } from '@/lib/auth'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { title, description } = await request.json()
    if (!title) return NextResponse.json({ error: 'Title is required' }, { status: 400 })

    const podcast = await prisma.podcast.create({
      data: { title, description: description || null, userId: session.user.id },
    })

    return NextResponse.json({ message: 'Podcast created', podcast }, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Error creating podcast' }, { status: 500 })
  } finally {
    await prisma.()
  }
}

export async function GET() {
  try {
    const session = await auth()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const podcasts = await prisma.podcast.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ podcasts })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Error fetching podcasts' }, { status: 500 })
  } finally {
    await prisma.()
  }
}
""")
print('Done')
