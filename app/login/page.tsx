'use client';
import { motion } from 'framer-motion';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { Github, Apple } from 'lucide-react';

function LoginContent() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

  return (
    <div className="min-h-screen bg-black text-white font-mono overflow-hidden">
      {/* Fondo cyberpunk animado con líneas de neón */}
      <div className="fixed inset-0">
        {/* Líneas grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00FFD110_1px,transparent_1px),linear-gradient(to_bottom,#00FFD110_1px,transparent_1px)] bg-[size:40px_40px]" />
        
        {/* Líneas de luz animadas */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[200px] h-[2px] bg-gradient-to-r from-transparent via-[#00FFD1] to-transparent"
            style={{ 
              top: `${20 + i * 15}%`, 
              left: '-200px',
              filter: 'blur(1px)'
            }}
            animate={{
              left: ['-200px', '100%'],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 8,
              delay: i * 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
        
        {/* Puntos brillantes */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#00FFD1] rounded-full"
            style={{ 
              top: `${Math.random() * 100}%`, 
              left: `${Math.random() * 100}%` 
            }}
            animate={{
              scale: [1, 2, 1],
              opacity: [0.5, 1, 0.5],
              boxShadow: [
                '0 0 5px #00FFD1',
                '0 0 20px #FF006E',
                '0 0 5px #00FFD1'
              ]
            }}
            transition={{
              duration: 3,
              delay: i * 0.3,
              repeat: Infinity
            }}
          />
        ))}
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Logo y título */}
          <div className="text-center mb-12">
            <motion.h1 
              className="text-6xl font-black tracking-tighter mb-4"
              animate={{ 
                textShadow: [
                  '0 0 10px #00FFD1, 0 0 20px #FF006E',
                  '0 0 20px #FF006E, 0 0 30px #00FFD1',
                  '0 0 10px #00FFD1, 0 0 20px #FF006E'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span className="text-[#FFE500]">ADSO</span>
              <span className="text-[#00FFD1]">TUBE</span>
            </motion.h1>
            <p className="text-[#FF006E] text-sm tracking-[0.3em] font-mono">
              CREATE · SHARE · DOMINATE
            </p>
          </div>

          {/* Tarjeta de login con efecto neón */}
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="relative"
          >
            {/* Borde animado */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#00FFD1] via-[#FF006E] to-[#FFE500] rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
            
            <div className="relative bg-black/90 border-2 border-[#00FFD1] rounded-xl p-8 backdrop-blur-sm">
              
              {/* Botón GitHub */}
              <motion.button
                onClick={() => signIn('github', { callbackUrl })}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 mb-4 bg-black border-2 border-[#FF006E] rounded-lg group hover:bg-[#FF006E]/10 transition-all"
                whileHover={{ scale: 1.02, boxShadow: '0 0 30px #FF006E' }}
                whileTap={{ scale: 0.98 }}
              >
                <Github className="w-5 h-5 text-[#FF006E]" />
                <span className="text-[#FF006E] font-bold font-mono tracking-wider">CONTINUE WITH GITHUB</span>
              </motion.button>

              {/* Botón Apple */}
              <motion.button
                onClick={() => signIn('apple', { callbackUrl })}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-black border-2 border-[#00FFD1] rounded-lg group hover:bg-[#00FFD1]/10 transition-all"
                whileHover={{ scale: 1.02, boxShadow: '0 0 30px #00FFD1' }}
                whileTap={{ scale: 0.98 }}
              >
                <Apple className="w-5 h-5 text-[#00FFD1]" />
                <span className="text-[#00FFD1] font-bold font-mono tracking-wider">CONTINUE WITH APPLE</span>
              </motion.button>

              {/* Separador */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#00FFD1]/30"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-4 bg-black text-[#00FFD1] text-sm font-mono">OR</span>
                </div>
              </div>

              {/* Formulario de email */}
              <form className="space-y-5">
                <div>
                  <input
                    type="email"
                    placeholder="EMAIL"
                    className="w-full bg-black border-2 border-[#00FFD1]/30 rounded-lg px-5 py-4 text-white placeholder-[#00FFD1]/50 font-mono text-sm focus:border-[#FF006E] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="PASSWORD"
                    className="w-full bg-black border-2 border-[#00FFD1]/30 rounded-lg px-5 py-4 text-white placeholder-[#00FFD1]/50 font-mono text-sm focus:border-[#FF006E] focus:outline-none transition-colors"
                  />
                </div>
                <motion.button
                  type="submit"
                  className="w-full bg-[#FFE500] text-black font-bold py-4 rounded-lg border-2 border-black font-mono tracking-wider hover:bg-[#FFE500]/90 transition-all"
                  whileHover={{ scale: 1.02, boxShadow: '0 0 30px #FFE500' }}
                  whileTap={{ scale: 0.98 }}
                >
                  SIGN IN
                </motion.button>
              </form>

              {/* Link a registro */}
              <p className="text-center mt-6 text-[#00FFD1]/60 font-mono text-sm">
                DON'T HAVE AN ACCOUNT?{' '}
                <a href="/register" className="text-[#FF006E] hover:text-[#FF006E]/80 transition-colors font-bold">
                  SIGN UP
                </a>
              </p>
            </div>
          </motion.div>

          {/* Texto de sistema */}
          <motion.div
            className="text-center mt-8 font-mono text-xs text-[#00FFD1]/40"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            &lt; SYSTEM READY /&gt;
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div 
          className="text-[#00FFD1] font-mono"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          LOADING...
        </motion.div>
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}