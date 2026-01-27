import { Box, Container as MUIContainer, Divider, Stack, Typography } from '@mui/material'
import { Link } from '@inertiajs/react'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: '#F7F7F7', 
        color: '#222222', 
        mt: 'auto',
        borderTop: '1px solid #DDDDDD',
        width: '100%'
      }}
    >
      <MUIContainer 
        maxWidth={false} 
        sx={{ 
          maxWidth: { xs: '100%', sm: '100%', md: 1160, xl: 1440 }, 
          px: { xs: 2, sm: 3, md: 3 }, 
          py: { xs: 4, sm: 5, md: 6 }, 
          mx: 'auto',
          textAlign: { xs: 'left', md: 'center' }
        }}
      >
        {/* Main Footer Links */}
        <Box 
          sx={{ 
            display: 'grid', 
            gridTemplateColumns: { 
              xs: '1fr', 
              sm: 'repeat(2, 1fr)', 
              md: 'repeat(4, 1fr)' 
            }, 
            gap: { xs: 3, sm: 4, md: 6 }, 
            mb: { xs: 3, md: 4 },
            justifyContent: { xs: 'start', md: 'center' }
          }}
        >
          {/* Support */}
          <Box sx={{ mb: { xs: 2, md: 0 } }}>
            <Typography 
              sx={{ 
                color: '#222222', 
                fontWeight: 600, 
                mb: { xs: 1.5, md: 2.5 }, 
                fontSize: { xs: '0.8125rem', md: '0.875rem' }
              }}
            >
              Support
            </Typography>
            <Stack spacing={{ xs: 1, md: 1.5 }}>
              <Box 
                component={Link} 
                href="/contact" 
                onClick={scrollToTop} 
                sx={{ 
                  color: '#222222', 
                  textDecoration: 'none', 
                  fontSize: { xs: '0.8125rem', md: '0.875rem' }, 
                  '&:hover': { textDecoration: 'underline' },
                  display: 'block'
                }}
              >
                Contact Us
              </Box>
              <Box 
                component={Link} 
                href="/auth/login" 
                onClick={scrollToTop} 
                sx={{ 
                  color: '#222222', 
                  textDecoration: 'none', 
                  fontSize: { xs: '0.8125rem', md: '0.875rem' }, 
                  '&:hover': { textDecoration: 'underline' },
                  display: 'block'
                }}
              >
                Log in
              </Box>
              <Box 
                component={Link} 
                href="/auth/register" 
                onClick={scrollToTop} 
                sx={{ 
                  color: '#222222', 
                  textDecoration: 'none', 
                  fontSize: { xs: '0.8125rem', md: '0.875rem' }, 
                  '&:hover': { textDecoration: 'underline' },
                  display: 'block'
                }}
              >
                Sign up
              </Box>
            </Stack>
          </Box>

          {/* Hosting */}
          <Box sx={{ mb: { xs: 2, md: 0 } }}>
            <Typography 
              sx={{ 
                color: '#222222', 
                fontWeight: 600, 
                mb: { xs: 1.5, md: 2.5 }, 
                fontSize: { xs: '0.8125rem', md: '0.875rem' }
              }}
            >
              Hosting
            </Typography>
            <Stack spacing={{ xs: 1, md: 1.5 }}>
              <Box 
                component={Link} 
                href="/register" 
                onClick={scrollToTop} 
                sx={{ 
                  color: '#222222', 
                  textDecoration: 'none', 
                  fontSize: { xs: '0.8125rem', md: '0.875rem' }, 
                  '&:hover': { textDecoration: 'underline' },
                  display: 'block'
                }}
              >
                Become a Host
              </Box>
              <Box 
                component={Link} 
                href="/host/dashboard" 
                onClick={scrollToTop} 
                sx={{ 
                  color: '#222222', 
                  textDecoration: 'none', 
                  fontSize: { xs: '0.8125rem', md: '0.875rem' }, 
                  '&:hover': { textDecoration: 'underline' },
                  display: 'block'
                }}
              >
                Host Resources
              </Box>
              <Box 
                component={Link} 
                href="/host/dashboard" 
                onClick={scrollToTop} 
                sx={{ 
                  color: '#222222', 
                  textDecoration: 'none', 
                  fontSize: { xs: '0.8125rem', md: '0.875rem' }, 
                  '&:hover': { textDecoration: 'underline' },
                  display: 'block'
                }}
              >
                Host Dashboard
              </Box>
            </Stack>
          </Box>

          {/* LipaBnb */}
          <Box sx={{ mb: { xs: 2, md: 0 } }}>
            <Typography 
              sx={{ 
                color: '#222222', 
                fontWeight: 600, 
                mb: { xs: 1.5, md: 2.5 }, 
                fontSize: { xs: '0.8125rem', md: '0.875rem' }
              }}
            >
              LipaBnb
            </Typography>
            <Stack spacing={{ xs: 1, md: 1.5 }}>
              <Box 
                component={Link} 
                href="/" 
                onClick={scrollToTop} 
                sx={{ 
                  color: '#222222', 
                  textDecoration: 'none', 
                  fontSize: { xs: '0.8125rem', md: '0.875rem' }, 
                  '&:hover': { textDecoration: 'underline' },
                  display: 'block'
                }}
              >
                Home
              </Box>
              <Box 
                component={Link} 
                href="/listing" 
                onClick={scrollToTop} 
                sx={{ 
                  color: '#222222', 
                  textDecoration: 'none', 
                  fontSize: { xs: '0.8125rem', md: '0.875rem' }, 
                  '&:hover': { textDecoration: 'underline' },
                  display: 'block'
                }}
              >
                Stays
              </Box>
            </Stack>
          </Box>

          {/* Community */}
          <Box sx={{ mb: { xs: 2, md: 0 } }}>
            <Typography 
              sx={{ 
                color: '#222222', 
                fontWeight: 600, 
                mb: { xs: 1.5, md: 2.5 }, 
                fontSize: { xs: '0.8125rem', md: '0.875rem' }
              }}
            >
              Community
            </Typography>
            <Stack spacing={{ xs: 1, md: 1.5 }}>
              <Box 
                component={Link} 
                href="/wishlist" 
                onClick={scrollToTop} 
                sx={{ 
                  color: '#222222', 
                  textDecoration: 'none', 
                  fontSize: { xs: '0.8125rem', md: '0.875rem' }, 
                  '&:hover': { textDecoration: 'underline' },
                  display: 'block'
                }}
              >
                Wishlist
              </Box>
              <Box 
                component={Link} 
                href="/booking" 
                onClick={scrollToTop} 
                sx={{ 
                  color: '#222222', 
                  textDecoration: 'none', 
                  fontSize: { xs: '0.8125rem', md: '0.875rem' }, 
                  '&:hover': { textDecoration: 'underline' },
                  display: 'block'
                }}
              >
                Bookings
              </Box>
              <Box 
                component={Link} 
                href="/profile/settings" 
                onClick={scrollToTop} 
                sx={{ 
                  color: '#222222', 
                  textDecoration: 'none', 
                  fontSize: { xs: '0.8125rem', md: '0.875rem' }, 
                  '&:hover': { textDecoration: 'underline' },
                  display: 'block'
                }}
              >
                Profile
              </Box>
            </Stack>
          </Box>
        </Box>

        <Divider sx={{ my: { xs: 2, md: 3 }, borderColor: '#DDDDDD' }} />

        {/* Bottom Section */}
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' }, 
            justifyContent: 'center', 
            alignItems: 'center', 
            gap: { xs: 1.5, md: 2 }
          }}
        >
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', sm: 'row' }, 
              gap: { xs: 1, sm: 2, md: 3 }, 
              alignItems: 'center', 
              justifyContent: 'center', 
              textAlign: { xs: 'center', sm: 'left' },
              flexWrap: 'wrap'
            }}
          >
            <Typography 
              sx={{ 
                color: '#222222', 
                fontSize: { xs: '0.8125rem', md: '0.875rem' }
              }}
            >
              © {new Date().getFullYear()} LipaBnb, Inc.
            </Typography>
            <Box 
              component="span" 
              sx={{ 
                display: { xs: 'none', sm: 'inline' }, 
                color: '#717171',
                fontSize: { xs: '0.8125rem', md: '0.875rem' }
              }}
            >
              ·
            </Box>
            <Box 
              component={Link} 
              href="/privacy-policy" 
              onClick={scrollToTop} 
              sx={{ 
                color: '#222222', 
                textDecoration: 'none', 
                fontSize: { xs: '0.8125rem', md: '0.875rem' }, 
                '&:hover': { textDecoration: 'underline' },
                whiteSpace: 'nowrap'
              }}
            >
              Privacy
            </Box>
            <Box 
              component="span" 
              sx={{ 
                display: { xs: 'none', sm: 'inline' }, 
                color: '#717171',
                fontSize: { xs: '0.8125rem', md: '0.875rem' }
              }}
            >
              ·
            </Box>
            <Box 
              component={Link} 
              href="/terms-of-service" 
              onClick={scrollToTop} 
              sx={{ 
                color: '#222222', 
                textDecoration: 'none', 
                fontSize: { xs: '0.8125rem', md: '0.875rem' }, 
                '&:hover': { textDecoration: 'underline' },
                whiteSpace: 'nowrap'
              }}
            >
              Terms of Service
            </Box>
          </Box>
        </Box>
      </MUIContainer>
    </Box>
  )
}
