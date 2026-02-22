import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { MOCK_PODCASTS, MOCK_EPISODES } from "@/types";
import type { Podcast } from "@/types";

export default async function PodcastPage({ params }: { params: { id: string } }) {
  const session = await auth();
  if (!session) redirect("/login");

  const podcast = MOCK_PODCASTS.find(p => p.id === params.id) as Podcast | undefined;
  const episodes = MOCK_EPISODES.filter(e => e.podcastId === params.id);

  if (!podcast) {
    return (
      <div className="min-h-screen bg-black text-white font-mono p-8 text-center">
        <h1 className="text-4xl font-black text-[#FF006E] mb-4">404</h1>
        <p className="text-gray-400 mb-8">Podcast not found</p>
        <Link
          href="/dashboard"
          className="inline-block bg-[#FFE500] text-black border-4 border-black px-8 py-4 font-bold text-sm tracking-wider"
        >
          BACK TO DASHBOARD
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      <header className="fixed top-0 w-full bg-black/95 border-b-4 border-[#FFE500] z-50">
        <div className="flex items-center justify-between px-6 py-3">
          <Link href="/dashboard" className="text-3xl font-black">
            <span className="text-[#FFE500]">ADSO</span>
            <span className="text-[#00FFD1]">tube</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-[#FFE500] border-2 border-[#FFE500] px-4 py-2 rounded-full">
              {session.user?.name?.charAt(0).toUpperCase()}
            </span>
            <Link
              href="/dashboard"
              className="bg-[#FF006E] text-white px-4 py-2 text-sm font-bold rounded-lg hover:bg-[#FF006E]/80 transition-colors"
            >
              DASHBOARD
            </Link>
          </div>
        </div>
      </header>

      <div className="pt-20 p-8">
        {/* Podcast Info */}
        <div className="flex items-start gap-8 mb-12">
          <div className="w-48 h-48 bg-gray-900 border-4 border-[#FFE500] flex items-center justify-center rounded-lg">
            <span className="text-6xl">🎙️</span>
          </div>
          <div className="flex-1">
            <h1 className="text-5xl font-black text-[#FFE500] mb-4">{podcast.title}</h1>
            <p className="text-gray-400 text-lg mb-6">{podcast.description}</p>
            <div className="flex gap-6 text-sm">
              <span className="text-[#00FFD1]">📊 {podcast._count?.episodes || 0} episodes</span>
              <span className="text-[#FF006E]">👥 {podcast._count?.subscribers || 0} subscribers</span>
            </div>
          </div>
        </div>

        {/* Episodes List */}
        <h2 className="text-3xl font-black mb-6">
          <span className="text-[#FF006E]">ALL</span>{" "}
          <span className="text-[#FFE500]">EPISODES</span>
        </h2>

        {episodes.length === 0 ? (
          <div className="border-4 border-dashed border-gray-800 p-16 text-center">
            <p className="text-gray-400">No episodes yet</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {episodes.map((episode) => (
              <div
                key={episode.id}
                className="border-4 border-gray-800 bg-[#111] p-6 hover:border-[#00FFD1] transition-colors rounded-lg"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-[#FFE500] mb-2">{episode.title}</h3>
                    <p className="text-gray-400 text-sm mb-2 line-clamp-1">{episode.description}</p>
                    <div className="flex gap-4 text-xs text-gray-500">
                      <span>⏱️ {episode.duration || '0:00'}</span>
                      <span>👁️ {episode.views || 0} views</span>
                    </div>
                  </div>
                  <Link
                    href={`/podcast/${podcast.id}/episode/${episode.id}`}
                    className="bg-[#00FFD1] text-black border-4 border-black px-6 py-3 text-sm font-bold rounded-lg hover:bg-[#00FFD1]/80 transition-colors"
                  >
                    PLAY
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}