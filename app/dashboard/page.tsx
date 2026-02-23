import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Play, Search, Menu } from 'lucide-react'

const VIDEOS = [
  {
    id: 1,
    title: "🎙 Cómo empezar tu podcast en 2026",
    channel: "ADSO Academy",
    views: "12.4K",
    time: "hace 2 días",
    duration: "15:30",
    thumbnail: "🎥"
  },
  {
    id: 2,
    title: "⚡ Equipo de grabación profesional",
    channel: "Tech Reviews",
    views: "8.2K",
    time: "hace 5 días",
    duration: "22:15",
    thumbnail: "🎚️"
  },
  {
    id: 3,
    title: "🔥 Cómo editar audio como experto",
    channel: "Producers Hub",
    views: "5.7K",
    time: "hace 1 semana",
    duration: "18:45",
    thumbnail: "🎛️"
  },
  {
    id: 4,
    title: "🎯 Monetización para podcasters",
    channel: "Money Talks",
    views: "3.9K",
    time: "hace 3 días",
    duration: "12:20",
    thumbnail: "💰"
  },
  {
    id: 5,
    title: "📱 Apps para podcasters",
    channel: "Tech Reviews",
    views: "2.1K",
    time: "hace 4 días",
    duration: "10:15",
    thumbnail: "📱"
  },
  {
    id: 6,
    title: "🎤 Mejores micrófonos 2026",
    channel: "Audio Pro",
    views: "6.8K",
    time: "hace 3 días",
    duration: "18:30",
    thumbnail: "🎤"
  }
]

export default async function DashboardPage() {
  const session = await auth()
  if (!session) redirect("/login")

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header simple */}
      <header className="fixed top-0 w-full bg-black/95 border-b border-gray-800 z-50 px-4 py-2">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-800 rounded-full">
              <Menu className="w-5 h-5 text-gray-400" />
            </button>
            <Link href="/dashboard" className="text-xl font-bold">
              <span className="text-[#FFE500]">ADSO</span>
              <span className="text-[#00FFD1]">tube</span>
            </Link>
          </div>
          <div className="flex-1 max-w-2xl mx-4">
            <div className="flex">
              <input
                type="text"
                placeholder="Buscar"
                className="w-full bg-gray-900 border border-gray-700 rounded-l-full px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#00FFD1]"
              />
              <button className="bg-gray-800 px-6 rounded-r-full border border-l-0 border-gray-700">
                <Search className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>
          <div className="w-8 h-8 bg-[#FF006E] rounded-full flex items-center justify-center text-white font-bold">
            {session.user?.name?.charAt(0).toUpperCase()}
          </div>
        </div>
      </header>

      {/* Contenido: SOLO VIDEOS EN CUADROS */}
      <main className="pt-20 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {VIDEOS.map((video) => (
            <div key={video.id} className="group cursor-pointer">
              {/* CUADRO DEL VIDEO - TAMAÑO PERFECTO */}
              <div className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden border-2 border-transparent hover:border-[#00FFD1] transition-all">
                {/* Contenido del cuadro */}
                <div className="absolute inset-0 flex items-center justify-center text-7xl">
                  {video.thumbnail}
                </div>
                {/* Duración */}
                <span className="absolute bottom-2 right-2 bg-black/90 text-white text-xs px-2 py-1 rounded border border-gray-700">
                  {video.duration}
                </span>
                {/* Botón play al hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-16 h-16 bg-[#00FFD1] rounded-full flex items-center justify-center">
                    <Play className="w-8 h-8 text-black" />
                  </div>
                </div>
              </div>
              
              {/* Título del video (debajo del cuadro) */}
              <h3 className="font-semibold text-sm mt-3 line-clamp-2 group-hover:text-[#00FFD1]">
                {video.title}
              </h3>
              <p className="text-xs text-gray-400 mt-1">{video.channel}</p>
              <p className="text-xs text-gray-500">{video.views} vistas • {video.time}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}