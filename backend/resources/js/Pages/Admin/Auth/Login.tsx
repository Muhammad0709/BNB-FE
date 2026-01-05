import { useState } from 'react'
import { Box, Button, Paper, Stack, TextField, Typography, Link } from '@mui/material'
import { Container, Row, Col } from 'react-bootstrap'
import { Link as InertiaLink, useForm } from '@inertiajs/react'
// Images served from public directory
const logoUrl = '/images/lipabnb-logo.svg'

export default function AdminLogin() {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post('/login', {
      onSuccess: () => {
        // Redirect will be handled by the controller
      }
    })
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#F9FAFB' }}>
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} sm={8} md={6} lg={4}>
            <Paper elevation={0} sx={{ p: 4, borderRadius: '20px !important', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Box component="img" src={logoUrl} alt="lipabnb" sx={{ height: 40, mb: 2 }} />
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#111827', mb: 1 }}>
                  Login
                </Typography>
                <Typography variant="body2" sx={{ color: '#6B7280' }}>
                  Sign in to access the admin dashboard
                </Typography>
              </Box>

              <form onSubmit={handleSubmit}>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    required
                    variant="outlined"
                    error={!!errors.email}
                    helperText={errors.email}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px !important',
                        '& fieldset': {
                          borderRadius: '12px !important',
                        },
                        '&:hover fieldset': {
                          borderRadius: '12px !important',
                        },
                        '&.Mui-focused fieldset': {
                          borderRadius: '12px !important',
                        },
                      }
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type="password"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    required
                    variant="outlined"
                    error={!!errors.password}
                    helperText={errors.password}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px !important',
                        '& fieldset': {
                          borderRadius: '12px !important',
                        },
                        '&:hover fieldset': {
                          borderRadius: '12px !important',
                        },
                        '&.Mui-focused fieldset': {
                          borderRadius: '12px !important',
                        },
                      }
                    }}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={processing}
                    sx={{
                      bgcolor: '#FF385C',
                      borderRadius: '999px',
                      py: 1.5,
                      fontWeight: 700,
                      textTransform: 'none',
                      fontSize: '0.875rem',
                      '&:hover': { bgcolor: '#E61E4D' }
                    }}
                  >
                    {processing ? 'Signing in...' : 'Sign In'}
                  </Button>

                  <Box sx={{ textAlign: 'center', mt: 2 }}>
                    <Typography variant="body2" sx={{ color: '#6B7280' }}>
                      Don't have an account?{' '}
                      <Link
                        component={InertiaLink}
                        href="/register"
                        sx={{
                          color: '#FF385C',
                          fontWeight: 600,
                          textDecoration: 'none',
                          '&:hover': { textDecoration: 'underline' }
                        }}
                      >
                        Sign Up
                      </Link>
                    </Typography>
                  </Box>
                </Stack>
              </form>
            </Paper>
          </Col>
        </Row>
      </Container>
    </Box>
  )
}

