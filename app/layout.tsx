import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import Navbar from '@/app/components/ui/Navbar'
import { ThemeRegistry } from '@/app/providers/ThemeRegistry'
import ReactQueryProvider from './providers/ReactQueryProvider'

const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
  display: 'swap'
})

export const metadata: Metadata = {
  title: {
    template: '%s | Pokémon App Catalog',
    default: 'Pokémon App Catalog'
  },
  description:
    'Explore the amazing world of Pokémon. Find your favorite Pokémon types, stats, and more!',
  keywords: ['Pokémon', 'Pokédex', 'Pokemon Types', 'Stats', 'Evolutions'],
  authors: [{ name: 'Wawan Setiawan' }],
  openGraph: {
    title: 'Pokémon Catalog',
    description:
      'A beautifully designed Pokémon-themed landing page with type and stat info.',
    url: 'https://pokemon-reyid.netlify.app',
    siteName: 'Pokémon App',
    images: [
      {
        url: 'https://pokemon-reyid.netlify.app/pokeball.png',
        width: 1200,
        height: 630,
        alt: 'Pokémon Preview'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  metadataBase: new URL('https://pokemon-reyid.netlify.app')
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Navbar />
        <ThemeRegistry>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </ThemeRegistry>
      </body>
    </html>
  )
}
