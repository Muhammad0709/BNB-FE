import React, { useState } from 'react'
import { Link, usePage, router } from '@inertiajs/react'
import { AppBar, Box, Button, Container, IconButton, Stack, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
// Images served from public directory
const logoUrl = '/images/lipabnb-logo.svg'

export type NavbarLink = { label: string; href: string }

type NavbarProps = {
  links?: NavbarLink[]
  showAuth?: boolean
  brandTo?: string
}

const defaultLinks: NavbarLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Listing', href: '/listing' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Wishlist', href: '/wishlist' },
  { label: 'Bookings', href: '/booking' },
  { label: 'Profile', href: '/profile/settings' },
]

export default function Navbar({ links = defaultLinks, showAuth = true, brandTo = '/' }: NavbarProps) {
  const [open, setOpen] = useState(false)
  const { url, props } = usePage()
  const pathname = url
  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))
  
  // Get authenticated user from Inertia shared props
  const user = (props as any)?.auth?.user || null
  const isAuthenticated = !!user

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault()
    router.post('/logout')
  }

  return (
    <AppBar position="static" elevation={0} sx={{ bgcolor: 'transparent', color: 'inherit' }}>
      <Container maxWidth={false} sx={{px: { xs: 2, md: 3 }, py: 1.5, maxWidth: { xs: '100%', md: 1160, xl: 1440 }, mx: 'auto' }}>
        <Toolbar disableGutters sx={{ gap: 2 }}>
          <Box component={Link} href={brandTo} sx={{ mr: 2, display: 'inline-flex' }}>
            <Box component="img" src={logoUrl} alt="lipabnb" sx={{ height: 32 }} />
          </Box>

          <IconButton edge="start" sx={{ display: { md: 'none' }, ml: 'auto' }} onClick={() => setOpen(true)}>
            <MenuIcon />
          </IconButton>

          <Stack direction="row" spacing={5} sx={{ display: { xs: 'none', md: 'flex' }, mx: 'auto' }}>
            {links.map((l) => (
              <Typography
                key={l.label}
                component={Link}
                href={l.href}
                style={{ textDecoration: 'none' }}
                sx={{ color: isActive(l.href) ? '#FF8C75' : '#111827', fontWeight: 700 }}
              >
                {l.label}
              </Typography>
            ))}
          </Stack>

          {showAuth && (
            <Stack direction="row" spacing={2} sx={{ display: { xs: 'none', md: 'flex' }, ml: 'auto' }} alignItems="center">
              {isAuthenticated ? (
                <Button 
                  onClick={handleLogout}
                  variant="contained" 
                  sx={{ bgcolor: '#FF8C75', borderRadius: 999, px: 3, py: 1.25, textTransform: 'none', fontWeight: 700, '&:hover': { bgcolor: '#ff7a61' } }}
                >
                  Logout
                </Button>
              ) : (
                <>
                  <Typography component={Link} href="/login" sx={{ textDecoration: 'none', color: '#111827', fontWeight: 700 }}>Log in</Typography>
                  <Button component={Link} href="/register" variant="contained" sx={{ bgcolor: '#FF8C75', borderRadius: 999, px: 3, py: 1.25, textTransform: 'none', fontWeight: 700, '&:hover': { bgcolor: '#ff7a61' } }}>
                    Sign up
                  </Button>
                </>
              )}
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
                <Typography key={l.label} component={Link} href={l.href} onClick={() => setOpen(false)} sx={{ textDecoration: 'none', color: isActive(l.href) ? '#FF8C75' : '#111827', fontWeight: 700 }}>
                  {l.label}
                </Typography>
              ))}
            </Stack>
            {showAuth && (
              <Stack direction="row" spacing={1.5}>
                {isAuthenticated ? (
                  <Button 
                    onClick={(e) => {
                      setOpen(false)
                      handleLogout(e)
                    }}
                    variant="contained" 
                    sx={{ bgcolor: '#FF8C75', borderRadius: 999, px: 3, textTransform: 'none', fontWeight: 700, '&:hover': { bgcolor: '#ff7a61' } }}
                  >
                    Logout
                  </Button>
                ) : (
                  <>
                    <Button component={Link} href="/login" variant="text" onClick={() => setOpen(false)} sx={{ textTransform: 'none', fontWeight: 700 }}>Log in</Button>
                    <Button component={Link} href="/register" variant="contained" onClick={() => setOpen(false)} sx={{ bgcolor: '#FF8C75', borderRadius: 999, px: 3, textTransform: 'none', fontWeight: 700, '&:hover': { bgcolor: '#ff7a61' } }}>Sign up</Button>
                  </>
                )}
              </Stack>
            )}
          </Box>
        </Box>
      )}
    </AppBar>
  )
}

