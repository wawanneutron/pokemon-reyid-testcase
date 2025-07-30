'use client'

import { AccentTypeBackgroundProps } from '@/app/types'
import { typeColors } from '@/app/types/color'
import { Box } from '@mui/material'

function AccentTypeBackground({ colorByType }: AccentTypeBackgroundProps) {
  return (
    <>
      {/* Left Circle */}
      <Box
        sx={{
          position: 'absolute',
          left: -200,
          bottom: 50,
          width: 400,
          height: 400,
          zIndex: 0,
          background: `radial-gradient(circle, transparent 40%, ${typeColors[colorByType]} 41%)`,
          borderRadius: '50%',
          opacity: 0.5
        }}
      />

      {/* Right Circle */}
      <Box
        sx={{
          position: 'absolute',
          right: -200,
          top: 100,
          width: 500,
          height: 500,
          zIndex: 0,
          background: `radial-gradient(circle, transparent 40%, ${typeColors[colorByType]} 41%)`,
          borderRadius: '50%',
          opacity: 0.5
        }}
      />
    </>
  )
}

export default AccentTypeBackground
