'use client'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const usePokemonDetail = (pokemonNameId: string | number) => {
  return useQuery({
    queryKey: ['pokemonDetail', pokemonNameId],
    queryFn: async () => {
      const res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonNameId}`
      )
      const data = res.data
      // mapping other images
      const otherSprites = data.sprites.other
      const otherImages: string[] = [
        otherSprites['official-artwork']?.front_default,
        otherSprites['official-artwork']?.front_shiny,
        otherSprites.dream_world?.front_default,
        otherSprites.home?.front_default,
        otherSprites.home?.front_shiny
      ].filter(Boolean)

      return {
        id: data.id.toString().padStart(3, '0'),
        name: data.name,
        types: data.types.map((t: any) => t.type.name),
        imageUrl: data.sprites.other['official-artwork'].front_default,
        height: data.height,
        weight: data.weight,
        stats: data.stats.map((stat: any) => ({
          name: stat.stat.name,
          base: stat.base_stat
        })),
        abilities: data.abilities.map((item: any) => ({
          name: item.ability.name,
          isHidden: item.is_hidden
        })),
        species: {
          name: data.species.name,
          url: data.species.url
        },
        otherImages
      }
    },
    staleTime: 1000 * 60 * 5 // cache 5 menit
  })
}
