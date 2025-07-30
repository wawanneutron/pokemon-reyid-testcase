'use client'

import { Box, List, ListItem, Skeleton } from '@mui/material'

export default function SidebarSkeleton({ count = 18 }: { count?: number }) {
  return (
    <Box
      sx={{
        backgroundColor: 'transparent',
        backdropFilter: 'blur(4px)',
        width: { xs: '100%', md: 240 },
        px: 2,
        py: 4
      }}
    >
      <Box
        sx={{
          maxHeight: { xs: 280, md: '65vh' },
          overflowY: 'auto'
        }}
      >
        <List disablePadding dense>
          {Array.from({ length: count }).map((_, index) => (
            <ListItem key={index} disableGutters sx={{ mb: 0.5 }}>
              <Skeleton
                variant="rounded"
                height={36}
                width="100%"
                animation="wave"
                sx={{ borderRadius: 1 }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  )
}
