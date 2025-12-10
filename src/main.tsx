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
      main: '#FF385C', // Airbnb's signature red/pink
      dark: '#E61E4D',
      light: '#FF5A5F',
    },
    secondary: {
      main: '#00A699', // Airbnb's teal
      dark: '#008489',
      light: '#00D9C4',
    },
    background: { 
      default: '#FFFFFF', // Airbnb uses white backgrounds
      paper: '#FFFFFF',
    },
    text: { 
      primary: '#222222', // Airbnb's dark text
      secondary: '#717171',
    },
  },
  shape: { borderRadius: 12 }, // Airbnb uses rounded corners
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
