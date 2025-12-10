import { Box, Container as MUIContainer, Divider, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: '#F7F7F7', color: '#222222', mt: 8, borderTop: '1px solid #DDDDDD' }}>
      <MUIContainer maxWidth={false} sx={{ maxWidth: { xs: '100%', md: 1160, xl: 1440 }, px: { xs: 2, md: 3 }, py: { xs: 5, md: 6 }, mx: 'auto' }}>
        {/* Main Footer Links */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: { xs: 4, md: 6 }, mb: 4 }}>
          {/* Support */}
          <Box>
            <Typography sx={{ color: '#222222', fontWeight: 600, mb: 2.5, fontSize: '0.875rem' }}>Support</Typography>
            <Stack spacing={1.5}>
              <Box component={Link} to="/contact" sx={{ color: '#222222', textDecoration: 'none', fontSize: '0.875rem', '&:hover': { textDecoration: 'underline' } }}>Contact Us</Box>
              <Box component={Link} to="/contact" sx={{ color: '#222222', textDecoration: 'none', fontSize: '0.875rem', '&:hover': { textDecoration: 'underline' } }}>Help Center</Box>
              <Box component={Link} to="/auth/login" sx={{ color: '#222222', textDecoration: 'none', fontSize: '0.875rem', '&:hover': { textDecoration: 'underline' } }}>Log in</Box>
              <Box component={Link} to="/auth/signup" sx={{ color: '#222222', textDecoration: 'none', fontSize: '0.875rem', '&:hover': { textDecoration: 'underline' } }}>Sign up</Box>
            </Stack>
          </Box>

          {/* Hosting */}
          <Box>
            <Typography sx={{ color: '#222222', fontWeight: 600, mb: 2.5, fontSize: '0.875rem' }}>Hosting</Typography>
            <Stack spacing={1.5}>
              <Box component={Link} to="/host" sx={{ color: '#222222', textDecoration: 'none', fontSize: '0.875rem', '&:hover': { textDecoration: 'underline' } }}>Become a Host</Box>
              <Box component={Link} to="/host" sx={{ color: '#222222', textDecoration: 'none', fontSize: '0.875rem', '&:hover': { textDecoration: 'underline' } }}>Host Resources</Box>
              <Box component={Link} to="/host" sx={{ color: '#222222', textDecoration: 'none', fontSize: '0.875rem', '&:hover': { textDecoration: 'underline' } }}>Host Dashboard</Box>
            </Stack>
          </Box>

          {/* LipaBnb */}
          <Box>
            <Typography sx={{ color: '#222222', fontWeight: 600, mb: 2.5, fontSize: '0.875rem' }}>LipaBnb</Typography>
            <Stack spacing={1.5}>
              <Box component={Link} to="/" sx={{ color: '#222222', textDecoration: 'none', fontSize: '0.875rem', '&:hover': { textDecoration: 'underline' } }}>Home</Box>
              <Box component={Link} to="/about" sx={{ color: '#222222', textDecoration: 'none', fontSize: '0.875rem', '&:hover': { textDecoration: 'underline' } }}>About</Box>
              <Box component={Link} to="/listing" sx={{ color: '#222222', textDecoration: 'none', fontSize: '0.875rem', '&:hover': { textDecoration: 'underline' } }}>Listings</Box>
            </Stack>
          </Box>

          {/* Community */}
          <Box>
            <Typography sx={{ color: '#222222', fontWeight: 600, mb: 2.5, fontSize: '0.875rem' }}>Community</Typography>
            <Stack spacing={1.5}>
              <Box component={Link} to="/wishlist" sx={{ color: '#222222', textDecoration: 'none', fontSize: '0.875rem', '&:hover': { textDecoration: 'underline' } }}>Wishlist</Box>
              <Box component={Link} to="/booking" sx={{ color: '#222222', textDecoration: 'none', fontSize: '0.875rem', '&:hover': { textDecoration: 'underline' } }}>Bookings</Box>
              <Box component={Link} to="/profile/settings" sx={{ color: '#222222', textDecoration: 'none', fontSize: '0.875rem', '&:hover': { textDecoration: 'underline' } }}>Profile</Box>
            </Stack>
          </Box>
        </Box>

        <Divider sx={{ my: 3, borderColor: '#DDDDDD' }} />

        {/* Bottom Section */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'center', alignItems: 'center', gap: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 1, sm: 3 }, alignItems: 'center', justifyContent: 'center', textAlign: { xs: 'center', sm: 'left' } }}>
            <Typography sx={{ color: '#222222', fontSize: '0.875rem' }}>
              © {new Date().getFullYear()} LipaBnb, Inc.
            </Typography>
            <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' }, color: '#717171' }}>·</Box>
            <Box component={Link} to="/contact" sx={{ color: '#222222', textDecoration: 'none', fontSize: '0.875rem', '&:hover': { textDecoration: 'underline' } }}>Privacy</Box>
            <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' }, color: '#717171' }}>·</Box>
            <Box component={Link} to="/terms-of-service" sx={{ color: '#222222', textDecoration: 'none', fontSize: '0.875rem', '&:hover': { textDecoration: 'underline' } }}>Terms of Service</Box>
          </Box>
        </Box>
      </MUIContainer>
    </Box>
  )
}


