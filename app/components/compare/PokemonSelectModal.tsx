'use client'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  CircularProgress,
  Typography,
  Box,
  Grid
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useEffect, useState } from 'react'
import PokedexCard from '@/app/components/home/PokedexCard'
import Pagination from '@/app/components/ui/Pagination'
import { usePokemonList } from '@/app/hooks/usePokemonList'
import { PokemonListItem } from '@/app/types/detail'

type PokemonSelectModalProps = {
  open: boolean
  onClose: () => void
  onSelectPokemon: (pokemonId: PokemonListItem) => void
}

export default function PokemonSelectModal({
  open,
  onClose,
  onSelectPokemon
}: PokemonSelectModalProps) {
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(9)

  const {
    data: pokemonList,
    isLoading,
    isError,
    refetch
  } = usePokemonList(page, perPage)

  useEffect(() => {
    if (open) {
      refetch()
    }
  }, [page, perPage, open, refetch])

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        Choose a Pokémon
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent
        dividers
        sx={{
          maxHeight: '70vh',
          overflowY: 'auto',
          py: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 4
        }}
      >
        {isLoading ? (
          <Box display="flex" justifyContent="center" py={4}>
            <CircularProgress />
          </Box>
        ) : isError ? (
          <Typography color="error" align="center" py={4}>
            Error loading Pokémon. Please try again.
          </Typography>
        ) : (
          <>
            <Grid container spacing={2}>
              {pokemonList?.pokemons?.map((poke) => (
                <Grid size={{ xs: 6, sm: 4, md: 4 }} key={poke.id}>
                  <PokedexCard
                    {...poke}
                    onSelect={(pokeItem) => onSelectPokemon(pokeItem)}
                  />
                </Grid>
              ))}
            </Grid>

            <Pagination
              page={page}
              perPage={perPage}
              total={pokemonList?.total || 0}
              onPageChange={setPage}
              onPerPageChange={(val) => {
                setPage(1)
                setPerPage(val)
              }}
            />
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
