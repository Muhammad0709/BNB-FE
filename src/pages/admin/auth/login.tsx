import { useState } from 'react'
import { Box, Button, Paper, Stack, TextField, Typography, Link } from '@mui/material'
import { Container, Row, Col } from 'react-bootstrap'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import logoUrl from '../../../assets/images/lipabnb-logo.svg'
import socialIcon from '../../../assets/images/Social-icon.svg'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Navigate to admin dashboard on successful login
    navigate('/admin/dashboard')
  }

  const handleGoogleLogin = () => {
    // Handle Google login here
    console.log('Google login clicked')
    // You can integrate Google OAuth here
    // navigate('/admin/dashboard')
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#F9FAFB' }}>
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={6} xl={5}>
            <Paper elevation={0} sx={{ p: 4, borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Box component="img" src={logoUrl} alt="lipabnb" sx={{ height: 40, mb: 2 }} />
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#222222', mb: 1 }}>
                 Login
                </Typography>
                <Typography variant="body2" sx={{ color: '#717171' }}>
                  Sign in to access the admin dashboard
                </Typography>
              </Box>

              <form onSubmit={handleSubmit}>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    variant="outlined"
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                  />

                  <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    variant="outlined"
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                      bgcolor: '#FF385C',
                      borderRadius: 2,
                      py: 1.5,
                      fontWeight: 700,
                      textTransform: 'none',
                      fontSize: 16,
                      '&:hover': { bgcolor: '#E61E4D' }
                    }}
                  >
                    Sign In
                  </Button>

                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={handleGoogleLogin}
                    startIcon={<Box component="img" src={socialIcon} alt="Google" sx={{ width: 24, height: 24 }} />}
                    sx={{
                      borderRadius: 2,
                      py: 1.5,
                      fontWeight: 600,
                      textTransform: 'none',
                      fontSize: 16,
                      borderColor: '#D0D5DD',
                      color: '#344054',
                      '&:hover': {
                        borderColor: '#9CA3AF',
                        bgcolor: '#F9FAFB'
                      }
                    }}
                  >
                    Sign in with Google
                  </Button>

                  <Box sx={{ textAlign: 'center', mt: 2 }}>
                    <Typography variant="body2" sx={{ color: '#717171' }}>
                      Don't have an account?{' '}
                      <Link
                        component={RouterLink}
                        to="/register"
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

