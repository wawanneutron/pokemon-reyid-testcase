'use client'

import AccentTypeBackground from '@/app/components/ui/AccentTypeBackground'
import { usePokemonsByTypeWithDetails } from '@/app/hooks/usePokemonsByTypeWithDetails'
import { usePokemonTypes } from '@/app/hooks/usePokemonTypes'
import { typeColors } from '@/app/types'
import {
  Box,
  Typography,
  Stack,
  Chip,
  List,
  ListItemButton,
  ListItemText,
  Paper
} from '@mui/material'
import { usePagination } from '@/app/hooks/usePagination'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

function ClientPokemonType() {
  const { data: types = [] } = usePokemonTypes()
  const { offset, limit } = usePagination()

  const [selectedTypeIndex, setSelectedTypeIndex] = useState(0)

  const searchParams = useSearchParams()
  const typeName = searchParams.get('name') ?? 'normal'

  useEffect(() => {
    if (types.length === 0) return

    if (typeName) {
      const index = types.findIndex(
        (t: { name: string }) => t.name === typeName
      )
      setSelectedTypeIndex(index !== -1 ? index : 0)
    } else {
      setSelectedTypeIndex(0)
    }
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
        minHeight: '100vh',
        position: 'relative',
        bgcolor: '#f9fafb',
        overflow: 'hidden'
      }}
    >
      {/* background */}
      <AccentTypeBackground />

      {/* Sidebar */}
      <Box
        sx={{
          width: 240,
          p: 4,
          zIndex: 1,
          overflowY: 'auto',
          maxHeight: '60vh'
        }}
      >
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Pokemon Type
        </Typography>
        <List dense disablePadding>
          {types.map((type: { name: string }, idx: number) => (
            <ListItemButton
              key={type.name}
              selected={selectedTypeIndex === idx}
              onClick={() => handleSelectType(idx)}
              sx={{ borderRadius: 1 }}
            >
              <ListItemText primary={type.name} />
            </ListItemButton>
          ))}
        </List>
      </Box>

      {/* Content */}
      <Box sx={{ flexGrow: 1, p: 4, zIndex: 1 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Pokemon with Type ({selectedTypeName})
        </Typography>

        <Paper
          elevation={3}
          sx={{
            borderRadius: 4,
            p: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(4px)',
            maxWidth: 1270,
            width: '100%'
          }}
        >
          <Stack spacing={2}>
            {pokemonLists?.data.length === 0 ? (
              <Typography
                variant="body1"
                color="text.secondary"
                textAlign="center"
              >
                No Pokémon found for this type.
              </Typography>
            ) : (
              pokemonLists?.data.map((poke, idx) => (
                <Box
                  key={idx}
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: '80px 1fr 2fr 2fr',
                    alignItems: 'center',
                    gap: 2,
                    p: 1,
                    borderBottom: '1px solid #eee'
                  }}
                >
                  <Box
                    sx={{
                      width: 100,
                      height: 100,
                      backgroundColor: '#ccc',
                      borderRadius: 2,
                      fontSize: 10,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center'
                    }}
                  >
                    {poke.image ? (
                      <Image
                        src={poke.image}
                        alt={poke.name}
                        width={100}
                        height={100}
                      />
                    ) : (
                      <Typography variant="caption">
                        Other Pokemon Sprites
                      </Typography>
                    )}
                  </Box>

                  <Typography variant="body2" fontWeight="bold" sx={{ pl: 12 }}>
                    #{poke.id}
                  </Typography>
                  <Typography variant="body1" fontWeight="bold" sx={{ pl: 12 }}>
                    {poke.name}
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    {poke.types.map((type, tIdx) => (
                      <Chip
                        key={tIdx}
                        label={type}
                        sx={{
                          bgcolor: typeColors[type],
                          color: '#fff',
                          fontWeight: 'bold',
                          padding: '4px 10px'
                        }}
                      />
                    ))}
                  </Stack>
                </Box>
              ))
            )}
          </Stack>
        </Paper>
        {/* <Box mt={6} display="flex" justifyContent="center">
          <Pagination
            page={page}
            perPage={limit}
            total={data?.total || 0}
            onPageChange={(newPage) => setPage(newPage)}
            onPerPageChange={(newPerPage) => {
              setLimit(newPerPage)
              setPage(1) // reset ke halaman 1 saat ubah perPage
            }}
          />
        </Box> */}
      </Box>
    </Box>
  )
}

export default ClientPokemonType
