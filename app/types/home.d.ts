type Abilities = {
  name: string
  isHidden: boolean
}

export interface PokedexCardProps {
  id: string
  name: string
  weight: number
  height: number
  types: string[]
  abilities: Abilities[]
  imageUrl?: string
  onSelect?: (pokemon: PokedexCardProps) => void
}

export interface HeroProps {
  onScrollToPokedex: () => void
}
