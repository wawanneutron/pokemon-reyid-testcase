import { colorMap } from '@/app/types'
import { StateProps } from '@/app/types/detail'
import { Box, Grid, Typography } from '@mui/material'

function Stats({ stats }: StateProps) {
  return (
    <Box mt={6}>
      <Typography variant="h6" fontWeight="bold" mb={2} gutterBottom>
        Stats :
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {stats.map((stat, index) => (
          <Grid size={{ xs: 6, md: 4, lg: 2 }} key={index} textAlign="center">
            <Box
              sx={{
                width: 170,
                height: 170,
                borderRadius: '50%',
                flexDirection: 'column',
                border: `24px solid ${colorMap[index % colorMap.length]}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 38,
                fontWeight: 'bold',
                color: colorMap[index % colorMap.length],
                mb: 1
              }}
            >
              {stat.base}
              <Typography
                variant="caption"
                fontWeight="bold"
                sx={{ color: 'black' }}
              >
                {stat.name}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default Stats
