'use client'

import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  CardActionArea
} from '@mui/material'
import Image from 'next/image'
import { useState } from 'react'
import PokemonModal from '../detail/PokemonModal'
import { typeColors } from '@/app/types/index'

type Abilities = {
  name: string
  isHidden: boolean
}

interface PokedexCardProps {
  id: string
  name: string
  weight: number
  height: number
  types: string[]
  abilities: Abilities[]
  imageUrl?: string
}

export default function PokedexCard({
  id,
  name,
  weight,
  height,
  types,
  abilities,
  imageUrl
}: PokedexCardProps) {
  const [openModal, setOpenModal] = useState(false)

  const pokemonDetail = {
    id,
    name,
    weight,
    height,
    types,
    abilities,
    imageUrl
  }

  return (
    <>
      <Card
        sx={{
          borderRadius: 4,
          backgroundColor: 'white',
          p: 1,
          boxShadow: 3
        }}
      >
        <CardActionArea onClick={() => setOpenModal(true)}>
          <Box
            sx={{
              bgcolor: '#e5e7eb',
              height: 150,
              borderRadius: 2,
              mb: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {imageUrl ? (
              <Image src={imageUrl} alt={name} width={120} height={120} />
            ) : (
              <Typography variant="caption">
                Pokemon Picture Placeholder
              </Typography>
            )}
          </Box>

          <CardContent sx={{ pt: 0 }}>
            <Typography variant="caption" color="text.secondary">
              #{id}
            </Typography>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              {name}
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 1,
                mt: 1
              }}
            >
              {types.map((type) => (
                <Chip
                  key={type}
                  label={type}
                  size="small"
                  sx={{
                    color: 'white',
                    backgroundColor: typeColors[type] || 'gray',
                    fontWeight: 'bold'
                  }}
                />
              ))}
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>

      <PokemonModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        pokemon={pokemonDetail}
      />
    </>
  )
}
