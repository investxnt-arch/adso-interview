'use client';
import { usePlayer } from '@/contexts/PlayerContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Play, Pause, Volume2, VolumeX, X } from 'lucide-react';

export default function GlobalPlayer() {
  const { 
    currentTrack, 
    isPlaying, 
    progress, 
    volume, 
    togglePlay, 
    setVolume,
    seek,
    duration,
    currentTime
  } = usePlayer();

  const [isExpanded, setIsExpanded] = useState(false);
  const [showVolume, setShowVolume] = useState(false);

  if (!currentTrack) return null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    seek(pos * duration);
  };

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-50"
    >
      {/* Mini reproductor */}
      <div className="bg-black border-t-4 border-[#00FFD1] shadow-[0_-4px_20px_#00FFD1]">
        <div className="relative h-1 bg-gray-800 cursor-pointer" onClick={handleProgressClick}>
          <motion.div 
            className="absolute h-full bg-[#FFE500]"
            style={{ width: `${progress}%` }}
            animate={{ boxShadow: ['0 0 5px #FFE500', '0 0 15px #FFE500', '0 0 5px #FFE500'] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>

        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 bg-gray-900 border-2 border-[#FF006E] rounded flex items-center justify-center">
              <span className="text-xl">🎵</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-[#FFE500] truncate max-w-[200px] md:max-w-md">
                {currentTrack.title}
              </p>
              <p className="text-xs text-gray-500">{currentTrack.podcastTitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={togglePlay}
              className="w-10 h-10 rounded-full border-2 border-[#00FFD1] flex items-center justify-center text-[#00FFD1] hover:bg-[#00FFD1]/10 transition-all"
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </button>

            <div className="text-xs font-mono text-[#FF006E] hidden md:block">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>

            <div className="relative">
              <button
                onClick={() => setShowVolume(!showVolume)}
                className="text-gray-500 hover:text-[#00FFD1] transition-colors"
              >
                {volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
              
              <AnimatePresence>
                {showVolume && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black border-2 border-[#00FFD1] p-2 rounded-lg"
                  >
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={volume}
                      onChange={(e) => setVolume(parseFloat(e.target.value))}
                      className="w-20 h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#00FFD1]"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-gray-500 hover:text-[#FFE500] transition-colors md:hidden"
            >
              ↑
            </button>
          </div>
        </div>
      </div>

      {/* Reproductor expandido */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-black border-t-4 border-[#FFE500] p-4"
          >
            <div className="max-w-md mx-auto text-center">
              <div className="w-32 h-32 mx-auto bg-gray-900 border-4 border-[#00FFD1] rounded-lg flex items-center justify-center mb-4">
                <span className="text-4xl">🎧</span>
              </div>
              <h3 className="text-xl font-bold text-[#FFE500] mb-1">{currentTrack.title}</h3>
              <p className="text-gray-500 mb-4">{currentTrack.podcastTitle}</p>
              
              <div className="flex items-center justify-center gap-6">
                <button className="text-gray-500 hover:text-[#00FFD1]">⏮️</button>
                <button
                  onClick={togglePlay}
                  className="w-14 h-14 rounded-full border-4 border-[#00FFD1] flex items-center justify-center text-[#00FFD1] hover:bg-[#00FFD1]/10 transition-all"
                >
                  {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                </button>
                <button className="text-gray-500 hover:text-[#00FFD1]">⏭️</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}