'use client'

import { Box, Button, Typography } from '@mui/material'

type ErrorProps = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        bgcolor: 'rgba(255, 255, 255, 0.6)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backdropFilter: 'blur(4px)',
        textAlign: 'center',
        p: 2
      }}
    >
      <Typography variant="h3" mb={2} fontWeight="bold" color="error">
        Uppss...
      </Typography>
      <Typography variant="h4" fontWeight="bold" color="error">
        Something went wrong!
      </Typography>
      <Typography variant="h6" mt={1} mb={2}>
        🚨 {error.message || 'Unexpected error occurred'}
      </Typography>

      <Button variant="contained" color="primary" onClick={reset}>
        Try again
      </Button>
    </Box>
  )
}
