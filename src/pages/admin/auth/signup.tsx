import { useState, useEffect } from 'react'
import { Box, Button, Paper, Stack, TextField, Typography, Link } from '@mui/material'
import { Container, Row, Col } from 'react-bootstrap'
import { useNavigate, Link as RouterLink, useSearchParams } from 'react-router-dom'
import logoUrl from '../../../assets/images/lipabnb-logo.svg'
import socialIcon from '../../../assets/images/Social-icon.svg'

export default function HostSignup() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })

  // Populate form data from URL params or localStorage
  useEffect(() => {
    // Check URL parameters first
    const emailParam = searchParams.get('email')
    const firstNameParam = searchParams.get('firstName')
    const lastNameParam = searchParams.get('lastName')
    const phoneParam = searchParams.get('phone')

    // Check localStorage for previous form data
    const savedFormData = localStorage.getItem('hostSignupFormData')
    
    // Hardcoded test data (for testing when user is not logged in)
    const hardcodedTestData = {
      email: 'john.doe@example.com',
      firstName: 'John',
      lastName: 'Doe',
      phone: '+1 (555) 123-4567'
    }
    
    if (emailParam || firstNameParam || lastNameParam || phoneParam) {
      // Populate from URL params (highest priority)
      setFormData(prev => ({
        ...prev,
        email: emailParam || prev.email,
        firstName: firstNameParam || prev.firstName,
        lastName: lastNameParam || prev.lastName,
        phone: phoneParam || prev.phone
      }))
    } else if (savedFormData) {
      // Populate from localStorage (second priority)
      try {
        const parsed = JSON.parse(savedFormData)
        setFormData(prev => ({
          ...prev,
          email: parsed.email || prev.email,
          firstName: parsed.firstName || prev.firstName,
          lastName: parsed.lastName || prev.lastName,
          phone: parsed.phone || prev.phone
        }))
      } catch (e) {
        console.error('Error parsing saved form data:', e)
      }
    } else {
      // Check if user is logged in and get their data
      const userData = localStorage.getItem('userData') || 
                      localStorage.getItem('user') || 
                      localStorage.getItem('authUser')
      
      if (userData) {
        try {
          const user = JSON.parse(userData)
          setFormData(prev => ({
            ...prev,
            email: user.email || prev.email,
            firstName: user.firstName || user.name?.split(' ')[0] || prev.firstName,
            lastName: user.lastName || user.name?.split(' ')[1] || prev.lastName,
            phone: user.phone || prev.phone
          }))
        } catch (e) {
          console.error('Error parsing user data:', e)
          // If error, use hardcoded data
          setFormData(prev => ({
            ...prev,
            email: hardcodedTestData.email,
            firstName: hardcodedTestData.firstName,
            lastName: hardcodedTestData.lastName,
            phone: hardcodedTestData.phone
          }))
        }
      } else {
        // No user data found - use hardcoded test data
        setFormData(prev => ({
          ...prev,
          email: hardcodedTestData.email,
          firstName: hardcodedTestData.firstName,
          lastName: hardcodedTestData.lastName,
          phone: hardcodedTestData.phone
        }))
      }
    }
  }, [searchParams])

  // Save form data to localStorage as user types
  useEffect(() => {
    if (formData.email || formData.firstName || formData.lastName || formData.phone) {
      const dataToSave = {
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone
      }
      localStorage.setItem('hostSignupFormData', JSON.stringify(dataToSave))
    }
  }, [formData.email, formData.firstName, formData.lastName, formData.phone])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Host signup data:', formData)
    
    // Clear saved form data after successful submission
    localStorage.removeItem('hostSignupFormData')
    
    // Navigate to host dashboard on successful signup
    navigate('/host/dashboard')
  }

  const handleGoogleSignup = () => {
    // Handle Google signup here
    console.log('Google signup clicked')
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
                  Sign Up
                </Typography>
                <Typography variant="body2" sx={{ color: '#717171' }}>
                  Create your account to get started
                </Typography>
              </Box>

              <form onSubmit={handleSubmit}>
                <Stack spacing={3}>
                  <Stack direction="row" spacing={2}>
                    <TextField
                      fullWidth
                      label="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      variant="outlined"
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                    <TextField
                      fullWidth
                      label="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      variant="outlined"
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                  </Stack>

                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    variant="outlined"
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                  />

                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    variant="outlined"
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                  />

                  <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    variant="outlined"
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                  />

                  <TextField
                    fullWidth
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    variant="outlined"
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                      bgcolor: '#AD542D',
                      borderRadius: 2,
                      py: 1.5,
                      fontWeight: 700,
                      textTransform: 'none',
                      fontSize: 16,
                      '&:hover': { bgcolor: '#78381C' }
                    }}
                  >
                    Sign Up
                  </Button>

                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={handleGoogleSignup}
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
                    Sign up with Google
                  </Button>

                  <Box sx={{ textAlign: 'center', mt: 2 }}>
                    <Typography variant="body2" sx={{ color: '#717171' }}>
                      Already have an account?{' '}
                      <Link
                        component={RouterLink}
                        to="/login"
                        sx={{
                          color: '#AD542D',
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

