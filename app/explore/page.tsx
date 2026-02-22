import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Search, TrendingUp, Music, Mic, Globe, Star } from 'lucide-react'

const CATEGORIES = [
  { name: "All", active: true },
  { name: "Music", icon: Music },
  { name: "Tech", icon: Mic },
  { name: "News", icon: Globe },
  { name: "Trending", icon: TrendingUp },
  { name: "Featured", icon: Star }
]

const TRENDING_PODCASTS = [
  { title: "Tech Weekly", host: "John Doe", listeners: "50K", category: "Technology" },
  { title: "Music Hour", host: "Jane Smith", listeners: "45K", category: "Music" },
  { title: "News Daily", host: "Mike Johnson", listeners: "40K", category: "News" },
  { title: "Startup Stories", host: "Sarah Lee", listeners: "35K", category: "Business" }
]

export default async function ExplorePage() {
  const session = await auth()
  if (!session) redirect("/login")

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      {/* Header igual que dashboard */}
      <header className="fixed top-0 w-full bg-black/95 border-b-4 border-[#FFE500] z-50">
        <div className="flex items-center justify-between px-6 py-3">
          <Link href="/dashboard" className="text-3xl font-black">
            <span className="text-[#FFE500]">ADSO</span>
            <span className="text-[#00FFD1]">tube</span>
          </Link>
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Explore podcasts..."
                className="w-full bg-gray-900 border-2 border-gray-800 rounded-full py-3 px-6 pr-14 text-white"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            </div>
          </div>
        </div>
      </header>

      <div className="pt-20 p-8">
        {/* Categories */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-4">
          {CATEGORIES.map((cat, i) => {
            const Icon = cat.icon
            return (
              <button
                key={i}
                className={`flex items-center gap-2 px-6 py-3 rounded-full border-2 font-bold text-sm whitespace-nowrap transition-all ${
                  cat.active 
                    ? 'border-[#00FFD1] bg-[#00FFD1]/10 text-[#00FFD1]' 
                    : 'border-gray-800 text-gray-400 hover:border-[#FFE500]'
                }`}
              >
                {Icon && <Icon className="w-4 h-4" />}
                {cat.name}
              </button>
            )
          })}
        </div>

        {/* Trending section */}
        <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
          <TrendingUp className="w-6 h-6 text-[#FF006E]" />
          TRENDING NOW
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRENDING_PODCASTS.map((podcast, i) => (
            <div key={i} className="border-4 border-gray-800 bg-[#111] p-6 rounded-lg hover:border-[#00FFD1] transition-all group">
              <div className="text-4xl mb-4">🎙️</div>
              <h3 className="font-bold text-lg mb-2 group-hover:text-[#FFE500]">{podcast.title}</h3>
              <p className="text-sm text-gray-500 mb-1">by {podcast.host}</p>
              <p className="text-xs text-gray-600 mb-4">{podcast.category}</p>
              <p className="text-[#00FFD1] text-sm">{podcast.listeners} monthly listeners</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}