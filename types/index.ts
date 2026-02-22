import React from 'react';

// Tipos para Podcasts
export interface Podcast {
  id: string;
  title: string;
  description: string | null;
  coverImage?: string | null;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  _count?: {
    episodes: number;
    subscribers: number;
  };
}

// Tipos para Episodios
export interface Episode {
  id: string;
  title: string;
  description: string | null;
  audioUrl: string;
  duration: string | null;
  podcastId: string;
  createdAt: Date;
  updatedAt: Date;
  podcast?: Podcast;
  views?: number;
  likes?: number;
  comments?: number;
}

// Tipos para Estadísticas
export interface Stat {
  label: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

// Tipos para Usuarios
export interface User {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  role: 'user' | 'admin';
}

// Tipos para Navegación
export interface NavItem {
  href: string;
  label: string;
  icon: string;
}

// Datos de ejemplo (para desarrollo)
export const MOCK_EPISODES: Episode[] = [
  {
    id: "1",
    title: "Episode 1: Introducción al podcasting",
    description: "Aprende los conceptos básicos para empezar tu propio podcast",
    audioUrl: "/audio/ep1.mp3",
    duration: "15:30",
    podcastId: "p1",
    createdAt: new Date(),
    updatedAt: new Date(),
    podcast: { 
      id: "p1",
      title: "Sample Podcast",
      description: "Un podcast de ejemplo",
      userId: "u1",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    views: 1234,
    likes: 45,
    comments: 12
  },
  {
    id: "2",
    title: "Episode 2: Equipo necesario",
    description: "Todo lo que necesitas saber sobre micrófonos y grabación",
    audioUrl: "/audio/ep2.mp3",
    duration: "22:15",
    podcastId: "p1",
    createdAt: new Date(Date.now() - 86400000),
    updatedAt: new Date(Date.now() - 86400000),
    podcast: { 
      id: "p1",
      title: "Sample Podcast",
      description: "Un podcast de ejemplo",
      userId: "u1",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    views: 892,
    likes: 34,
    comments: 8
  }
];

export const MOCK_PODCASTS: Podcast[] = [
  {
    id: "p1",
    title: "Sample Podcast",
    description: "Un podcast de ejemplo para desarrollo",
    userId: "u1",
    createdAt: new Date(),
    updatedAt: new Date(),
    _count: {
      episodes: 2,
      subscribers: 150
    }
  }
];

export const NAV_ITEMS: NavItem[] = [
  { href: "/dashboard", label: "DASHBOARD", icon: "▣" },
  { href: "/dashboard/podcasts", label: "PODCASTS", icon: "🎙" },
  { href: "/dashboard/episodes", label: "EPISODES", icon: "🎵" },
  { href: "/dashboard/profile", label: "PROFILE", icon: "◉" },
  { href: "/dashboard/settings", label: "SETTINGS", icon: "⚙" },
];