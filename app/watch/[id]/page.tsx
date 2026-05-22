// app/watch/[id]/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'

interface VideoData {
  id: string
  title: string
  url: string
  thumbnail?: string
  description?: string
}

export default function WatchPage() {
  const { id } = useParams()
  const [video, setVideo] = useState<VideoData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    const fetchVideo = async () => {
      try {
        const response = await fetch(`/api/videos/${id}`)
        if (!response.ok) throw new Error('Video no encontrado')
        const data = await response.json()
        setVideo(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar el video')
      } finally {
        setLoading(false)
      }
    }

    fetchVideo()
  }, [id])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-400">Cargando video...</p>
        </div>
      </div>
    )
  }

  if (error || !video) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500">Error</h1>
          <p className="text-gray-400 mt-2">{error || 'Video no encontrado'}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black py-8">
      <div className="container mx-auto px-4">
        {/* Reproductor de video nativo HTML5 */}
        <div className="w-full max-w-5xl mx-auto">
          <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
            <video
              key={video.url}
              src={video.url}
              controls
              autoPlay
              className="w-full h-full"
              controlsList="nodownload"
            >
              Tu navegador no soporta reproducción de video.
            </video>
          </div>
          
          <div className="mt-4">
            <h1 className="text-2xl font-bold text-white">{video.title}</h1>
            {video.description && (
              <p className="text-gray-400 mt-2">{video.description}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}