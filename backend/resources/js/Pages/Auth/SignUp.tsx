import React from 'react'
import { Head, Link, useForm } from '@inertiajs/react'
import { Box, Button, Link as MUILink, Paper, Stack, TextField, Typography } from '@mui/material'
import { Container } from 'react-bootstrap'
// Images will be served from public directory
const socialIcon = '/images/Social-icon.svg'
const logoUrl = '/images/lipabnb-logo.svg'
const loginIllustration = '/images/login.svg'

export default function SignUp() {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  })

  const formWidth = 600
  const gapX = 48
  const artHeight = 640

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post('/auth/register')
  }

  return (
    <>
      <Head title="Sign Up" />
      <Box sx={{ minHeight: '100vh' }}>
        <Container>
          <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ maxWidth: 1160, width: '100%', mx: 'auto', px: { xs: 2, md: 3 }, py: { xs: 4, md: 6 } }}>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: `${formWidth}px ${gapX}px 1fr` }, columnGap: { md: `${gapX}px` }, rowGap: { xs: 4, md: 0 }, alignItems: 'center' }}>
                {/* Left form */}
                <Box>
                  <Stack alignItems="center" sx={{ mb: 4 }}>
                    <Box component="img" src={logoUrl} alt="lipabnb" />
                  </Stack>
                  <Typography variant="h4" fontWeight={700} sx={{ mb: 2, fontSize: { xs: '2rem', md: '2rem' }, lineHeight: 1.15 }}>
                    Create an account
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 6, fontSize: { md: '1rem' } }}>
                    Start your 30-day free trial.
                  </Typography>

                  <Paper elevation={0} sx={{ bgcolor: 'transparent' }}>
                    <form onSubmit={handleSubmit}>
                      <Stack spacing={2.5}>
                        <Box>
                          <Typography variant="subtitle2" sx={{ mb: 1, color: '#6B7280', fontSize: 14, fontWeight: 600, display: 'flex' }}>Name*</Typography>
                          <TextField
                            name="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            error={!!errors.name}
                            helperText={errors.name}
                            sx={{
                              width: { xs: '100%', md: formWidth },
                              '& .MuiOutlinedInput-root': {
                                height: 52,
                                bgcolor: '#FFFFFF',
                                borderRadius: '12px !important',
                                '& fieldset': { 
                                  borderColor: '#E6E8EC',
                                  borderRadius: '12px !important',
                                },
                                '&:hover fieldset': { 
                                  borderColor: '#D1D5DB',
                                  borderRadius: '12px !important',
                                },
                                '&.Mui-focused fieldset': { 
                                  borderColor: '#C7CBD4',
                                  borderRadius: '12px !important',
                                },
                              },
                              '& .MuiInputBase-input::placeholder': { color: '#9AA0A6', opacity: 1 },
                            }}
                            placeholder="Enter your name"
                          />
                        </Box>
                        <Box>
                          <Typography variant="subtitle2" sx={{ mb: 1, color: '#6B7280', fontSize: 14, fontWeight: 600, display: 'flex' }}>Email*</Typography>
                          <TextField
                            name="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            error={!!errors.email}
                            helperText={errors.email}
                            sx={{
                              width: { xs: '100%', md: formWidth },
                              '& .MuiOutlinedInput-root': {
                                height: 52,
                                bgcolor: '#FFFFFF',
                                borderRadius: '12px !important',
                                '& fieldset': { 
                                  borderColor: '#E6E8EC',
                                  borderRadius: '12px !important',
                                },
                                '&:hover fieldset': { 
                                  borderColor: '#D1D5DB',
                                  borderRadius: '12px !important',
                                },
                                '&.Mui-focused fieldset': { 
                                  borderColor: '#C7CBD4',
                                  borderRadius: '12px !important',
                                },
                              },
                              '& .MuiInputBase-input::placeholder': { color: '#9AA0A6', opacity: 1 },
                            }}
                            placeholder="Enter your email"
                          />
                        </Box>
                        <Box>
                          <Typography variant="subtitle2" sx={{ mb: 1, color: '#6B7280', fontSize: 14, fontWeight: 600, display: 'flex' }}>Password*</Typography>
                          <TextField
                            name="password"
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            error={!!errors.password}
                            helperText={errors.password}
                            sx={{
                              width: { xs: '100%', md: formWidth },
                              '& .MuiOutlinedInput-root': {
                                height: 52,
                                bgcolor: '#FFFFFF',
                                borderRadius: '12px !important',
                                '& fieldset': { 
                                  borderColor: '#E6E8EC',
                                  borderRadius: '12px !important',
                                },
                                '&:hover fieldset': { 
                                  borderColor: '#D1D5DB',
                                  borderRadius: '12px !important',
                                },
                                '&.Mui-focused fieldset': { 
                                  borderColor: '#C7CBD4',
                                  borderRadius: '12px !important',
                                },
                              },
                              '& .MuiInputBase-input::placeholder': { color: '#9AA0A6', opacity: 1 },
                            }}
                            placeholder="Create a password"
                          />
                          <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', mt: 1 }}>Must be at least 8 characters.</Typography>
                        </Box>
                        <Box>
                          <Typography variant="subtitle2" sx={{ mb: 1, color: '#6B7280', fontSize: 14, fontWeight: 600, display: 'flex' }}>Confirm Password*</Typography>
                          <TextField
                            name="password_confirmation"
                            type="password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            error={!!errors.password_confirmation}
                            helperText={errors.password_confirmation}
                            sx={{
                              width: { xs: '100%', md: formWidth },
                              '& .MuiOutlinedInput-root': {
                                height: 52,
                                bgcolor: '#FFFFFF',
                                borderRadius: '12px !important',
                                '& fieldset': { 
                                  borderColor: '#E6E8EC',
                                  borderRadius: '12px !important',
                                },
                                '&:hover fieldset': { 
                                  borderColor: '#D1D5DB',
                                  borderRadius: '12px !important',
                                },
                                '&.Mui-focused fieldset': { 
                                  borderColor: '#C7CBD4',
                                  borderRadius: '12px !important',
                                },
                              },
                              '& .MuiInputBase-input::placeholder': { color: '#9AA0A6', opacity: 1 },
                            }}
                            placeholder="Confirm your password"
                          />
                        </Box>

                        <Button 
                          type="submit"
                          variant="contained" 
                          size="large" 
                          disabled={processing}
                          sx={{ width: { xs: '100%', md: formWidth }, height: 52, borderRadius: 999, textTransform: 'none', fontWeight: 700, fontSize: '0.875rem', bgcolor: '#FF385C', boxShadow: 'none', '&:hover': { bgcolor: '#E61E4D', boxShadow: 'none' } }}
                        >
                          {processing ? 'Creating account...' : 'Get started'}
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
                    </form>
                  </Paper>

                  <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', m: 4 }}>
                    Already have an account?{' '}
                    <MUILink component={Link} href="/auth/login" underline="none" sx={{ color: '#FF385C', fontWeight: 600 }}>
                      Log in
                    </MUILink>
                  </Typography>
                </Box>

                {/* Gap (hidden on xs) */}
                <Box sx={{ display: { xs: 'none', md: 'block' } }} />

                {/* Right art card */}
                <Box sx={{ display: { xs: 'block', md: 'block' } }}>
                  <Box sx={{ borderRadius: 0, overflow: 'visible', bgcolor: 'transparent', boxShadow: 'none', height: { xs: 240, sm: 300, md: artHeight }, mx: { xs: 'auto', md: 0 }, maxWidth: { xs: 520, md: 'none' } }}>
                    <Box component="img" src={loginIllustration} alt="illustration" sx={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  )
}

