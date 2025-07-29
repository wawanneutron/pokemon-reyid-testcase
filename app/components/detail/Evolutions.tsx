'use client'

import React from 'react'
import { Box, Stack, Typography, CircularProgress } from '@mui/material'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import { colorMap } from '@/app/types'
import Image from 'next/image'
import { usePokemonEvolutions } from '@/app/hooks/usePokemonEvolution'
import { useRouter } from 'next/navigation'

type EvolutionsProps = {
  speciesUrl: string
}

function Evolutions({ speciesUrl }: EvolutionsProps) {
  const { data, isLoading, isError } = usePokemonEvolutions(speciesUrl)

  const router = useRouter()

  const handleClick = (name: string) => {
    router.push(`/pokemon/${name}`)
  }

  if (isLoading) {
    return (
      <Box mt={6} textAlign="center">
        <CircularProgress />
      </Box>
    )
  }

  if (isError || !data?.length) {
    return null
  }

  return (
    <Box mt={6}>
      <Typography variant="h6" fontWeight="bold" mb={2} gutterBottom>
        Evolutions:
      </Typography>
      <Box sx={{ overflowX: 'auto', whiteSpace: 'nowrap', pb: 2 }}>
        <Stack direction="row" spacing={3} alignItems="center">
          {data.map((evo, index) => (
            <React.Fragment key={index}>
              <Box
                textAlign="center"
                sx={{ cursor: 'pointer' }}
                onClick={() => handleClick(evo.name)}
              >
                <Box
                  sx={{
                    width: 160,
                    height: 160,
                    borderRadius: '50%',
                    border: `12px solid ${colorMap[index % colorMap.length]}`,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden',
                    mb: 1,
                    mx: 'auto'
                  }}
                >
                  <Image
                    src={evo.imageUrl}
                    alt={evo.name}
                    width={100}
                    height={100}
                    style={{ objectFit: 'contain' }}
                  />
                </Box>
                <Typography
                  variant="body2"
                  fontWeight="bold"
                  textTransform="capitalize"
                >
                  {evo.name}
                </Typography>
              </Box>
              {index < data.length - 1 && (
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  px={2}
                  sx={{ position: 'relative', top: '-16px' }}
                >
                  <ArrowForwardRoundedIcon
                    sx={{ fontSize: '3rem', color: '#4b4b4b' }}
                  />
                </Box>
              )}
            </React.Fragment>
          ))}
        </Stack>
      </Box>
    </Box>
  )
}

export default Evolutions
