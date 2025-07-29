import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#E9B824',
          color: '#fff',
          fontWeight: 'bold',
          textTransform: 'none',
          boxShadow: 'none',
          borderRadius: '20px',
          padding: '8px 32px',
          fontSize: '1rem',
          '&:hover': {
            backgroundColor: '#d4a01f'
          }
        }
      },
      defaultProps: {
        variant: 'contained'
      }
    }
  }
})

export default theme
