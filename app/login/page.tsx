// app/login/page.tsx
'use client'

import { useState } from 'react'
import { Github, Chrome } from 'lucide-react'

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()
      if (res.ok) {
        window.location.href = '/dashboard'
      } else {
        setError(data.error || 'Login failed')
      }
    } catch (err) {
      setError('Connection error')
    } finally {
      setLoading(false)
    }
  }

  const handleGitHubLogin = () => {
    setLoading(true)
    window.location.href = '/api/auth/github'
  }

  const handleGoogleLogin = () => {
    setLoading(true)
    window.location.href = '/api/auth/google'
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,209,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,209,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      <div className="absolute top-1/3 left-0 w-full h-[2px] bg-[#00FFD1] shadow-[0_0_20px_#00FFD1] animate-scan-line z-20"></div>
      
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
        <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse delay-150"></div>
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse delay-300"></div>
      </div>
      
      <div className="bg-black/80 backdrop-blur-sm p-8 rounded-2xl border-2 border-[#00FFD1] shadow-[0_0_50px_#00FFD1] max-w-md w-full relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold tracking-wider"><span className="text-[#00FFD1]">ADSO</span><span className="text-[#FFE500]">TUBE</span></h1>
          <p className="text-[#00FFD1] text-sm mt-2 animate-pulse">CREATE · SHARE · DOMINATE</p>
        </div>
        
        {error && <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-500 text-sm text-center">{error}</div>}
        
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <input type="email" placeholder="EMAIL" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-black/50 border-2 border-[#00FFD1]/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00FFD1] transition-all" required />
          <input type="password" placeholder="PASSWORD" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-black/50 border-2 border-[#00FFD1]/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00FFD1] transition-all" required />
          <button type="submit" disabled={loading} className="w-full bg-[#FF006E] text-white py-3 rounded-lg font-bold tracking-wider hover:bg-[#FF006E]/80 transition-all disabled:opacity-50 shadow-[0_0_15px_#FF006E]">{loading ? 'CONNECTING...' : 'SIGN IN'}</button>
        </form>
        
        <div className="relative my-6"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#00FFD1]/30"></div></div><div className="relative flex justify-center text-sm"><span className="px-2 bg-black text-[#00FFD1] font-mono">OR</span></div></div>
        
        <div className="space-y-3">
          <button onClick={handleGitHubLogin} disabled={loading} className="w-full bg-[#24292e] border-2 border-[#00FFD1] text-white py-3 rounded-lg font-bold hover:bg-[#24292e]/80 transition-all flex items-center justify-center gap-3"><Github className="w-5 h-5" />CONTINUE WITH GITHUB</button>
          <button onClick={handleGoogleLogin} disabled={loading} className="w-full bg-[#4285F4] border-2 border-[#00FFD1] text-white py-3 rounded-lg font-bold hover:bg-[#4285F4]/80 transition-all flex items-center justify-center gap-3"><Chrome className="w-5 h-5" />CONTINUE WITH GOOGLE</button>
        </div>
      </div>

      <style jsx>{`
        @keyframes scan-line { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        .animate-scan-line { animation: scan-line 8s linear infinite; }
        .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        .delay-150 { animation-delay: 150ms; }
        .delay-300 { animation-delay: 300ms; }
      `}</style>
    </div>
  )
}