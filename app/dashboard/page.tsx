// app/dashboard/page.tsx (solo la parte del video player)
'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { LogOut, Upload, RefreshCw, Trash2, Play, Pause, Volume2, VolumeX } from 'lucide-react'

interface Video {
  id: string
  title: string
  description: string
  url: string
  user_name: string
  created_at: string
}

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [videos, setVideos] = useState<Video[]>([])
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null)
  const [videoUrl, setVideoUrl] = useState('')
  const [videoTitle, setVideoTitle] = useState('')
  const [isPlaying, setIsPlaying] = useState(false)
  const [showUpload, setShowUpload] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const router = useRouter()

  useEffect(() => {
    const loadSession = async () => {
      try {
        const res = await fetch('/api/auth/session')
        const data = await res.json()
        if (!data.user) router.push('/login')
        else setUser(data.user)
      } catch { router.push('/login') }
      finally { setLoading(false) }
    }
    loadSession()
    loadVideos()
  }, [])

  const loadVideos = async () => {
    try {
      const res = await fetch('/api/videos')
      const data = await res.json()
      if (data.videos && data.videos.length > 0) {
        setVideos(data.videos)
        setCurrentVideo(data.videos[0])
      } else {
        setVideos([])
        setCurrentVideo(null)
      }
    } catch (error) { console.error(error) }
  }

  const addVideo = async () => {
    if (!videoUrl) return
    try {
      const res = await fetch('/api/videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: videoTitle || 'Video sin título', url: videoUrl, user_name: user?.email?.split('@')[0] })
      })
      if (res.ok) {
        await loadVideos()
        setVideoUrl('')
        setVideoTitle('')
        setShowUpload(false)
      }
    } catch (error) { console.error(error) }
  }

  const deleteVideo = async (id: string) => {
    if (!confirm('¿Eliminar este video permanentemente?')) return
    try {
      const res = await fetch(`/api/videos?id=${id}`, { method: 'DELETE' })
      if (res.ok) {
        await loadVideos()
        if (currentVideo?.id === id && videos.length > 1) {
          const remainingVideos = videos.filter(v => v.id !== id)
          setCurrentVideo(remainingVideos[0] || null)
        } else if (videos.length === 1) {
          setCurrentVideo(null)
        }
      }
    } catch (error) { console.error(error) }
  }

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause()
      else videoRef.current.play()
      setIsPlaying(!isPlaying)
    }
  }

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
  }

  if (loading) return <div className="min-h-screen bg-black text-white flex items-center justify-center text-[#00FFD1]">[ SYSTEM READY ]</div>

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed inset-0 bg-[linear-gradient(rgba(0,255,209,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,209,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto p-4 sm:p-6">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 pb-4 border-b-2 border-[#00FFD1]/30 gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-wider"><span className="text-[#00FFD1]">ADSO</span><span className="text-[#FFE500]">TUBE</span></h1>
            <p className="text-[#00FFD1] text-xs text-center sm:text-left">UPLOAD · SHARE · DOMINATE</p>
          </div>
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <div className="flex items-center gap-2 bg-black/50 border border-[#00FFD1] rounded-full px-3 py-1">
              <div className="w-2 h-2 bg-[#00FFD1] rounded-full animate-pulse"></div>
              <span className="text-[#00FFD1] text-xs sm:text-sm">{user?.email?.split('@')[0] || 'USER'}</span>
            </div>
            <button onClick={() => setShowUpload(!showUpload)} className="bg-[#FF006E] text-white px-3 sm:px-4 py-2 rounded-lg font-bold text-xs sm:text-sm hover:bg-[#FF006E]/80 transition shadow-[0_0_10px_#FF006E] flex items-center gap-2"><Upload size={14} />SUBIR</button>
            <button onClick={loadVideos} className="text-gray-400 hover:text-[#00FFD1]"><RefreshCw size={16} /></button>
            <button onClick={logout} className="flex items-center gap-2 text-gray-400 hover:text-red-500"><LogOut size={16} /><span className="text-xs sm:text-sm">SALIR</span></button>
          </div>
        </div>

        {/* UPLOAD FORM */}
        {showUpload && (
          <div className="mb-6 p-4 bg-black/80 border-2 border-[#00FFD1] rounded-xl">
            <h3 className="text-[#FFE500] mb-3 text-sm sm:text-base">Subir nuevo video</h3>
            <input type="text" placeholder="URL del video (MP4, WebM, etc.)" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} className="w-full mb-2 bg-black/50 border border-[#00FFD1] rounded-lg px-4 py-2 text-white text-sm" />
            <input type="text" placeholder="Título (opcional)" value={videoTitle} onChange={(e) => setVideoTitle(e.target.value)} className="w-full mb-3 bg-black/50 border border-[#00FFD1] rounded-lg px-4 py-2 text-white text-sm" />
            <button onClick={addVideo} className="bg-[#00FFD1] text-black px-6 py-2 rounded-lg font-bold hover:bg-[#00FFD1]/80 text-sm">AGREGAR VIDEO</button>
          </div>
        )}

        {/* VIDEO PLAYER - Tamaño fijo en móvil */}
        {currentVideo && (
          <>
            <div className="aspect-video bg-black rounded-2xl overflow-hidden border-2 border-[#00FFD1] shadow-[0_0_30px_#00FFD1] relative max-w-full mx-auto">
              <video 
                ref={videoRef} 
                src={currentVideo.url} 
                className="w-full h-full object-contain" 
                controls 
                playsinline
                onPlay={() => setIsPlaying(true)} 
                onPause={() => setIsPlaying(false)} 
              />
            </div>

            <div className="mt-6 flex flex-col sm:flex-row justify-between items-start gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#FFE500] break-words">{currentVideo.title}</h2>
                <p className="text-[#00FFD1] text-sm mt-1">{currentVideo.user_name}</p>
                <p className="text-gray-500 text-xs mt-1">📅 {new Date(currentVideo.created_at).toLocaleDateString()}</p>
                {currentVideo.description && <p className="text-gray-400 text-sm mt-2 break-words">{currentVideo.description}</p>}
              </div>
              <button onClick={() => deleteVideo(currentVideo.id)} className="flex items-center gap-2 bg-red-600/20 hover:bg-red-600 text-red-500 hover:text-white px-4 py-2 rounded-lg border border-red-500/50 text-sm w-full sm:w-auto justify-center">
                <Trash2 size={16} />ELIMINAR
              </button>
            </div>
          </>
        )}

        {/* LISTA DE VIDEOS */}
        {videos.length > 1 && (
          <div className="mt-8">
            <h3 className="text-[#FF006E] font-bold mb-3 text-sm sm:text-base">MÁS VIDEOS</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {videos.map(video => (
                <div key={video.id} onClick={() => setCurrentVideo(video)} className={`cursor-pointer p-2 rounded-lg transition ${currentVideo?.id === video.id ? 'bg-[#00FFD1]/20 border border-[#00FFD1]' : 'hover:bg-gray-900'}`}>
                  <div className="aspect-video bg-gray-900 rounded flex items-center justify-center">
                    <span className="text-2xl sm:text-3xl">🎬</span>
                  </div>
                  <p className="text-xs sm:text-sm mt-1 truncate">{video.title}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
