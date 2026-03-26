'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Play, Upload, ThumbsUp, MessageCircle, Share2 } from 'lucide-react';

interface Video {
  id: number;
  title: string;
  url: string;
  channel: string;
  views: number;
  time: string;
  duration: string;
  thumbnail: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cargar videos desde localStorage
    const storedVideos = localStorage.getItem('adsotube_videos');
    if (storedVideos) {
      setVideos(JSON.parse(storedVideos));
    }
    setLoading(false);
  }, []);

  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-[#00FFD1]">LOADING...</div>
      </div>
    );
  }

  const currentVideo = selectedVideo || videos[0] || {
    id: 0,
    title: "No videos yet",
    url: "",
    channel: "Upload your first video",
    views: 0,
    time: "Click the + button to upload",
    duration: "--:--",
    thumbnail: "🎥"
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Main content */}
      <div className="max-w-6xl mx-auto p-6">
        {/* Video player */}
        <div className="relative aspect-video bg-gray-900 rounded-2xl overflow-hidden border-2 border-[#00FFD1] shadow-[0_0_30px_#00FFD1] group">
          {currentVideo.url ? (
            <video
              src={currentVideo.url}
              controls
              className="w-full h-full object-contain"
              poster={currentVideo.thumbnail === "🎥" ? undefined : undefined}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-9xl">
              {currentVideo.thumbnail}
            </div>
          )}
          {!currentVideo.url && (
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="w-20 h-20 bg-[#00FFD1] rounded-full flex items-center justify-center shadow-[0_0_30px_#00FFD1]">
                <Play className="w-10 h-10 text-black" />
              </div>
            </div>
          )}
        </div>

        {/* Video info */}
        <div className="mt-6">
          <h1 className="text-3xl font-bold text-[#FFE500]">{currentVideo.title}</h1>
          <div className="flex items-center justify-between mt-2">
            <div>
              <p className="text-[#00FFD1]">{currentVideo.channel}</p>
              <p className="text-gray-500 text-sm mt-1">{currentVideo.views} views • {currentVideo.time}</p>
            </div>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 text-gray-400 hover:text-[#00FFD1] transition-colors">
                <ThumbsUp className="w-5 h-5" />
                <span>0</span>
              </button>
              <button className="flex items-center gap-2 text-gray-400 hover:text-[#00FFD1] transition-colors">
                <MessageCircle className="w-5 h-5" />
                <span>0</span>
              </button>
              <button className="flex items-center gap-2 text-gray-400 hover:text-[#00FFD1] transition-colors">
                <Share2 className="w-5 h-5" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>

        {/* Lista de videos subidos */}
        {videos.length > 1 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold mb-4 text-[#FF006E]">YOUR VIDEOS</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {videos.slice(1).map((video) => (
                <div
                  key={video.id}
                  onClick={() => setSelectedVideo(video)}
                  className="cursor-pointer group"
                >
                  <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden border border-gray-800 group-hover:border-[#00FFD1] transition-all">
                    <div className="w-full h-full flex items-center justify-center text-4xl">
                      🎥
                    </div>
                  </div>
                  <p className="text-sm mt-2 truncate group-hover:text-[#00FFD1]">{video.title}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Floating upload button */}
      <Link
        href="/dashboard/upload"
        className="fixed bottom-8 right-8 bg-[#FF006E] text-white p-4 rounded-full shadow-[0_0_30px_#FF006E] hover:bg-[#FF006E]/80 transition-all z-50"
      >
        <Upload className="w-6 h-6" />
      </Link>
    </div>
  );
}