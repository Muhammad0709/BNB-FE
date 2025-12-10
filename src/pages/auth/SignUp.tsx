import { Box, Button, Link as MUILink, Paper, Stack, TextField, Typography } from '@mui/material'
import { Container } from 'react-bootstrap'
// removed MUI Google icon in favor of brand asset
import socialIcon from '../../assets/images/Social-icon.svg'
import { Link } from 'react-router-dom'
import logoUrl from '../../assets/images/lipabnb-logo.svg'
import loginIllustration from '../../assets/images/login.svg'

export default function SignUp() {
  const formWidth = 600
  const gapX = 48
  return (
    <Box sx={{ minHeight: '100vh',  }}>
      <Container>
        <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Box sx={{ maxWidth: 1160, width: '100%', mx: 'auto', px: { xs: 2, md: 3 }, py: { xs: 4, md: 6 } }}>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: `${formWidth}px ${gapX}px 1fr` }, columnGap: { md: `${gapX}px` }, rowGap: { xs: 4, md: 0 }, alignItems: 'center' }}>
            {/* Left form */}
            <Box>
              <Stack alignItems="center" sx={{ mb: 4 }}>
                <Box component="img" src={logoUrl} alt="lipabnb" />
              </Stack>
              <Typography variant="h4" fontWeight={700} sx={{ mb: 2, fontSize: { xs: 32, md: 30 }, lineHeight: 1.15 }}>
                Create an account
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 6, fontSize: { md: 18 } }}>
                Start your 30-day free trial.
              </Typography>

              <Paper elevation={0} sx={{ bgcolor: 'transparent' }}>
                <Stack spacing={2.5}>
                  <Box>
                    <Typography variant="subtitle2" sx={{ mb: 1, color: '#6B7280', fontSize: 14, fontWeight: 600 , display: 'flex'}}>Name*</Typography>
                    <TextField
                      sx={{
                        width: { xs: '100%', md: formWidth },
                        '& .MuiOutlinedInput-root': {
                          height: 52,
                          bgcolor: '#FFFFFF',
                          borderRadius: 0.5,
                          '& fieldset': { borderColor: '#E6E8EC' },
                          '&:hover fieldset': { borderColor: '#D1D5DB' },
                          '&.Mui-focused fieldset': { borderColor: '#C7CBD4' },
                        },
                        '& .MuiInputBase-input::placeholder': { color: '#9AA0A6', opacity: 1 },
                      }}
                      placeholder="Enter your name"
                    />
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" sx={{ mb: 1, color: '#6B7280', fontSize: 14, fontWeight: 600, display: 'flex' }}>Email*</Typography>
                    <TextField
                      type="email"
                      sx={{
                        width: { xs: '100%', md: formWidth },
                        '& .MuiOutlinedInput-root': {
                          height: 52,
                          bgcolor: '#FFFFFF',
                          borderRadius: 0.5,
                          '& fieldset': { borderColor: '#E6E8EC' },
                          '&:hover fieldset': { borderColor: '#D1D5DB' },
                          '&.Mui-focused fieldset': { borderColor: '#C7CBD4' },
                        },
                        '& .MuiInputBase-input::placeholder': { color: '#9AA0A6', opacity: 1 },
                      }}
                      placeholder="Enter your email"
                    />
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" sx={{ mb: 1, color: '#6B7280', fontSize: 14, fontWeight: 600, display: 'flex' }}>Password*</Typography>
                    <TextField
                      type="password"
                      sx={{
                        width: { xs: '100%', md: formWidth },
                        '& .MuiOutlinedInput-root': {
                          height: 52,
                          bgcolor: '#FFFFFF',
                          borderRadius: 0.5,
                          '& fieldset': { borderColor: '#E6E8EC' },
                          '&:hover fieldset': { borderColor: '#D1D5DB' },
                          '&.Mui-focused fieldset': { borderColor: '#C7CBD4' },
                        },
                        '& .MuiInputBase-input::placeholder': { color: '#9AA0A6', opacity: 1 },
                      }}
                      placeholder="Create a password"
                    />
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', mt: 1 }}>Must be at least 8 characters.</Typography>
                  </Box>

                  <Button variant="contained" size="large" sx={{ width: { xs: '100%', md: formWidth }, height: 52, borderRadius: 999, textTransform: 'none', fontWeight: 700, fontSize: 16, bgcolor: '#FF385C', boxShadow: 'none', '&:hover': { bgcolor: '#E61E4D', boxShadow: 'none' } }}>
                    Get started
                  </Button>

                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<Box component="img" src={socialIcon} alt="Google" sx={{ width: 24, height: 24 }} />}
                    sx={{ width: { xs: '100%', md: formWidth }, height: 52, borderRadius: 999, borderColor: '#D0D5DD', color: '#344054' }}
                  >
                    Sign up with Google
                  </Button>
                </Stack>
              </Paper>

         

              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', m: 4 }}>
                Already have an account?{' '}
                <MUILink component={Link} to="/auth/login" underline="none" sx={{ color: '#FF385C', fontWeight: 600 }}>
                  Log in
                </MUILink>
              </Typography>
            </Box>

            {/* Gap (hidden on xs) */}
            <Box sx={{ display: { xs: 'none', md: 'block' } }} />

            {/* Right art card */}
            <Box sx={{ display: { xs: 'block', md: 'flex' }, alignItems: 'center', justifyContent: 'center' }}>
              <Box sx={{ 
                borderRadius: 0, 
                overflow: 'visible', 
                bgcolor: 'transparent', 
                boxShadow: 'none', 
                width: { xs: '100%', md: '100%' },
                mx: { xs: 'auto', md: 0 }, 
                maxWidth: { xs: 800, sm: 900, md: '100%' },
                minWidth: { md: 600 },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Box 
                  component="img" 
                  src={loginIllustration} 
                  alt="illustration" 
                  sx={{ 
                    width: '100%', 
                    height: 'auto', 
                    objectFit: 'contain',
                    maxWidth: { xs: '100%', md: '100%' }
                  }} 
                />
              </Box>
            </Box>
          </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}


