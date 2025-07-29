import { Metadata } from 'next'

import React from 'react'
import HomeSection from './components/home/HomeSection'

// Implement SEO
export const metadata: Metadata = {
  title: 'Pokémon Landing Page',
  description:
    'Explore the amazing world of Pokémon. Find your favorite Pokémon types, stats, and more!',
  keywords: ['Pokémon', 'Pokédex', 'Types', 'Stats', 'Landing Page'],
  authors: [{ name: 'Wawan Setiawan' }],
  openGraph: {
    title: 'Pokémon Landing Page',
    description:
      'A beautifully designed Pokémon-themed landing page with type and stat info.',
    url: 'https://your-site-url.com',
    siteName: 'Pokémon App',
    images: [
      {
        url: 'https://your-site-url.com/preview.png',
        width: 1200,
        height: 630,
        alt: 'Pokémon Preview'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  metadataBase: new URL('https://your-site-url.com')
}

export default function HomePage() {
  return <HomeSection />
}
