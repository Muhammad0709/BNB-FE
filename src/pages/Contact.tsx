import { useState } from 'react'
import { Box, Button, Paper, Stack, TextField, Typography, Chip } from '@mui/material'
import { Container, Row, Col } from 'react-bootstrap'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Toast from '../components/shared/Toast'
import SendIcon from '@mui/icons-material/Send'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import CloseIcon from '@mui/icons-material/Close'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [files, setFiles] = useState<File[]>([])
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setFiles(prev => [...prev, ...newFiles])
    }
  }

  const handleRemoveFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      console.log('Form submitted:', formData)
      console.log('Files:', files)
      // Handle form submission here (including files)
      setToast({ open: true, message: 'Thank you for your message! We will get back to you soon.', severity: 'success' })
      setFormData({ name: '', email: '', subject: '', message: '' })
      setFiles([])
      setErrors({ name: '', email: '', subject: '', message: '' })
    }
  }

  return (
    <Box>
      <Navbar />
      <Box className="contact-page">
        <Container>
          {/* Header Section */}
          <Box sx={{ textAlign: 'center', mb: 6, mt: 4 }}>
            <Typography variant="h2" sx={{ fontSize: '2.5rem', fontWeight: 800, color: '#222222', mb: 2 }}>
              Contact us
            </Typography>
            <Typography variant="body1" sx={{ color: '#717171', fontSize: '1.125rem',  mx: 'auto' }}>
              Get in touch with us. We're here to help and answer any questions you might have.
            </Typography>
          </Box>

          <Row className="g-4 justify-content-center">
            {/* Contact Form */}
            <Col xs={12} md={10} lg={8} xl={6}>
              <Paper elevation={0} sx={{ p: 4, border: '1px solid #E5E7EB', borderRadius: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#222222', mb: 3 }}>
                How can we help you?
                </Typography>
                
                <form onSubmit={handleSubmit}>
                  <Stack spacing={3}>
                    <Box>
                      <Typography sx={{ fontWeight: 600, color: '#222222', mb: 1, fontSize: '0.875rem' }}>
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
                            borderRadius: 2,
                            '& fieldset': {
                              borderColor: errors.name ? '#EF4444' : '#D0D5DD'
                            }
                          }
                        }}
                      />
                    </Box>

                    <Box>
                      <Typography sx={{ fontWeight: 600, color: '#222222', mb: 1, fontSize: '0.875rem' }}>
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
                            borderRadius: 2,
                            '& fieldset': {
                              borderColor: errors.email ? '#EF4444' : '#D0D5DD'
                            }
                          }
                        }}
                      />
                    </Box>

                    <Box>
                      <Typography sx={{ fontWeight: 600, color: '#222222', mb: 1, fontSize: '0.875rem' }}>
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
                            borderRadius: 2,
                            '& fieldset': {
                              borderColor: errors.subject ? '#EF4444' : '#D0D5DD'
                            }
                          }
                        }}
                      />
                    </Box>

                    <Box>
                      <Typography sx={{ fontWeight: 600, color: '#222222', mb: 1, fontSize: '0.875rem' }}>
                        Attach Files (Optional)
                      </Typography>
                      <Box
                        sx={{
                          border: '2px dashed #D0D5DD',
                          borderRadius: 2,
                          p: 2,
                          textAlign: 'center',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            borderColor: '#AD542D',
                            bgcolor: '#FFF5F7'
                          }
                        }}
                      >
                        <input
                          type="file"
                          id="file-upload"
                          multiple
                          onChange={handleFileChange}
                          style={{ display: 'none' }}
                        />
                        <label htmlFor="file-upload">
                          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
                            <AttachFileIcon sx={{ fontSize: 32, color: '#6B7280', mb: 1 }} />
                            <Typography sx={{ color: '#6B7280', fontSize: '0.875rem', mb: 0.5 }}>
                              Click to upload or drag and drop
                            </Typography>
                            <Typography sx={{ color: '#9CA3AF', fontSize: '0.75rem' }}>
                              PDF, DOC, DOCX, JPG, PNG (Max 10MB per file)
                            </Typography>
                          </Box>
                        </label>
                      </Box>
                      
                      {files.length > 0 && (
                        <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                          {files.map((file, index) => (
                            <Chip
                              key={index}
                              label={`${file.name} (${formatFileSize(file.size)})`}
                              onDelete={() => handleRemoveFile(index)}
                              deleteIcon={<CloseIcon />}
                              sx={{
                                bgcolor: '#F3F4F6',
                                color: '#374151',
                                '& .MuiChip-deleteIcon': {
                                  color: '#6B7280',
                                  '&:hover': {
                                    color: '#EF4444'
                                  }
                                }
                              }}
                            />
                          ))}
                        </Box>
                      )}
                    </Box>

                    <Box>
                      <Typography sx={{ fontWeight: 600, color: '#222222', mb: 1, fontSize: '0.875rem' }}>
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
                            borderRadius: 2,
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
                        bgcolor: '#AD542D',
                        borderRadius: 2,
                        py: 1.5,
                        textTransform: 'none',
                        fontWeight: 700,
                        fontSize: '1rem',
                        '&:hover': {
                          bgcolor: '#78381C'
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
  )
}

