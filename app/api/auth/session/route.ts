// app/api/auth/session/route.ts
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET() {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('session')
  
  if (!sessionCookie) {
    return NextResponse.json({ user: null })
  }
  
  try {
    const sessionData = JSON.parse(Buffer.from(sessionCookie.value, 'base64').toString())
    if (sessionData.expires < Date.now()) {
      cookieStore.delete('session')
      return NextResponse.json({ user: null })
    }
    return NextResponse.json({ user: { id: sessionData.userId, email: sessionData.email, name: sessionData.name } })
  } catch {
    return NextResponse.json({ user: null })
  }
}