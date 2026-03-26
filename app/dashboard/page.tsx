'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Play, Upload, ThumbsUp, MessageCircle, Share2, RefreshCw } from 'lucide-react';

interface Video {
  id: number;
  title: string;
  description: string;
  url: string;
  channel: string;
  views: number;
  time: string;
  duration: string;
  thumbnail: string;
  createdAt: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);
  const [videoError, setVideoError] = useState<string | null>(null);

  useEffect(() => {
    // Cargar videos desde localStorage
    const storedVideos = localStorage.getItem('adsotube_videos');
    if (storedVideos) {
      const parsedVideos = JSON.parse(storedVideos);
      setVideos(parsedVideos);
      if (parsedVideos.length > 0 && !selectedVideo) {
        setSelectedVideo(parsedVideos[0]);
      }
    }
    setLoading(false);
  }, []);

  const refreshVideos = () => {
    const storedVideos = localStorage.getItem('adsotube_videos');
    if (storedVideos) {
      const parsedVideos = JSON.parse(storedVideos);
      setVideos(parsedVideos);
      if (parsedVideos.length > 0 && !selectedVideo) {
        setSelectedVideo(parsedVideos[0]);
      }
    }
  };

  const handleVideoError = () => {
    setVideoError('Video failed to load. The file might be corrupted or the URL is invalid.');
    setTimeout(() => setVideoError(null), 5000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-[#00FFD1] animate-pulse">LOADING...</div>
      </div>
    );
  }

  const currentVideo = selectedVideo || videos[0] || null;

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header con refresh */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[#FFE500]">ADSOTUBE STUDIO</h1>
          <button
            onClick={refreshVideos}
            className="flex items-center gap-2 text-gray-400 hover:text-[#00FFD1] transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
            <span className="text-sm">Refresh</span>
          </button>
        </div>

        {videoError && (
          <div className="mb-4 bg-red-900/50 border-2 border-[#FF006E] text-white p-4 rounded-xl font-mono text-sm">
            ⚠️ {videoError}
          </div>
        )}

        {!currentVideo ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🎥</div>
            <h2 className="text-2xl font-bold text-[#FFE500] mb-2">No videos yet</h2>
            <p className="text-gray-400 mb-6">Upload your first video to get started</p>
            <Link
              href="/dashboard/upload"
              className="inline-block bg-[#FF006E] text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-[#FF006E]/80 transition-all"
            >
              UPLOAD NOW
            </Link>
          </div>
        ) : (
          <>
            {/* Video player */}
            <div className="relative aspect-video bg-black rounded-2xl overflow-hidden border-2 border-[#00FFD1] shadow-[0_0_30px_#00FFD1]">
              {currentVideo.url ? (
                <video
                  key={currentVideo.url}
                  src={currentVideo.url}
                  controls
                  className="w-full h-full object-contain"
                  onError={handleVideoError}
                  controlsList="nodownload"
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-9xl">
                  🎥
                </div>
              )}
            </div>

            {/* Video info */}
            <div className="mt-6">
              <h1 className="text-2xl font-bold text-[#FFE500]">{currentVideo.title}</h1>
              <div className="flex items-center justify-between mt-2 flex-wrap gap-4">
                <div>
                  <p className="text-[#00FFD1]">{currentVideo.channel}</p>
                  <p className="text-gray-500 text-sm mt-1">
                    {currentVideo.views} views • {currentVideo.time}
                  </p>
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
                  <button 
                    onClick={() => navigator.clipboard.writeText(currentVideo.url)}
                    className="flex items-center gap-2 text-gray-400 hover:text-[#00FFD1] transition-colors"
                  >
                    <Share2 className="w-5 h-5" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
              {currentVideo.description && (
                <p className="mt-4 text-gray-300 border-l-4 border-[#FF006E] pl-4 py-2 bg-gray-900/50 rounded-r-xl">
                  {currentVideo.description}
                </p>
              )}
            </div>

            {/* Video list */}
            {videos.length > 1 && (
              <div className="mt-12">
                <h2 className="text-xl font-bold mb-4 text-[#FF006E]">YOUR VIDEOS</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {videos.slice(0, 8).map((video) => (
                    <div
                      key={video.id}
                      onClick={() => {
                        setSelectedVideo(video);
                        setVideoError(null);
                      }}
                      className={`cursor-pointer group p-2 rounded-lg transition-all ${
                        selectedVideo?.id === video.id ? 'bg-[#00FFD1]/10 border border-[#00FFD1]' : 'hover:bg-gray-900'
                      }`}
                    >
                      <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden border border-gray-800 group-hover:border-[#00FFD1] transition-all flex items-center justify-center">
                        <span className="text-4xl">🎥</span>
                      </div>
                      <p className="text-sm mt-2 truncate group-hover:text-[#00FFD1]">{video.title}</p>
                      <p className="text-xs text-gray-500">{video.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
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