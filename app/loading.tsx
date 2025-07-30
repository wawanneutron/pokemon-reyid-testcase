'use client'

import { Box, keyframes, Typography } from '@mui/material'
import Image from 'next/image'
import pokemonBall from '@/public/pokeball.png'

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

export default function Loading() {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        bgcolor: 'rgba(255, 255, 255, 0.5)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backdropFilter: 'blur(4px)'
      }}
    >
      <Box
        sx={{
          width: 80,
          height: 80,
          animation: `${spin} 1s linear infinite`,
          borderRadius: '50%',
          overflow: 'hidden'
        }}
      >
        <Image
          src={pokemonBall}
          alt="Loading Poké Ball"
          width={80}
          height={80}
          style={{ objectFit: 'cover' }}
        />
      </Box>
      <Typography mt={2} fontWeight="bold" color="text.secondary">
        Loading Pokémon...
      </Typography>

      {/* Animasi spin */}
      <style jsx global>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </Box>
  )
}
