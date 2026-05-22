// components/ui/VideoPlayer.tsx
'use client'

import { useRef, useState } from 'react'

interface VideoPlayerProps {
  url: string
  title?: string
}

export default function VideoPlayer({ url, title }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <div className="w-full max-w-5xl mx-auto">
      <video
        ref={videoRef}
        src={url}
        controls
        className="w-full rounded-lg"
        onClick={togglePlay}
      >
        Tu navegador no soporta reproducción de video.
      </video>
      
      <div className="mt-4">
        <button
          onClick={togglePlay}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {isPlaying ? '⏸️ Pausar' : '▶️ Reproducir'}
        </button>
      </div>
    </div>
  )
}
