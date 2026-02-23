'use client';
import { motion } from 'framer-motion';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import Link from 'next/link';
import { Github, Apple, Mail, Lock, User } from 'lucide-react';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      await signIn('credentials', { email, password, callbackUrl: '/dashboard' });
    } else {
      // Lógica de registro
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      if (res.ok) {
        setIsLogin(true);
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono flex items-center justify-center p-4">
      {/* Fondo cyberpunk */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,#00FFD110_0%,transparent_50%),radial-gradient(ellipse_at_bottom,#FF006E10_0%,transparent_50%)]" />
      
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-black tracking-tighter">
            <span className="text-[#FFE500]">ADSO</span>
            <span className="text-[#00FFD1]">TUBE</span>
          </h1>
          <p className="text-[#FF006E] text-sm mt-2 tracking-[0.2em]">
            {isLogin ? 'WELCOME BACK' : 'CREATE ACCOUNT'}
          </p>
        </div>

        {/* Tarjeta principal */}
        <div className="bg-black/80 border-2 border-[#00FFD1] rounded-2xl p-8 backdrop-blur-sm shadow-[0_0_30px_#00FFD1]">
          
          {/* Botones sociales */}
          <div className="space-y-3 mb-6">
            <button
              onClick={() => signIn('github', { callbackUrl: '/dashboard' })}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-black border-2 border-[#FF006E] rounded-xl hover:bg-[#FF006E]/10 transition-all"
            >
              <Github className="w-5 h-5 text-[#FF006E]" />
              <span className="text-[#FF006E] font-bold">CONTINUE WITH GITHUB</span>
            </button>

            <button
              onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-black border-2 border-[#00FFD1] rounded-xl hover:bg-[#00FFD1]/10 transition-all"
            >
              <svg className="w-5 h-5 text-[#00FFD1]" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="text-[#00FFD1] font-bold">CONTINUE WITH GOOGLE</span>
            </button>

            <button
              onClick={() => signIn('apple', { callbackUrl: '/dashboard' })}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-black border-2 border-[#FFE500] rounded-xl hover:bg-[#FFE500]/10 transition-all"
            >
              <Apple className="w-5 h-5 text-[#FFE500]" />
              <span className="text-[#FFE500] font-bold">CONTINUE WITH APPLE</span>
            </button>
          </div>

          {/* Separador */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-800"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-black text-gray-500 text-sm">OR</span>
            </div>
          </div>

          {/* Formulario de email/contraseña */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="NAME"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-black border-2 border-gray-800 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-600 focus:border-[#00FFD1] focus:outline-none transition-colors"
                  required={!isLogin}
                />
              </div>
            )}
            
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="email"
                placeholder="EMAIL"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black border-2 border-gray-800 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-600 focus:border-[#00FFD1] focus:outline-none transition-colors"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="password"
                placeholder="PASSWORD"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black border-2 border-gray-800 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-600 focus:border-[#00FFD1] focus:outline-none transition-colors"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#FF006E] text-white font-bold py-3 rounded-xl border-2 border-black hover:bg-[#FF006E]/80 transition-all shadow-[4px_4px_0_#00FFD1]"
            >
              {isLogin ? 'SIGN IN' : 'CREATE ACCOUNT'}
            </button>
          </form>

          {/* Toggle entre login y registro */}
          <p className="text-center mt-6 text-gray-500">
            {isLogin ? "DON'T HAVE AN ACCOUNT? " : 'ALREADY HAVE AN ACCOUNT? '}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-[#00FFD1] hover:underline font-bold"
            >
              {isLogin ? 'SIGN UP' : 'SIGN IN'}
            </button>
          </p>
        </div>

        {/* System ready */}
        <motion.div
          className="text-center mt-6 text-xs text-[#00FFD1]/40"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          &lt; SYSTEM READY /&gt;
        </motion.div>
      </motion.div>
    </div>
  );
}