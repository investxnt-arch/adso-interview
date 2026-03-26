import Link from 'next/link';
import { notFound } from 'next/navigation';

interface VideoPageProps {
  params: {
    id: string;
  };
}

export default async function VideoPage({ params }: VideoPageProps) {
  // Obtener la URL del video de los parámetros
  // Nota: Para simplificar, asumimos que el video está en Vercel Blob
  // En producción, deberías obtener esto de tu base de datos
  
  const videoId = params.id;
  
  // URL pública de ejemplo - esto debería venir de tu base de datos
  const videoUrl = `https://podcast-saas-six.vercel.app/api/videos/${videoId}`;
  
  if (!videoId) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto p-6">
        <Link 
          href="/dashboard" 
          className="text-[#00FFD1] hover:text-[#FFE500] mb-4 inline-block transition-colors"
        >
          ← BACK TO DASHBOARD
        </Link>
        
        <div className="relative aspect-video bg-black rounded-2xl overflow-hidden border-2 border-[#00FFD1] shadow-[0_0_30px_#00FFD1] mt-4">
          <video
            src={videoUrl}
            controls
            className="w-full h-full object-contain"
            autoPlay
          >
            Your browser does not support the video tag.
          </video>
        </div>
        
        <h1 className="text-2xl font-bold text-[#FFE500] mt-6">Video Player</h1>
      </div>
    </div>
  );
}