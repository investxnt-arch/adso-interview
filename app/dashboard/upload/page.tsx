'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, Film, X } from 'lucide-react';

export default function UploadPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title) return;

    setUploading(true);
    
    // Simular progreso de subida
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 500);

    // Aquí iría la lógica real de subida a tu servidor/cloudinary
    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setTimeout(() => {
        router.push('/dashboard');
      }, 1000);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">
          <span className="text-[#FFE500]">SUBIR</span>{' '}
          <span className="text-[#00FFD1]">VIDEO</span>
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Área de subida de archivo */}
          <div className="border-2 border-dashed border-[#00FFD1] rounded-xl p-8 text-center hover:border-[#FF006E] transition-colors">
            {!file ? (
              <div className="space-y-4">
                <Film className="w-16 h-16 mx-auto text-[#00FFD1]" />
                <div>
                  <label
                    htmlFor="file-upload"
                    className="bg-[#FF006E] text-white px-6 py-3 rounded-xl cursor-pointer hover:bg-[#FF006E]/80 transition-colors inline-block"
                  >
                    Seleccionar archivo
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    accept="video/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
                <p className="text-gray-500">MP4, MOV, AVI - Máx 1GB</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-gray-900 p-4 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Film className="w-8 h-8 text-[#00FFD1]" />
                    <div>
                      <p className="font-bold">{file.name}</p>
                      <p className="text-sm text-gray-500">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFile(null)}
                    className="text-gray-500 hover:text-[#FF006E]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Título del video */}
          <div>
            <label className="block text-[#00FFD1] mb-2 font-bold">TÍTULO</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: Mi primer podcast"
              className="w-full bg-gray-900 border-2 border-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:border-[#00FFD1] focus:outline-none transition-colors"
              required
            />
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-[#00FFD1] mb-2 font-bold">DESCRIPCIÓN</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe tu video..."
              rows={4}
              className="w-full bg-gray-900 border-2 border-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:border-[#00FFD1] focus:outline-none transition-colors"
            />
          </div>

          {/* Barra de progreso */}
          {uploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[#00FFD1]">Subiendo...</span>
                <span className="text-[#FF006E]">{progress}%</span>
              </div>
              <div className="w-full bg-gray-900 rounded-full h-4 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#00FFD1] to-[#FF006E] h-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Botones */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={!file || !title || uploading}
              className="flex-1 bg-[#FFE500] text-black font-bold py-4 rounded-xl border-2 border-black hover:bg-[#FFE500]/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Upload className="w-5 h-5 inline mr-2" />
              PUBLICAR VIDEO
            </button>
            <button
              type="button"
              onClick={() => router.push('/dashboard')}
              className="px-6 bg-gray-800 text-white font-bold py-4 rounded-xl border-2 border-gray-700 hover:bg-gray-700 transition-all"
            >
              CANCELAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}