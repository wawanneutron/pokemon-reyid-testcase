'use client'

import React, { useState } from 'react'
import Hero from '@/app/components/home/Hero'
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography
} from '@mui/material'
import PokedexCard from '@/app/components/home/PokedexCard'
import BackgroundAccent from '@/app/components/ui/BackgroundAccent'
import Pagination from '@/app/components/ui/Pagination'
import { usePokemonList } from '@/app/hooks/usePokemonList'
import { formatNumberWithDot } from '@/app/lib/utils'
import WelcomeMessage from './WelcomeMessage'
import Loading from '@/app/loading'

function HomeSection() {
  const listRef = React.useRef<HTMLDivElement>(null)
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(9)

  const { data, isLoading, isError, refetch } = usePokemonList(page, perPage)

  const scrollToPokedex = () =>
    listRef.current?.scrollIntoView({ behavior: 'smooth' })

  if (isLoading) return <Loading />

  return (
    <main>
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
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              py={10}
            >
              <Typography
                variant="h5"
                color="error"
                fontWeight="bold"
                gutterBottom
              >
                Failed to load Pokémon
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
                Please check your connection or try again later.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => refetch()}
              >
                Try again
              </Button>
            </Box>
          ) : (
            <>
              <Grid container spacing={4} justifyContent="center">
                {data?.pokemons.map((poke) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={poke.id}>
                    <PokedexCard {...poke} />
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
                    setPage(1) // reset ke halaman 1 saat ubah perPage
                  }}
                />
              </Box>
            </>
          )}
        </Container>

        <WelcomeMessage />
      </Box>
    </main>
  )
}

export default HomeSection
