'use client';
import { motion } from 'framer-motion';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function LoginContent() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      {/* Fondo cyberpunk animado */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0ff1,#f0f1)] opacity-20" />
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-full bg-cyan-500/20"
            style={{ left: `${i * 5}%` }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
              boxShadow: [
                '0 0 5px #0ff',
                '0 0 20px #f0f',
                '0 0 5px #0ff'
              ]
            }}
            transition={{ duration: 3, delay: i * 0.1, repeat: Infinity }}
          />
        ))}
      </div>

      {/* Tarjeta de login */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative z-10 w-full max-w-md p-8 border-4 border-cyan-500 bg-black/80 backdrop-blur-sm rounded-lg"
      >
        <div className="text-center mb-8">
          <h1 className="text-5xl font-black tracking-tighter mb-2">
            <span className="text-[#FFE500]">ADSO</span>
            <span className="text-[#00FFD1]">TUBE</span>
          </h1>
          <p className="text-cyan-400/60 font-mono mt-2">CREATE · SHARE · DOMINATE</p>
        </div>

        <div className="space-y-4">
          {/* ✅ BOTÓN DE GITHUB CON CALLBACK CORRECTO */}
          <motion.button
            onClick={() => signIn('github', { callbackUrl: '/dashboard' })}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-fuchsia-500 rounded-lg bg-black hover:bg-fuchsia-500/10 transition-all"
            whileHover={{ scale: 1.02, boxShadow: '0 0 15px #f0f' }}
            whileTap={{ scale: 0.98 }}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"
                className="text-fuchsia-500"
              />
            </svg>
            <span className="text-fuchsia-500 font-mono font-bold">Continue with GitHub</span>
          </motion.button>

          {/* Botón Apple */}
          <motion.button
            onClick={() => signIn('apple', { callbackUrl: '/dashboard' })}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-cyan-500 rounded-lg bg-black hover:bg-cyan-500/10 transition-all"
            whileHover={{ scale: 1.02, boxShadow: '0 0 15px #0ff' }}
            whileTap={{ scale: 0.98 }}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.69 3.56-1.702z"
                className="text-cyan-400"
              />
            </svg>
            <span className="text-cyan-400 font-mono font-bold">Continue with Apple</span>
          </motion.button>

          {/* Separador */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-gray-800"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-black text-gray-500 font-mono">OR</span>
            </div>
          </div>

          {/* Formulario de email/password */}
          <form className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full bg-black border-2 border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-cyan-500 focus:outline-none transition-colors font-mono"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full bg-black border-2 border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-cyan-500 focus:outline-none transition-colors font-mono"
            />
            <button
              type="submit"
              className="w-full bg-cyan-500 text-black font-bold py-3 rounded-lg border-2 border-black hover:bg-cyan-400 transition-colors shadow-[4px_4px_0_#FF006E] font-mono"
            >
              SIGN IN
            </button>
          </form>

          {/* Link a registro */}
          <p className="text-center text-gray-500 font-mono text-sm mt-4">
            Don't have an account?{' '}
            <a href="/register" className="text-[#FFE500] hover:underline">
              Sign up
            </a>
          </p>
        </div>

        {/* Texto cyberpunk inferior */}
        <motion.div
          className="mt-6 text-center font-mono text-xs text-cyan-400/40"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          &lt; SYSTEM READY /&gt;
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-cyan-400 font-mono">Loading...</div>
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}