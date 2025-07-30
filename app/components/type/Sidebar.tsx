import { SidebarProps } from '@/app/types/pokemon-type'
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography
} from '@mui/material'
import React from 'react'

function Sidebar({ types, selectedTypeIndex, handleSelectType }: SidebarProps) {
  return (
    <Box
      sx={{
        backgroundColor: 'transparent',
        backdropFilter: 'blur(4px)',
        width: { xs: '100%', md: 240 },
        p: 2
      }}
    >
      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
        Pokémon Type
      </Typography>
      <Box
        sx={{
          borderBottom: { xs: '1px solid #ccc', md: 'none' },
          borderRight: { md: '1px solid #ccc' },
          zIndex: 1,
          maxHeight: { xs: 280, md: '60vh' },
          overflowY: 'auto'
        }}
      >
        <List dense disablePadding>
          {types.map((type: { name: string }, idx: number) => (
            <ListItemButton
              key={type.name}
              selected={selectedTypeIndex === idx}
              onClick={() => handleSelectType(idx)}
              sx={{
                borderRadius: 1,
                mb: 0.5
              }}
            >
              <ListItemText primary={type.name} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Box>
  )
}

export default Sidebar
