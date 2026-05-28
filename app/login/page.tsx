"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
    if (res.ok) router.push("/dashboard")
    else setError("Credenciales inválidas")
  }

  const handleGithubLogin = () => {
    window.location.href = "/api/auth/github"
  }

  const handleGoogleLogin = () => {
    window.location.href = "/api/auth/google"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
      <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl w-96 border border-gray-700">
        <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent mb-6">
          ADSOTUBE
        </h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-gray-700 text-white p-3 rounded-lg" required />
          <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-gray-700 text-white p-3 rounded-lg" required />
          <button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-pink-500 text-white p-3 rounded-lg font-semibold">Iniciar Sesión</button>
        </form>
        <div className="mt-4 space-y-2">
          <button onClick={handleGithubLogin} className="w-full bg-gray-700 text-white p-3 rounded-lg font-semibold flex items-center justify-center gap-2">
            <span>🐙</span> Iniciar con GitHub
          </button>
          <button onClick={handleGoogleLogin} className="w-full bg-gray-700 text-white p-3 rounded-lg font-semibold flex items-center justify-center gap-2">
            <span>G</span> Iniciar con Google
          </button>
        </div>
        <p className="text-gray-400 text-center mt-4">
          ¿No tienes cuenta? <a href="/register" className="text-cyan-400">Regístrate</a>
        </p>
      </div>
    </div>
  )
}
