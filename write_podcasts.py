with open('app/dashboard/podcasts/page.tsx', 'w', encoding='utf-8') as f:
    f.write("""import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function PodcastsPage() {
  const session = await auth()
  if (!session) redirect('/login')

  const podcasts = await prisma.podcast.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
    include: { _count: { select: { episodes: true } } }
  })

  return (
    <div className='min-h-screen bg-gray-100 flex'>
      <aside className='w-64 bg-white shadow-md flex flex-col'>
        <div className='p-6 border-b'>
          <h1 className='text-xl font-bold text-blue-600'>ADSO Interview</h1>
        </div>
        <nav className='flex-1 p-4 flex flex-col gap-1'>
          <a href='/dashboard' className='flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 font-medium'><span>📊</span> Dashboard</a>
          <a href='/dashboard/podcasts' className='flex items-center gap-3 px-4 py-2 rounded-lg bg-blue-50 text-blue-700 font-semibold'><span>🎙️</span> My Podcasts</a>
          <a href='/dashboard/episodes' className='flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 font-medium'><span>🎵</span> Episodes</a>
          <a href='/dashboard/profile' className='flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 font-medium'><span>👤</span> Profile</a>
        </nav>
      </aside>
      <main className='flex-1 p-8'>
        <div className='flex items-center justify-between mb-8'>
          <div>
            <h2 className='text-2xl font-bold text-gray-900'>My Podcasts</h2>
            <p className='text-gray-500 text-sm mt-1'>{podcasts.length} podcast{podcasts.length !== 1 ? 's' : ''}</p>
          </div>
          <a href='/dashboard/podcasts/new' className='bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700'>+ New Podcast</a>
        </div>
        {podcasts.length === 0 ? (
          <div className='bg-white rounded-xl p-12 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center'>
            <span className='text-6xl mb-4'>🎙️</span>
            <h3 className='text-xl font-bold text-gray-900 mb-2'>No podcasts yet</h3>
            <p className='text-gray-500 mb-6'>Create your first podcast to get started</p>
            <a href='/dashboard/podcasts/new' className='bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700'>+ Create Podcast</a>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            {podcasts.map((podcast) => (
              <div key={podcast.id} className='bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition'>
                <div className='w-full h-32 bg-blue-100 rounded-lg mb-4 flex items-center justify-center'>
                  <span className='text-5xl'>🎙️</span>
                </div>
                <h3 className='font-bold text-gray-900 mb-1'>{podcast.title}</h3>
                <p className='text-gray-500 text-sm mb-3 line-clamp-2'>{podcast.description || 'No description'}</p>
                <div className='flex items-center justify-between'>
                  <span className='text-xs text-gray-400'>{podcast._count.episodes} episodes</span>
                  <a href={'/dashboard/podcasts/' + podcast.id} className='text-blue-600 text-sm font-semibold hover:underline'>Manage</a>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
""")
print('Done')
