'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Upload, Film, X, ChevronLeft } from 'lucide-react';

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
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 500);

    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setTimeout(() => {
        router.push('/dashboard');
      }, 1000);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 text-gray-400 hover:text-[#00FFD1] transition-colors">
            <ChevronLeft className="w-5 h-5" />
            <span>BACK TO DASHBOARD</span>
          </Link>
          <h1 className="text-2xl font-bold">
            <span className="text-[#FFE500]">UPLOAD</span>{' '}
            <span className="text-[#00FFD1]">VIDEO</span>
          </h1>
          <div className="w-20"></div>
        </div>
      </header>

      {/* Upload form */}
      <div className="max-w-3xl mx-auto p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* File area */}
          <div className="border-4 border-dashed border-[#00FFD1] rounded-2xl p-12 text-center hover:border-[#FF006E] transition-all bg-gray-900/50">
            {!file ? (
              <div className="space-y-6">
                <Film className="w-24 h-24 mx-auto text-[#00FFD1]" />
                <div>
                  <label
                    htmlFor="file-upload"
                    className="inline-block bg-[#FF006E] text-white px-8 py-4 rounded-xl text-lg font-bold cursor-pointer hover:bg-[#FF006E]/80 transition-all shadow-[0_0_20px_#FF006E]"
                  >
                    SELECT FILE
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    accept="video/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
                <p className="text-gray-500 font-mono">MP4, MOV, AVI - Max 1GB</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between bg-black border-2 border-[#00FFD1] p-6 rounded-xl">
                  <div className="flex items-center gap-4">
                    <Film className="w-12 h-12 text-[#00FFD1]" />
                    <div className="text-left">
                      <p className="text-xl font-bold text-[#FFE500]">{file.name}</p>
                      <p className="text-gray-500 font-mono">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFile(null)}
                    className="text-gray-500 hover:text-[#FF006E] transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Title */}
          <div className="space-y-2">
            <label className="block text-[#00FFD1] font-bold font-mono tracking-wider">
              VIDEO TITLE
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., My first podcast"
              className="w-full bg-black border-4 border-gray-800 rounded-xl px-6 py-4 text-white placeholder-gray-600 text-lg focus:border-[#00FFD1] focus:outline-none transition-all font-mono"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="block text-[#00FFD1] font-bold font-mono tracking-wider">
              DESCRIPTION
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your video..."
              rows={5}
              className="w-full bg-black border-4 border-gray-800 rounded-xl px-6 py-4 text-white placeholder-gray-600 text-lg focus:border-[#00FFD1] focus:outline-none transition-all font-mono resize-none"
            />
          </div>

          {/* Progress bar */}
          {uploading && (
            <div className="space-y-3">
              <div className="flex justify-between font-mono">
                <span className="text-[#00FFD1]">UPLOADING</span>
                <span className="text-[#FF006E]">{progress}%</span>
              </div>
              <div className="w-full bg-gray-900 rounded-full h-6 overflow-hidden border-2 border-gray-800">
                <div
                  className="bg-gradient-to-r from-[#00FFD1] to-[#FF006E] h-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-6 pt-4">
            <button
              type="submit"
              disabled={!file || !title || uploading}
              className="flex-1 bg-[#FFE500] text-black font-bold py-5 rounded-xl border-4 border-black hover:bg-[#FFE500]/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-xl font-mono shadow-[4px_4px_0_#00FFD1] hover:shadow-[6px_6px_0_#00FFD1]"
            >
              <Upload className="w-6 h-6 inline mr-3" />
              PUBLISH VIDEO
            </button>
            <Link
              href="/dashboard"
              className="px-8 bg-gray-800 text-white font-bold py-5 rounded-xl border-4 border-gray-700 hover:bg-gray-700 transition-all text-xl font-mono"
            >
              CANCEL
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}