with open('types/next-auth.d.ts', 'w', encoding='utf-8') as f:
    f.write("""import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      role: string
    } & DefaultSession['user']
  }
}
""")
print('Done')
