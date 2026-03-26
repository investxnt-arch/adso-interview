'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Play, Upload, ThumbsUp, MessageCircle, Share2, RefreshCw } from 'lucide-react';

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
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedVideos = localStorage.getItem('adsotube_videos');
    if (storedVideos) {
      const parsed = JSON.parse(storedVideos);
      setVideos(parsed);
      if (parsed.length > 0) {
        setSelectedVideo(parsed[0]);
      }
    }
    setLoading(false);
  }, []);

  const refreshVideos = () => {
    const storedVideos = localStorage.getItem('adsotube_videos');
    if (storedVideos) {
      setVideos(JSON.parse(storedVideos));
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">LOADING...</div>;
  }

  const currentVideo = selectedVideo || videos[0];

  if (!currentVideo) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <div className="text-6xl mb-4">🎥</div>
        <h2 className="text-2xl font-bold text-[#FFE500] mb-4">No videos yet</h2>
        <Link href="/dashboard/upload" className="bg-[#FF006E] text-white px-8 py-4 rounded-xl font-bold">
          UPLOAD YOUR FIRST VIDEO
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[#FFE500]">ADSOTUBE</h1>
          <button onClick={refreshVideos} className="flex items-center gap-2 text-gray-400 hover:text-[#00FFD1]">
            <RefreshCw className="w-5 h-5" />
            <span>Refresh</span>
          </button>
        </div>

        {/* Video Player */}
        <div className="relative aspect-video bg-black rounded-2xl overflow-hidden border-2 border-[#00FFD1] shadow-[0_0_30px_#00FFD1]">
          <video
            key={currentVideo.url}
            src={currentVideo.url}
            controls
            className="w-full h-full object-contain"
          >
            Your browser does not support video playback.
          </video>
        </div>

        {/* Video Info */}
        <div className="mt-6">
          <h1 className="text-2xl font-bold text-[#FFE500]">{currentVideo.title}</h1>
          <div className="flex items-center justify-between mt-2">
            <p className="text-[#00FFD1]">{currentVideo.channel}</p>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 text-gray-400 hover:text-[#00FFD1]">
                <ThumbsUp className="w-5 h-5" />
                <span>0</span>
              </button>
              <button className="flex items-center gap-2 text-gray-400 hover:text-[#00FFD1]">
                <MessageCircle className="w-5 h-5" />
                <span>0</span>
              </button>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(currentVideo.url);
                  alert('Link copied!');
                }}
                className="flex items-center gap-2 text-gray-400 hover:text-[#00FFD1]"
              >
                <Share2 className="w-5 h-5" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>

        {/* More Videos */}
        {videos.length > 1 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold mb-4 text-[#FF006E]">MORE VIDEOS</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {videos.slice(0, 8).map((video) => (
                <div
                  key={video.id}
                  onClick={() => setSelectedVideo(video)}
                  className="cursor-pointer group"
                >
                  <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden border border-gray-800 group-hover:border-[#00FFD1] transition-all flex items-center justify-center">
                    <span className="text-4xl">🎥</span>
                  </div>
                  <p className="text-sm mt-2 truncate group-hover:text-[#00FFD1]">{video.title}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Upload Button */}
      <Link
        href="/dashboard/upload"
        className="fixed bottom-8 right-8 bg-[#FF006E] text-white p-4 rounded-full shadow-[0_0_30px_#FF006E] hover:bg-[#FF006E]/80 transition-all z-50"
      >
        <Upload className="w-6 h-6" />
      </Link>
    </div>
  );
}