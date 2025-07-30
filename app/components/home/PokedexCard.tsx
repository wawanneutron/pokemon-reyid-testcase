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
import { typeColors } from '@/app/types/color'
import { PokedexCardProps } from '@/app/types/home'

function PokedexCard({
  id,
  name,
  weight,
  height,
  types,
  abilities,
  imageUrl,
  onSelect
}: PokedexCardProps) {
  return (
    <Card
      sx={{
        borderRadius: 4,
        backgroundColor: 'white',
        p: 1,
        boxShadow: 3
      }}
    >
      <CardActionArea
        onClick={() =>
          onSelect?.({ id, name, weight, height, types, abilities, imageUrl })
        }
      >
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
  )
}

export default PokedexCard
