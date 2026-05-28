import { NextResponse, NextRequest } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json()
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { 
        data: { name },
        emailRedirectTo: 'https://adso-interview.vercel.app/login'
      }
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    if (!data.user) {
      return NextResponse.json({ error: 'Error al crear usuario' }, { status: 500 })
    }

    // Crear sesión automática después del registro
    const sessionData = {
      userId: data.user.id,
      email: data.user.email,
      name: name || '',
      expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    }
    const sessionCookie = Buffer.from(JSON.stringify(sessionData)).toString('base64')
    const response = NextResponse.json({ success: true, user: data.user })
    response.cookies.set('session', sessionCookie, { httpOnly: true, path: '/', maxAge: 7 * 24 * 60 * 60 })
    return response
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
