import ClientComparePokemon from '@/app/components/compare/ClientComparePokemon'
import { Container } from '@mui/material'

export default function ComparePage() {
  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{ position: 'relative', overflow: 'hidden' }}
    >
      <ClientComparePokemon />
    </Container>
  )
}
