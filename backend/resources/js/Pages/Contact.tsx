import { useState } from 'react'
import { Box, Button, Paper, Stack, TextField, Typography } from '@mui/material'
import { Container, Row, Col } from 'react-bootstrap'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import Toast from '../Components/shared/Toast'
import SendIcon from '@mui/icons-material/Send'
import { Head } from '@inertiajs/react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' })

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validate = () => {
    const newErrors = { name: '', email: '', subject: '', message: '' }
    let isValid = true

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
      isValid = false
    } else if (formData.name.trim().length < 10) {
      newErrors.name = 'Name must be at least 10 characters'
      isValid = false
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
      isValid = false
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
      isValid = false
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required'
      isValid = false
    } else if (formData.subject.trim().length < 10) {
      newErrors.subject = 'Subject must be at least 10 characters'
      isValid = false
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
      isValid = false
    } else if (formData.message.trim().length < 100) {
      newErrors.message = 'Message must be at least 100 characters'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      console.log('Form submitted:', formData)
      // Handle form submission here
      setToast({ open: true, message: 'Thank you for your message! We will get back to you soon.', severity: 'success' })
      setFormData({ name: '', email: '', subject: '', message: '' })
      setErrors({ name: '', email: '', subject: '', message: '' })
    }
  }

  return (
    <>
      <Head title="Contact Us" />
      <Box>
        <Navbar />
        <Box className="contact-page">
          <Container>
            {/* Header Section */}
            <Box sx={{ textAlign: 'center', mb: 6, mt: 4 }}>
              <Typography variant="h2" sx={{ fontSize: '2.5rem', fontWeight: 800, color: '#111827', mb: 2 }}>
                Contact Us
              </Typography>
              <Typography variant="body1" sx={{ color: '#6B7280', fontSize: '1.125rem',  mx: 'auto' }}>
                Get in touch with us. We're here to help and answer any questions you might have.
              </Typography>
            </Box>

            <Row className="g-4 justify-content-center">
              {/* Contact Form */}
              <Col xs={12} md={10} lg={8} xl={6}>
                <Paper elevation={0} sx={{ p: 4, border: '1px solid #E5E7EB', borderRadius: '16px' }}>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: '#111827', mb: 3 }}>
                    Send us a Message
                  </Typography>
                  
                  <form onSubmit={handleSubmit}>
                    <Stack spacing={3}>
                      <Box>
                        <Typography sx={{ fontWeight: 600, color: '#111827', mb: 1, fontSize: '0.875rem' }}>
                          Name
                        </Typography>
                        <TextField
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          fullWidth
                          required
                          size="small"
                          error={!!errors.name}
                          helperText={errors.name}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '12px',
                              '& fieldset': {
                                borderColor: errors.name ? '#EF4444' : '#D0D5DD'
                              }
                            }
                          }}
                        />
                      </Box>

                      <Box>
                        <Typography sx={{ fontWeight: 600, color: '#111827', mb: 1, fontSize: '0.875rem' }}>
                          Email
                        </Typography>
                        <TextField
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your.email@example.com"
                          fullWidth
                          required
                          size="small"
                          error={!!errors.email}
                          helperText={errors.email}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '12px',
                              '& fieldset': {
                                borderColor: errors.email ? '#EF4444' : '#D0D5DD'
                              }
                            }
                          }}
                        />
                      </Box>

                      <Box>
                        <Typography sx={{ fontWeight: 600, color: '#111827', mb: 1, fontSize: '0.875rem' }}>
                          Subject
                        </Typography>
                        <TextField
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="What is this regarding?"
                          fullWidth
                          required
                          size="small"
                          error={!!errors.subject}
                          helperText={errors.subject}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '12px',
                              '& fieldset': {
                                borderColor: errors.subject ? '#EF4444' : '#D0D5DD'
                              }
                            }
                          }}
                        />
                      </Box>

                      <Box>
                        <Typography sx={{ fontWeight: 600, color: '#111827', mb: 1, fontSize: '0.875rem' }}>
                          Message
                        </Typography>
                        <TextField
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tell us more about your inquiry..."
                          fullWidth
                          required
                          multiline
                          rows={6}
                          error={!!errors.message}
                          helperText={errors.message}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '12px',
                              '& fieldset': {
                                borderColor: errors.message ? '#EF4444' : '#D0D5DD'
                              }
                            }
                          }}
                        />
                      </Box>

                      <Button
                        type="submit"
                        variant="contained"
                        startIcon={<SendIcon />}
                        sx={{
                          bgcolor: '#FF385C',
                          borderRadius: '999px',
                          py: 1.5,
                          textTransform: 'none',
                          fontWeight: 700,
                          fontSize: '1rem',
                          '&:hover': {
                            bgcolor: '#E61E4D'
                          }
                        }}
                      >
                        Send Message
                      </Button>
                    </Stack>
                  </form>
                </Paper>
              </Col>
            </Row>
          </Container>
        </Box>
        <Footer />
        
        <Toast
          open={toast.open}
          onClose={() => setToast({ ...toast, open: false })}
          message={toast.message}
          severity={toast.severity}
        />
      </Box>
    </>
  )
}
