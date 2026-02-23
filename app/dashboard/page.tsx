import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Search, Home, Compass, Clock, ThumbsUp, Play, ListVideo, Users, TrendingUp, Zap, Menu } from 'lucide-react'

// Datos de ejemplo
const VIDEOS = [
  {
    id: 1,
    title: "🎙 Cómo empezar tu podcast en 2026",
    channel: "ADSO Academy",
    views: "12.4K",
    time: "hace 2 días",
    duration: "15:30",
    thumbnail: "🎥",
    avatar: "👤"
  },
  {
    id: 2,
    title: "⚡ Equipo de grabación profesional",
    channel: "Tech Reviews",
    views: "8.2K",
    time: "hace 5 días",
    duration: "22:15",
    thumbnail: "🎚️",
    avatar: "👤"
  },
  {
    id: 3,
    title: "🔥 Cómo editar audio como experto",
    channel: "Producers Hub",
    views: "5.7K",
    time: "hace 1 semana",
    duration: "18:45",
    thumbnail: "🎛️",
    avatar: "👤"
  },
  {
    id: 4,
    title: "🎯 Monetización para podcasters",
    channel: "Money Talks",
    views: "3.9K",
    time: "hace 3 días",
    duration: "12:20",
    thumbnail: "💰",
    avatar: "👤"
  },
  {
    id: 5,
    title: "📱 Apps para podcasters",
    channel: "Tech Reviews",
    views: "2.1K",
    time: "hace 4 días",
    duration: "10:15",
    thumbnail: "📱",
    avatar: "👤"
  },
  {
    id: 6,
    title: "🎤 Mejores micrófonos 2026",
    channel: "Audio Pro",
    views: "6.8K",
    time: "hace 3 días",
    duration: "18:30",
    thumbnail: "🎤",
    avatar: "👤"
  }
]

const COMMENTS = [
  {
    id: 1,
    user: "Podcaster123",
    comment: "Excelente contenido, muy útil para principiantes",
    time: "hace 2 horas",
    likes: 12,
    avatar: "👤"
  },
  {
    id: 2,
    user: "AudioExpert",
    comment: "El equipo que recomiendan es de primera calidad",
    time: "hace 5 horas",
    likes: 8,
    avatar: "👤"
  },
  {
    id: 3,
    user: "NewPodcast",
    comment: "Gracias por los tips, me ayudaron mucho",
    time: "hace 1 día",
    likes: 5,
    avatar: "👤"
  }
]

export default async function DashboardPage() {
  const session = await auth()
  if (!session) redirect("/login")

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header estilo YouTube */}
      <header className="fixed top-0 w-full bg-black/95 border-b border-gray-800 z-50 px-4 py-2">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo y menú */}
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-800 rounded-full">
              <Menu className="w-5 h-5 text-gray-400" />
            </button>
            <Link href="/dashboard" className="flex items-center gap-1">
              <span className="text-2xl font-bold">
                <span className="text-[#FFE500]">ADSO</span>
                <span className="text-[#00FFD1]">tube</span>
              </span>
            </Link>
          </div>

          {/* Buscador */}
          <div className="flex-1 max-w-2xl mx-4">
            <div className="flex">
              <input
                type="text"
                placeholder="Buscar podcasts, episodios..."
                className="w-full bg-gray-900 border border-gray-700 rounded-l-full px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#00FFD1]"
              />
              <button className="bg-gray-800 px-6 rounded-r-full border border-l-0 border-gray-700 hover:bg-gray-700">
                <Search className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Avatar usuario */}
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 bg-[#FF006E] rounded-full flex items-center justify-center text-white font-bold">
              {session.user?.name?.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>
      </header>

      {/* Contenedor principal */}
      <div className="pt-16 flex">
        {/* Sidebar (ocultable en móvil) */}
        <aside className="w-64 fixed left-0 h-full bg-black border-r border-gray-800 p-4 hidden md:block">
          <nav className="space-y-1">
            <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 bg-gray-900 text-[#00FFD1] rounded-lg">
              <Home className="w-5 h-5" />
              <span>Inicio</span>
            </Link>
            <Link href="/explore" className="flex items-center gap-3 px-3 py-2 text-gray-400 hover:bg-gray-900 rounded-lg">
              <Compass className="w-5 h-5" />
              <span>Explorar</span>
            </Link>
            <div className="border-t border-gray-800 my-2"></div>
            <Link href="/dashboard/episodes" className="flex items-center gap-3 px-3 py-2 text-gray-400 hover:bg-gray-900 rounded-lg">
              <ListVideo className="w-5 h-5" />
              <span>Tus episodios</span>
            </Link>
            <Link href="/dashboard/playlists" className="flex items-center gap-3 px-3 py-2 text-gray-400 hover:bg-gray-900 rounded-lg">
              <Clock className="w-5 h-5" />
              <span>Listas</span>
            </Link>
            <Link href="/dashboard/liked" className="flex items-center gap-3 px-3 py-2 text-gray-400 hover:bg-gray-900 rounded-lg">
              <ThumbsUp className="w-5 h-5" />
              <span>Me gusta</span>
            </Link>
          </nav>
        </aside>

        {/* Contenido principal */}
        <main className="flex-1 md:ml-64 p-6">
          {/* Grid de videos estilo YouTube */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {VIDEOS.map((video) => (
              <div key={video.id} className="group cursor-pointer">
                {/* Miniatura */}
                <div className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-6xl">
                    {video.thumbnail}
                  </div>
                  <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </span>
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Play className="w-12 h-12 text-white" />
                  </div>
                </div>
                
                {/* Info del video */}
                <div className="flex gap-3 mt-3">
                  <div className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center text-xl">
                    {video.avatar}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-[#00FFD1]">
                      {video.title}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">{video.channel}</p>
                    <p className="text-xs text-gray-500">{video.views} vistas • {video.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sección de comentarios estilo YouTube */}
          <div className="mt-12 border-t border-gray-800 pt-8">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="text-[#FF006E]">Comentarios</span>
              <span className="text-sm text-gray-500">({COMMENTS.length})</span>
            </h2>
            
            <div className="space-y-6">
              {COMMENTS.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-xl">
                    {comment.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-sm">{comment.user}</span>
                      <span className="text-xs text-gray-500">{comment.time}</span>
                    </div>
                    <p className="text-sm text-gray-300">{comment.comment}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-[#00FFD1]">
                        <ThumbsUp className="w-4 h-4" /> {comment.likes}
                      </button>
                      <button className="text-xs text-gray-400 hover:text-[#00FFD1]">Responder</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}