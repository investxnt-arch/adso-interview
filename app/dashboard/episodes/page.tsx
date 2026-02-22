'use client';

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { MOCK_EPISODES } from "@/types";
import type { Episode } from "@/types";
import { usePlayer } from '@/contexts/PlayerContext';
import { useEffect, useState } from "react";

export default function EpisodesPage() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { play } = usePlayer();

  useEffect(() => {
    const loadSession = async () => {
      const sessionData = await auth();
      if (!sessionData) {
        redirect("/login");
      }
      setSession(sessionData);
      setLoading(false);
    };
    loadSession();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white font-mono flex items-center justify-center">
        <div className="text-[#00FFD1]">LOADING...</div>
      </div>
    );
  }

  const episodes: Episode[] = MOCK_EPISODES;

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
              {session?.user?.name?.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>
      </header>

      <div className="pt-20 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-black">
            <span className="text-[#FF006E]">YOUR</span>{" "}
            <span className="text-[#FFE500]">EPISODES</span>
          </h1>
          <Link
            href="/dashboard/episodes/new"
            className="bg-[#FFE500] text-black border-4 border-black px-6 py-3 font-bold text-sm tracking-wider shadow-[4px_4px_0_#00FFD1] hover:shadow-[6px_6px_0_#00FFD1] transition-all"
          >
            + NEW EPISODE
          </Link>
        </div>

        {episodes.length === 0 ? (
          <div className="border-4 border-dashed border-gray-800 p-16 text-center">
            <div className="text-6xl mb-4">🎵</div>
            <h3 className="text-2xl font-bold text-gray-400 mb-2">No episodes yet</h3>
            <p className="text-gray-600 mb-6">Create your first episode to start sharing your voice.</p>
            <Link
              href="/dashboard/episodes/new"
              className="inline-block bg-[#00FFD1] text-black border-4 border-black px-8 py-4 font-bold text-sm tracking-wider"
            >
              CREATE FIRST EPISODE
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {episodes.map((episode) => (
              <div
                key={episode.id}
                className="border-4 border-gray-800 bg-[#111] p-6 hover:border-[#00FFD1] transition-colors rounded-lg"
              >
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 bg-gray-900 border-4 border-[#FFE500] flex items-center justify-center rounded-lg">
                    <span className="text-3xl">🎧</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-[#FFE500]">{episode.title}</h3>
                      <span className="text-xs bg-[#FF006E] text-white px-2 py-1 rounded-full">
                        {episode.podcast?.title || 'No podcast'}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                      {episode.description || 'No description'}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>📅 {new Date(episode.createdAt).toLocaleDateString()}</span>
                      <span>⏱️ {episode.duration || '0:00'}</span>
                      <span>👁️ {episode.views || 0} views</span>
                      <span>❤️ {episode.likes || 0} likes</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {/* 🔥 BOTÓN PLAY MODIFICADO PARA USAR EL REPRODUCTOR GLOBAL */}
                    <button
                      onClick={() => play({
                        id: episode.id,
                        title: episode.title,
                        audioUrl: episode.audioUrl,
                        podcastTitle: episode.podcast?.title || 'Unknown Podcast',
                        coverImage: episode.podcast?.coverImage || undefined
                      })}
                      className="bg-[#00FFD1] text-black border-4 border-black px-4 py-2 text-xs font-bold rounded-lg hover:bg-[#00FFD1]/80 transition-colors"
                    >
                      PLAY
                    </button>
                    <Link
                      href={`/dashboard/episodes/${episode.id}/edit`}
                      className="bg-gray-800 text-white border-4 border-black px-4 py-2 text-xs font-bold rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      EDIT
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}