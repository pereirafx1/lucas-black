import type { Metadata } from 'next'
import { Playfair_Display, Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Lucas Black | Barbearia de Luxo em Setúbal',
  description:
    'Experiência premium de barbearia em Setúbal. Cortes clássicos, tratamento de barba e serviços exclusivos. Marque a sua sessão online.',
  keywords: 'barbearia, Setúbal, Lucas Black, corte cabelo, barba, luxo, marcações',
  openGraph: {
    title: 'Lucas Black | Barbearia de Luxo em Setúbal',
    description: 'Experiência premium de barbearia em Setúbal.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt"
      className={`${playfair.variable} ${cormorant.variable} ${inter.variable}`}
    >
      <body className="bg-ink text-cream font-inter antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
