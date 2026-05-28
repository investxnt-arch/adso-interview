"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AuthPage() {
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
        {/* Cyberpunk Header - Responsive */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-wider break-words">
            <span className="text-[#00FFD1]">ADSO</span>
            <span className="text-[#FFE500]">TUBE</span>
          </h1>
          <div className="h-[2px] bg-gradient-to-r from-transparent via-[#00FFD1] to-transparent w-24 sm:w-32 mx-auto mt-2"></div>
          <p className="text-[#00FFD1] text-xs mt-2 tracking-wider">UPLOAD · SHARE · DOMINATE</p>
        </div>

        {/* Form Container */}
        <div className="bg-black/80 backdrop-blur-sm border-2 border-[#00FFD1]/30 rounded-xl p-4 sm:p-8 shadow-[0_0_30px_rgba(0,255,209,0.1)]">
          <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-[#00FFD1] to-[#FF006E] bg-clip-text text-transparent">
              {isLogin ? "LOGIN" : "REGISTER"}
            </span>
          </h2>

          {error && (
            <div className="mb-4 p-2 sm:p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-500 text-xs sm:text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            {!isLogin && (
              <input
                type="text"
                placeholder="USERNAME"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-black/50 border-2 border-[#00FFD1]/50 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white placeholder-gray-500 text-sm sm:text-base focus:outline-none focus:border-[#00FFD1] transition-all"
                required
              />
            )}
            <input
              type="email"
              placeholder="EMAIL"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black/50 border-2 border-[#00FFD1]/50 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white placeholder-gray-500 text-sm sm:text-base focus:outline-none focus:border-[#00FFD1] transition-all"
              required
            />
            <input
              type="password"
              placeholder="PASSWORD"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/50 border-2 border-[#00FFD1]/50 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white placeholder-gray-500 text-sm sm:text-base focus:outline-none focus:border-[#00FFD1] transition-all"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#FF006E] to-[#FF006E]/80 text-white py-2 sm:py-3 rounded-lg font-bold tracking-wider text-sm sm:text-base hover:shadow-[0_0_20px_#FF006E] transition-all disabled:opacity-50"
            >
              {loading ? "PROCESSING..." : isLogin ? "LOGIN" : "REGISTER"}
            </button>
          </form>

          <div className="relative my-4 sm:my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#00FFD1]/30"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-black px-2 text-gray-500">OR</span>
            </div>
          </div>

          <div className="space-y-2 sm:space-y-3">
            <button
              onClick={handleGithubLogin}
              className="w-full bg-gray-800/50 border border-gray-700 text-white py-2 sm:py-3 rounded-lg font-semibold text-sm sm:text-base flex items-center justify-center gap-2 hover:border-[#00FFD1] transition-all"
            >
              <span className="text-lg sm:text-xl">🐙</span> CONTINUE WITH GITHUB
            </button>
            <button
              onClick={handleGoogleLogin}
              className="w-full bg-gray-800/50 border border-gray-700 text-white py-2 sm:py-3 rounded-lg font-semibold text-sm sm:text-base flex items-center justify-center gap-2 hover:border-[#00FFD1] transition-all"
            >
              <span className="text-lg sm:text-xl">G</span> CONTINUE WITH GOOGLE
            </button>
          </div>

          <div className="mt-4 sm:mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-[#00FFD1] hover:text-[#00FFD1]/80 text-xs sm:text-sm transition-all"
            >
              {isLogin ? "CREATE ACCOUNT →" : "← BACK TO LOGIN"}
            </button>
          </div>
        </div>

        {/* Cyberpunk Decorations */}
        <div className="text-center mt-4 text-gray-600 text-xs">
          <span className="inline-block w-1 h-1 bg-[#00FFD1] rounded-full mx-1"></span>
          <span className="inline-block w-1 h-1 bg-[#FF006E] rounded-full mx-1"></span>
          <span className="inline-block w-1 h-1 bg-[#FFE500] rounded-full mx-1"></span>
        </div>
      </div>
    </div>
  )
}
