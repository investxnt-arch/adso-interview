'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function NewEpisodePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [podcasts, setPodcasts] = useState([])
  const [fileUrl, setFileUrl] = useState('')
  const [fileType, setFileType] = useState('')
  const [progress, setProgress] = useState('')

  useEffect(() => {
    fetch('/api/podcasts').then(r => r.json()).then(d => setPodcasts(d.podcasts || []))
  }, [])

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setProgress('Uploading...')
    setFileType(file.type.startsWith('video') ? 'video' : 'audio')
    const formData = new FormData()
    formData.append('file', file)
    const res = await fetch('/api/upload', { method: 'POST', body: formData })
    const data = await res.json()
    if (res.ok) {
      setFileUrl(data.url)
      setProgress('Upload complete!')
    } else {
      setError(data.error || 'Upload failed')
      setProgress('')
    }
    setUploading(false)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!fileUrl) { setError('Please upload a file first'); return }
    setLoading(true)
    setError('')
    const formData = new FormData(e.currentTarget)
    const res = await fetch('/api/episodes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: formData.get('title'),
        description: formData.get('description'),
        podcastId: formData.get('podcastId'),
        audioUrl: fileUrl,
      }),
    })
    const data = await res.json()
    if (!res.ok) { setError(data.error || 'Error'); setLoading(false); return }
    router.push('/dashboard/episodes')
  }

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
        <div className='mb-8'>
          <a href='/dashboard/episodes' className='text-blue-600 text-sm hover:underline'>← Back to Episodes</a>
          <h2 className='text-2xl font-bold text-gray-900 mt-2'>Upload New Episode</h2>
        </div>
        <div className='bg-white rounded-xl p-8 shadow-sm border border-gray-100 max-w-2xl'>
          {error && <p className='text-red-500 text-sm mb-4 bg-red-50 p-3 rounded-lg'>{error}</p>}
          <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
            <div>
              <label className='block text-sm font-semibold text-gray-800 mb-1'>Podcast *</label>
              <select name='podcastId' required className='w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500'>
                <option value=''>Select a podcast</option>
                {podcasts.map((p: any) => (
                  <option key={p.id} value={p.id}>{p.title}</option>
                ))}
              </select>
            </div>
            <div>
              <label className='block text-sm font-semibold text-gray-800 mb-1'>Episode Title *</label>
              <input name='title' type='text' required className='w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder='Episode 1: Introduction' />
            </div>
            <div>
              <label className='block text-sm font-semibold text-gray-800 mb-1'>Description</label>
              <textarea name='description' rows={3} className='w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder='What is this episode about?' />
            </div>
            <div>
              <label className='block text-sm font-semibold text-gray-800 mb-2'>Audio or Video File *</label>
              <div className='border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition'>
                <span className='text-4xl mb-3 block'>🎬</span>
                <p className='text-gray-600 text-sm mb-3'>Upload MP3, WAV, MP4 or MOV</p>
                <input type='file' accept='audio/*,video/*' onChange={handleFileUpload} className='hidden' id='fileInput' />
                <label htmlFor='fileInput' className='bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 font-semibold text-sm'>Choose File</label>
                {progress && <p className='mt-3 text-sm text-green-600 font-medium'>{progress}</p>}
                {fileUrl && (
                  <div className='mt-4'>
                    {fileType === 'video'
                      ? <video src={fileUrl} controls className='w-full rounded-lg mt-2 max-h-48' />
                      : <audio src={fileUrl} controls className='w-full mt-2' />
                    }
                  </div>
                )}
              </div>
            </div>
            <div className='flex gap-3 pt-2'>
              <button type='submit' disabled={loading || uploading} className='bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50'>
                {loading ? 'Saving...' : 'Save Episode'}
              </button>
              <a href='/dashboard/episodes' className='border border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-50'>Cancel</a>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
