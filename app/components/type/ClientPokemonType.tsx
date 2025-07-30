'use client'

import AccentTypeBackground from '@/app/components/ui/AccentTypeBackground'
import { usePokemonsByTypeWithDetails } from '@/app/hooks/usePokemonsByTypeWithDetails'
import { usePokemonTypes } from '@/app/hooks/usePokemonTypes'
import { Box } from '@mui/material'
import { usePagination } from '@/app/hooks/usePagination'
import { useEffect, useState } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import Sidebar from './Sidebar'
import TableContent from './TableContent'

function ClientPokemonType() {
  const { data: types = [] } = usePokemonTypes()
  const { offset, limit } = usePagination()
  const [selectedTypeIndex, setSelectedTypeIndex] = useState(0)

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
    offset,
    limit
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
        pokemonLists={pokemonLists}
        selectedTypeName={selectedTypeName}
      />
    </Box>
  )
}

export default ClientPokemonType
