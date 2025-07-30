'use client'

import { Box, Button, Typography } from '@mui/material'
import { usePathname, useRouter } from 'next/navigation'

export default function NotFound() {
  const router = useRouter()
  const pathname = usePathname()

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
      <Typography variant="h1" fontWeight="bold" color="error">
        404
      </Typography>
      <Typography variant="h5" mt={1} mb={2}>
        Page not found!
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        The requested URL <span style={{ color: '#ef4444' }}>{pathname}</span>{' '}
        was not found on this server.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => router.push('/')}
      >
        Back to Home
      </Button>
    </Box>
  )
}
