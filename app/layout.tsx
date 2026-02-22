import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { PlayerProvider } from '@/contexts/PlayerContext'
import GlobalPlayer from '@/components/GlobalPlayer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ADSOTUBE',
  description: 'Create, Share, Dominate',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PlayerProvider>
          {children}
          <GlobalPlayer />
        </PlayerProvider>
      </body>
    </html>
  )
}