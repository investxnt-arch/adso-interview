'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Upload, ThumbsUp, MessageCircle, Share2, RefreshCw } from 'lucide-react';

interface Video {
  id: string;
  title: string;
  url: string;
  contentType?: string;
  channel: string;
  views: number;
  time: string;
  duration: string;
  thumbnail: string;
  description?: string;
}

function VideoPlayer({ url, contentType }: { url: string; contentType?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [errorCode, setErrorCode] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !url) return;
    setErrorCode(null);
    // ✅ FIX PRINCIPAL: asignar src y llamar load() manualmente
    // key= no es suficiente — el browser ignora cambios de src
    // sin llamar explícitamente a .load()
    el.src = url;
    el.load();
  }, [url]);

  const errorMessages: Record<number, string> = {
    1: 'Carga abortada',
    2: 'Error de red — verifica tu conexión',
    3: 'Error al decodificar el video',
    4: 'Formato no soportado por este navegador',
  };

  return (
    <div className="relative w-full h-full">
      {errorCode !== null && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-black/90 text-sm">
          <span className="text-[#FF006E] font-mono">
            ⚠ {errorMessages[errorCode] ?? `Error código ${errorCode}`}
          </span>
          
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#00FFD1] underline underline-offset-2 hover:text-white font-mono text-xs"
          >
            Abrir video directamente →
          </a>
        </div>
      )}
      <video
        ref={ref}
        controls
        playsInline
        preload="metadata"
        className="w-full h-full object-contain"
        onError={() => {
          const code = ref.current?.error?.code ?? 0;
          setErrorCode(code);
          console.error(`[VideoPlayer] Error código ${code} — URL:`, url);
        }}
        onCanPlay={() => setErrorCode(null)}
      >
        {/* ✅ Sin src aquí — lo inyecta el useEffect */}
        {/* ✅ type= requerido por Safari y Firefox */}
        <source type={contentType ?? 'video/mp4'} />
        <source type="video/webm" />
      </video>
    </div>
  );
}

export default function DashboardPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ FIX: leer localStorage dentro de useEffect
  // En Next.js el server no tiene window — leerlo fuera causa crash o
  // devuelve vacío antes de que el cliente hidrate
  useEffect(() => {
    try {
      const stored = localStorage.getItem('adsotube_videos');
      if (stored) {
        const parsed: Video[] = JSON.parse(stored);
        setVideos(parsed);
        if (parsed.length > 0) setSelectedVideo(parsed[0]);
      }
    } catch (err) {
      console.error('[Dashboard] Error leyendo localStorage:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshVideos = () => {
    try {
      const stored = localStorage.getItem('adsotube_videos');
      if (stored) {
        const parsed: Video[] = JSON.parse(stored);
        setVideos(parsed);
        if (parsed.length > 0 && !selectedVideo) setSelectedVideo(parsed[0]);
      }
    } catch (err) {
      console.error('[Dashboard] Error al refrescar:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center font-mono text-[#00FFD1]">
        LOADING...
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-6">
        <div className="text-6xl">🎥</div>
        <h2 className="text-2xl font-bold text-[#FFE500]">No hay videos todavía</h2>
        <Link
          href="/dashboard/upload"
          className="bg-[#FF006E] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#FF006E]/80 transition-all shadow-[0_0_20px_#FF006E]"
        >
          SUBIR PRIMER VIDEO
        </Link>
      </div>
    );
  }

  const currentVideo = selectedVideo ?? videos[0];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[#FFE500]">ADSOTUBE</h1>
          <button
            onClick={refreshVideos}
            className="flex items-center gap-2 text-gray-400 hover:text-[#00FFD1] transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
            <span className="font-mono text-sm">Refresh</span>
          </button>
        </div>

        {/* Video Player */}
        <div className="aspect-video bg-black rounded-2xl overflow-hidden border-2 border-[#00FFD1] shadow-[0_0_30px_#00FFD1]">
          <VideoPlayer
            url={currentVideo.url}
            contentType={currentVideo.contentType}
          />
        </div>

        {/* Video Info */}
        <div className="mt-6">
          <h2 className="text-2xl font-bold text-[#FFE500]">{currentVideo.title}</h2>
          {currentVideo.description && (
            <p className="text-gray-400 mt-2 font-mono text-sm">{currentVideo.description}</p>
          )}
          <div className="flex items-center justify-between mt-3">
            <p className="text-[#00FFD1] font-mono">{currentVideo.channel}</p>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 text-gray-400 hover:text-[#00FFD1] transition-colors">
                <ThumbsUp className="w-5 h-5" />
                <span className="font-mono text-sm">0</span>
              </button>
              <button className="flex items-center gap-2 text-gray-400 hover:text-[#00FFD1] transition-colors">
                <MessageCircle className="w-5 h-5" />
                <span className="font-mono text-sm">0</span>
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(currentVideo.url);
                  alert('¡Link copiado!');
                }}
                className="flex items-center gap-2 text-gray-400 hover:text-[#00FFD1] transition-colors"
              >
                <Share2 className="w-5 h-5" />
                <span className="font-mono text-sm">Share</span>
              </button>
            </div>
          </div>
        </div>

        {/* More Videos */}
        {videos.length > 1 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold mb-4 text-[#FF006E] font-mono">MORE VIDEOS</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {videos.slice(0, 8).map((video) => (
                <div
                  key={video.id}
                  onClick={() => setSelectedVideo(video)}
                  className={`cursor-pointer group rounded-lg overflow-hidden border transition-all ${
                    currentVideo.id === video.id
                      ? 'border-[#00FFD1]'
                      : 'border-gray-800 hover:border-[#00FFD1]'
                  }`}
                >
                  <div className="aspect-video bg-gray-900 flex items-center justify-center">
                    <span className="text-4xl">🎥</span>
                  </div>
                  <div className="p-2">
                    <p className="text-sm truncate group-hover:text-[#00FFD1] transition-colors font-mono">
                      {video.title}
                    </p>
                    <p className="text-xs text-gray-600 mt-1 font-mono">{video.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Upload Button */}
      <Link
        href="/dashboard/upload"
        className="fixed bottom-8 right-8 bg-[#FF006E] text-white p-4 rounded-full shadow-[0_0_30px_#FF006E] hover:bg-[#FF006E]/80 transition-all z-50"
      >
        <Upload className="w-6 h-6" />
      </Link>
    </div>
  );
}