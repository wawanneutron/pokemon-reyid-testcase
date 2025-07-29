'use client'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { UsePokemonListResult, PokemonListItem } from '@/app/types/detail'

export const usePokemonList = (page: number, limit: number) => {
  const offset = (page - 1) * limit

  return useQuery<UsePokemonListResult>({
    queryKey: ['pokemonList', page, limit],
    queryFn: async () => {
      const res = await axios.get('https://pokeapi.co/api/v2/pokemon', {
        params: { offset, limit }
      })

      const basicList = res.data.results as { name: string; url: string }[]
      const total = res.data.count

      const detailedList: PokemonListItem[] = await Promise.all(
        basicList.map(async (poke) => {
          const detail = await axios.get(poke.url)
          const data = detail.data

          return {
            id: data.id.toString().padStart(3, '0'),
            name: data.name,
            types: data.types.map(
              (t: { type: { name: string } }) => t.type.name
            ),
            weight: data.weight,
            height: data.height,
            imageUrl: data.sprites.other['official-artwork'].front_default,
            abilities: data.abilities.map(
              (item: { ability: { name: string }; is_hidden: boolean }) => ({
                name: item.ability.name,
                isHidden: item.is_hidden
              })
            )
          }
        })
      )

      return {
        pokemons: detailedList,
        total
      }
    }
  })
}
