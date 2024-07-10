import { createTheme } from '@mui/material/styles'

const muiTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    fontFamily: ['Helvetica Neue'].join(','),
  },
  spacing: 1,
  components: {
    MuiTypography: {
      defaultProps: {
        fontSize: 17,
        lineHeight: 'normal',
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          padding: '0',
          lineHeight: 'normal',
          fontSize: 17,
        },
      },
    },
  },
})

export default muiTheme
