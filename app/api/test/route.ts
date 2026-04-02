import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ 
    message: 'API is working!', 
    timestamp: Date.now(),
    status: 'success'
  })
}

export async function POST() {
  return NextResponse.json({ 
    message: 'POST request received', 
    timestamp: Date.now(),
    status: 'success'
  })
}