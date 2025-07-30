import { typeColors } from '@/app/types'
import { PokemonDetailed } from '@/app/types/detail'
import { Box, Typography, Stack, Chip, Paper } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import Pagination from '../ui/Pagination'

interface TableContantProps {
  pokemonLists: PokemonDetailed[] | undefined
  selectedTypeName: string
  colorByType: string
  page: number
  perPage: number
  total: number
  onPageChange: (newPage: number) => void
  onPerPageChange: (newPerPage: number) => void
}

function TableContent({
  pokemonLists,
  selectedTypeName,
  colorByType,
  page,
  perPage,
  total,
  onPageChange,
  onPerPageChange
}: TableContantProps) {
  return (
    <Box sx={{ flexGrow: 1, p: { xs: 1, md: 4 }, zIndex: 1 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Pokémon with Type{' '}
        <span
          style={{
            color: typeColors[colorByType],
            textTransform: 'capitalize'
          }}
        >
          {selectedTypeName}
        </span>
      </Typography>

      <Paper
        elevation={3}
        sx={{
          borderRadius: 4,
          p: 2,
          backgroundColor: {
            xs: 'rgba(255, 255, 255, 0.8)',
            md: 'transparent'
          },
          backdropFilter: 'blur(4px)',
          maxWidth: '100%',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '80vh'
        }}
      >
        <Box
          sx={{
            overflowX: 'auto',
            flex: 1
          }}
        >
          <Box
            sx={{
              minWidth: 600,
              overflowY: 'auto',
              pr: 1,
              flex: 1
            }}
          >
            <Stack spacing={2}>
              {pokemonLists?.length === 0 ? (
                <Typography
                  variant="body1"
                  color="text.secondary"
                  textAlign="center"
                >
                  No Pokémon found for this type.
                </Typography>
              ) : (
                pokemonLists?.map((poke, idx) => (
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
                        <Link href={`/pokemon/type?name=${type}`} key={tIdx}>
                          <Chip
                            label={type}
                            sx={{
                              bgcolor: typeColors[type],
                              color: '#fff',
                              fontWeight: 'bold',
                              px: 1
                            }}
                          />
                        </Link>
                      ))}
                    </Stack>
                  </Box>
                ))
              )}
            </Stack>
          </Box>
        </Box>

        {/* pagination */}
        <Box mt={6} display="flex" justifyContent="center">
          <Pagination
            page={page}
            perPage={perPage}
            total={total}
            onPageChange={onPageChange}
            onPerPageChange={onPerPageChange}
            colorByType={colorByType}
          />
        </Box>
      </Paper>
    </Box>
  )
}

export default TableContent
