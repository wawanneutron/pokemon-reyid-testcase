import { Box, Button, Typography } from '@mui/material'

interface ErrorCardProps {
  refetch: () => void
}

function ErrorCard({ refetch }: ErrorCardProps) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      py={10}
    >
      <Typography variant="h5" color="error" fontWeight="bold" gutterBottom>
        Failed to load Pokémon
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={2}>
        Please check your connection or try again later.
      </Typography>
      <Button variant="contained" color="primary" onClick={() => refetch()}>
        Try again
      </Button>
    </Box>
  )
}

export default ErrorCard
