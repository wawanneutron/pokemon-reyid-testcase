'use client'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import {
  Evolution,
  EvolutionChainLink,
  EvolutionChainResponse
} from '@/app/types/detail'

const getAllEvolutions = (
  chain: EvolutionChainLink,
  evolutions: Evolution[] = []
): Evolution[] => {
  const name = chain.species.name
  const idMatch = chain.species.url.match(/\/pokemon-species\/(\d+)\//)
  const id = idMatch ? idMatch[1] : '0'

  evolutions.push({
    name,
    imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
  })

  for (const next of chain.evolves_to) {
    getAllEvolutions(next, evolutions)
  }

  return evolutions
}

export const usePokemonEvolutions = (speciesUrl: string) => {
  return useQuery<Evolution[]>({
    queryKey: ['pokemonEvolutions', speciesUrl],
    queryFn: async () => {
      const speciesRes = await axios.get(speciesUrl)
      const evolutionChainUrl: string = speciesRes.data.evolution_chain.url

      const evoRes = await axios.get<EvolutionChainResponse>(evolutionChainUrl)
      const chain = evoRes.data.chain

      return getAllEvolutions(chain)
    },
    staleTime: 1000 * 60 * 5
  })
}
