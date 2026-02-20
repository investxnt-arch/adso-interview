import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function EpisodesPage() {
  const session = await auth()
  if (!session) redirect('/login')

  const episodes = await prisma.episode.findMany({
    where: { podcast: { userId: session?.user?.id as string } },
    orderBy: { createdAt: 'desc' },
    include: { podcast: { select: { title: true } } },
  })

  return (
    <div className='min-h-screen bg-gray-100 flex'>
      <aside className='w-64 bg-white shadow-md flex flex-col'>
        <div className='p-6 border-b'>
          <h1 className='text-xl font-bold text-blue-600'>ADSO Interview</h1>
        </div>
        <nav className='flex-1 p-4 flex flex-col gap-1'>
          <a href='/dashboard' className='flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 font-medium'><span>📊</span> Dashboard</a>
          <a href='/dashboard/podcasts' className='flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 font-medium'><span>🎙️</span> My Podcasts</a>
          <a href='/dashboard/episodes' className='flex items-center gap-3 px-4 py-2 rounded-lg bg-blue-50 text-blue-700 font-semibold'><span>🎵</span> Episodes</a>
          <a href='/dashboard/profile' className='flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 font-medium'><span>👤</span> Profile</a>
        </nav>
      </aside>
      <main className='flex-1 p-8'>
        <div className='flex items-center justify-between mb-8'>
          <div>
            <h2 className='text-2xl font-bold text-gray-900'>Episodes</h2>
            <p className='text-gray-500 text-sm mt-1'>{episodes.length} episode{episodes.length !== 1 ? 's' : ''}</p>
          </div>
          <a href='/dashboard/episodes/new' className='bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700'>+ New Episode</a>
        </div>
        {episodes.length === 0 ? (
          <div className='bg-white rounded-xl p-12 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center'>
            <span className='text-6xl mb-4'>🎵</span>
            <h3 className='text-xl font-bold text-gray-900 mb-2'>No episodes yet</h3>
            <p className='text-gray-500 mb-6'>Upload your first episode to get started</p>
            <a href='/dashboard/episodes/new' className='bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700'>+ Upload Episode</a>
          </div>
        ) : (
          <div className='flex flex-col gap-3'>
            {episodes.map((ep) => (
              <div key={ep.id} className='bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-center gap-5'>
                <div className='w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center'>
                  <span className='text-2xl'>🎵</span>
                </div>
                <div className='flex-1 min-w-0'>
                  <h3 className='font-bold text-gray-900 truncate'>{ep.title}</h3>
                  <p className='text-blue-600 text-sm'>{ep.podcast.title}</p>
                  <p className='text-gray-400 text-xs mt-1'>{ep.description || 'No description'}</p>
                </div>
                <div className='flex items-center gap-3'>
                  {ep.audioUrl && <audio src={ep.audioUrl} controls className='h-8 w-48' />}
                  <span className='text-xs text-gray-400'>{new Date(ep.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
