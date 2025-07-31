type Abilities = {
  name: string
  isHidden: boolean
}

export interface PokedexCardProps {
  id: number
  displayId: string
  name: string
  weight: number
  height: number
  types: string[]
  abilities: Abilities[]
  imageUrl: string
  onSelect?: (pokemon: PokedexCardProps) => void
}

export interface HeroProps {
  onScrollToPokedex: () => void
}
