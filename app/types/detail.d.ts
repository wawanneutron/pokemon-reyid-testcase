type StateItem = {
  name: string
  base: number
}

type Abilities = {
  name: string
  isHidden: boolean
}

interface PokemonStat {
  name: string
  base: number
}

interface PokemonAbility {
  name: string
  isHidden: boolean
}

interface PokemonSpecies {
  name: string
  url: string
}

export interface Pokemon {
  id: number
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
  pokemon: Pokemon
}

export type HeaderSummaryProps = {
  pokemon: Pokemon
}

export type EvolutionsProps = {
  speciesUrl: string
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

export interface PokemonDetail {
  id: number
  displayId: string
  name: string
  types: string[]
  imageUrl: string
  height: number
  weight: number
  stats: PokemonStat[]
  abilities: PokemonAbility[]
  species: PokemonSpecies
  otherImages: string[]
}

interface PokemonAbility {
  name: string
  isHidden: boolean
}

export interface PokemonListItem {
  id: number
  displayId: string
  name: string
  types: string[]
  weight: number
  height: number
  imageUrl: string
  abilities: PokemonAbility[]
  onSelect?: (pokemon: PokedexCardProps) => void
}

export interface UsePokemonListResult {
  pokemons: PokemonListItem[]
  total: number
}

export interface PokemonBasic {
  name: string
  url: string
}

export interface PokemonDetailed {
  id: number
  name: string
  types: string[]
  image: string
}

export interface PokemonTypeResponse {
  pokemon: {
    pokemon: PokemonBasic
    slot: number
  }[]
}
