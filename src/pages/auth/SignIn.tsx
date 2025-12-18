import { Box, Button, Checkbox, FormControlLabel, Link as MUILink, Paper, Stack, TextField, Typography } from '@mui/material'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import logoUrl from '../../assets/images/logo-main.png'
import socialIcon from '../../assets/images/Social-icon.svg'

export default function SignIn() {
  const formWidth = 600
  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Container>
        <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Box sx={{ maxWidth: 1160, width: '100%', mx: 'auto', px: { xs: 2, md: 3 }, py: { xs: 4, md: 6 } }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Box>
                <Stack alignItems="center" sx={{ mb: { xs: 3, md: 4 } }}>
                  <Link to="/" style={{ textDecoration: 'none', display: 'block' }}>
                    <Box 
                      component="img" 
                      src={logoUrl} 
                      alt="lipabnb" 
                      sx={{ 
                        height: { xs: 120, md: 150 },
                        width: 'auto',
                        maxWidth: { xs: 450, md: 600 },
                        objectFit: 'contain',
                        display: 'block',
                        cursor: 'pointer',
                        margin: '0 auto'
                      }} 
                    />
                  </Link>
                </Stack>

                <Typography variant="h4" fontWeight={700} sx={{ mb: { xs: 1.5, md: 2 }, fontSize: { xs: 28, sm: 32, md: 44 }, lineHeight: 1.15 }}>
                Welcome to Bondoqi
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: { xs: 4, md: 5 } }}>
                Please enter your details.
                </Typography>

                <Paper elevation={0} sx={{ bgcolor: 'transparent' }}>
                  <Stack spacing={2.5}>
                    <Box>
                      <Typography variant="subtitle2" sx={{ mb: 1, color: '#6B7280', fontSize: 14, fontWeight: 600, display: 'flex' }}>Email</Typography>
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
                      <Typography variant="subtitle2" sx={{ mb: 1, color: '#6B7280', fontSize: 14, fontWeight: 600, display: 'flex' }}>Password</Typography>
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
                        placeholder="Enter your password"
                      />
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <FormControlLabel control={<Checkbox size="small" />} label="Remember me" sx={{ color: '#151515' }} />
                      <MUILink component={Link} to="#" underline="none" sx={{ color: '#667085', fontWeight: 600 }}>Forgot password</MUILink>
                    </Box>

                    <Button variant="contained" size="large" sx={{ width: { xs: '100%', md: formWidth }, height: 52, borderRadius: 999, textTransform: 'none', fontWeight: 700, fontSize: 16, bgcolor: '#AD542D', boxShadow: 'none', '&:hover': { bgcolor: '#78381C', boxShadow: 'none' } }}>
                      Sign in
                    </Button>

                    <Button
                      variant="outlined"
                      size="large"
                      startIcon={<Box component="img" src={socialIcon} alt="Google" sx={{ width: 24, height: 24 }} />}
                      sx={{ width: { xs: '100%', md: formWidth }, height: 52, borderRadius: 999, borderColor: '#D0D5DD', color: '#344054' }}
                    >
                      Sign in with Google
                    </Button>
                  </Stack>
                </Paper>

                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mt: 4 }}>
                  Don’t have an account?{' '}
                  <MUILink component={Link} to="/auth/signup" underline="none" sx={{ color: '#AD542D', fontWeight: 600 }}>
                    Sign up
                  </MUILink>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}


