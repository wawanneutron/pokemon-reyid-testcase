'use client'

import { notFound, useParams } from 'next/navigation'
import { Box, Container } from '@mui/material'
import { usePokemonDetail } from '@/app/hooks/usePokemonDetail'

import Evolutions from '@/app/components/detail/Evolutions'
import HeaderSummary from '@/app/components/detail/HeaderSummary'
import OtherImages from '@/app/components/detail/OtherImages'
import Stats from '@/app/components/detail/Stats'
import Loading from '@/app/loading'
import Error from '@/app/error'
import axios from 'axios'

export default function PokemonDetailPage() {
  const params = useParams()
  const pokemonId = params.pokemonId

  const { data, isLoading, isError, error, refetch } = usePokemonDetail(
    pokemonId as string
  )

  if (isLoading) return <Loading />

  if (isError) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return notFound()
    }
    return <Error error={error} reset={() => refetch()} />
  }

  if (!data) return null

  return (
    <Container maxWidth="xl">
      <Box sx={{ px: { xs: 1, md: 12 }, py: 6 }}>
        <HeaderSummary pokemon={data} />
        <OtherImages images={data.otherImages} />
        <Stats stats={data.stats} />
        <Evolutions speciesUrl={data.species.url} />
      </Box>
    </Container>
  )
}
