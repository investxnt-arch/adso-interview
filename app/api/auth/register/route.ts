import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { hashPassword } from '@/lib/password'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json()
    if (!email || !password) {
      return NextResponse.json({ error: 'Email y contrasena son requeridos' }, { status: 400 })
    }
    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return NextResponse.json({ error: 'Este email ya esta registrado' }, { status: 409 })
    }
    const hashedPassword = await hashPassword(password)
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name: name || null, role: 'USER' },
      select: { id: true, email: true, name: true, role: true, createdAt: true },
    })
    return NextResponse.json({ message: 'Usuario creado exitosamente', user }, { status: 201 })
  } catch (error) {
    console.error('Error en registro:', error)
    return NextResponse.json({ error: 'Error al crear usuario' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
