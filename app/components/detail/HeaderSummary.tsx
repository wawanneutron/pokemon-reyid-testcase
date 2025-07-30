import { formatHeight, formatWeight } from '@/app/lib/utils'
import { typeColors } from '@/app/types/color'
import { HeaderSummaryProps } from '@/app/types/detail'
import { Box, Chip, Grid, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'

function HeaderSummary({ pokemon }: HeaderSummaryProps) {
  return (
    <Grid container spacing={4}>
      <Grid size={{ xs: 12, sm: 4 }}>
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            aspectRatio: '1/1',
            bgcolor: '#F2F2F2',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 18,
            color: '#fff',
            borderRadius: 2
          }}
        >
          {pokemon.imageUrl ? (
            <Image src={pokemon.imageUrl} alt={pokemon.name} fill />
          ) : (
            <Typography variant="caption">
              Pokemon Picture Placeholder
            </Typography>
          )}
        </Box>
      </Grid>
      <Grid size={{ xs: 12, sm: 8 }}>
        <Typography
          variant="h4"
          fontWeight={700}
          gutterBottom
          textTransform="capitalize"
        >
          {pokemon.name}
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 6 }}>
            <Typography>Weight : {formatWeight(pokemon.weight)}</Typography>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Typography>Height : {formatHeight(pokemon.height)}</Typography>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Typography>Abilities :</Typography>
            <ul>
              {pokemon.abilities.map((ability, idx) => (
                <li key={idx}>
                  {ability.isHidden
                    ? `${ability.name} (hidden ability)`
                    : ability.name}
                </li>
              ))}
            </ul>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Typography>Type :</Typography>
            <Stack direction="row" spacing={1} mt={1}>
              {pokemon.types.map((type, index) => (
                <Link href={`/pokemon/type?name=${type}`} key={index}>
                  <Chip
                    label={type}
                    sx={{ color: 'white', backgroundColor: typeColors[type] }}
                  />
                </Link>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default HeaderSummary
