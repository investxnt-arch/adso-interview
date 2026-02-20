'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const formData = new FormData(e.currentTarget)
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: formData.get('email'),
        password: formData.get('password'),
        name: formData.get('name'),
      }),
    })
    const data = await res.json()
    if (!res.ok) {
      setError(data.error || 'Error al Sign Up')
      setLoading(false)
      return
    }
    router.push('/login')
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='bg-white p-8 rounded-xl shadow-md w-full max-w-md'>
        <h1 className='text-2xl font-bold text-center mb-6'>Create Account</h1>
        {error && <p className='text-red-500 text-sm mb-4 text-center'>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block text-sm font-medium mb-1'>Name</label>
            <input name='name' type='text' className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder='Tu Name' />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium mb-1'>Email</label>
            <input name='email' type='email' required className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder='tu@email.com' />
          </div>
          <div className='mb-6'>
            <label className='block text-sm font-medium mb-1'>Password</label>
            <input name='password' type='password' required className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder='••••••••' />
          </div>
          <button type='submit' disabled={loading} className='w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50'>{loading ? 'Creating account...' : 'Sign Up'}</button>
        </form>
        <p className='text-center text-sm mt-4 text-gray-600'>Already have an account? <a href='/login' className='text-blue-600 hover:underline'>Sign In</a></p>
      </div>
    </div>
  )
}
