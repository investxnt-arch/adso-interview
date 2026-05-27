import { NextResponse, NextRequest } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 401 })
    }

    const sessionData = {
      userId: data.user.id,
      email: data.user.email,
      name: data.user.user_metadata?.name || '',
      expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    }
    const sessionCookie = Buffer.from(JSON.stringify(sessionData)).toString('base64')
    const response = NextResponse.json({ success: true })
    response.cookies.set('session', sessionCookie, { httpOnly: true, path: '/', maxAge: 7 * 24 * 60 * 60 })
    return response
  } catch (error) {
    return NextResponse.json({ error: 'Error en el servidor' }, { status: 500 })
  }
}
