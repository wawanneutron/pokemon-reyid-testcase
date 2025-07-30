'use client'

import {
  Box,
  IconButton,
  MenuItem,
  Select,
  Typography,
  Button
} from '@mui/material'
import {
  FirstPage,
  LastPage,
  NavigateBefore,
  NavigateNext
} from '@mui/icons-material'
import { useMemo } from 'react'
import { formatNumberWithDot } from '@/app/lib/utils'
import { typeColors } from '@/app/types'

type PaginationProps = {
  page: number
  total: number
  perPage: number
  onPageChange: (page: number) => void
  onPerPageChange: (perPage: number) => void
  maxVisible?: number
  colorByType?: string
}

function Pagination({
  page,
  total,
  perPage,
  onPageChange,
  onPerPageChange,
  maxVisible = 3,
  colorByType
}: PaginationProps) {
  const totalPages = Math.ceil(total / perPage)

  const pageNumbers = useMemo(() => {
    const pages: (number | 'dots')[] = []

    if (totalPages <= maxVisible + 2) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      if (page <= maxVisible) {
        for (let i = 1; i <= maxVisible; i++) pages.push(i)
        pages.push('dots', totalPages)
      } else if (page > totalPages - maxVisible + 1) {
        pages.push(1, 'dots')
        for (let i = totalPages - maxVisible + 1; i <= totalPages; i++)
          pages.push(i)
      } else {
        pages.push(1, 'dots', page, 'dots', totalPages)
      }
    }

    return pages
  }, [page, totalPages, maxVisible])

  return (
    <Box
      display="flex"
      alignItems="center"
      gap={2}
      flexWrap="wrap"
      justifyContent="center"
    >
      <Typography
        fontWeight="bold"
        color={colorByType ? typeColors[colorByType] : ''}
      >
        Per Page :
      </Typography>
      <Select
        value={perPage}
        size="small"
        onChange={(e) => onPerPageChange(Number(e.target.value))}
      >
        {Array.from({ length: 7 }, (_, i) => (i + 1) * 9).map((opt) => (
          <MenuItem key={opt} value={opt}>
            {opt}
          </MenuItem>
        ))}
      </Select>

      <IconButton onClick={() => onPageChange(1)} disabled={page === 1}>
        <FirstPage />
      </IconButton>
      <IconButton onClick={() => onPageChange(page - 1)} disabled={page === 1}>
        <NavigateBefore />
      </IconButton>

      {pageNumbers.map((p, idx) =>
        p === 'dots' ? (
          <Typography key={idx}>...</Typography>
        ) : (
          <Button
            key={idx}
            variant={p === page ? 'contained' : 'outlined'}
            size="large"
            onClick={() => onPageChange(p)}
            sx={{
              minWidth: 38,
              height: 38,
              fontSize: '0.75rem',
              padding: 0,
              borderRadius: '50%',
              color: p === page ? 'white' : 'text.primary',
              bgcolor:
                p === page
                  ? colorByType
                    ? typeColors[colorByType]
                    : '#f57f17'
                  : 'transparent',
              '&:hover': {
                bgcolor: p === page ? 'primary.dark' : 'action.hover'
              }
            }}
          >
            {p}
          </Button>
        )
      )}

      <IconButton
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >
        <NavigateNext />
      </IconButton>
      <IconButton
        onClick={() => onPageChange(totalPages)}
        disabled={page === totalPages}
      >
        <LastPage />
      </IconButton>

      <Typography
        fontWeight="bold"
        color={colorByType ? typeColors[colorByType] : ''}
      >
        Total Data : {formatNumberWithDot(total)}
      </Typography>
    </Box>
  )
}

export default Pagination
