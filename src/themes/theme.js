import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#F7931A',      // Custom primary color
      light: '#F7931A',     // Custom lighter shade
      dark: '#F7931A',      // Custom darker shade
      contrastText: '#ffffff', // Custom text color for buttons, etc.
    },
    secondary: {
      main: '#F7931A',
    },
    background: {
      default: '#F7931A',
      box: '#F7931A',
    },
  },
});

export default theme;
