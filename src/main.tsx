import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App.tsx'

const theme = createTheme({
  palette: {
    primary: {
      main: '#AD542D', // Logo primary color
      dark: '#78381C', // Logo dark variant
      light: '#CF8C5B', // Logo light variant
    },
    secondary: {
      main: '#AE552D', // Logo secondary color
      dark: '#AC532C',
      light: '#E5A88A',
    },
    background: { 
      default: '#FFFFFF',
      paper: '#FFFFFF',
    },
    text: { 
      primary: '#222222',
      secondary: '#717171',
    },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
