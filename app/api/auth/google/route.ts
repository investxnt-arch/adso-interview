import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')

  if (!code) {
    if (!process.env.GOOGLE_CLIENT_ID) {
      return NextResponse.redirect(new URL('/login?error=google_not_configured', request.url))
    }
    const redirectUri = `${process.env.NEXTAUTH_URL}/api/auth/google`
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=email%20profile`
    return NextResponse.redirect(googleAuthUrl)
  }

  const redirectUri = `${process.env.NEXTAUTH_URL}/api/auth/google`
  const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
    }),
  })
  const tokenData = await tokenResponse.json()
  const accessToken = tokenData.access_token

  if (!accessToken) {
    return NextResponse.redirect(new URL('/login?error=google_auth_failed', request.url))
  }

  const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  const userData = await userResponse.json()

  const sessionData = {
    userId: userData.id,
    email: userData.email,
    name: userData.name,
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
  }
  const sessionCookie = Buffer.from(JSON.stringify(sessionData)).toString('base64')
  const response = NextResponse.redirect(new URL('/dashboard', request.url))
  response.cookies.set('session', sessionCookie, { httpOnly: true, path: '/', maxAge: 7 * 24 * 60 * 60 })
  return response
}
