import { useState } from 'react'
import { Box, Button, Paper, Stack, TextField, Typography, Avatar } from '@mui/material'
import { Container, Row, Col } from 'react-bootstrap'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Toast from '../components/shared/Toast'
import SaveIcon from '@mui/icons-material/Save'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'

export default function ProfileSettings() {
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    bio: 'Travel enthusiast and adventure seeker. Love exploring new places and meeting new people.'
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' })

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    })
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    })
  }

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Profile updated:', profileData)
    setToast({ open: true, message: 'Profile updated successfully!', severity: 'success' })
  }

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setToast({ open: true, message: 'New passwords do not match!', severity: 'error' })
      return
    }
    console.log('Password changed')
    setToast({ open: true, message: 'Password changed successfully!', severity: 'success' })
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
  }

  return (
    <Box>
      <Navbar />
      <Box className="profile-settings-page">
        <Container>
          {/* Header Section */}
          <Box sx={{ textAlign: 'center', mb: 6, mt: 4 }}>
            <Typography variant="h2" sx={{fontSize: '2.5rem', fontWeight: 800, color: '#222222', mb: 2 }}>
              Profile Settings
            </Typography>
            <Typography variant="body1" sx={{ color: '#717171', fontSize: '1.125rem', maxWidth: 600, mx: 'auto' }}>
              Manage your account settings and preferences
            </Typography>
          </Box>

          <Row className="g-4 justify-content-center">
            <Col xs={12} md={10} lg={8} xl={7}>
              {/* Profile Picture Section */}
              <Paper elevation={0} sx={{ p: 4, border: '1px solid #E5E7EB', borderRadius: 2, mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#222222', mb: 3 }}>
                  Profile Picture
                </Typography>
                <Stack direction="row" spacing={3} alignItems="center">
                  <Avatar
                    sx={{
                      width: 100,
                      height: 100,
                      bgcolor: '#AD542D',
                      fontSize: '2.5rem',
                      fontWeight: 700
                    }}
                  >
                    {profileData.name.split(' ').map(n => n[0]).join('')}
                  </Avatar>
                  <Stack spacing={2} sx={{ flex: 1 }}>
                    <Button
                      variant="outlined"
                      startIcon={<PhotoCameraIcon />}
                      component="label"
                      sx={{
                        borderColor: '#D0D5DD',
                        color: '#344054',
                        textTransform: 'none',
                        borderRadius: 2,
                        alignSelf: 'flex-start',
                        '&:hover': { borderColor: '#D0D5DD', bgcolor: '#F9FAFB' }
                      }}
                    >
                      Upload Photo
                      <input type="file" hidden accept="image/*" />
                    </Button>
                    <Typography variant="body2" sx={{ color: '#717171' }}>
                      JPG, PNG or GIF. Max size 2MB
                    </Typography>
                  </Stack>
                </Stack>
              </Paper>

              {/* Profile Information */}
              <Paper elevation={0} sx={{ p: 4, border: '1px solid #E5E7EB', borderRadius: 2, mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#222222', mb: 3 }}>
                  Personal Information
                </Typography>
                
                <form onSubmit={handleProfileSubmit}>
                  <Stack spacing={3}>
                    <Box>
                      <Typography sx={{ fontWeight: 600, color: '#222222', mb: 1, fontSize: '0.875rem' }}>
                        Full Name
                      </Typography>
                      <TextField
                        name="name"
                        value={profileData.name}
                        onChange={handleProfileChange}
                        placeholder="Your full name"
                        fullWidth
                        required
                        size="small"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            '& fieldset': {
                              borderColor: '#D0D5DD'
                            }
                          }
                        }}
                      />
                    </Box>

                    <Box>
                      <Typography sx={{ fontWeight: 600, color: '#222222', mb: 1, fontSize: '0.875rem' }}>
                        Email Address
                      </Typography>
                      <TextField
                        name="email"
                        type="email"
                        value={profileData.email}
                        onChange={handleProfileChange}
                        placeholder="your.email@example.com"
                        fullWidth
                        required
                        size="small"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            '& fieldset': {
                              borderColor: '#D0D5DD'
                            }
                          }
                        }}
                      />
                    </Box>

                    <Box>
                      <Typography sx={{ fontWeight: 600, color: '#222222', mb: 1, fontSize: '0.875rem' }}>
                        Phone Number
                      </Typography>
                      <TextField
                        name="phone"
                        value={profileData.phone}
                        onChange={handleProfileChange}
                        placeholder="+1 (555) 123-4567"
                        fullWidth
                        size="small"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            '& fieldset': {
                              borderColor: '#D0D5DD'
                            }
                          }
                        }}
                      />
                    </Box>

                    <Box>
                      <Typography sx={{ fontWeight: 600, color: '#222222', mb: 1, fontSize: '0.875rem' }}>
                        Bio
                      </Typography>
                      <TextField
                        name="bio"
                        value={profileData.bio}
                        onChange={handleProfileChange}
                        placeholder="Tell us about yourself..."
                        fullWidth
                        multiline
                        rows={4}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            '& fieldset': {
                              borderColor: '#D0D5DD'
                            }
                          }
                        }}
                      />
                    </Box>

                    <Button
                      type="submit"
                      variant="contained"
                      startIcon={<SaveIcon />}
                      sx={{
                        bgcolor: '#AD542D',
                        borderRadius: 2,
                        py: 1.5,
                        textTransform: 'none',
                        fontWeight: 700,
                        fontSize: '1rem',
                        alignSelf: 'flex-start',
                        '&:hover': {
                          bgcolor: '#78381C'
                        }
                      }}
                    >
                      Save Changes
                    </Button>
                  </Stack>
                </form>
              </Paper>

              {/* Change Password */}
              <Paper elevation={0} sx={{ p: 4, border: '1px solid #E5E7EB', borderRadius: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#222222', mb: 3 }}>
                  Change Password
                </Typography>
                
                <form onSubmit={handlePasswordSubmit}>
                  <Stack spacing={3}>
                    <Box>
                      <Typography sx={{ fontWeight: 600, color: '#222222', mb: 1, fontSize: '0.875rem' }}>
                        Current Password
                      </Typography>
                      <TextField
                        name="currentPassword"
                        type="password"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        placeholder="Enter current password"
                        fullWidth
                        required
                        size="small"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            '& fieldset': {
                              borderColor: '#D0D5DD'
                            }
                          }
                        }}
                      />
                    </Box>

                    <Box>
                      <Typography sx={{ fontWeight: 600, color: '#222222', mb: 1, fontSize: '0.875rem' }}>
                        New Password
                      </Typography>
                      <TextField
                        name="newPassword"
                        type="password"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        placeholder="Enter new password"
                        fullWidth
                        required
                        size="small"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            '& fieldset': {
                              borderColor: '#D0D5DD'
                            }
                          }
                        }}
                      />
                    </Box>

                    <Box>
                      <Typography sx={{ fontWeight: 600, color: '#222222', mb: 1, fontSize: '0.875rem' }}>
                        Confirm New Password
                      </Typography>
                      <TextField
                        name="confirmPassword"
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        placeholder="Confirm new password"
                        fullWidth
                        required
                        size="small"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            '& fieldset': {
                              borderColor: '#D0D5DD'
                            }
                          }
                        }}
                      />
                    </Box>

                    <Button
                      type="submit"
                      variant="contained"
                      startIcon={<SaveIcon />}
                      sx={{
                        bgcolor: '#AD542D',
                        borderRadius: 2,
                        py: 1.5,
                        textTransform: 'none',
                        fontWeight: 700,
                        fontSize: '1rem',
                        alignSelf: 'flex-start',
                        '&:hover': {
                          bgcolor: '#78381C'
                        }
                      }}
                    >
                      Update Password
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

