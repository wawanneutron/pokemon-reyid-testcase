'use client'

import ClientPokemonType from '@/app/components/type/ClientPokemonType'
import { Suspense } from 'react'

export default function PokemonTypePage() {
  return (
    <Suspense fallback={<div>Loading Pokémon type...</div>}>
      <ClientPokemonType />
    </Suspense>
  )
}
