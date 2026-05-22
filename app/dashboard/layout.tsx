// app/dashboard/layout.tsx
'use client'

import { useAuth } from '@/hooks/useAuth'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, logout } = useAuth()
  const pathname = usePathname()

  const navItems = [
    { href: '/dashboard', label: 'Inicio' },
    { href: '/dashboard/upload', label: 'Subir Video' },
    { href: '/dashboard/settings', label: 'Configuración' },
  ]

  return (
    <div className="min-h-screen bg-black">
      <nav className="bg-gray-900 border-b border-[#00FFD1] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link href="/dashboard" className="text-xl font-bold text-[#FFE500]">
                ADSOTUBE
              </Link>
              <div className="hidden md:flex space-x-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      pathname === item.href
                        ? 'bg-[#00FFD1] text-black'
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {user && (
                <>
                  <span className="text-sm text-[#00FFD1] hidden md:block">
                    {user.email}
                  </span>
                  <button
                    onClick={() => logout()}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition"
                  >
                    Salir
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  )
}