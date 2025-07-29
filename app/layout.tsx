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
  title: 'Pokémon Landing Page',
  description:
    'Explore the amazing world of Pokémon. Find your favorite Pokémon types, stats, and more!'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={poppins.className} style={{ margin: 0 }}>
        <Navbar />
        <ThemeRegistry>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </ThemeRegistry>
      </body>
    </html>
  )
}
