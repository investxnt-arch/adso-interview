// app/api/auth/github/route.ts
import { NextResponse, NextRequest } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')
  
  const GITHUB_ID = process.env.GITHUB_ID || ''
  const GITHUB_SECRET = process.env.GITHUB_SECRET || ''
  
  if (!code) {
    if (!GITHUB_ID) {
      return NextResponse.redirect('/login?error=github_not_configured')
    }
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_ID}&scope=user:email`
    return NextResponse.redirect(githubAuthUrl)
  }
  
  if (!GITHUB_ID || !GITHUB_SECRET) {
    return NextResponse.redirect('/login?error=github_not_configured')
  }
  
  try {
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: GITHUB_ID,
        client_secret: GITHUB_SECRET,
        code: code,
      }),
    })
    const tokenData = await tokenResponse.json()
    
    if (tokenData.error) {
      return NextResponse.redirect('/login?error=github_auth_failed')
    }
    
    const userResponse = await fetch('https://api.github.com/user', {
      headers: { 'Authorization': `Bearer ${tokenData.access_token}` },
    })
    const userData = await userResponse.json()
    
    const sessionToken = Buffer.from(JSON.stringify({
      userId: userData.id.toString(),
      email: userData.email || `${userData.login}@github.com`,
      name: userData.name || userData.login,
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