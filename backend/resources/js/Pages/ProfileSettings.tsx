import React, { useState } from 'react'
import { Box, Button, Paper, Stack, TextField, Typography, Avatar } from '@mui/material'
import { Container, Row, Col } from 'react-bootstrap'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import Toast from '../Components/shared/Toast'
import SaveIcon from '@mui/icons-material/Save'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import { Head, useForm, usePage, router } from '@inertiajs/react'

export default function ProfileSettings() {
  const { props } = usePage()
  const user = (props as any).user
  
  const { data: profileData, setData: setProfileData, patch: patchProfile, processing: profileProcessing, errors: profileErrors } = useForm({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    bio: user?.bio || ''
  })

  const { data: passwordData, setData: setPasswordData, patch: patchPassword, processing: passwordProcessing, errors: passwordErrors, reset: resetPassword } = useForm({
    current_password: '',
    new_password: '',
    new_password_confirmation: ''
  })

  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' })

  // Show success message from backend
  React.useEffect(() => {
    if ((props as any)?.flash?.success) {
      setToast({
        open: true,
        message: (props as any).flash.success,
        severity: 'success'
      })
    }
  }, [(props as any)?.flash?.success])

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfileData(name as keyof typeof profileData, value)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordData(name as keyof typeof passwordData, value)
  }

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    patchProfile('/profile/update', {
      onSuccess: () => {
        setToast({
          open: true,
          message: 'Profile updated successfully!',
          severity: 'success'
        })
      },
      onError: () => {
        setToast({ 
          open: true, 
          message: 'There was an error updating your profile. Please try again.', 
          severity: 'error' 
        })
      }
    })
  }

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    patchPassword('/profile/password', {
      onSuccess: () => {
        resetPassword()
        setToast({
          open: true,
          message: 'Password changed successfully!',
          severity: 'success'
        })
      },
      onError: () => {
        setToast({ 
          open: true, 
          message: 'There was an error changing your password. Please try again.', 
          severity: 'error' 
        })
      }
    })
  }

  const handleProfilePictureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const formData = new FormData()
      formData.append('profile_picture', file)
      
      // Using router.post for file upload
      router.post('/profile/picture', formData, {
        onSuccess: () => {
          // Success message will be handled by flash message
        },
        onError: () => {
          setToast({ 
            open: true, 
            message: 'There was an error uploading your profile picture. Please try again.', 
            severity: 'error' 
          })
        }
      })
    }
  }

  return (
    <>
      <Head title="Profile Settings" />
      <Box>
        <Navbar />
        <Box className="profile-settings-page">
          <Container>
            {/* Header Section */}
            <Box sx={{ textAlign: 'center', mb: 6, mt: 4 }}>
              <Typography variant="h2" sx={{fontSize: '2.5rem', fontWeight: 800, color: '#111827', mb: 2 }}>
                Profile Settings
              </Typography>
              <Typography variant="body1" sx={{ color: '#6B7280', fontSize: '1.125rem', maxWidth: 600, mx: 'auto' }}>
                Manage your account settings and preferences
              </Typography>
            </Box>

            <Row className="g-4 justify-content-center">
              <Col xs={12} md={10} lg={8} xl={7}>
                {/* Profile Picture Section */}
                <Paper elevation={0} sx={{ p: 4, border: '1px solid #E5E7EB', borderRadius: 2, mb: 3 }}>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: '#111827', mb: 3 }}>
                    Profile Picture
                  </Typography>
                  <Stack direction="row" spacing={3} alignItems="center">
                    <Avatar
                      src={user?.profile_picture}
                      sx={{
                        width: 100,
                        height: 100,
                        bgcolor: '#FF8C75',
                        fontSize: '2.5rem',
                        fontWeight: 700
                      }}
                    >
                      {!user?.profile_picture && profileData.name.split(' ').map(n => n[0]).join('')}
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
                        <input type="file" hidden accept="image/*" onChange={handleProfilePictureUpload} />
                      </Button>
                      <Typography variant="body2" sx={{ color: '#6B7280' }}>
                        JPG, PNG or GIF. Max size 2MB
                      </Typography>
                    </Stack>
                  </Stack>
                </Paper>

                {/* Profile Information */}
                <Paper elevation={0} sx={{ p: 4, border: '1px solid #E5E7EB', borderRadius: 2, mb: 3 }}>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: '#111827', mb: 3 }}>
                    Personal Information
                  </Typography>
                  
                  <form onSubmit={handleProfileSubmit}>
                    <Stack spacing={3}>
                      <Box>
                        <Typography sx={{ fontWeight: 600, color: '#111827', mb: 1, fontSize: '0.875rem' }}>
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
                          error={!!profileErrors.name}
                          helperText={profileErrors.name}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2,
                              '& fieldset': {
                                borderColor: profileErrors.name ? '#EF4444' : '#D0D5DD'
                              },
                              '&:hover fieldset': {
                                borderColor: profileErrors.name ? '#EF4444' : '#D0D5DD'
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: profileErrors.name ? '#EF4444' : '#FF8C75'
                              }
                            }
                          }}
                        />
                      </Box>

                      <Box>
                        <Typography sx={{ fontWeight: 600, color: '#111827', mb: 1, fontSize: '0.875rem' }}>
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
                          error={!!profileErrors.email}
                          helperText={profileErrors.email}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2,
                              '& fieldset': {
                                borderColor: profileErrors.email ? '#EF4444' : '#D0D5DD'
                              },
                              '&:hover fieldset': {
                                borderColor: profileErrors.email ? '#EF4444' : '#D0D5DD'
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: profileErrors.email ? '#EF4444' : '#FF8C75'
                              }
                            }
                          }}
                        />
                      </Box>

                      <Box>
                        <Typography sx={{ fontWeight: 600, color: '#111827', mb: 1, fontSize: '0.875rem' }}>
                          Phone Number
                        </Typography>
                        <TextField
                          name="phone"
                          value={profileData.phone}
                          onChange={handleProfileChange}
                          placeholder="+1 (555) 123-4567"
                          fullWidth
                          size="small"
                          error={!!profileErrors.phone}
                          helperText={profileErrors.phone}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2,
                              '& fieldset': {
                                borderColor: profileErrors.phone ? '#EF4444' : '#D0D5DD'
                              },
                              '&:hover fieldset': {
                                borderColor: profileErrors.phone ? '#EF4444' : '#D0D5DD'
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: profileErrors.phone ? '#EF4444' : '#FF8C75'
                              }
                            }
                          }}
                        />
                      </Box>

                      <Box>
                        <Typography sx={{ fontWeight: 600, color: '#111827', mb: 1, fontSize: '0.875rem' }}>
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
                          error={!!profileErrors.bio}
                          helperText={profileErrors.bio}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2,
                              '& fieldset': {
                                borderColor: profileErrors.bio ? '#EF4444' : '#D0D5DD'
                              },
                              '&:hover fieldset': {
                                borderColor: profileErrors.bio ? '#EF4444' : '#D0D5DD'
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: profileErrors.bio ? '#EF4444' : '#FF8C75'
                              }
                            }
                          }}
                        />
                      </Box>

                      <Button
                        type="submit"
                        variant="contained"
                        startIcon={<SaveIcon />}
                        disabled={profileProcessing}
                        sx={{
                          bgcolor: '#FF8C75',
                          borderRadius: 2,
                          py: 1.5,
                          textTransform: 'none',
                          fontWeight: 700,
                          fontSize: '1rem',
                          alignSelf: 'flex-start',
                          '&:hover': {
                            bgcolor: '#ff7a61'
                          },
                          '&:disabled': {
                            bgcolor: '#D1D5DB',
                            color: '#9CA3AF'
                          }
                        }}
                      >
                        {profileProcessing ? 'Saving...' : 'Save Changes'}
                      </Button>
                    </Stack>
                  </form>
                </Paper>

                {/* Change Password */}
                <Paper elevation={0} sx={{ p: 4, border: '1px solid #E5E7EB', borderRadius: 2 }}>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: '#111827', mb: 3 }}>
                    Change Password
                  </Typography>
                  
                  <form onSubmit={handlePasswordSubmit}>
                    <Stack spacing={3}>
                      <Box>
                        <Typography sx={{ fontWeight: 600, color: '#111827', mb: 1, fontSize: '0.875rem' }}>
                          Current Password
                        </Typography>
                        <TextField
                          name="current_password"
                          type="password"
                          value={passwordData.current_password}
                          onChange={handlePasswordChange}
                          placeholder="Enter current password"
                          fullWidth
                          required
                          size="small"
                          error={!!passwordErrors.current_password}
                          helperText={passwordErrors.current_password}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2,
                              '& fieldset': {
                                borderColor: passwordErrors.current_password ? '#EF4444' : '#D0D5DD'
                              },
                              '&:hover fieldset': {
                                borderColor: passwordErrors.current_password ? '#EF4444' : '#D0D5DD'
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: passwordErrors.current_password ? '#EF4444' : '#FF8C75'
                              }
                            }
                          }}
                        />
                      </Box>

                      <Box>
                        <Typography sx={{ fontWeight: 600, color: '#111827', mb: 1, fontSize: '0.875rem' }}>
                          New Password
                        </Typography>
                        <TextField
                          name="new_password"
                          type="password"
                          value={passwordData.new_password}
                          onChange={handlePasswordChange}
                          placeholder="Enter new password"
                          fullWidth
                          required
                          size="small"
                          error={!!passwordErrors.new_password}
                          helperText={passwordErrors.new_password}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2,
                              '& fieldset': {
                                borderColor: passwordErrors.new_password ? '#EF4444' : '#D0D5DD'
                              },
                              '&:hover fieldset': {
                                borderColor: passwordErrors.new_password ? '#EF4444' : '#D0D5DD'
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: passwordErrors.new_password ? '#EF4444' : '#FF8C75'
                              }
                            }
                          }}
                        />
                      </Box>

                      <Box>
                        <Typography sx={{ fontWeight: 600, color: '#111827', mb: 1, fontSize: '0.875rem' }}>
                          Confirm New Password
                        </Typography>
                        <TextField
                          name="new_password_confirmation"
                          type="password"
                          value={passwordData.new_password_confirmation}
                          onChange={handlePasswordChange}
                          placeholder="Confirm new password"
                          fullWidth
                          required
                          size="small"
                          error={!!passwordErrors.new_password_confirmation}
                          helperText={passwordErrors.new_password_confirmation}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2,
                              '& fieldset': {
                                borderColor: passwordErrors.new_password_confirmation ? '#EF4444' : '#D0D5DD'
                              },
                              '&:hover fieldset': {
                                borderColor: passwordErrors.new_password_confirmation ? '#EF4444' : '#D0D5DD'
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: passwordErrors.new_password_confirmation ? '#EF4444' : '#FF8C75'
                              }
                            }
                          }}
                        />
                      </Box>

                      <Button
                        type="submit"
                        variant="contained"
                        startIcon={<SaveIcon />}
                        disabled={passwordProcessing}
                        sx={{
                          bgcolor: '#FF8C75',
                          borderRadius: 2,
                          py: 1.5,
                          textTransform: 'none',
                          fontWeight: 700,
                          fontSize: '1rem',
                          alignSelf: 'flex-start',
                          '&:hover': {
                            bgcolor: '#ff7a61'
                          },
                          '&:disabled': {
                            bgcolor: '#D1D5DB',
                            color: '#9CA3AF'
                          }
                        }}
                      >
                        {passwordProcessing ? 'Updating...' : 'Update Password'}
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
