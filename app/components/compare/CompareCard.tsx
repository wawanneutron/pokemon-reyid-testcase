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
import Link from 'next/link'
import { formatHeight, formatWeight } from '@/app/lib/utils'

interface CompareCardProps {
  pokemon: PokemonCompareItem
  onRemove: () => void
}

function CompareCard({ pokemon, onRemove }: CompareCardProps) {
  return (
    <Card
      sx={{
        position: 'relative',
        backgroundColor: 'transparent',
        backdropFilter: 'blur(6px)',
        borderRadius: 3,
        boxShadow: 3,
        zIndex: 2
      }}
    >
      <Link href={`/pokemon/${pokemon.name}`} passHref legacyBehavior>
        <CardActionArea
          sx={{
            px: 1,
            pt: 2,
            pb: 1
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
              color: 'error.main'
            }}
            size="small"
          >
            <CloseIcon />
          </IconButton>

          <Box display="flex" justifyContent="center">
            <Image
              src={pokemon.imageUrl}
              alt={pokemon.name}
              width={200}
              height={200}
            />
          </Box>

          <CardContent>
            <Typography variant="body2">#{pokemon.displayId}</Typography>
            <Typography variant="h5" sx={{ textTransform: 'capitalize' }}>
              {pokemon.name}
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
      </Link>
    </Card>
  )
}

export default CompareCard
