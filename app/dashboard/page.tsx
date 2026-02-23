import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Search, Home, Compass, Clock, ThumbsUp, Play, ListVideo, Users, TrendingUp, Zap } from 'lucide-react'

// Datos de ejemplo para el dashboard
const RECOMMENDED_VIDEOS = [
  {
    id: 1,
    title: "🎙 Cómo empezar tu podcast en 2026",
    channel: "ADSO Academy",
    views: "12.4K",
    time: "hace 2 días",
    duration: "15:30",
    thumbnail: "🎥",
    tags: ["tutorial", "podcast"]
  },
  {
    id: 2,
    title: "⚡ Equipo de grabación profesional",
    channel: "Tech Reviews",
    views: "8.2K",
    time: "hace 5 días",
    duration: "22:15",
    thumbnail: "🎚️",
    tags: ["equipo", "audio"]
  },
  {
    id: 3,
    title: "🔥 Cómo editar audio como experto",
    channel: "Producers Hub",
    views: "5.7K",
    time: "hace 1 semana",
    duration: "18:45",
    thumbnail: "🎛️",
    tags: ["edición", "tutorial"]
  },
  {
    id: 4,
    title: "🎯 Monetización para podcasters",
    channel: "Money Talks",
    views: "3.9K",
    time: "hace 3 días",
    duration: "12:20",
    thumbnail: "💰",
    tags: ["negocios", "monetización"]
  }
]

const YOUR_CONTENT = [
  {
    id: 1,
    title: "Mi primer episodio",
    views: "234",
    comments: "12",
    likes: "45",
    status: "published",
    date: "hace 3 días"
  },
  {
    id: 2,
    title: "Entrevista especial",
    views: "567",
    comments: "23",
    likes: "89",
    status: "published",
    date: "hace 1 semana"
  }
]

const STATS = [
  { label: "Total Views", value: "801", icon: Play, color: "#00FFD1" },
  { label: "Subscribers", value: "156", icon: Users, color: "#FFE500" },
  { label: "Watch Time (hrs)", value: "47", icon: Clock, color: "#FF006E" },
  { label: "Engagement", value: "12.3K", icon: TrendingUp, color: "#00FFD1" }
]

export default async function DashboardPage() {
  const session = await auth()
  
  // 🔐 REDIRECCIÓN SI NO HAY SESIÓN
  if (!session) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      {/* Header con logo y buscador estilo YouTube */}
      <header className="fixed top-0 w-full bg-black/95 border-b-4 border-[#FFE500] z-50 backdrop-blur-sm">
        <div className="flex items-center justify-between px-6 py-3">
          {/* Logo ADSOtube */}
          <Link href="/dashboard" className="flex items-center gap-2 group">
            <div className="relative">
              <span className="text-3xl font-black tracking-tighter">
                <span className="text-[#FFE500] group-hover:text-[#00FFD1] transition-colors">ADSO</span>
                <span className="text-[#00FFD1] group-hover:text-[#FFE500] transition-colors">tube</span>
              </span>
              <Zap className="absolute -top-2 -right-6 w-5 h-5 text-[#FF006E] animate-pulse" />
            </div>
          </Link>

          {/* Buscador estilo YouTube */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative group">
              <input
                type="text"
                placeholder="Search podcasts, episodes, creators..."
                className="w-full bg-gray-900 border-2 border-gray-800 rounded-full py-3 px-6 pr-14 text-white placeholder-gray-500 focus:border-[#00FFD1] focus:outline-none transition-all"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-800 hover:bg-[#FF006E] p-2 rounded-full transition-colors group-hover:shadow-[0_0_15px_#FF006E]">
                <Search className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* User menu */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-[#FFE500] border-2 border-[#FFE500] px-4 py-2 rounded-full">
              {session.user?.name?.charAt(0).toUpperCase()}
            </span>
            <form action={async () => {
              "use server"
              const { signOut } = await import("@/lib/auth")
              await signOut({ redirectTo: "/login" })
            }}>
              <button className="bg-[#FF006E] text-white px-6 py-2 text-sm font-bold hover:bg-[#FF006E]/80 transition-colors rounded-full">
                SIGN OUT
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Main layout con sidebar estilo YouTube */}
      <div className="flex pt-20">
        {/* Sidebar */}
        <aside className="fixed left-0 w-64 h-[calc(100vh-80px)] border-r-4 border-gray-800 bg-[#0d0d0d] p-4 overflow-y-auto">
          <nav className="space-y-2">
            {/* Main navigation */}
            <Link href="/dashboard" className="flex items-center gap-4 px-4 py-3 text-[#00FFD1] bg-gray-900 border-2 border-[#00FFD1] rounded-lg">
              <Home className="w-5 h-5" />
              <span className="text-sm font-bold">Home</span>
            </Link>
            
            <Link href="/explore" className="flex items-center gap-4 px-4 py-3 text-gray-400 hover:text-[#FFE500] hover:bg-gray-900 rounded-lg transition-all">
              <Compass className="w-5 h-5" />
              <span className="text-sm">Explore</span>
            </Link>

            <div className="border-t-2 border-gray-800 my-4"></div>

            {/* Your content */}
            <h3 className="px-4 text-xs text-[#FF006E] font-bold tracking-wider mb-2">YOUR CONTENT</h3>
            
            <Link href="/dashboard/episodes" className="flex items-center gap-4 px-4 py-3 text-gray-400 hover:text-[#FFE500] hover:bg-gray-900 rounded-lg transition-all">
              <ListVideo className="w-5 h-5" />
              <span className="text-sm">Your Episodes</span>
            </Link>
            
            <Link href="/dashboard/playlists" className="flex items-center gap-4 px-4 py-3 text-gray-400 hover:text-[#FFE500] hover:bg-gray-900 rounded-lg transition-all">
              <Clock className="w-5 h-5" />
              <span className="text-sm">Playlists</span>
            </Link>
            
            <Link href="/dashboard/liked" className="flex items-center gap-4 px-4 py-3 text-gray-400 hover:text-[#FFE500] hover:bg-gray-900 rounded-lg transition-all">
              <ThumbsUp className="w-5 h-5" />
              <span className="text-sm">Liked Episodes</span>
            </Link>

            <div className="border-t-2 border-gray-800 my-4"></div>

            {/* Quick actions */}
            <Link href="/dashboard/episodes/new" className="block w-full bg-[#FFE500] text-black font-bold text-center py-3 px-4 rounded-lg hover:bg-[#FFE500]/80 transition-all shadow-[4px_4px_0_#00FFD1] hover:shadow-[6px_6px_0_#00FFD1]">
              + NEW EPISODE
            </Link>
          </nav>
        </aside>

        {/* Main content */}
        <main className="ml-64 flex-1 p-8">
          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {STATS.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div
                  key={index}
                  className="border-4 border-gray-800 bg-[#111] p-6 rounded-lg hover:border-[#00FFD1] transition-all group"
                  style={{ boxShadow: `6px 6px 0 ${stat.color}` }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <Icon className="w-8 h-8" style={{ color: stat.color }} />
                    <span className="text-2xl font-black text-white">{stat.value}</span>
                  </div>
                  <p className="text-xs tracking-wider" style={{ color: stat.color }}>{stat.label}</p>
                </div>
              )
            })}
          </div>

          {/* Recommended section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Zap className="w-6 h-6 text-[#FFE500]" />
              <h2 className="text-xl font-black tracking-wider text-white">Recommended for you</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {RECOMMENDED_VIDEOS.map((video) => (
                <div key={video.id} className="group cursor-pointer">
                  <div className="relative aspect-video bg-gray-900 border-4 border-gray-800 rounded-lg mb-3 overflow-hidden group-hover:border-[#00FFD1] transition-all">
                    <div className="absolute inset-0 flex items-center justify-center text-6xl">
                      {video.thumbnail}
                    </div>
                    <span className="absolute bottom-2 right-2 bg-black border-2 border-[#FF006E] px-2 py-1 text-xs text-white rounded">
                      {video.duration}
                    </span>
                    <div className="absolute inset-0 bg-[#00FFD1]/0 group-hover:bg-[#00FFD1]/20 transition-all flex items-center justify-center">
                      <Play className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-all" />
                    </div>
                  </div>
                  <h3 className="font-bold text-sm mb-1 line-clamp-2 group-hover:text-[#FFE500] transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-xs text-gray-500 mb-1">{video.channel}</p>
                  <p className="text-xs text-gray-600">
                    {video.views} views • {video.time}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Your recent content */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black tracking-wider text-white">Your recent episodes</h2>
              <Link href="/dashboard/episodes" className="text-[#00FFD1] hover:text-[#FFE500] transition-colors text-sm">
                SEE ALL →
              </Link>
            </div>

            <div className="border-4 border-gray-800 bg-[#111] rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-900">
                  <tr>
                    <th className="text-left p-4 text-xs text-[#FF006E] font-bold">EPISODE</th>
                    <th className="text-left p-4 text-xs text-[#FF006E] font-bold">VIEWS</th>
                    <th className="text-left p-4 text-xs text-[#FF006E] font-bold">LIKES</th>
                    <th className="text-left p-4 text-xs text-[#FF006E] font-bold">COMMENTS</th>
                    <th className="text-left p-4 text-xs text-[#FF006E] font-bold">STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {YOUR_CONTENT.map((item) => (
                    <tr key={item.id} className="border-t-2 border-gray-800 hover:bg-gray-900/50 transition-colors">
                      <td className="p-4">
                        <div>
                          <p className="font-bold text-white">{item.title}</p>
                          <p className="text-xs text-gray-500">{item.date}</p>
                        </div>
                      </td>
                      <td className="p-4 text-[#00FFD1]">{item.views}</td>
                      <td className="p-4 text-[#FFE500]">{item.likes}</td>
                      <td className="p-4 text-[#FF006E]">{item.comments}</td>
                      <td className="p-4">
                        <span className="bg-green-500/20 text-green-400 text-xs px-3 py-1 rounded-full border border-green-500">
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}