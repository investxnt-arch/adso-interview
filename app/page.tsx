// app/page.tsx (versión responsive sin cambiar diseño)
'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function HomePage() {
  const [glitch, setGlitch] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true)
      setTimeout(() => setGlitch(false), 150)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Cyberpunk Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,209,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,209,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      {/* Scanning Lines */}
      <div className="absolute top-1/4 left-0 w-full h-[2px] bg-[#00FFD1] shadow-[0_0_20px_#00FFD1] animate-scan-line z-20"></div>
      <div className="absolute top-2/4 left-0 w-full h-[2px] bg-[#00FFD1] shadow-[0_0_20px_#00FFD1] animate-scan-line-delayed z-20"></div>
      <div className="absolute top-3/4 left-0 w-full h-[2px] bg-[#00FFD1] shadow-[0_0_20px_#00FFD1] animate-scan-line z-20"></div>

      {/* Glow effects */}
      <div className="absolute top-20 left-10 w-64 sm:w-96 h-64 sm:h-96 bg-[#00FFD1] rounded-full blur-[120px] opacity-10"></div>
      <div className="absolute bottom-20 right-10 w-64 sm:w-96 h-64 sm:h-96 bg-[#FF006E] rounded-full blur-[120px] opacity-10"></div>

      {/* LED Lights */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_5px_red]"></div>
        <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse delay-150 shadow-[0_0_5px_yellow]"></div>
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse delay-300 shadow-[0_0_5px_green]"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 min-h-screen flex flex-col items-center justify-center text-center">
        <div className="relative">
          <h1 className={`text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-wider mb-4 transition-all duration-100 ${glitch ? 'translate-x-1 translate-y-0.5' : ''}`}>
            <span className="text-[#00FFD1]">ADSO</span><span className="text-[#FFE500]">TUBE</span>
          </h1>
          {glitch && (
            <>
              <h1 className="absolute top-0 left-0 text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-wider opacity-70 -translate-x-1 translate-y-0.5 pointer-events-none">
                <span className="text-[#FF006E]">ADSO</span><span className="text-[#00FFD1]">TUBE</span>
              </h1>
              <h1 className="absolute top-0 left-0 text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-wider opacity-70 translate-x-1 -translate-y-0.5 pointer-events-none">
                <span className="text-[#FFE500]">ADSO</span><span className="text-[#FF006E]">TUBE</span>
              </h1>
            </>
          )}
        </div>

        <p className="text-xl sm:text-2xl text-[#00FFD1] mb-4 tracking-wider animate-pulse px-2">CREATE · SHARE · DOMINATE</p>
        <p className="text-gray-400 max-w-xl mx-auto mb-10 text-base sm:text-lg px-4">The ultimate platform for next-gen creators. Upload your voice, reach millions, and make your mark in the digital universe.</p>

        <div className="flex gap-4">
          <Link href="/login" className="group relative inline-block bg-[#FF006E] text-white px-6 sm:px-10 py-3 sm:py-4 rounded-xl font-bold tracking-wider text-base sm:text-lg hover:bg-[#FF006E]/80 transition-all duration-300 shadow-[0_0_20px_#FF006E] hover:shadow-[0_0_35px_#FF006E]">
            GET STARTED
          </Link>
        </div>

        {/* Stats - Responsive grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 mt-12 sm:mt-20 w-full px-4">
          <div><div className="text-xl sm:text-2xl font-bold text-[#00FFD1]">1.2M</div><div className="text-xs text-gray-500">ACTIVE USERS</div></div>
          <div><div className="text-xl sm:text-2xl font-bold text-[#00FFD1]">50K+</div><div className="text-xs text-gray-500">VIDEOS</div></div>
          <div><div className="text-xl sm:text-2xl font-bold text-[#00FFD1]">10M+</div><div className="text-xs text-gray-500">VIEWS</div></div>
          <div><div className="text-xl sm:text-2xl font-bold text-[#00FFD1]">25K+</div><div className="text-xs text-gray-500">CREATORS</div></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scan-line {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes scan-line-delayed {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-scan-line { animation: scan-line 8s linear infinite; }
        .animate-scan-line-delayed { animation: scan-line-delayed 8s linear infinite 2s; }
        .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        .delay-150 { animation-delay: 150ms; }
        .delay-300 { animation-delay: 300ms; }
      `}</style>
    </div>
  )
}
