'use client'

import Image from 'next/image'
import {
  Card,
  CardContent,
  IconButton,
  Typography,
  Box,
  Stack,
  Chip
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { typeColors } from '@/app/types/color'
import { PokemonCompareItem } from '@/app/types/compare'

interface CompareCardProps {
  pokemon: PokemonCompareItem
  onRemove: () => void
}

function CompareCard({ pokemon, onRemove }: CompareCardProps) {
  return (
    <Card
      sx={{
        position: 'relative',
        borderRadius: 3,
        boxShadow: 3,
        px: 2,
        pt: 2,
        pb: 1
      }}
    >
      <IconButton
        onClick={onRemove}
        sx={{ position: 'absolute', top: 8, right: 8, color: 'error.main' }}
        size="small"
      >
        <CloseIcon />
      </IconButton>

      <Box display="flex" justifyContent="center" mb={1}>
        <Image
          src={pokemon.imageUrl}
          alt={pokemon.name}
          width={96}
          height={96}
        />
      </Box>

      <CardContent sx={{ p: 0 }}>
        <Typography variant="body2">#{pokemon.displayId}</Typography>
        <Typography variant="body2">Weight: {pokemon.weight}</Typography>
        <Typography variant="body2">Height: {pokemon.height}</Typography>

        <ul>
          <Typography variant="body1" fontWeight="bold">
            Abilities:{' '}
          </Typography>
          {pokemon.abilities.map((ability, index) => (
            <li key={index}>
              <Typography variant="body2">
                {ability.name} {ability.isHidden ? '(Hidden)' : ''}
              </Typography>
            </li>
          ))}
        </ul>

        <Stack direction="row" gap={1} flexWrap="wrap">
          {pokemon.types.map((type, tIdx) => (
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
      </CardContent>
    </Card>
  )
}

export default CompareCard
