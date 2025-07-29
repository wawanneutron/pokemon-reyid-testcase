'use client'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const usePokemonList = (page: number, limit: number) => {
  const offset = (page - 1) * limit

  return useQuery({
    queryKey: ['pokemonList', page, limit],
    queryFn: async () => {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon`, {
        params: { offset, limit }
      })

      const basicList = res.data.results
      const total = res.data.count

      const detailedList = await Promise.all(
        basicList.map(async (poke: { name: string; url: string }) => {
          const detail = await axios.get(poke.url)
          const data = detail.data
          return {
            id: data.id.toString().padStart(3, '0'),
            name: data.name,
            types: data.types.map((t: any) => t.type.name),
            weight: data.weight,
            height: data.height,
            imageUrl: data.sprites.other['official-artwork'].front_default,
            abilities: data.abilities.map((item: any) => ({
              name: item.ability.name,
              isHidden: item.is_hidden
            }))
          }
        })
      )

      return {
        pokemons: detailedList,
        total // 🟡 Return total count untuk pagination
      }
    }
  })
}
