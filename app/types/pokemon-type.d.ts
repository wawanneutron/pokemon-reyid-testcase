import { PokemonDetailed } from './detail'

export interface TableContantProps {
  pokemonLists: PokemonDetailed[] | undefined
  selectedTypeName: string
  colorByType: string
  page: number
  perPage: number
  total: number
  onPageChange: (newPage: number) => void
  onPerPageChange: (newPerPage: number) => void
}

export interface SidebarProps {
  types: { name: string }[]
  selectedTypeIndex: number
  handleSelectType: (index: number) => void
}
