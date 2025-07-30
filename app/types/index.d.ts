export interface AccentTypeBackgroundProps {
  colorByType: string
}

export interface PaginationProps {
  page: number
  total: number
  perPage: number
  onPageChange: (page: number) => void
  onPerPageChange: (perPage: number) => void
  maxVisible?: number
  colorByType?: string
}

interface NavItem {
  label: string
  href: string
}

export interface NavbarMobileProps {
  navItems: NavItem[]
}
