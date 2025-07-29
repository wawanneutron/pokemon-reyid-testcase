import { Box } from '@mui/material'
import Image from 'next/image'
import accentTopLeft from '@/public/accent-top-left.png'
import accentBottomRight from '@/public/accent-bottom-right.png'

function BackgroundAccent() {
  return (
    <>
      {/* Top Left Accent */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 500,
          height: 410,
          zIndex: 0
        }}
      >
        <Image
          src={accentTopLeft}
          alt="Round yellow acccent"
          layout="fill"
          objectFit="contain"
          priority
        />
      </Box>

      {/* Bottom Right Accent */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: 500,
          height: 410,
          zIndex: 0
        }}
      >
        <Image
          src={accentBottomRight}
          alt="Bottom Right Accent"
          layout="fill"
          objectFit="contain"
          priority
        />
      </Box>
    </>
  )
}

export default BackgroundAccent
