// app/dashboard/settings/page.tsx
'use client'

import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'

export default function SettingsPage() {
  const { user, logout } = useAuth()
  const router = useRouter()

  if (!user) {
    router.push('/login')
    return null
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-[#FFE500] mb-6">Configuración</h1>
        <div className="bg-gray-900 p-6 rounded-lg border border-[#00FFD1]">
          <p className="text-gray-400 mb-4">Email: {user.email}</p>
          <button
            onClick={() => logout()}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  )
}