// app/api/auth/login/route.ts
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()
    
    if (email && password) {
      const sessionToken = Buffer.from(JSON.stringify({
        userId: 'demo_' + Date.now(),
        email: email,
        name: email.split('@')[0],
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000
      })).toString('base64')
      
      const cookieStore = await cookies()
      cookieStore.set('session', sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60,
        path: '/',
      })
      
      return NextResponse.json({ success: true, user: { email, name: email.split('@')[0] } })
    }
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}