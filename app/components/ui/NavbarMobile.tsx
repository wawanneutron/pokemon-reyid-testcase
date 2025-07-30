import { Box, Button, Drawer, IconButton, List } from '@mui/material'

import Link from 'next/link'
import React from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { NavbarMobileProps } from '@/app/types'

function NavbarMobile({ navItems }: NavbarMobileProps) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const pathname = usePathname()

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open)
  }

  return (
    <>
      <IconButton
        onClick={toggleDrawer(true)}
        edge="end"
        size="large"
        sx={{ marginLeft: 'auto' }}
      >
        <MenuIcon />
      </IconButton>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
        >
          <List>
            {navItems.map((item) => {
              const itemPath = item.href.split('?')[0]
              const isActive = pathname === itemPath

              return (
                <Link href={item.href} key={item.href} passHref>
                  <Button
                    fullWidth
                    sx={{
                      justifyContent: 'flex-start',
                      fontWeight: isActive ? 'bold' : 'normal',
                      color: isActive ? '#FFCB05' : 'black',
                      borderBottom: isActive ? '1px solid #FFCB05' : 'none',
                      textTransform: 'capitalize',
                      fontSize: '1rem',
                      borderRadius: 0,
                      px: 2,
                      py: 1.5
                    }}
                  >
                    {item.label}
                  </Button>
                </Link>
              )
            })}
          </List>
        </Box>
      </Drawer>
    </>
  )
}

export default NavbarMobile
