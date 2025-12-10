import { AppBar, Box, Button, Container, IconButton, Stack, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import { Link, NavLink, useLocation } from 'react-router-dom'
import logoUrl from '../assets/images/lipabnb-logo.svg'
import { useState } from 'react'

export type NavbarLink = { label: string; to: string }

type NavbarProps = {
  links?: NavbarLink[]
  showAuth?: boolean
  brandTo?: string
}

const defaultLinks: NavbarLink[] = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Listing', to: '/listing' },
  { label: 'Contact Us', to: '/contact' },
  { label: 'Wishlist', to: '/wishlist' },
  { label: 'Bookings', to: '/booking' },
  { label: 'Profile', to: '/profile/settings' },
]

export default function Navbar({ links = defaultLinks, showAuth = true, brandTo = '/' }: NavbarProps) {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const isActive = (to: string) => (to === '/' ? pathname === '/' : pathname.startsWith(to))

  return (
    <AppBar position="static" elevation={0} sx={{ bgcolor: 'transparent', color: 'inherit' }}>
      <Container maxWidth={false} sx={{px: { xs: 2, md: 3 }, py: 1.5, maxWidth: { xs: '100%', md: 1160, xl: 1440 }, mx: 'auto' }}>
        <Toolbar disableGutters sx={{ gap: 2 }}>
          <Box component={Link} to={brandTo} sx={{ mr: 2, display: 'inline-flex' }}>
            <Box component="img" src={logoUrl} alt="lipabnb" sx={{ height: 32 }} />
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
                sx={{ color: isActive(l.to) ? '#FF385C' : '#222222', fontWeight: 700 }}
              >
                {l.label}
              </Typography>
            ))}
          </Stack>

          {showAuth && (
            <Stack direction="row" spacing={2} sx={{ display: { xs: 'none', md: 'flex' }, ml: 'auto' }} alignItems="center">
              <Typography component={Link} to="/auth/login" sx={{ textDecoration: 'none', color: '#222222', fontWeight: 700 }}>Log in</Typography>
              <Button component={Link} to="/auth/signup" variant="contained" sx={{ bgcolor: '#FF385C', borderRadius: 999, px: 3, py: 1.25, textTransform: 'none', fontWeight: 700, '&:hover': { bgcolor: '#E61E4D' } }}>
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
              <Box component="img" src={logoUrl} alt="lipabnb" sx={{ height: 28 }} />
              <IconButton onClick={() => setOpen(false)}>
                <CloseIcon />
              </IconButton>
            </Stack>
            <Stack spacing={2.5} sx={{ mb: 3 }}>
              {links.map((l) => (
                <Typography key={l.label} component={Link} to={l.to} onClick={() => setOpen(false)} sx={{ textDecoration: 'none', color: isActive(l.to) ? '#FF385C' : '#222222', fontWeight: 700 }}>
                  {l.label}
                </Typography>
              ))}
            </Stack>
            {showAuth && (
              <Stack direction="row" spacing={1.5}>
                <Button component={Link} to="/auth/login" variant="text" onClick={() => setOpen(false)} sx={{ textTransform: 'none', fontWeight: 700 }}>Log in</Button>
                <Button component={Link} to="/auth/signup" variant="contained" onClick={() => setOpen(false)} sx={{ bgcolor: '#FF385C', borderRadius: 999, px: 3, textTransform: 'none', fontWeight: 700, '&:hover': { bgcolor: '#E61E4D' } }}>Sign up</Button>
              </Stack>
            )}
          </Box>
        </Box>
      )}
    </AppBar>
  )
}


