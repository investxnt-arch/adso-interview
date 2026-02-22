import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"

export default async function EpisodesPage() {
  const session = await auth()
  if (!session) redirect("/login")

  // Obtener episodios del usuario actual (ejemplo con Prisma)
  const episodes = await prisma.episode.findMany({
    where: {
      podcast: {
        userId: session.user.id
      }
    },
    include: {
      podcast: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return (
    <main className="min-h-screen bg-black text-white font-mono">
      {/* Navbar */}
      <nav className="border-b-4 border-[#FFE500] p-4 px-8 flex items-center justify-between bg-black">
        <div className="text-3xl font-black tracking-[4px]">
          <span className="text-[#FFE500]">ADSO</span>
          <span className="text-[#00FFD1]">TUBE</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-400 text-sm">{session.user?.name}</span>
          <form action={async () => {
            "use server"
            const { signOut } = await import("@/lib/auth")
            await signOut({ redirectTo: "/login" })
          }}>
            <button className="bg-[#FF006E] text-white px-4 py-2 text-sm font-mono tracking-wider">
              SIGN OUT
            </button>
          </form>
        </div>
      </nav>

      {/* Contenido principal */}
      <div className="flex min-h-[calc(100vh-73px)]">
        {/* Sidebar */}
        <aside className="w-64 border-r-4 border-gray-800 p-6 bg-[#0d0d0d]">
          <nav className="flex flex-col gap-2">
            {[
              { href: "/dashboard", label: "DASHBOARD", icon: "▣" },
              { href: "/dashboard/podcasts", label: "PODCASTS", icon: "🎙" },
              { href: "/dashboard/episodes", label: "EPISODES", icon: "🎵" },
              { href: "/dashboard/profile", label: "PROFILE", icon: "◉" },
              { href: "/dashboard/settings", label: "SETTINGS", icon: "⚙" },
            ].map(item => (
              <a
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-[#00FFD1] hover:bg-gray-900 transition-colors"
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm tracking-wider">{item.label}</span>
              </a>
            ))}
          </nav>
        </aside>

        {/* Lista de episodios */}
        <div className="flex-1 p-8">
          <div className="mb-8">
            <div className="text-[#FF006E] text-xs tracking-[3px] mb-2">CONTENT</div>
            <h1 className="text-4xl font-black tracking-wider">EPISODES</h1>
          </div>

          {/* Cabecera y botón nuevo */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-400">
              {episodes.length} {episodes.length === 1 ? 'episode' : 'episodes'} found
            </p>
            <a
              href="/dashboard/episodes/new"
              className="bg-[#FFE500] text-black border-4 border-black px-6 py-3 font-bold text-sm tracking-wider shadow-[4px_4px_0_#00FFD1] hover:shadow-[6px_6px_0_#00FFD1] transition-all"
            >
              + NEW EPISODE
            </a>
          </div>

          {/* Grid de episodios */}
          {episodes.length === 0 ? (
            <div className="border-4 border-dashed border-gray-800 p-16 text-center">
              <div className="text-6xl mb-4">🎵</div>
              <h3 className="text-2xl font-bold text-gray-400 mb-2">No episodes yet</h3>
              <p className="text-gray-600 mb-6">Create your first episode to start sharing your voice.</p>
              <a
                href="/dashboard/episodes/new"
                className="inline-block bg-[#00FFD1] text-black border-4 border-black px-8 py-4 font-bold text-sm tracking-wider"
              >
                CREATE FIRST EPISODE
              </a>
            </div>
          ) : (
            <div className="grid gap-4">
              {episodes.map((ep: any) => (   // ← Línea corregida con :any
                <div
                  key={ep.id}
                  className="border-4 border-gray-800 bg-[#111] p-6 hover:border-[#00FFD1] transition-colors"
                >
                  <div className="flex items-start gap-6">
                    {/* Portada del podcast */}
                    <div className="w-20 h-20 bg-gray-900 border-4 border-[#FFE500] flex items-center justify-center">
                      <span className="text-3xl">🎧</span>
                    </div>

                    {/* Información del episodio */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-[#FFE500]">{ep.title}</h3>
                        <span className="text-xs bg-[#FF006E] text-white px-2 py-1">
                          {ep.podcast?.title || 'No podcast'}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                        {ep.description || 'No description'}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>📅 {new Date(ep.createdAt).toLocaleDateString()}</span>
                        <span>⏱️ {ep.duration || '0:00'}</span>
                        <span>👥 {ep._count?.plays || 0} plays</span>
                      </div>
                    </div>

                    {/* Acciones */}
                    <div className="flex gap-2">
                      <a
                        href={`/podcast/${ep.podcastId}/episode/${ep.id}`}
                        className="bg-[#00FFD1] text-black border-4 border-black px-4 py-2 text-xs font-bold"
                      >
                        PLAY
                      </a>
                      <a
                        href={`/dashboard/episodes/${ep.id}/edit`}
                        className="bg-gray-800 text-white border-4 border-black px-4 py-2 text-xs font-bold"
                      >
                        EDIT
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}