'use client'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import {
  PokemonBasic,
  PokemonDetailed,
  PokemonTypeResponse
} from '@/app/types/detail'

const getPokemonDetails = async (url: string): Promise<PokemonDetailed> => {
  const res = await axios.get(url)
  const data = res.data

  return {
    id: data.id,
    name: data.name,
    image: data.sprites.other['official-artwork'].front_default,
    types: data.types.map(
      (t: { slot: number; type: { name: string } }) => t.type.name
    )
  }
}

export const usePokemonsByTypeWithDetails = (
  type: string,
  page: number,
  perPage: number
) => {
  const offset = (page - 1) * perPage

  return useQuery({
    queryKey: ['pokemons-by-type', type, page, perPage],
    queryFn: async () => {
      const res = await axios.get<PokemonTypeResponse>(
        `https://pokeapi.co/api/v2/type/${type}`
      )

      const allPokemon: PokemonBasic[] = res.data.pokemon.map((p) => p.pokemon)

      const paginated = allPokemon.slice(offset, offset + perPage)

      const detailed = await Promise.all(
        paginated.map((p) => getPokemonDetails(p.url))
      )

      return {
        total: allPokemon.length,
        pokemons: detailed
      }
    },
    staleTime: 1000 * 60 * 5
  })
}
