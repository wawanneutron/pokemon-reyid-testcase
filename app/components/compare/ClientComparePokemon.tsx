'use client'

import { useEffect, useState } from 'react'
import { Box, Stack, Snackbar, Alert, Container } from '@mui/material'
import PokemonSelectModal from '@/app/components/compare/PokemonSelectModal'
import CompareCard from '@/app/components/compare/CompareCard'
import { PokemonListItem } from '@/app/types/detail'
import AccentTypeBackground from '../ui/AccentTypeBackground'
import ButtonAction from './ButtonAction'

const STORAGE_KEY = 'selectedPokemons'

export default function ComparePage() {
  const [selectedPokemons, setSelectedPokemons] = useState<PokemonListItem[]>(
    () => {
      if (typeof window !== 'undefined') {
        try {
          const saved = localStorage.getItem('selectedPokemons')
          return saved ? JSON.parse(saved) : []
        } catch (error) {
          console.error('Failed to saved pokemons', error)
        }
      }
      return []
    }
  )

  const [modalOpen, setModalOpen] = useState(false)
  const [duplicateOpen, setDuplicateOpen] = useState(false)

  // Simpan ke localStorage setiap kali berubah
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedPokemons))
  }, [selectedPokemons])

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

  const removeAll = () => {
    setSelectedPokemons([])
  }

  return (
    <Container maxWidth="xl" sx={{ px: { xs: 1, md: 12 }, py: 8 }}>
      {!!selectedPokemons.length && (
        <AccentTypeBackground colorByType="poison" />
      )}

      <Stack spacing={2}>
        <ButtonAction
          onModalOpen={() => setModalOpen(true)}
          onConfirmRemove={removeAll}
          selectedPokemons={selectedPokemons}
        />

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
    </Container>
  )
}
