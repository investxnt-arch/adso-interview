import { notFound } from 'next/navigation';
import { list } from '@vercel/blob';

interface VideoPageProps {
  params: {
    id: string;
  };
}

export default async function VideoPage({ params }: VideoPageProps) {
  let videoUrl = '';
  let videoTitle = '';
  
  try {
    const { blobs } = await list({
      prefix: 'videos/',
      limit: 100,
    });
    
    const video = blobs.find(b => b.pathname === `videos/${params.id}` || 
      b.url.includes(params.id));
    
    if (!video) {
      notFound();
    }
    
    videoUrl = video.url;
    videoTitle = video.pathname.split('/').pop()?.replace(/^\d+-/, '').replace(/\.mp4$/, '').replace(/_/g, ' ') || 'Video';
  } catch (error) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto p-6">
        <Link href="/dashboard" className="text-[#00FFD1] hover:text-[#FFE500] mb-4 inline-block">
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
        
        <h1 className="text-2xl font-bold text-[#FFE500] mt-6">{videoTitle}</h1>
      </div>
    </div>
  );
}