'use client'

import { useState } from 'react'
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { PokemonListItem } from '@/app/types/detail'

interface ButtonActionProps {
  onConfirmRemove: () => void
  onModalOpen: (isOpen: boolean) => void
  selectedPokemons: PokemonListItem[]
}

function ButtonAction({
  onConfirmRemove,
  onModalOpen,
  selectedPokemons
}: ButtonActionProps) {
  const [openConfirm, setOpenConfirm] = useState(false)

  const handleConfirm = () => {
    onConfirmRemove()
    setOpenConfirm(false)
  }

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      justifyContent="space-between"
      alignItems="center"
      gap={2}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={() => onModalOpen(true)}
      >
        Add Pokémon to Compare
      </Button>

      {!!selectedPokemons.length && (
        <Button
          variant="outlined"
          endIcon={<DeleteIcon fontSize="small" />}
          sx={{
            whiteSpace: 'nowrap',
            textTransform: 'none',
            backgroundColor: '#f44336',
            borderColor: '#f44336',
            zIndex: 2,
            '&:hover': {
              backgroundColor: '#f44336bf',
              color: 'black'
            }
          }}
          onClick={() => setOpenConfirm(true)}
        >
          Remove All
        </Button>
      )}

      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <DialogTitle>Confirm Remove All</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to remove all selected Pokémon?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            color="error"
            variant="contained"
            sx={{
              whiteSpace: 'nowrap',
              textTransform: 'none',
              backgroundColor: '#f44336',
              borderColor: '#f44336',
              zIndex: 2,
              '&:hover': {
                backgroundColor: '#f44336bf',
                color: 'black'
              }
            }}
          >
            Oke
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default ButtonAction
