'use client'

import AccentTypeBackground from '@/app/components/ui/AccentTypeBackground'
import { usePokemonsByTypeWithDetails } from '@/app/hooks/usePokemonsByTypeWithDetails'
import { usePokemonTypes } from '@/app/hooks/usePokemonTypes'
import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import Sidebar from './Sidebar'
import TableContent from './TableContent'

function ClientPokemonType() {
  const { data: types = [] } = usePokemonTypes()
  const [selectedTypeIndex, setSelectedTypeIndex] = useState(0)

  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(9)

  const searchParams = useSearchParams()
  const typeName = searchParams.get('name') ?? 'normal'

  useEffect(() => {
    if (types.length === 0) return
    const index = types.findIndex((t: { name: string }) => t.name === typeName)
    setSelectedTypeIndex(index !== -1 ? index : 0)
  }, [typeName, types])

  const selectedTypeName = types[selectedTypeIndex]?.name || 'normal'
  const { data: pokemonLists } = usePokemonsByTypeWithDetails(
    selectedTypeName,
    page,
    perPage
  )

  const router = useRouter()
  const pathname = usePathname()

  const handleSelectType = (index: number) => {
    setSelectedTypeIndex(index)
    const selected = types[index]?.name
    if (selected) {
      router.push(`${pathname}?name=${selected}`)
    }
  }

  useEffect(() => {
    setPage(1)
  }, [selectedTypeName])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        minHeight: '100vh',
        position: 'relative',
        bgcolor: '#f9fafb',
        overflow: 'hidden'
      }}
    >
      <AccentTypeBackground />

      <Sidebar
        types={types}
        handleSelectType={handleSelectType}
        selectedTypeIndex={selectedTypeIndex}
      />

      <TableContent
        pokemonLists={pokemonLists?.pokemons}
        selectedTypeName={selectedTypeName}
        page={page}
        perPage={perPage}
        total={pokemonLists?.total || 0}
        onPageChange={(newPage) => setPage(newPage)}
        onPerPageChange={(newPerPage) => {
          setPerPage(newPerPage)
          setPage(1)
        }}
      />
    </Box>
  )
}

export default ClientPokemonType
