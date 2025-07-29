'use client'

import { useState } from 'react'
export const usePagination = (defaultLimit = 20) => {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(defaultLimit)

  const offset = (page - 1) * limit

  return {
    page,
    limit,
    offset,
    setPage,
    setLimit
  }
}
