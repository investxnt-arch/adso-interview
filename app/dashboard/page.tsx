import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Play, Upload, ThumbsUp, MessageCircle, Share2 } from 'lucide-react'

const VIDEO = {
  id: 1,
  title: "🎙 How to start your podcast in 2026",
  channel: "ADSO Academy",
  views: "12.4K",
  time: "2 days ago",
  duration: "15:30",
  thumbnail: "🎥",
  likes: 234,
  description: "Complete guide to start your own podcast. From equipment to distribution, we cover everything you need to know."
}

const COMMENTS = [
  {
    id: 1,
    user: "CyberPodcaster",
    avatar: "👤",
    comment: "Best tutorial I've seen! The equipment recommendations were spot on.",
    time: "3 hours ago",
    likes: 45
  },
  {
    id: 2,
    user: "AudioExpert",
    avatar: "👤",
    comment: "Finally someone explained the technical stuff in a way that makes sense.",
    time: "5 hours ago",
    likes: 32
  },
  {
    id: 3,
    user: "NewbieCreator",
    avatar: "👤",
    comment: "Just uploaded my first podcast thanks to this guide!",
    time: "1 day ago",
    likes: 78
  },
  {
    id: 4,
    user: "TechReviewer",
    avatar: "👤",
    comment: "The section about microphones saved me so much research time.",
    time: "2 days ago",
    likes: 23
  }
]

export default async function DashboardPage() {
  const session = await auth()
  if (!session) redirect("/login")

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Main content */}
      <div className="max-w-6xl mx-auto p-6">
        {/* Video player */}
        <div className="relative aspect-video bg-gray-900 rounded-2xl overflow-hidden border-2 border-[#00FFD1] shadow-[0_0_30px_#00FFD1] group">
          <div className="absolute inset-0 flex items-center justify-center text-9xl">
            {VIDEO.thumbnail}
          </div>
          <span className="absolute bottom-4 right-4 bg-black/90 text-white text-sm px-3 py-1 rounded-full border border-[#FF006E]">
            {VIDEO.duration}
          </span>
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="w-20 h-20 bg-[#00FFD1] rounded-full flex items-center justify-center shadow-[0_0_30px_#00FFD1]">
              <Play className="w-10 h-10 text-black" />
            </div>
          </div>
        </div>

        {/* Video info */}
        <div className="mt-6">
          <h1 className="text-3xl font-bold text-[#FFE500]">{VIDEO.title}</h1>
          <div className="flex items-center justify-between mt-2">
            <div>
              <p className="text-[#00FFD1]">{VIDEO.channel}</p>
              <p className="text-gray-500 text-sm mt-1">{VIDEO.views} views • {VIDEO.time}</p>
            </div>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 text-gray-400 hover:text-[#00FFD1] transition-colors">
                <ThumbsUp className="w-5 h-5" />
                <span>{VIDEO.likes}</span>
              </button>
              <button className="flex items-center gap-2 text-gray-400 hover:text-[#00FFD1] transition-colors">
                <MessageCircle className="w-5 h-5" />
                <span>{COMMENTS.length}</span>
              </button>
              <button className="flex items-center gap-2 text-gray-400 hover:text-[#00FFD1] transition-colors">
                <Share2 className="w-5 h-5" />
                <span>Share</span>
              </button>
            </div>
          </div>
          <p className="mt-4 text-gray-300 border-l-4 border-[#FF006E] pl-4 py-2 bg-gray-900/50 rounded-r-xl">
            {VIDEO.description}
          </p>
        </div>

        {/* Comments section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="text-[#FF006E]">COMMENTS</span>
            <span className="text-sm text-gray-500">({COMMENTS.length})</span>
          </h2>

          {/* Add comment */}
          <div className="flex gap-4 mb-8">
            <div className="w-10 h-10 bg-[#FF006E] rounded-full flex items-center justify-center text-xl">
              {session.user?.name?.charAt(0).toUpperCase()}
            </div>
            <input
              type="text"
              placeholder="Add a comment..."
              className="flex-1 bg-gray-900 border-2 border-gray-800 rounded-xl px-4 py-2 text-white placeholder-gray-600 focus:border-[#00FFD1] focus:outline-none transition-colors"
            />
            <button className="bg-[#00FFD1] text-black px-6 rounded-xl font-bold hover:bg-[#00FFD1]/80 transition-colors">
              POST
            </button>
          </div>

          {/* Comments list */}
          <div className="space-y-6">
            {COMMENTS.map((comment) => (
              <div key={comment.id} className="flex gap-4">
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-xl">
                  {comment.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-bold text-[#FFE500]">{comment.user}</span>
                    <span className="text-xs text-gray-500">{comment.time}</span>
                  </div>
                  <p className="text-gray-300">{comment.comment}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-[#00FFD1]">
                      <ThumbsUp className="w-4 h-4" /> {comment.likes}
                    </button>
                    <button className="text-xs text-gray-400 hover:text-[#00FFD1]">Reply</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating upload button */}
      <Link
        href="/dashboard/upload"
        className="fixed bottom-8 right-8 bg-[#FF006E] text-white p-4 rounded-full shadow-[0_0_30px_#FF006E] hover:bg-[#FF006E]/80 transition-all z-50"
      >
        <Upload className="w-6 h-6" />
      </Link>
    </div>
  )
}