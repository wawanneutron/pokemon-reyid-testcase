export interface PokemonCompareItem {
  id: number
  displayId: string
  name: string
  types: string[]
  imageUrl: string
  height: number
  weight: number
  abilities: PokemonAbility[]
}
