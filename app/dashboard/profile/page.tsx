// app/dashboard/profile/page.tsx
'use client'

import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
  const { user } = useAuth()
  const router = useRouter()

  if (!user) {
    router.push('/login')
    return null
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-[#FFE500] mb-6">Perfil</h1>
        <div className="bg-gray-900 p-6 rounded-lg border border-[#00FFD1]">
          <p className="text-gray-400">Email: {user.email}</p>
          <p className="text-gray-400 mt-2">Nombre: {user.name || 'Usuario'}</p>
        </div>
      </div>
    </div>
  )
}