'use client'

import {
  AppBar,
  Toolbar,
  useTheme,
  useMediaQuery,
  Container
} from '@mui/material'

import NavbarMobile from './NavbarMobile'
import NavbarDesktop from './NavbarDesktop'
import LogoPokemon from './LogoPokemon'

function Navbar() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Pokemon Type', href: '/pokemon/type?name=normal' }
  ]

  return (
    <Container
      maxWidth="xl"
      sx={{
        px: { xs: 1, md: 12 },
        py: { xs: 2 }
      }}
    >
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar
          sx={{
            justifyContent: 'flex-start',
            alignItems: 'center',
            position: 'relative'
          }}
        >
          <LogoPokemon />

          {!isMobile && <NavbarDesktop navItems={navItems} />}

          {isMobile && <NavbarMobile navItems={navItems} />}
        </Toolbar>
      </AppBar>
    </Container>
  )
}

export default Navbar
