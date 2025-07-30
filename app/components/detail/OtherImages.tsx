import { OtherImagesProps } from '@/app/types/detail'
import { Box, Grid, Typography } from '@mui/material'
import Image from 'next/image'

function OtherImages({ images }: OtherImagesProps) {
  return (
    <Box mt={6}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Other Images :
      </Typography>
      <Grid container spacing={2}>
        {images.map((src, index) => (
          <Grid size={{ xs: 6, md: 4, lg: 2 }} key={index}>
            <Box
              sx={{
                position: 'relative',
                width: 'auto',
                height: 200,
                bgcolor: '#F2F2F2',
                borderRadius: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: 10,
                color: '#fff'
              }}
            >
              {src ? (
                <Image src={src} alt={`pokemon image ${index}`} fill />
              ) : (
                <Typography variant="caption">
                  Pokemon Picture Placeholder
                </Typography>
              )}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default OtherImages
