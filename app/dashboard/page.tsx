'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Play, Upload, ThumbsUp, MessageCircle, Share2, RefreshCw } from 'lucide-react';

interface Video {
  id: string;
  title: string;
  description: string;
  url: string;
  user_name: string;
  views: number;
  likes: number;
  created_at: string;
}

export default function DashboardPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);

  const loadVideos = async () => {
    try {
      const response = await fetch('/api/videos');
      const data = await response.json();
      if (data.videos) {
        setVideos(data.videos);
        if (data.videos.length > 0 && !selectedVideo) {
          setSelectedVideo(data.videos[0]);
        }
      }
    } catch (error) {
      console.error('Error loading videos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVideos();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-[#00FFD1]">LOADING...</div>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-6">
        <div className="text-6xl">🎥</div>
        <h2 className="text-2xl font-bold text-[#FFE500]">No videos yet</h2>
        <p className="text-gray-400">Be the first to upload a video</p>
        <Link
          href="/dashboard/upload"
          className="bg-[#FF006E] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#FF006E]/80 transition-all"
        >
          UPLOAD NOW
        </Link>
      </div>
    );
  }

  const currentVideo = selectedVideo || videos[0];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[#FFE500]">ADSOTUBE</h1>
          <button
            onClick={loadVideos}
            className="flex items-center gap-2 text-gray-400 hover:text-[#00FFD1] transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
            <span>Refresh</span>
          </button>
        </div>

        <div className="aspect-video bg-black rounded-2xl overflow-hidden border-2 border-[#00FFD1] shadow-[0_0_30px_#00FFD1]">
          <video
            key={currentVideo.url}
            src={currentVideo.url}
            controls
            className="w-full h-full object-contain"
          />
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-bold text-[#FFE500]">{currentVideo.title}</h2>
          <p className="text-[#00FFD1] mt-1">{currentVideo.user_name}</p>
          <p className="text-gray-500 text-sm mt-1">
            {currentVideo.views} views • {new Date(currentVideo.created_at).toLocaleDateString()}
          </p>
          {currentVideo.description && (
            <p className="mt-4 text-gray-400">{currentVideo.description}</p>
          )}
        </div>

        {/* ✅ SECCIÓN PARA COMPARTIR VIDEO - NUEVO */}
        <div className="mt-6 p-4 bg-gray-900/50 rounded-xl border border-gray-800">
          <h3 className="text-[#00FFD1] font-bold mb-2">Share this video</h3>
          <div className="flex gap-2">
            <input
              type="text"
              value={`https://podcast-saas-six.vercel.app/watch/${currentVideo.id}`}
              readOnly
              className="flex-1 bg-black border border-gray-800 rounded-lg px-4 py-2 text-white text-sm"
            />
            <button
              onClick={() => {
                navigator.clipboard.writeText(`https://podcast-saas-six.vercel.app/watch/${currentVideo.id}`);
                alert('Link copied to clipboard!');
              }}
              className="bg-[#FF006E] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#FF006E]/80 transition-colors"
            >
              Copy Link
            </button>
          </div>
        </div>

        {videos.length > 1 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold mb-4 text-[#FF006E]">MORE VIDEOS</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {videos.map((video) => (
                <div
                  key={video.id}
                  onClick={() => setSelectedVideo(video)}
                  className={`cursor-pointer p-2 rounded-lg transition-all ${
                    selectedVideo?.id === video.id
                      ? 'bg-[#00FFD1]/10 border border-[#00FFD1]'
                      : 'hover:bg-gray-900'
                  }`}
                >
                  <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
                    <span className="text-4xl">🎥</span>
                  </div>
                  <p className="text-sm mt-2 truncate">{video.title}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Link
        href="/dashboard/upload"
        className="fixed bottom-8 right-8 bg-[#FF006E] text-white p-4 rounded-full shadow-[0_0_30px_#FF006E] hover:bg-[#FF006E]/80 transition-all z-50"
      >
        <Upload className="w-6 h-6" />
      </Link>
    </div>
  );
}