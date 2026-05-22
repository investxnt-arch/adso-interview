// app/api/auth/google/route.ts
import { NextResponse, NextRequest } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')
  
  const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || ''
  const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || ''
  
  // Redirect to Google authorization
  if (!code) {
    if (!GOOGLE_CLIENT_ID) {
      return NextResponse.redirect('/login?error=google_not_configured')
    }
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.NEXTAUTH_URL + '/api/auth/google')}&response_type=code&scope=email%20profile`
    return NextResponse.redirect(googleAuthUrl)
  }
  
  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
    return NextResponse.redirect('/login?error=google_not_configured')
  }
  
  try {
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/google`,
      }),
    })
    const tokenData = await tokenResponse.json()
    
    if (tokenData.error) {
      return NextResponse.redirect('/login?error=google_auth_failed')
    }
    
    const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { 'Authorization': `Bearer ${tokenData.access_token}` },
    })
    const userData = await userResponse.json()
    
    const sessionToken = Buffer.from(JSON.stringify({
      userId: userData.id,
      email: userData.email,
      name: userData.name,
      expires: Date.now() + 7 * 24 * 60 * 60 * 1000
    })).toString('base64')
    
    const cookieStore = await cookies()
    cookieStore.set('session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    })
    
    return NextResponse.redirect(new URL('/dashboard', request.url))
  } catch (error) {
    return NextResponse.redirect('/login?error=server_error')
  }
}