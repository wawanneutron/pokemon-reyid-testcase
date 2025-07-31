'use client'

import { useState } from 'react'
import { Box, Button, Stack, Snackbar, Alert } from '@mui/material'
import PokemonSelectModal from '@/app/components/compare/PokemonSelectModal'
import CompareCard from '@/app/components/compare/CompareCard'
import { PokemonListItem } from '@/app/types/detail'

export default function ComparePage() {
  const [selectedPokemons, setSelectedPokemons] = useState<PokemonListItem[]>(
    []
  )
  const [modalOpen, setModalOpen] = useState(false)
  const [duplicateOpen, setDuplicateOpen] = useState(false)

  const handleAddPokemon = async (pokemonItem: PokemonListItem) => {
    const alreadyExists = selectedPokemons.some((p) => p.id === pokemonItem.id)

    if (alreadyExists) {
      setDuplicateOpen(true)
    } else {
      setSelectedPokemons((prev) => [...prev, pokemonItem])
    }

    setModalOpen(false)
  }

  const removePokemon = (id: number) => {
    setSelectedPokemons((prev) => prev.filter((p) => p.id !== id))
  }

  return (
    <Box p={2}>
      <Stack spacing={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setModalOpen(true)}
          sx={{ alignSelf: 'flex-start' }}
        >
          Add Pokémon to Compare
        </Button>

        <Box
          display="flex"
          gap={2}
          overflow="auto"
          py={1}
          sx={{
            scrollbarWidth: 'thin',
            '&::-webkit-scrollbar': {
              height: 6
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#aaa',
              borderRadius: 4
            }
          }}
        >
          {selectedPokemons.map((pokemon) => (
            <Box key={pokemon.id} minWidth={250} flexShrink={0}>
              <CompareCard
                pokemon={pokemon}
                onRemove={() => removePokemon(pokemon.id)}
              />
            </Box>
          ))}
        </Box>
      </Stack>

      <PokemonSelectModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSelectPokemon={handleAddPokemon}
      />

      <Snackbar
        open={duplicateOpen}
        autoHideDuration={3000}
        onClose={() => setDuplicateOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setDuplicateOpen(false)}
          severity="warning"
          variant="filled"
          sx={{ width: '100%' }}
        >
          This Pokémon has already been selected!
        </Alert>
      </Snackbar>
    </Box>
  )
}
