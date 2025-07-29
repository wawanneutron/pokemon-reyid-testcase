type StateItem = {
  name: string
  base: number
}

type Abilities = {
  name: string
  isHidden: boolean
}

export interface IPokemon {
  id: string
  name: string
  weight: number
  height: number
  types: string[]
  abilities: Abilities[]
  imageUrl?: string
}

export interface OtherImagesProps {
  images: string[]
}

export interface StateProps {
  stats: StateItem[]
}

export interface PokemonModalProps {
  open: boolean
  onClose: () => void
  pokemon: IPokemon
}

// evolutions
export type Evolution = {
  name: string
  imageUrl: string
}

export interface EvolutionChainLink {
  species: {
    name: string
    url: string
  }
  evolves_to: EvolutionChainLink[]
}

export interface EvolutionChainResponse {
  chain: EvolutionChainLink
}
