import React from 'react'
import { Box, Button, Container, Typography } from '@mui/material'
import Image from 'next/image'

import pokemonHero from '@/public/pokemon-hero.png'
import { HeroProps } from '@/app/types/home'

function Hero({ onScrollToPokedex }: HeroProps) {
  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          backgroundColor: '#fff',
          minHeight: '91vh',
          display: 'flex',
          alignItems: 'center',
          px: { xs: 1, md: 12 }
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          {/* Text */}
          <Box sx={{ maxWidth: 500, mb: { xs: 4, md: 0 } }}>
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              All the Pokémon data you&apos;ll ever need in one place!
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={2}>
              Thousands of data compiled into one place
            </Typography>
            <Button onClick={onScrollToPokedex} variant="contained">
              Check PokèDex
            </Button>
          </Box>

          {/* Image */}
          <Box
            sx={{
              position: 'relative',
              width: { xs: '100%', md: 700 },
              height: { xs: 300, md: 700 }
            }}
          >
            <Image
              src={pokemonHero}
              quality={20}
              alt="Starter Pokémon"
              layout="fill"
              objectFit="contain"
              priority
            />
          </Box>
        </Container>
      </Box>
    </Container>
  )
}

export default Hero
