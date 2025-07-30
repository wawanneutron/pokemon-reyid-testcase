import React from 'react'
import { Box, Button } from '@mui/material'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NavbarMobileProps } from '@/app/types'

function NavbarDesktop({ navItems }: NavbarMobileProps) {
  const pathname = usePathname()

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      {navItems.map((item) => {
        const itemPath = item.href.split('?')[0]
        const isActive = pathname === itemPath

        return (
          <Link href={item.href} key={item.href} passHref>
            <Button
              sx={{
                fontWeight: isActive ? 'bold' : 'normal',
                color: isActive ? '#FFCB05' : 'black',
                borderBottom: isActive ? '1px solid #FFCB05' : 'none',
                textTransform: 'capitalize',
                fontSize: '1rem',
                borderRadius: 0
              }}
            >
              {item.label}
            </Button>
          </Link>
        )
      })}
    </Box>
  )
}

export default NavbarDesktop
