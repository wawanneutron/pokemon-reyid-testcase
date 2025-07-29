'use client'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

type PokemonBasic = {
  name: string
  url: string
}

type PokemonDetailed = {
  id: number
  name: string
  types: string[]
  image: string
}

const getPokemonDetails = async (url: string): Promise<PokemonDetailed> => {
  const res = await axios.get(url)
  const data = res.data

  return {
    id: data.id,
    name: data.name,
    image: data.sprites.other['official-artwork'].front_default,
    types: data.types.map((t: any) => t.type.name)
  }
}

export const usePokemonsByTypeWithDetails = (
  type: string,
  offset: number,
  limit: number
) => {
  return useQuery({
    queryKey: ['pokemons-by-type', type, offset, limit],
    queryFn: async () => {
      const res = await axios.get(`https://pokeapi.co/api/v2/type/${type}`)
      const allPokemon: PokemonBasic[] = res.data.pokemon.map(
        (p: any) => p.pokemon
      )

      const paginated = allPokemon.slice(offset, offset + limit)

      const detailed = await Promise.all(
        paginated.map((p) => getPokemonDetails(p.url))
      )

      return {
        total: allPokemon.length,
        data: detailed
      }
    },
    staleTime: 1000 * 60 * 5
  })
}
