import { AppBar, Box, Button, Container, IconButton, Stack, Toolbar, Typography, Menu, MenuItem } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { Link, NavLink, useLocation } from 'react-router-dom'
import logoUrl from '../assets/images/logo-main.png'
import { useState } from 'react'

export type NavbarLink = { label: string; to: string }

type NavbarProps = {
  links?: NavbarLink[]
  showAuth?: boolean
  brandTo?: string
}

const defaultLinks: NavbarLink[] = [
  { label: 'Home', to: '/' },
  { label: 'Stays', to: '/stays' },
  { label: 'Contact Us', to: '/contact' },
  { label: 'Wishlist', to: '/wishlist' },
  {label: 'Messages', to: '/chat'},
  { label: 'Bookings', to: '/booking' },
  { label: 'Profile', to: '/profile/settings' },
]

const currencies = [
  { code: 'USD', name: 'US Dollar' },
  { code: 'PKR', name: 'Pakistani Rupee' },
]

export default function Navbar({ links = defaultLinks, showAuth = true, brandTo = '/' }: NavbarProps) {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const [currency, setCurrency] = useState('USD')
  const [currencyAnchor, setCurrencyAnchor] = useState<null | HTMLElement>(null)
  const [bookingsAnchor, setBookingsAnchor] = useState<null | HTMLElement>(null)
  const isActive = (to: string) => {
    if (to === '/') return pathname === '/'
    if (to === '/booking') {
      return pathname === '/booking'
    }
    return pathname.startsWith(to)
  }
  
  const currentCurrency = currencies.find(c => c.code === currency) || currencies[0]
  
  const handleCurrencyClick = (event: React.MouseEvent<HTMLElement>) => {
    setCurrencyAnchor(event.currentTarget)
  }
  
  const handleCurrencyClose = () => {
    setCurrencyAnchor(null)
  }
  
  const handleCurrencySelect = (code: string) => {
    setCurrency(code)
    handleCurrencyClose()
  }
  
  const handleBookingsClick = (event: React.MouseEvent<HTMLElement>) => {
    setBookingsAnchor(event.currentTarget)
  }
  
  const handleBookingsClose = () => {
    setBookingsAnchor(null)
  }

  return (
    <AppBar position="static" elevation={0} sx={{ bgcolor: 'transparent', color: 'inherit' }}>
      <Container maxWidth={false} sx={{px: { xs: 2, md: 3 }, py: 1.5, maxWidth: { xs: '100%', md: 1160, xl: 1440 }, mx: 'auto' }}>
        <Toolbar disableGutters sx={{ gap: 2 }}>
          <Box component={Link} to={brandTo} sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
            <Box 
              component="img" 
              src={logoUrl} 
              alt="lipabnb" 
              sx={{ 
                height: { xs: 80, md: 100 },
                width: 'auto',
                maxWidth: { xs: 400, md: 500 },
                objectFit: 'contain',
                display: 'block'
              }} 
            />
          </Box>

          <IconButton edge="start" sx={{ display: { md: 'none' }, ml: 'auto' }} onClick={() => setOpen(true)}>
            <MenuIcon />
          </IconButton>

          <Stack direction="row" spacing={5} sx={{ display: { xs: 'none', md: 'flex' }, mx: 'auto' }}>
            {links.map((l) => (
              <Typography
                key={l.label}
                component={NavLink}
                to={l.to}
                style={{ textDecoration: 'none' }}
                sx={{ color: isActive(l.to) ? '#AD542D' : '#222222', fontWeight: 700 }}
              >
                {l.label}
              </Typography>
            ))}
          </Stack>

          {showAuth && (
            <Stack direction="row" spacing={2} sx={{ display: { xs: 'none', md: 'flex' }, ml: 'auto' }} alignItems="center">
              <Box
                onClick={handleCurrencyClick}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  px: 1.5,
                  py: 0.75,
                  borderRadius: 2,
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                  '&:hover': {
                    bgcolor: '#F7F7F7'
                  }
                }}
              >
                <Typography sx={{ color: '#222222', fontWeight: 600, fontSize: '0.875rem' }}>
                  {currentCurrency.code}
                </Typography>
                <KeyboardArrowDownIcon sx={{ fontSize: 16, color: '#222222' }} />
              </Box>
              <Menu
                anchorEl={currencyAnchor}
                open={Boolean(currencyAnchor)}
                onClose={handleCurrencyClose}
                PaperProps={{
                  sx: {
                    mt: 1,
                    minWidth: 160,
                    borderRadius: 2,
                    boxShadow: '0 2px 16px rgba(0,0,0,0.12)'
                  }
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                {currencies.map((curr) => (
                  <MenuItem
                    key={curr.code}
                    onClick={() => handleCurrencySelect(curr.code)}
                    selected={currency === curr.code}
                    sx={{
                      py: 1.5,
                      px: 2,
                      '&.Mui-selected': {
                        bgcolor: '#FFF5F7',
                        '&:hover': {
                          bgcolor: '#FFF5F7'
                        }
                      },
                      '&:hover': {
                        bgcolor: '#F7F7F7'
                      }
                    }}
                  >
                    <Stack>
                      <Typography sx={{ fontWeight: currency === curr.code ? 600 : 400, fontSize: '0.875rem', color: '#222222' }}>
                        {curr.code}
                      </Typography>
                      <Typography sx={{ fontSize: '0.75rem', color: '#717171' }}>
                        {curr.name}
                      </Typography>
                    </Stack>
                  </MenuItem>
                ))}
              </Menu>
              <Box
                onClick={handleBookingsClick}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  px: 1.5,
                  py: 0.75,
                  borderRadius: 2,
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                  '&:hover': {
                    bgcolor: '#F7F7F7'
                  }
                }}
              >
                <KeyboardArrowDownIcon sx={{ fontSize: 16, color: '#222222' }} />
              </Box>
              <Menu
                anchorEl={bookingsAnchor}
                open={Boolean(bookingsAnchor)}
                onClose={handleBookingsClose}
                PaperProps={{
                  sx: {
                    mt: 1,
                    minWidth: 200,
                    borderRadius: 2,
                    boxShadow: '0 2px 16px rgba(0,0,0,0.12)'
                  }
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem
                  component={Link}
                  to="/booking/history"
                  onClick={handleBookingsClose}
                  sx={{
                    py: 1.5,
                    px: 2,
                    '&:hover': {
                      bgcolor: '#F7F7F7'
                    }
                  }}
                >
                  <Typography sx={{ fontWeight: 400, fontSize: '0.875rem', color: '#222222' }}>
                    Booking History
                  </Typography>
                </MenuItem>
              </Menu>
              <Typography component={Link} to="/auth/login" sx={{ textDecoration: 'none', color: '#222222', fontWeight: 700 }}>Log in</Typography>
              <Button component={Link} to="/auth/signup" variant="contained" sx={{ bgcolor: '#AD542D', borderRadius: 999, px: 3, py: 1.25, textTransform: 'none', fontWeight: 700, '&:hover': { bgcolor: '#78381C' } }}>
                Sign up
              </Button>
            </Stack>
          )}
        </Toolbar>
      </Container>

      {/* Mobile drawer-like menu */}
      {open && (
        <Box sx={{ position: 'fixed', inset: 0, bgcolor: 'rgba(0,0,0,0.4)', zIndex: 1200 }} onClick={() => setOpen(false)}>
          <Box sx={{ position: 'absolute', top: 0, right: 0, width: '80%', maxWidth: 320, height: '100%', bgcolor: '#fff', p: 3 }} onClick={(e) => e.stopPropagation()}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
              <Box 
                component="img" 
                src={logoUrl} 
                alt="lipabnb" 
                sx={{ 
                  height: 80,
                  width: 'auto',
                  maxWidth: 400,
                  objectFit: 'contain',
                  display: 'block'
                }} 
              />
              <IconButton onClick={() => setOpen(false)}>
                <CloseIcon />
              </IconButton>
            </Stack>
            <Stack spacing={2.5} sx={{ mb: 3 }}>
              {links.map((l) => (
                <Typography key={l.label} component={Link} to={l.to} onClick={() => setOpen(false)} sx={{ textDecoration: 'none', color: isActive(l.to) ? '#AD542D' : '#222222', fontWeight: 700 }}>
                  {l.label}
                </Typography>
              ))}
            </Stack>
            {showAuth && (
              <Stack spacing={2}>
                <Box>
                  <Typography sx={{ color: '#222222', fontWeight: 600, fontSize: '0.875rem', mb: 1.5 }}>Currency</Typography>
                  <Box
                    onClick={handleCurrencyClick}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      px: 2,
                      py: 1.25,
                      borderRadius: 2,
                      border: '1px solid #DDDDDD',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      '&:hover': {
                        borderColor: '#AD542D',
                        bgcolor: '#F7F7F7'
                      }
                    }}
                  >
                    <Typography sx={{ color: '#222222', fontWeight: 600, fontSize: '0.875rem' }}>
                      {currentCurrency.code} - {currentCurrency.name}
                    </Typography>
                    <KeyboardArrowDownIcon sx={{ fontSize: 20, color: '#222222' }} />
                  </Box>
                  <Menu
                    anchorEl={currencyAnchor}
                    open={Boolean(currencyAnchor)}
                    onClose={handleCurrencyClose}
                    PaperProps={{
                      sx: {
                        mt: 1,
                        minWidth: 200,
                        borderRadius: 2,
                        boxShadow: '0 2px 16px rgba(0,0,0,0.12)'
                      }
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  >
                    {currencies.map((curr) => (
                      <MenuItem
                        key={curr.code}
                        onClick={() => handleCurrencySelect(curr.code)}
                        selected={currency === curr.code}
                        sx={{
                          py: 1.5,
                          px: 2,
                          '&.Mui-selected': {
                            bgcolor: '#FFF5F7',
                            '&:hover': {
                              bgcolor: '#FFF5F7'
                            }
                          },
                          '&:hover': {
                            bgcolor: '#F7F7F7'
                          }
                        }}
                      >
                        <Stack>
                          <Typography sx={{ fontWeight: currency === curr.code ? 600 : 400, fontSize: '0.875rem', color: '#222222' }}>
                            {curr.code}
                          </Typography>
                          <Typography sx={{ fontSize: '0.75rem', color: '#717171' }}>
                            {curr.name}
                          </Typography>
                        </Stack>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
                <Stack direction="row" spacing={1.5}>
                  <Button component={Link} to="/auth/login" variant="text" onClick={() => setOpen(false)} sx={{ textTransform: 'none', fontWeight: 700 }}>Log in</Button>
                  <Button component={Link} to="/auth/signup" variant="contained" onClick={() => setOpen(false)} sx={{ bgcolor: '#AD542D', borderRadius: 999, px: 3, textTransform: 'none', fontWeight: 700, '&:hover': { bgcolor: '#78381C' } }}>Sign up</Button>
                </Stack>
              </Stack>
            )}
          </Box>
        </Box>
      )}
    </AppBar>
  )
}


