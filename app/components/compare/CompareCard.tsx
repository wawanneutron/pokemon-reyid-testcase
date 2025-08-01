'use client'

import Image from 'next/image'
import {
  Card,
  CardContent,
  IconButton,
  Typography,
  Box,
  Stack,
  Chip,
  CardActionArea
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { typeColors } from '@/app/types/color'
import { PokemonCompareItem } from '@/app/types/compare'
import { convertSlugToText, formatHeight, formatWeight } from '@/app/lib/utils'

interface CompareCardProps {
  pokemon: PokemonCompareItem
  onRemove: () => void
}

const onDetailPokemon = (pokemonId: number) => {
  if (pokemonId) window.location.href = `/pokemon/${pokemonId}`
}

function CompareCard({ pokemon, onRemove }: CompareCardProps) {
  return (
    <Card
      onClick={() => onDetailPokemon(pokemon.id)}
      sx={{
        position: 'relative',
        backgroundColor: 'transparent',
        backdropFilter: 'blur(6px)',
        borderRadius: 3,
        boxShadow: 3,
        zIndex: 2
      }}
    >
      <CardActionArea
        sx={{
          px: 1,
          width: '300px',
          height: '500px'
        }}
      >
        <IconButton
          onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
            onRemove()
          }}
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            color: 'error.main',
            zIndex: 2
          }}
          size="small"
        >
          <CloseIcon />
        </IconButton>

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          borderRadius={2}
          height={150}
          sx={{
            backgroundColor: pokemon.imageUrl ? 'transparent' : '#f2f2f26e',
            backdropFilter: 'blur(6px)'
          }}
        >
          {pokemon.imageUrl ? (
            <Image
              src={pokemon.imageUrl}
              alt={pokemon.name}
              width={200}
              height={200}
            />
          ) : (
            <Typography variant="caption">
              Pokemon Picture Placeholder
            </Typography>
          )}
        </Box>

        <CardContent>
          <Typography variant="body2">#{pokemon.displayId}</Typography>
          <Typography
            variant="h5"
            sx={{ textTransform: 'capitalize', marginBottom: '10px' }}
          >
            {convertSlugToText(pokemon.name)}
          </Typography>
          <Typography variant="body2">
            Weight: {formatWeight(pokemon.weight)}
          </Typography>
          <Typography variant="body2">
            Height: {formatHeight(pokemon.height)}
          </Typography>

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
      </CardActionArea>
    </Card>
  )
}

export default CompareCard
