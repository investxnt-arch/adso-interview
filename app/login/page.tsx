"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/signup"
    const body = isLogin ? { email, password } : { email, password, name }

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      const data = await res.json()
      if (res.ok) {
        router.push("/dashboard")
      } else {
        setError(data.error || "Error")
      }
    } catch (err) {
      setError("Error de conexión")
    } finally {
      setLoading(false)
    }
  }

  const handleGithubLogin = () => {
    window.location.href = "/api/auth/github"
  }

  const handleGoogleLogin = () => {
    window.location.href = "/api/auth/google"
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold tracking-wider">
            <span className="text-[#00FFD1]">ADSO</span>
            <span className="text-[#FFE500]">TUBE</span>
          </h1>
          <p className="text-[#00FFD1] text-xs mt-2 tracking-wider">UPLOAD · SHARE · DOMINATE</p>
        </div>

        <div className="bg-black/80 backdrop-blur-sm border-2 border-[#00FFD1]/30 rounded-xl p-8 shadow-[0_0_30px_rgba(0,255,209,0.1)]">
          <h2 className="text-2xl font-bold text-center mb-6">
            <span className="bg-gradient-to-r from-[#00FFD1] to-[#FF006E] bg-clip-text text-transparent">
              {isLogin ? "LOGIN" : "REGISTER"}
            </span>
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <input
                type="text"
                placeholder="USERNAME"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-black/50 border-2 border-[#00FFD1]/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00FFD1]"
                required
              />
            )}
            <input
              type="email"
              placeholder="EMAIL"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black/50 border-2 border-[#00FFD1]/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00FFD1]"
              required
            />
            <input
              type="password"
              placeholder="PASSWORD"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/50 border-2 border-[#00FFD1]/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00FFD1]"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#FF006E] to-[#FF006E]/80 text-white py-3 rounded-lg font-bold tracking-wider hover:shadow-[0_0_20px_#FF006E] transition-all disabled:opacity-50"
            >
              {loading ? "PROCESSING..." : isLogin ? "LOGIN" : "REGISTER"}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#00FFD1]/30"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-black px-2 text-gray-500">OR</span>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleGithubLogin}
              className="w-full bg-gray-800/50 border border-gray-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:border-[#00FFD1] transition-all"
            >
              <span className="text-xl">🐙</span> CONTINUE WITH GITHUB
            </button>
            <button
              onClick={handleGoogleLogin}
              className="w-full bg-gray-800/50 border border-gray-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:border-[#00FFD1] transition-all"
            >
              <span className="text-xl">G</span> CONTINUE WITH GOOGLE
            </button>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-[#00FFD1] hover:text-[#00FFD1]/80 text-sm transition-all"
            >
              {isLogin ? "CREATE ACCOUNT →" : "← BACK TO LOGIN"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
