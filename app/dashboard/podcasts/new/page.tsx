'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewPodcastPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const formData = new FormData(e.currentTarget)
    const res = await fetch('/api/podcasts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: formData.get('title'),
        description: formData.get('description'),
      }),
    })
    const data = await res.json()
    if (!res.ok) {
      setError(data.error || 'Error creating podcast')
      setLoading(false)
      return
    }
    router.push('/dashboard/podcasts')
  }

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
        <div className='mb-8'>
          <a href='/dashboard/podcasts' className='text-blue-600 text-sm hover:underline'>← Back to Podcasts</a>
          <h2 className='text-2xl font-bold text-gray-900 mt-2'>Create New Podcast</h2>
        </div>
        <div className='bg-white rounded-xl p-8 shadow-sm border border-gray-100 max-w-2xl'>
          {error && <p className='text-red-500 text-sm mb-4 bg-red-50 p-3 rounded-lg'>{error}</p>}
          <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
            <div>
              <label className='block text-sm font-semibold text-gray-800 mb-1'>Podcast Title *</label>
              <input name='title' type='text' required className='w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder='My Awesome Podcast' />
            </div>
            <div>
              <label className='block text-sm font-semibold text-gray-800 mb-1'>Description</label>
              <textarea name='description' rows={4} className='w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder='What is your podcast about?' />
            </div>
            <div className='flex gap-3 pt-2'>
              <button type='submit' disabled={loading} className='bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50'>
                {loading ? 'Creating...' : 'Create Podcast'}
              </button>
              <a href='/dashboard/podcasts' className='border border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-50'>Cancel</a>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
