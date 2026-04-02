import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';
import Link from 'next/link';

// Configurar cliente de Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

interface VideoPageProps {
  params: {
    id: string;
  };
}

export default async function WatchPage({ params }: VideoPageProps) {
  const { id } = params;

  // Obtener el video de la base de datos
  const { data: video, error } = await supabase
    .from('videos')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !video) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <Link href="/" className="text-[#00FFD1] hover:text-[#FFE500] transition-colors">
            ← BACK TO HOME
          </Link>
        </div>

        {/* Video Player */}
        <div className="aspect-video bg-black rounded-2xl overflow-hidden border-2 border-[#00FFD1] shadow-[0_0_30px_#00FFD1]">
          <video
            src={video.url}
            controls
            className="w-full h-full object-contain"
            autoPlay
          >
            Your browser does not support video playback.
          </video>
        </div>

        {/* Video Info */}
        <div className="mt-6">
          <h1 className="text-3xl font-bold text-[#FFE500]">{video.title}</h1>
          <div className="flex items-center gap-4 mt-2">
            <p className="text-[#00FFD1]">{video.user_name || 'Anonymous'}</p>
            <p className="text-gray-500 text-sm">
              {video.views || 0} views • {new Date(video.created_at).toLocaleDateString()}
            </p>
          </div>
          {video.description && (
            <p className="mt-4 text-gray-400 border-l-4 border-[#FF006E] pl-4">
              {video.description}
            </p>
          )}
        </div>

        {/* Share Section */}
        <div className="mt-8 p-4 bg-gray-900/50 rounded-xl border border-gray-800">
          <h3 className="text-[#00FFD1] font-bold mb-2">Share this video</h3>
          <div className="flex gap-2">
            <input
              type="text"
              value={`https://podcast-saas-six.vercel.app/watch/${video.id}`}
              readOnly
              className="flex-1 bg-black border border-gray-800 rounded-lg px-4 py-2 text-white text-sm"
            />
            <button
              onClick={async () => {
                await navigator.clipboard.writeText(`https://podcast-saas-six.vercel.app/watch/${video.id}`);
                alert('Link copied to clipboard!');
              }}
              className="bg-[#FF006E] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#FF006E]/80 transition-colors"
            >
              Copy Link
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}