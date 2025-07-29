'use client'

import React, { useEffect, useState } from 'react'
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography
} from '@mui/material'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

interface Type {
  name: string
}

interface SidebarProps {
  types: Type[]
  onTypeSelected: (typeName: string) => void
}

export default function Sidebar({ types, onTypeSelected }: SidebarProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [selectedTypeName, setSelectedTypeName] = useState<string>('normal')
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (types.length === 0) return

    const name = searchParams.get('name')
    const defaultIndex = types.findIndex((t) => t.name === name)

    const finalIndex = defaultIndex !== -1 ? defaultIndex : 0
    const finalName = types[finalIndex]?.name || 'normal'

    setSelectedIndex(finalIndex)
    setSelectedTypeName(finalName)
    onTypeSelected(finalName)
  }, [types, onTypeSelected, searchParams])

  const handleSelectType = (index: number) => {
    const selected = types[index]?.name
    if (!selected) return

    setSelectedIndex(index)
    setSelectedTypeName(selected)
    router.push(`${pathname}?name=${selected}`)
    onTypeSelected(selected)
  }

  return (
    <Box
      sx={{
        width: 240,
        p: 4,
        zIndex: 1,
        overflowY: 'auto',
        maxHeight: '60vh'
      }}
    >
      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
        Pokemon Type
      </Typography>
      <List dense disablePadding>
        {types.map((type, idx) => (
          <ListItemButton
            key={type.name}
            selected={selectedIndex === idx}
            onClick={() => handleSelectType(idx)}
            sx={{ borderRadius: 1 }}
          >
            <ListItemText primary={type.name} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  )
}
