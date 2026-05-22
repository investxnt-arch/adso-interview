// app/podcast/[id]/page.tsx
'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function PodcastPage() {
  const { id } = useParams()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Redirigir al dashboard después de 2 segundos
    const timer = setTimeout(() => {
      window.location.href = '/dashboard'
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <div className="text-6xl mb-4">🎙️</div>
      <h1 className="text-2xl font-bold text-[#FFE500] mb-2">Podcast</h1>
      <p className="text-gray-400">ID: {id}</p>
      <p className="text-gray-500 mt-4">Redirigiendo al dashboard...</p>
    </div>
  )
}