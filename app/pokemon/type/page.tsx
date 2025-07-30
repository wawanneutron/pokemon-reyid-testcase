'use client'

import ClientPokemonType from '@/app/components/type/ClientPokemonType'
import Loading from '@/app/loading'
import { Suspense } from 'react'

export default function PokemonTypePage() {
  return (
    <Suspense fallback={<Loading />}>
      <ClientPokemonType />
    </Suspense>
  )
}
