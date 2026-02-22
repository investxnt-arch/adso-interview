import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { MOCK_PODCASTS } from "@/types";
import type { Podcast } from "@/types";

export default async function NewEpisodePage() {
  const session = await auth();
  if (!session) redirect("/login");

  const podcasts: Podcast[] = MOCK_PODCASTS;

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
          </div>
        </div>
      </header>

      <div className="pt-20 p-8 max-w-3xl mx-auto">
        <h1 className="text-4xl font-black mb-8">
          <span className="text-[#FF006E]">CREATE</span>{" "}
          <span className="text-[#FFE500]">NEW EPISODE</span>
        </h1>

        <form className="border-4 border-gray-800 bg-[#111] p-8 rounded-lg">
          <div className="mb-6">
            <label className="block text-[#00FFD1] text-sm font-mono tracking-wider mb-2">
              EPISODE TITLE
            </label>
            <input
              type="text"
              className="w-full bg-black border-4 border-gray-800 text-white p-4 font-mono text-sm outline-none focus:border-[#00FFD1] transition-all"
              placeholder="Enter episode title"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-[#00FFD1] text-sm font-mono tracking-wider mb-2">
              SELECT PODCAST
            </label>
            <select
              className="w-full bg-black border-4 border-gray-800 text-white p-4 font-mono text-sm outline-none focus:border-[#00FFD1] transition-all"
              required
            >
              <option value="">Choose a podcast</option>
              {podcasts.map((podcast) => (
                <option key={podcast.id} value={podcast.id}>
                  {podcast.title}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-[#00FFD1] text-sm font-mono tracking-wider mb-2">
              DESCRIPTION
            </label>
            <textarea
              rows={5}
              className="w-full bg-black border-4 border-gray-800 text-white p-4 font-mono text-sm outline-none focus:border-[#00FFD1] transition-all"
              placeholder="Describe your episode..."
            />
          </div>

          <div className="mb-6">
            <label className="block text-[#00FFD1] text-sm font-mono tracking-wider mb-2">
              AUDIO FILE
            </label>
            <input
              type="file"
              accept="audio/*"
              className="w-full bg-black border-4 border-gray-800 text-white p-4 font-mono text-sm outline-none focus:border-[#00FFD1] transition-all"
              required
            />
          </div>

          <div className="mb-8">
            <label className="block text-[#00FFD1] text-sm font-mono tracking-wider mb-2">
              DURATION (optional)
            </label>
            <input
              type="text"
              className="w-full bg-black border-4 border-gray-800 text-white p-4 font-mono text-sm outline-none focus:border-[#00FFD1] transition-all"
              placeholder="e.g., 15:30"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-[#FFE500] text-black border-4 border-black px-8 py-4 font-bold text-sm tracking-wider shadow-[4px_4px_0_#00FFD1] hover:shadow-[6px_6px_0_#00FFD1] transition-all"
            >
              CREATE EPISODE
            </button>
            <Link
              href="/dashboard/episodes"
              className="bg-gray-800 text-white border-4 border-black px-8 py-4 font-bold text-sm tracking-wider hover:bg-gray-700 transition-all"
            >
              CANCEL
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}