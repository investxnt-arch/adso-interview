// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

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
    <html lang="es">
      <head>
        {/* ⬇️ PEGA EL CÓDIGO DE CLARITY AQUÍ, DENTRO DEL <head> ⬇️ */}
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "TU_CODIGO_AQUI");
            `,
          }}
        />
        {/* ⬆️ HASTA AQUÍ EL CÓDIGO ⬆️ */}
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}