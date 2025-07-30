'use client'

import { Box, Grid, Paper, Skeleton } from '@mui/material'

export default function TableContentSkeleton({
  count = 9
}: {
  count?: number
}) {
  return (
    <Box sx={{ flex: 1, mt: 4, p: { xs: 1, md: 4 } }}>
      <Paper
        elevation={3}
        sx={{
          borderRadius: 4,
          p: 2,
          backgroundColor: {
            xs: 'rgba(255, 255, 255, 0.8)',
            md: 'transparent'
          },
          backdropFilter: 'blur(4px)',
          maxWidth: '100%',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '80vh'
        }}
      >
        <Box
          sx={{
            overflowX: 'auto',
            flex: 1
          }}
        >
          <Box
            sx={{
              minWidth: 600,
              overflowY: 'auto',
              pr: 1,
              flex: 1
            }}
          >
            <Grid container spacing={2}>
              {Array.from({ length: count }).map((_, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                  <Skeleton
                    variant="rounded"
                    animation="wave"
                    height={180}
                    sx={{ borderRadius: 2 }}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}
