import React from 'react'
import { Box } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import navbarPokemon from '@/public/navbar-pokemon.png'

type LogoPokemonProps = {
  disableLink?: boolean
  width?: number
  height?: number
}

function LogoPokemon({
  disableLink = false,
  width = 100,
  height = 40
}: LogoPokemonProps) {
  const logo = (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        cursor: disableLink ? 'default' : 'pointer',
        marginRight: 4
      }}
    >
      <Image
        src={navbarPokemon}
        alt="Pokemon Logo"
        width={width}
        height={height}
        priority
      />
    </Box>
  )

  return disableLink ? logo : <Link href="/">{logo}</Link>
}

export default LogoPokemon
