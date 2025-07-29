'use client'

import AccentTypeBackground from '@/app/components/ui/AccentTypeBackground'
import { usePokemonsByTypeWithDetails } from '@/app/hooks/usePokemonsByTypeWithDetails'
import { usePokemonTypes } from '@/app/hooks/usePokemonTypes'
import { typeColors } from '@/app/types'
import { Box, Typography, Stack, Chip, Paper } from '@mui/material'
import { usePagination } from '@/app/hooks/usePagination'
import { useState } from 'react'
import Image from 'next/image'
import Sidebar from '@/app/components/type/Sidebar'

export default function PokemonListPage() {
  const { data: types = [] } = usePokemonTypes()
  const { offset, limit } = usePagination()

  const [selectedTypeName, setSelectedTypeName] = useState<string>('normal')

  const { data: pokemonLists } = usePokemonsByTypeWithDetails(
    selectedTypeName,
    offset,
    limit
  )

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
      <Sidebar types={types} onTypeSelected={setSelectedTypeName} />

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
                p={6}
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
      </Box>
    </Box>
  )
}
