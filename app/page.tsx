'use client';
import Link from "next/link"
import { Play, Podcast, Mic, Users, TrendingUp } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white font-mono">
      {/* Hero section cyberpunk */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Fondo animado cyberpunk */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#00FFD110_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00FFD110_1px,transparent_1px),linear-gradient(to_bottom,#00FFD110_1px,transparent_1px)] bg-[size:40px_40px]" />
        
        {/* Líneas de luz animadas con Tailwind */}
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute w-[200px] h-[2px] bg-gradient-to-r from-transparent via-[#00FFD1] to-transparent animate-slide"
            style={{
              top: `${30 + i * 30}%`,
              left: '-200px',
              animationDelay: `${i * 2}s`
            }}
          />
        ))}

        {/* Contenido principal */}
        <div className="relative z-10 text-center px-4">
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-6">
            <span className="text-[#FFE500] animate-pulse">ADSO</span>
            <span className="text-[#00FFD1]">TUBE</span>
          </h1>
          <p className="text-2xl md:text-4xl text-[#FF006E] mb-8 tracking-[0.3em] font-mono">
            CREATE · SHARE · DOMINATE
          </p>
          
          {/* ✅ TEXTO ACTUALIZADO - MÁS CREATIVO (SIN "CYBERPUNK") */}
          <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto font-mono">
            The ultimate platform for next-gen creators. Upload your voice,
            reach millions, and make your mark in the audio universe.
          </p>
          
          <div className="flex gap-6 justify-center">
            <Link
              href="/login"
              className="bg-[#FF006E] text-white px-8 py-4 rounded-xl text-lg font-bold border-4 border-black hover:bg-[#FF006E]/80 transition-all shadow-[4px_4px_0_#00FFD1] hover:shadow-[6px_6px_0_#00FFD1]"
            >
              GET STARTED
            </Link>
            <Link
              href="/explore"
              className="bg-transparent text-[#00FFD1] px-8 py-4 rounded-xl text-lg font-bold border-4 border-[#00FFD1] hover:bg-[#00FFD1]/10 transition-all"
            >
              EXPLORE
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-[#00FFD1] rounded-full flex justify-center">
            <div className="w-1 h-3 bg-[#00FFD1] rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <h2 className="text-5xl font-black text-center mb-16">
          <span className="text-[#FF006E]">WHY</span>{' '}
          <span className="text-[#FFE500]">CHOOSE</span>{' '}
          <span className="text-[#00FFD1]">ADSOTUBE</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Podcast,
              title: "UPLOAD EASILY",
              desc: "Drag and drop your podcasts. We handle the rest."
            },
            {
              icon: Users,
              title: "GROW AUDIENCE",
              desc: "Reach millions of listeners worldwide."
            },
            {
              icon: TrendingUp,
              title: "MONETIZE",
              desc: "Turn your passion into profit."
            }
          ].map((feature, i) => {
            const Icon = feature.icon
            return (
              <div
                key={i}
                className="border-4 border-gray-800 bg-[#111] p-8 rounded-xl hover:border-[#00FFD1] transition-all group"
              >
                <Icon className="w-12 h-12 text-[#FF006E] mb-6 group-hover:text-[#00FFD1] transition-colors" />
                <h3 className="text-2xl font-bold text-[#FFE500] mb-4">{feature.title}</h3>
                <p className="text-gray-400 font-mono">{feature.desc}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Stats section */}
      <section className="py-24 px-4 border-t-4 border-b-4 border-[#FF006E] bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          {[
            { label: "ACTIVE USERS", value: "1.2M" },
            { label: "PODCASTS UPLOADED", value: "50K+" },
            { label: "TOTAL LISTENS", value: "10M+" },
            { label: "CREATORS", value: "25K+" }
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-5xl font-black text-[#00FFD1] mb-2">{stat.value}</div>
              <div className="text-sm text-[#FFE500] font-mono tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA section */}
      <section className="py-24 px-4 text-center">
        <h2 className="text-5xl font-black mb-8">
          <span className="text-[#00FFD1]">READY TO</span>{' '}
          <span className="text-[#FFE500]">START?</span>
        </h2>
        <Link
          href="/register"
          className="inline-block bg-[#FF006E] text-white px-12 py-6 rounded-xl text-2xl font-bold border-4 border-black hover:bg-[#FF006E]/80 transition-all shadow-[6px_6px_0_#00FFD1] hover:shadow-[10px_10px_0_#00FFD1]"
        >
          CREATE ACCOUNT NOW
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t-4 border-[#00FFD1] py-8 px-4 text-center text-gray-500 font-mono">
        <p>© 2026 ADSOTUBE · ALL RIGHTS RESERVED</p>
        <p className="text-xs mt-2 text-[#00FFD1]/40">&lt; SYSTEM ONLINE /&gt;</p>
      </footer>

      {/* Agregar estilos de animación personalizados en el global CSS */}
      <style jsx global>{`
        @keyframes slide {
          from { left: -200px; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          to { left: 100%; opacity: 0; }
        }
        .animate-slide {
          animation: slide 8s linear infinite;
        }
      `}</style>
    </div>
  )
}