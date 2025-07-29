'use client'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@mui/material'
import { useEffect, useState } from 'react'

const WELCOME_MODAL_KEY = 'pokedex-welcome-session-dismissed'

export default function WelcomeModal() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const alreadyDismissed = sessionStorage.getItem(WELCOME_MODAL_KEY)
    if (!alreadyDismissed) {
      setOpen(true)
    }
  }, [])

  const handleClose = () => {
    sessionStorage.setItem(WELCOME_MODAL_KEY, 'true')
    setOpen(false)
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
    >
      <DialogTitle>Welcome to Pokédex! 👋👋</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Explore your favorite Pokémon by type, see their evolutions, and get
          detailed information.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          variant="contained"
          color="primary"
          autoFocus
        >
          Let&apos;s Go!
        </Button>
      </DialogActions>
    </Dialog>
  )
}
