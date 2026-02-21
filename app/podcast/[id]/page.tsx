import { PrismaClient } from '@prisma/client'
import { notFound } from 'next/navigation'

const prisma = new PrismaClient()

export default async function PublicPodcastPage({ params }: { params: { id: string } }) {
  const podcast = await prisma.podcast.findUnique({
    where: { id: params.id },
    include: {
      episodes: { orderBy: { createdAt: 'desc' } },
      user: { select: { name: true, email: true } },
    },
  })

  if (!podcast) notFound()

  return (
    <div className='min-h-screen bg-gray-50'>
      <nav className='bg-white border-b border-gray-100 px-8 py-4'>
        <a href='/' className='text-blue-600 font-bold text-xl'>ADSO Interview</a>
      </nav>

      <div className='max-w-4xl mx-auto px-8 py-12'>
        {/* Podcast Header */}
        <div className='bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8 flex gap-6 items-center'>
          <div className='w-32 h-32 rounded-2xl bg-blue-600 flex items-center justify-center flex-shrink-0'>
            <span className='text-6xl'>🎙️</span>
          </div>
          <div>
            <h1 className='text-3xl font-bold text-gray-900 mb-2'>{podcast.title}</h1>
            <p className='text-gray-500 mb-3'>{podcast.description || 'No description'}</p>
            <div className='flex items-center gap-4'>
              <span className='text-sm text-gray-400'>By {podcast.user.name || podcast.user.email}</span>
              <span className='text-sm text-gray-400'>•</span>
              <span className='text-sm text-gray-400'>{podcast.episodes.length} episode{podcast.episodes.length !== 1 ? 's' : ''}</span>
            </div>
          </div>
        </div>

        {/* Episodes */}
        <h2 className='text-xl font-bold text-gray-900 mb-4'>Episodes</h2>
        {podcast.episodes.length === 0 ? (
          <div className='bg-white rounded-xl p-12 text-center border border-gray-100'>
            <span className='text-5xl mb-4 block'>🎵</span>
            <p className='text-gray-500'>No episodes yet</p>
          </div>
        ) : (
          <div className='flex flex-col gap-4'>
            {podcast.episodes.map((ep, index) => (
              <div key={ep.id} className='bg-white rounded-xl p-6 shadow-sm border border-gray-100'>
                <div className='flex items-start gap-4'>
                  <div className='w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600 flex-shrink-0'>
                    {index + 1}
                  </div>
                  <div className='flex-1'>
                    <h3 className='font-bold text-gray-900 mb-1'>{ep.title}</h3>
                    <p className='text-gray-500 text-sm mb-3'>{ep.description || 'No description'}</p>
                    {ep.audioUrl && (
                      <div className='mt-2'>
                        {ep.audioUrl.includes('/video/') ? (
                          <video src={ep.audioUrl} controls className='w-full rounded-lg max-h-64' />
                        ) : (
                          <audio src={ep.audioUrl} controls className='w-full' />
                        )}
                      </div>
                    )}
                    <p className='text-xs text-gray-400 mt-2'>{new Date(ep.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
