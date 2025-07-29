'use client'

import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
  Container
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

import navbarPokemon from '@/public/navbar-pokemon.png'

function Navbar() {
  const pathname = usePathname()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Pokemon Type', href: '/pokemon/type?name=normal' }
  ]

  const [drawerOpen, setDrawerOpen] = useState(false)

  console.log(pathname)

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open)
  }

  return (
    <Container
      maxWidth="xl"
      sx={{
        px: { xs: 1, md: 12 }
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
          {/* Logo */}
          <Link href="/" passHref>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                marginRight: 4
              }}
            >
              <Image
                src={navbarPokemon}
                alt="Pokemon Logo"
                width={100}
                height={40}
                priority
              />
            </Box>
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {navItems.map((item) => {
                const itemPath = item.href.split('?')[0]
                const isActive = pathname === itemPath

                return (
                  <Link href={item.href} key={item.href} passHref>
                    <Button
                      sx={{
                        fontWeight: isActive ? 'bold' : 'normal',
                        color: isActive ? 'primary.main' : 'text.primary',
                        borderBottom: isActive ? '2px solid #facc15' : 'none',
                        borderRadius: 0
                      }}
                    >
                      {item.label}
                    </Button>
                  </Link>
                )
              })}
            </Box>
          )}

          {/* Mobile Hamburger */}
          {isMobile && (
            <>
              <IconButton
                onClick={toggleDrawer(true)}
                edge="end"
                size="large"
                sx={{ marginLeft: 'auto' }}
              >
                <MenuIcon />
              </IconButton>

              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
              >
                <Box
                  sx={{ width: 250 }}
                  role="presentation"
                  onClick={toggleDrawer(false)}
                >
                  <List>
                    {navItems.map((item) => (
                      <Link href={item.href} key={item.href} passHref>
                        <ListItem component="a">
                          <ListItemText
                            primary={item.label}
                            primaryTypographyProps={{
                              fontWeight:
                                pathname === item.href ? 'bold' : 'normal',
                              color:
                                pathname === item.href
                                  ? 'primary.main'
                                  : 'text.primary'
                            }}
                          />
                        </ListItem>
                      </Link>
                    ))}
                  </List>
                </Box>
              </Drawer>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Container>
  )
}

export default Navbar
