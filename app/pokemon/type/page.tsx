import ClientPokemonType from '@/app/components/type/ClientPokemonType'
import Loading from '@/app/loading'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Pokémon Type Explorer'
}

export default function PokemonTypePage() {
  return (
    <Suspense fallback={<Loading />}>
      <ClientPokemonType />
    </Suspense>
  )
}
