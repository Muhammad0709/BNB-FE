import { useState } from 'react'
import { Box, Button, Paper, Stack, TextField, Typography, Link } from '@mui/material'
import { Container, Row, Col } from 'react-bootstrap'
import { Link as InertiaLink, useForm } from '@inertiajs/react'
// Images served from public directory
const logoUrl = '/images/lipabnb-logo.svg'

export default function HostSignup() {
  const { data, setData, post, processing, errors } = useForm({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setData(name as any, value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post('/register', {
      onSuccess: () => {
        // Redirect will be handled by the controller
      }
    })
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#F9FAFB' }}>
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} sm={8} md={6} lg={5}>
            <Paper elevation={0} sx={{ p: 4, borderRadius: '20px !important', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Box component="img" src={logoUrl} alt="lipabnb" sx={{ height: 40, mb: 2 }} />
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#111827', mb: 1 }}>
                  Sign Up
                </Typography>
                <Typography variant="body2" sx={{ color: '#6B7280' }}>
                  Create your host account to get started
                </Typography>
              </Box>

              <form onSubmit={handleSubmit}>
                <Stack spacing={3}>
                  <Stack direction="row" spacing={2}>
                    <TextField
                      fullWidth
                      label="First Name"
                      name="firstName"
                      value={data.firstName}
                      onChange={handleChange}
                      required
                      variant="outlined"
                      error={!!errors.firstName}
                      helperText={errors.firstName}
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
                      label="Last Name"
                      name="lastName"
                      value={data.lastName}
                      onChange={handleChange}
                      required
                      variant="outlined"
                      error={!!errors.lastName}
                      helperText={errors.lastName}
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
                  </Stack>

                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={data.email}
                    onChange={handleChange}
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
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    value={data.phone}
                    onChange={handleChange}
                    required
                    variant="outlined"
                    error={!!errors.phone}
                    helperText={errors.phone}
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
                    onChange={handleChange}
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

                  <TextField
                    fullWidth
                    label="Confirm Password"
                    name="password_confirmation"
                    type="password"
                    value={data.password_confirmation}
                    onChange={handleChange}
                    required
                    variant="outlined"
                    error={!!errors.password_confirmation}
                    helperText={errors.password_confirmation}
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
                    {processing ? 'Creating account...' : 'Sign Up'}
                  </Button>

                  <Box sx={{ textAlign: 'center', mt: 2 }}>
                    <Typography variant="body2" sx={{ color: '#6B7280' }}>
                      Already have an account?{' '}
                      <Link
                        component={InertiaLink}
                        href="/login"
                        sx={{
                          color: '#FF385C',
                          fontWeight: 600,
                          textDecoration: 'none',
                          '&:hover': { textDecoration: 'underline' }
                        }}
                      >
                        Sign In
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

