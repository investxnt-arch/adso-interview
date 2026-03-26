'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Upload, RefreshCw } from 'lucide-react';

interface Video {
  id: string;
  title: string;
  url: string;
  contentType?: string;
  channel: string;
  time: string;
}

export default function DashboardPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('adsotube_videos');
      if (stored) {
        const parsed = JSON.parse(stored);
        setVideos(parsed);
        if (parsed.length > 0) setSelectedVideo(parsed[0]);
      }
    } catch (err) {
      console.error('Error loading videos:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshVideos = () => {
    try {
      const stored = localStorage.getItem('adsotube_videos');
      if (stored) {
        const parsed = JSON.parse(stored);
        setVideos(parsed);
        if (parsed.length > 0 && !selectedVideo) setSelectedVideo(parsed[0]);
      }
    } catch (err) {
      console.error('Error refreshing:', err);
    }
  };

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
        <Link
          href="/dashboard/upload"
          className="bg-[#FF006E] text-white px-8 py-4 rounded-xl font-bold"
        >
          UPLOAD FIRST VIDEO
        </Link>
      </div>
    );
  }

  const currentVideo = selectedVideo || videos[0];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[#FFE500]">ADSOTUBE</h1>
          <button
            onClick={refreshVideos}
            className="flex items-center gap-2 text-gray-400 hover:text-[#00FFD1]"
          >
            <RefreshCw className="w-5 h-5" />
            <span>Refresh</span>
          </button>
        </div>

        {/* Video Player SIMPLE - sin errores */}
        <div className="aspect-video bg-black rounded-2xl overflow-hidden border-2 border-[#00FFD1] shadow-[0_0_30px_#00FFD1]">
          <video
            src={currentVideo.url}
            controls
            className="w-full h-full object-contain"
            style={{ backgroundColor: 'black' }}
          >
            Your browser does not support video playback.
          </video>
        </div>

        {/* Video Info */}
        <div className="mt-6">
          <h2 className="text-2xl font-bold text-[#FFE500]">{currentVideo.title}</h2>
          <p className="text-[#00FFD1] mt-1">{currentVideo.channel}</p>
          <p className="text-gray-500 text-sm mt-1">{currentVideo.time}</p>
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
                  className={`cursor-pointer p-2 rounded-lg transition-all ${
                    currentVideo.id === video.id
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