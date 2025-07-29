'use client'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const usePokemonTypes = () => {
  return useQuery({
    queryKey: ['pokemonTypes'],
    queryFn: async () => {
      const res = await axios.get('https://pokeapi.co/api/v2/type')
      const filteredTypes = res.data.results.filter(
        (type: { name: string }) => type.name !== 'unknown'
      )
      return filteredTypes
    },
    staleTime: 1000 * 60 * 10
  })
}
