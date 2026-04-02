'use client'
import { useEffect } from 'react'
import Link from 'next/link'

export default function NotFound() {
  useEffect(() => {
    const timer = setTimeout(() => window.location.href = '/', 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>404 - Página no encontrada</h1>
      <p>Redirigiendo al inicio...</p>
      <Link href="/" style={{ color: 'blue', textDecoration: 'underline' }}>Volver ahora</Link>
    </div>
  )
}
