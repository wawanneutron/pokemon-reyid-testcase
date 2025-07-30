'use client'

import { Box, Grid, Skeleton } from '@mui/material'

export default function TableContentSkeleton({
  count = 9
}: {
  count?: number
}) {
  return (
    <Box sx={{ flex: 1, p: 3 }}>
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
  )
}
