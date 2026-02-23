import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Play } from 'lucide-react'

const VIDEO = {
  id: 1,
  title: "🎙 Cómo empezar tu podcast en 2026",
  channel: "ADSO Academy",
  views: "12.4K",
  time: "hace 2 días",
  duration: "15:30",
  thumbnail: "🎥"
}

export default async function DashboardPage() {
  const session = await auth()
  if (!session) redirect("/login")

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      {/* Único cuadro de video */}
      <div className="w-full max-w-4xl">
        <div className="relative aspect-video bg-gray-900 rounded-2xl overflow-hidden border-2 border-[#00FFD1] shadow-[0_0_30px_#00FFD1] group cursor-pointer">
          {/* Contenido del video */}
          <div className="absolute inset-0 flex items-center justify-center text-9xl">
            {VIDEO.thumbnail}
          </div>
          
          {/* Duración */}
          <span className="absolute bottom-4 right-4 bg-black/90 text-white text-sm px-3 py-1 rounded-full border border-[#FF006E]">
            {VIDEO.duration}
          </span>
          
          {/* Botón play al hover */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="w-20 h-20 bg-[#00FFD1] rounded-full flex items-center justify-center shadow-[0_0_30px_#00FFD1]">
              <Play className="w-10 h-10 text-black" />
            </div>
          </div>
        </div>

        {/* Título del video (debajo) */}
        <div className="mt-4 text-center">
          <h1 className="text-2xl font-bold text-[#FFE500]">{VIDEO.title}</h1>
          <p className="text-[#00FFD1] mt-1">{VIDEO.channel}</p>
          <p className="text-gray-500 text-sm mt-1">{VIDEO.views} vistas • {VIDEO.time}</p>
        </div>
      </div>
    </div>
  )
}