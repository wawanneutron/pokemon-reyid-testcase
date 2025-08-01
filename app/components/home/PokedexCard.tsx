'use client'

import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  CardActionArea
} from '@mui/material'
import { typeColors } from '@/app/types/color'
import { PokedexCardProps } from '@/app/types/home'
import Image from 'next/image'
import { convertSlugToText } from '@/app/lib/utils'

function PokedexCard({
  id,
  displayId,
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
        sx={{
          height: 300,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
        onClick={() =>
          onSelect?.({
            id,
            displayId,
            name,
            weight,
            height,
            types,
            abilities,
            imageUrl
          })
        }
      >
        <Box
          sx={{
            bgcolor: '#F2F2F2',
            width: '100%',
            height: 150,
            borderTopLeftRadius: '12px',
            borderTopRightRadius: '12px',
            mb: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {imageUrl ? (
            <Box
              sx={{
                width: 200,
                height: 200,
                marginTop: 5
              }}
            >
              <Image
                src={imageUrl}
                alt={name}
                width={200}
                height={200}
                loading="lazy"
              />
            </Box>
          ) : (
            <Typography variant="caption">
              Pokemon Picture Placeholder
            </Typography>
          )}
        </Box>

        <CardContent sx={{ pt: 1, width: '100%' }}>
          <Typography variant="caption" color="text.secondary">
            #{displayId}
          </Typography>
          <Typography
            variant="h6"
            fontWeight="bold"
            textTransform="capitalize"
            gutterBottom
          >
            {convertSlugToText(name)}
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
