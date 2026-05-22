// hooks/useAuth.ts
'use client'

import { useEffect, useState } from 'react'

interface User {
  id: string
  email: string
  name: string
  image?: string
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadSession = async () => {
      try {
        const response = await fetch('/api/auth/session')
        const data = await response.json()
        setUser(data.user)
      } catch (error) {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    loadSession()
  }, [])

  const loginWithGitHub = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/auth/github', { method: 'POST' })
      const data = await response.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const loginWithGoogle = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/auth/google', { method: 'POST' })
      const data = await response.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    setUser(null)
    window.location.href = '/login'
  }

  return { user, loading, loginWithGitHub, loginWithGoogle, logout }
}