'use client'

import React, { useState } from 'react'
import Hero from '@/app/components/home/Hero'
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography
} from '@mui/material'

import PokedexCard from '@/app/components/home/PokedexCard'
import Pagination from '@/app/components/ui/Pagination'
import BackgroundAccent from '@/app/components/ui/BackgroundAccent'
import WelcomeMessage from '@/app/components/home/WelcomeMessage'
import PokemonModal from '@/app/components/detail/PokemonModal'
import ErrorCard from '@/app/components/home/ErrorCard'
import Loading from '@/app/loading'

import { usePokemonList } from '@/app/hooks/usePokemonList'
import { formatNumberWithDot } from '@/app/lib/utils'
import { PokedexCardProps } from '@/app/types/home'

export default function HomePage() {
  const listRef = React.useRef<HTMLDivElement>(null)
  const [page, setPage] = useState<number>(1)
  const [perPage, setPerPage] = useState<number>(9)
  const [selectedPokemon, setSelectedPokemon] =
    useState<PokedexCardProps | null>(null)

  const { data, isLoading, isError, refetch } = usePokemonList(page, perPage)

  const scrollToPokedex = () =>
    listRef.current?.scrollIntoView({ behavior: 'smooth' })

  if (isLoading) return <Loading />

  return (
    <Container maxWidth={false} disableGutters>
      <Hero onScrollToPokedex={scrollToPokedex} />

      <Box
        sx={{
          position: 'relative',
          bgcolor: '#FFCB05',
          minHeight: '100vh',
          overflow: 'hidden',
          py: 8
        }}
      >
        <BackgroundAccent />

        <Container
          ref={listRef}
          maxWidth="md"
          sx={{ position: 'relative', zIndex: 1 }}
        >
          <Box textAlign="center" mb={6}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              PokèDex
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              All Generation totaling <br />
              <strong> {formatNumberWithDot(data?.total || 0)} </strong> Pokémon
            </Typography>
          </Box>

          {isLoading ? (
            <Box textAlign="center">
              <CircularProgress />
            </Box>
          ) : isError ? (
            <ErrorCard refetch={refetch} />
          ) : (
            <>
              <Grid container spacing={4} justifyContent="center">
                {data?.pokemons.map((poke) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={poke.id}>
                    <PokedexCard
                      {...poke}
                      onSelect={(pokemon) => setSelectedPokemon(pokemon)}
                    />
                  </Grid>
                ))}
              </Grid>

              <Box mt={6} display="flex" justifyContent="center">
                <Pagination
                  page={page}
                  perPage={perPage}
                  total={data?.total || 0}
                  onPageChange={(newPage) => setPage(newPage)}
                  onPerPageChange={(newPerPage) => {
                    setPerPage(newPerPage)
                    setPage(1)
                  }}
                />
              </Box>
            </>
          )}
        </Container>

        <WelcomeMessage />
        {selectedPokemon && (
          <PokemonModal
            open={!!selectedPokemon}
            pokemon={selectedPokemon}
            onClose={() => setSelectedPokemon(null)}
          />
        )}
      </Box>
    </Container>
  )
}
