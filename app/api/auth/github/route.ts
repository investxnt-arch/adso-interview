import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')

  if (!code) {
    if (!process.env.GITHUB_CLIENT_ID) {
      return NextResponse.redirect(new URL('/login?error=github_not_configured', request.url))
    }
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=user:email`
    return NextResponse.redirect(githubAuthUrl)
  }

  const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    }),
  })
  const tokenData = await tokenResponse.json()
  const accessToken = tokenData.access_token

  if (!accessToken) {
    return NextResponse.redirect(new URL('/login?error=github_auth_failed', request.url))
  }

  const userResponse = await fetch('https://api.github.com/user', {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  const userData = await userResponse.json()

  const sessionData = {
    userId: userData.id.toString(),
    email: userData.email || `${userData.login}@github.com`,
    name: userData.name || userData.login,
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
  }
  const sessionCookie = Buffer.from(JSON.stringify(sessionData)).toString('base64')
  const response = NextResponse.redirect(new URL('/dashboard', request.url))
  response.cookies.set('session', sessionCookie, { httpOnly: true, path: '/', maxAge: 7 * 24 * 60 * 60 })
  return response
}
