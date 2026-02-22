'use client';
import React, { createContext, useContext, useState, useRef, ReactNode } from 'react';

interface Track {
  id: string;
  title: string;
  audioUrl: string;
  podcastTitle?: string;
  coverImage?: string;
}

interface PlayerContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  progress: number;
  volume: number;
  play: (track: Track) => void;
  pause: () => void;
  togglePlay: () => void;
  setVolume: (volume: number) => void;
  seek: (time: number) => void;
  duration: number;
  currentTime: number;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolumeState] = useState(1);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  
  // ✅ CORREGIDO: useRef con null como argumento
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const play = (track: Track) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    
    const audio = new Audio(track.audioUrl);
    audio.volume = volume;
    
    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration);
    });
    
    audio.addEventListener('timeupdate', () => {
      setCurrentTime(audio.currentTime);
      setProgress((audio.currentTime / audio.duration) * 100);
    });
    
    audio.play();
    
    audioRef.current = audio;
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      pause();
    } else if (currentTrack && audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const setVolume = (newVolume: number) => {
    setVolumeState(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  return (
    <PlayerContext.Provider value={{
      currentTrack,
      isPlaying,
      progress,
      volume,
      play,
      pause,
      togglePlay,
      setVolume,
      seek,
      duration,
      currentTime
    }}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
}