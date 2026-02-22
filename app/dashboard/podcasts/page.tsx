import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Podcast, MOCK_PODCASTS } from "@/types"

export default async function PodcastsPage() {
  const session = await auth()
  if (!session) redirect("/login")

  const podcasts: Podcast[] = MOCK_PODCASTS

  return (
    <div className="min-h-screen bg-black text-white font-mono p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-black">
          <span className="text-[#FF006E]">YOUR</span>{" "}
          <span className="text-[#FFE500]">PODCASTS</span>
        </h1>
        <Link
          href="/dashboard/podcasts/new"
          className="bg-[#FFE500] text-black border-4 border-black px-6 py-3 font-bold text-sm tracking-wider shadow-[4px_4px_0_#00FFD1] hover:shadow-[6px_6px_0_#00FFD1] transition-all"
        >
          + NEW PODCAST
        </Link>
      </div>

      {podcasts.length === 0 ? (
        <div className="border-4 border-dashed border-gray-800 p-16 text-center">
          <div className="text-6xl mb-4">🎙️</div>
          <h3 className="text-2xl font-bold text-gray-400 mb-2">No podcasts yet</h3>
          <p className="text-gray-600 mb-6">Create your first podcast to start sharing your voice.</p>
          <Link
            href="/dashboard/podcasts/new"
            className="inline-block bg-[#00FFD1] text-black border-4 border-black px-8 py-4 font-bold text-sm tracking-wider"
          >
            CREATE FIRST PODCAST
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {podcasts.map((podcast: Podcast) => (
            <div
              key={podcast.id}
              className="border-4 border-gray-800 bg-[#111] p-6 hover:border-[#00FFD1] transition-colors rounded-lg"
            >
              <div className="text-4xl mb-4">🎙️</div>
              <h3 className="text-xl font-bold text-[#FFE500] mb-2">{podcast.title}</h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                {podcast.description || 'No description'}
              </p>
              <div className="flex justify-between text-xs text-gray-500 mb-4">
                <span>📊 {podcast._count?.episodes || 0} episodes</span>
                <span>👥 {podcast._count?.subscribers || 0} subscribers</span>
              </div>
              <Link
                href={`/dashboard/podcasts/${podcast.id}`}
                className="block text-center bg-[#00FFD1] text-black border-4 border-black px-4 py-2 text-sm font-bold rounded-lg hover:bg-[#00FFD1]/80 transition-colors"
              >
                MANAGE PODCAST
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}