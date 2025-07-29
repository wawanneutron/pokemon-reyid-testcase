import { Box } from '@mui/material'
import accentleft from '@/public/round-type-left.png'
import accentright from '@/public/round-type-right.png'
import Image from 'next/image'

function AccentTypeBackground() {
  return (
    <>
      {/* Background Left */}
      <Box
        sx={{
          position: 'absolute',
          left: -200,
          bottom: 20,
          width: 600,
          height: 410,
          zIndex: 0
        }}
      >
        <Image
          src={accentleft}
          alt="Round blue acccent"
          layout="fill"
          objectFit="contain"
          priority
        />
      </Box>

      {/* Background Right */}
      <Box
        sx={{
          position: 'absolute',
          right: -200,
          top: 100,
          width: 700,
          height: 610,
          zIndex: 0
        }}
      >
        <Image
          src={accentright}
          alt="Round blue acccent"
          layout="fill"
          objectFit="contain"
          priority
        />
      </Box>
    </>
  )
}

export default AccentTypeBackground
