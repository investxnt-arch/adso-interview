import NextAuth from "next-auth"
import { authConfig } from "./auth.config"

// Verificar que authConfig tiene los providers
console.log('Auth providers:', authConfig.providers?.map(p => p.id))

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)

// Exportar también los handlers directamente
export const GET = handlers.GET
export const POST = handlers.POST