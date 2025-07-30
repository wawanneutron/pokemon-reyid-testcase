import {
  Box,
  Modal,
  Typography,
  Grid,
  Chip,
  Button,
  IconButton
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import Link from 'next/link'
import Image from 'next/image'
import { formatHeight, formatWeight } from '@/app/lib/utils'
import { PokemonModalProps } from '@/app/types/detail'
import { typeColors } from '@/app/types/color'

function PokemonModal({ open, onClose, pokemon }: PokemonModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
    >
      <Box
        sx={{
          bgcolor: 'white',
          borderRadius: 3,
          maxWidth: 800,
          width: '90%',
          px: 4,
          pb: 4,
          pt: 8,
          mx: 'auto',
          my: '10%',
          position: 'relative',
          boxShadow: 24
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', top: 16, right: 16 }}
        >
          <CloseIcon />
        </IconButton>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box
              sx={{
                bgcolor: '#e5e7eb',
                height: '100%',
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 14,
                color: 'gray',
                position: 'relative'
              }}
            >
              {pokemon.imageUrl ? (
                <Image
                  src={pokemon.imageUrl}
                  alt={pokemon.name}
                  width={300}
                  height={300}
                />
              ) : (
                <Typography variant="caption">
                  Pokemon Picture Placeholder
                </Typography>
              )}
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 8 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              {pokemon.name}
            </Typography>

            <Box display="flex" gap={8} mb={2}>
              <Typography>
                <strong>Weight :</strong> {formatWeight(pokemon.weight)}
              </Typography>
              <Typography>
                <strong>Height :</strong> {formatHeight(pokemon.height)}
              </Typography>
            </Box>

            <Box display="flex">
              <Typography fontWeight="bold">Abilities :</Typography>
              <ul>
                {pokemon.abilities.map((ability, idx) => (
                  <li key={idx}>
                    {ability.isHidden
                      ? `${ability.name} (hidden ability)`
                      : ability.name}
                  </li>
                ))}
              </ul>
            </Box>

            <Box display="flex" gap={2} mb={3}>
              <Typography fontWeight="bold" gutterBottom>
                Type :
              </Typography>
              {pokemon.types.map((type, idx) => (
                <Link href={`/pokemon/type?name=${type}`} key={idx}>
                  <Chip
                    label={type}
                    sx={{
                      bgcolor: typeColors[type],
                      color: '#fff',
                      fontWeight: 'bold',
                      padding: '4px 10px'
                    }}
                  />
                </Link>
              ))}
            </Box>

            <Link href={`/pokemon/${Number(pokemon.id)}`}>
              <Button
                variant="contained"
                sx={{ bgcolor: '#FFCB05', color: '#fff', fontWeight: 'bold' }}
              >
                More Detail
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  )
}

export default PokemonModal
