// app/dashboard/upload/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { Upload } from 'lucide-react'

export default function UploadPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    url: '',
    user_name: ''
  })

  if (!user) {
    router.push('/login')
    return null
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    if (!formData.url) {
      setError('La URL del video es obligatoria')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title || 'Video sin título',
          description: formData.description,
          url: formData.url,
          user_name: formData.user_name || user.email?.split('@')[0] || 'Usuario',
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess('Video subido correctamente!')
        setFormData({ title: '', description: '', url: '', user_name: '' })
        setTimeout(() => {
          router.push('/dashboard')
        }, 2000)
      } else {
        setError(data.error || 'Error al subir el video')
      }
    } catch (error) {
      setError('Error de conexión al servidor')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-[#FFE500] mb-6">Subir Video</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-500">
            {error}
          </div>
        )}
        
        {success && (
          <div className="p-3 bg-green-500/20 border border-green-500 rounded-lg text-green-500">
            {success}
          </div>
        )}

        <div>
          <label className="block text-[#00FFD1] mb-2">URL del Video *</label>
          <input
            type="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            placeholder="https://ejemplo.com/video.mp4"
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00FFD1]"
            required
          />
          <p className="text-gray-500 text-sm mt-1">
            URL pública del video (MP4, WebM, OGG)
          </p>
        </div>

        <div>
          <label className="block text-[#00FFD1] mb-2">Título</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Título del video"
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00FFD1]"
          />
        </div>

        <div>
          <label className="block text-[#00FFD1] mb-2">Descripción</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Descripción del video"
            rows={4}
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00FFD1]"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#FF006E] text-white py-3 rounded-lg font-bold hover:bg-[#FF006E]/80 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <Upload className="w-5 h-5" />
          {loading ? 'Subiendo...' : 'Subir Video'}
        </button>
      </form>
    </div>
  )
}