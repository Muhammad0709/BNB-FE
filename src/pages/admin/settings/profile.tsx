import { useState } from 'react'
import { Box, Button, Card, CardContent, Stack, TextField, Typography, Avatar } from '@mui/material'
import { Row, Col } from 'react-bootstrap'
import AdminLayout from '../../../components/admin/AdminLayout'
import Toast from '../../../components/admin/Toast'
import SaveIcon from '@mui/icons-material/Save'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import { useNavigate, useLocation } from 'react-router-dom'

export default function ProfileSettings() {
  const navigate = useNavigate()
  const location = useLocation()
  const [toastOpen, setToastOpen] = useState(false)
  
  const [profileData, setProfileData] = useState({
    name: 'Admin',
    email: 'admin@admin.com',
    profileImage: null as string | null
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })


  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfileData(prev => ({ ...prev, [name]: value }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileData(prev => ({ ...prev, profileImage: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Profile updated:', profileData)
    setToastOpen(true)
  }

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Password updated:', passwordData)
    setToastOpen(true)
  }


  const handleToastClose = () => {
    setToastOpen(false)
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  const settingsTabs = [
    { id: 'profile', label: 'Profile', path: '/admin/settings/profile' },
    { id: 'password', label: 'Password', path: '/admin/settings/password' },
  ]

  // Determine active tab from URL
  const currentPath = location.pathname
  const currentActiveTab = settingsTabs.find(tab => currentPath.includes(tab.id))?.id || 'profile'

  // Get page title based on active tab
  const getPageTitle = () => {
    switch (currentActiveTab) {
      case 'profile':
        return 'Profile settings'
      case 'password':
        return 'Password settings'
      default:
        return 'Settings'
    }
  }

  return (
    <AdminLayout title={getPageTitle()}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#222222', mb: 1 }}>
          Settings
        </Typography>
        <Typography variant="body1" sx={{ color: '#717171' }}>
          Manage your profile and account settings
        </Typography>
      </Box>

      <Row>
        {/* Settings Navigation */}
        <Col xs={12} md={3}>
          <Card elevation={0} sx={{ border: '1px solid #E5E7EB', borderRadius: 2, mb: 3 }}>
            <CardContent sx={{ p: 0 }}>
              <Stack spacing={0}>
                {settingsTabs.map((tab) => {
                  const isActive = currentActiveTab === tab.id
                  return (
                    <Button
                      key={tab.id}
                      fullWidth
                      onClick={() => navigate(tab.path)}
                      sx={{
                        justifyContent: 'flex-start',
                        px: 3,
                        py: 2,
                        textTransform: 'none',
                        color: isActive ? '#FF385C' : '#717171',
                        fontWeight: isActive ? 700 : 500,
                        bgcolor: isActive ? '#FFF5F5' : 'transparent',
                        borderRadius: 0,
                        borderLeft: isActive ? '3px solid #FF385C' : '3px solid transparent',
                        '&:hover': {
                          bgcolor: isActive ? '#FFF5F5' : '#F9FAFB'
                        }
                      }}
                    >
                      {tab.label}
                    </Button>
                  )
                })}
              </Stack>
            </CardContent>
          </Card>
        </Col>

        {/* Settings Content */}
        <Col xs={12} md={9}>
          {currentActiveTab === 'profile' && (
            <Card elevation={0} sx={{ border: '1px solid #E5E7EB', borderRadius: '20px', width: '100%', maxWidth: '800px' }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#222222', mb: 1 }}>
                  Profile
                </Typography>
                <Typography variant="body2" sx={{ color: '#717171', mb: 4 }}>
                  Update your profile details
                </Typography>

                <form onSubmit={handleProfileSubmit}>
                  <Stack spacing={4}>
                    {/* Profile Picture */}
                    <Box>
                      <Stack direction="row" spacing={3} alignItems="center">
                        <Box sx={{ position: 'relative' }}>
                          <Avatar
                            src={profileData.profileImage || undefined}
                            sx={{
                              width: 100,
                              height: 100,
                              bgcolor: '#FF385C',
                              fontSize: '2rem',
                              fontWeight: 700
                            }}
                          >
                            {!profileData.profileImage && getInitials(profileData.name)}
                          </Avatar>
                          <Box
                            sx={{
                              position: 'absolute',
                              bottom: 0,
                              right: 0,
                              bgcolor: '#FF385C',
                              borderRadius: '50%',
                              p: 0.5,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer'
                            }}
                          >
                            <PhotoCameraIcon sx={{ fontSize: 16, color: '#FFFFFF' }} />
                          </Box>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: '100%',
                              height: '100%',
                              opacity: 0,
                              cursor: 'pointer'
                            }}
                          />
                        </Box>
                        <Box>
                          <Button
                            variant="outlined"
                            component="label"
                            sx={{
                              borderColor: '#D0D5DD',
                              color: '#344054',
                              textTransform: 'none',
                              borderRadius: 2,
                              '&:hover': { borderColor: '#D0D5DD', bgcolor: '#F9FAFB' }
                            }}
                          >
                            Upload picture
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageChange}
                              hidden
                            />
                          </Button>
                          <Typography variant="body2" sx={{ color: '#717171', mt: 1 }}>
                            JPG, PNG or GIF. 2MB max.
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>

                    {/* Name Field */}
                    <TextField
                      label="Name"
                      name="name"
                      value={profileData.name}
                      onChange={handleProfileChange}
                      fullWidth
                      required
                    />

                    {/* Email Field */}
                    <TextField
                      label="Email address"
                      name="email"
                      type="email"
                      value={profileData.email}
                      onChange={handleProfileChange}
                      fullWidth
                      required
                    />

                    {/* Save Button */}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Button
                        type="submit"
                        variant="contained"
                        startIcon={<SaveIcon />}
                        sx={{
                          bgcolor: '#FF385C',
                          textTransform: 'none',
                          borderRadius: 2,
                          fontWeight: 700,
                          px: 4,
                          py: 1.5,
                          '&:hover': { bgcolor: '#E61E4D' }
                        }}
                      >
                        Save
                      </Button>
                    </Box>
                  </Stack>
                </form>
              </CardContent>
            </Card>
          )}

          {currentActiveTab === 'password' && (
            <Card elevation={0} sx={{ border: '1px solid #E5E7EB', borderRadius: '20px', width: '100%', maxWidth: '800px' }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#222222', mb: 1 }}>
                  Update password
                </Typography>
                <Typography variant="body2" sx={{ color: '#717171', mb: 4 }}>
                  Ensure your account is using a long, random password to stay secure
                </Typography>

                <form onSubmit={handlePasswordSubmit}>
                  <Stack spacing={3}>
                    <TextField
                      label="Current password"
                      name="currentPassword"
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      fullWidth
                      required
                    />

                    <TextField
                      label="New password"
                      name="newPassword"
                      type="password"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      fullWidth
                      required
                    />

                    <TextField
                      label="Confirm password"
                      name="confirmPassword"
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      fullWidth
                      required
                    />

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Button
                        type="submit"
                        variant="contained"
                        startIcon={<SaveIcon />}
                        sx={{
                          bgcolor: '#FF385C',
                          textTransform: 'none',
                          borderRadius: 2,
                          fontWeight: 700,
                          px: 4,
                          py: 1.5,
                          '&:hover': { bgcolor: '#E61E4D' }
                        }}
                      >
                        Save password
                      </Button>
                    </Box>
                  </Stack>
                </form>
              </CardContent>
            </Card>
          )}

        </Col>
      </Row>

      <Toast
        open={toastOpen}
        onClose={handleToastClose}
        message="Settings saved successfully!"
        severity="success"
      />
    </AdminLayout>
  )
}

