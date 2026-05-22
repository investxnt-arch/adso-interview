// app/api/videos/public/route.ts
import { NextResponse } from 'next/server'

// Videos públicos que SÍ funcionan
const demoVideos = [
  {
    id: 'demo-1',
    title: 'Video de Prueba (MP4)',
    description: 'Este video es público y debería reproducirse correctamente',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    user_name: 'Demo User',
    views: 100,
    likes: 10,
    created_at: new Date().toISOString()
  },
  {
    id: 'demo-2',
    title: 'Video de Prueba 2',
    description: 'Otro video público para testing',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    user_name: 'Demo User',
    views: 50,
    likes: 5,
    created_at: new Date().toISOString()
  }
]

export async function GET() {
  return NextResponse.json({ videos: demoVideos })
}