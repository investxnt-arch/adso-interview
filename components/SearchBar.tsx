'use client';
import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchResult {
  id: string;
  title: string;
  type: 'podcast' | 'episode';
  subtitle?: string;
  image?: string;
  href: string;
}

// Datos de ejemplo - después conectaremos con BD real
const mockResults: SearchResult[] = [
  {
    id: '1',
    title: 'Tech Podcast Weekly',
    type: 'podcast',
    subtitle: '12 episodes',
    image: '🎙️',
    href: '/podcast/1'
  },
  {
    id: '2',
    title: 'Cómo empezar con Next.js',
    type: 'episode',
    subtitle: 'Tech Podcast Weekly',
    image: '🎵',
    href: '/podcast/1/episode/2'
  },
  {
    id: '3',
    title: 'Marketing Digital',
    type: 'podcast',
    subtitle: '8 episodes',
    image: '🎙️',
    href: '/podcast/3'
  },
  {
    id: '4',
    title: 'Entrevista con experto',
    type: 'episode',
    subtitle: 'Marketing Digital',
    image: '🎵',
    href: '/podcast/3/episode/4'
  }
];

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Cerrar al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Simular búsqueda (después conectaremos con API real)
  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    const timer = setTimeout(() => {
      const filtered = mockResults.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.subtitle?.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
      setIsLoading(false);
      setIsOpen(true);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl">
      {/* Barra de búsqueda */}
      <div className="relative group">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search podcasts, episodes..."
          className="w-full bg-gray-900 border-2 border-gray-800 rounded-full py-3 pl-12 pr-12 text-white placeholder-gray-500 focus:border-[#00FFD1] focus:outline-none transition-all font-mono"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
        
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#FF006E] transition-colors"
          >
            <X size={18} />
          </button>
        )}

        {/* Efecto cyberpunk al hacer focus */}
        <div className="absolute inset-0 rounded-full border-2 border-[#00FFD1] opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
      </div>

      {/* Resultados de búsqueda */}
      <AnimatePresence>
        {isOpen && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-black border-4 border-[#00FFD1] rounded-lg overflow-hidden shadow-[0_10px_30px_-10px_#00FFD1] z-50"
          >
            {/* Header */}
            <div className="bg-[#111] px-4 py-2 border-b-4 border-[#00FFD1]">
              <p className="text-xs text-[#FFE500] font-mono">
                FOUND {results.length} RESULTS
              </p>
            </div>

            {/* Lista de resultados */}
            <div className="max-h-96 overflow-y-auto">
              {results.map((result, index) => (
                <motion.div
                  key={`${result.id}-${index}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={result.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-[#00FFD1]/10 transition-colors border-b border-gray-800 last:border-0"
                  >
                    <div className="w-10 h-10 bg-gray-900 border-2 border-[#FF006E] rounded flex items-center justify-center text-xl">
                      {result.image}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-[#FFE500]">
                        {result.title}
                      </p>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-[#00FFD1]">
                          {result.type === 'podcast' ? '🎙️ PODCAST' : '🎵 EPISODE'}
                        </span>
                        {result.subtitle && (
                          <>
                            <span className="text-gray-600">•</span>
                            <span className="text-gray-500">{result.subtitle}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Loading state */}
            {isLoading && (
              <div className="p-4 text-center">
                <div className="inline-block w-6 h-6 border-2 border-[#00FFD1] border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}