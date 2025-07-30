import { typeColors } from '@/app/types'
import { PokemonDetailed } from '@/app/types/detail'
import { Box, Typography, Stack, Chip, Paper } from '@mui/material'
import Image from 'next/image'

interface ContentProps {
  pokemonLists?: {
    data: PokemonDetailed[]
  }
  selectedTypeName: string
}

function TableContent({ pokemonLists, selectedTypeName }: ContentProps) {
  return (
    <Box sx={{ flexGrow: 1, p: 2, zIndex: 1 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Pokémon with Type{' '}
        <span style={{ color: 'orange', textTransform: 'capitalize' }}>
          {selectedTypeName}
        </span>
      </Typography>

      <Paper
        elevation={3}
        sx={{
          borderRadius: 4,
          p: 2,
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(4px)',
          maxWidth: '100%',
          overflowX: 'auto'
        }}
      >
        <Box sx={{ minWidth: 600 }}>
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
                    gridTemplateColumns: {
                      xs: '100px 1fr 1fr 1fr'
                    },
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
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
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
                      <Typography variant="caption" textAlign="center">
                        Other Pokémon Sprites
                      </Typography>
                    )}
                  </Box>

                  <Typography variant="body2" fontWeight="bold">
                    #{poke.id}
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {poke.name}
                  </Typography>
                  <Stack direction="row" gap={1} flexWrap="wrap">
                    {poke.types.map((type, tIdx) => (
                      <Chip
                        key={tIdx}
                        label={type}
                        sx={{
                          bgcolor: typeColors[type],
                          color: '#fff',
                          fontWeight: 'bold',
                          px: 1
                        }}
                      />
                    ))}
                  </Stack>
                </Box>
              ))
            )}
          </Stack>
        </Box>
      </Paper>
    </Box>
  )
}

export default TableContent
