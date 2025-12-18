import { useState } from 'react'
import { Box, Button, Card, CardContent, Stack, TextField, Typography, Avatar, FormControl, InputLabel, Select, MenuItem, Divider } from '@mui/material'
import { Row, Col } from 'react-bootstrap'
import HostLayout from '../../../components/host/HostLayout'
import Toast from '../../../components/admin/Toast'
import SaveIcon from '@mui/icons-material/Save'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import { useNavigate, useLocation } from 'react-router-dom'

export default function HostProfileSettings() {
  const navigate = useNavigate()
  const location = useLocation()
  const [toastOpen, setToastOpen] = useState(false)
  
  const [profileData, setProfileData] = useState({
    firstName: 'Host',
    lastName: 'User',
    email: 'host@example.com',
    phone: '+1 (555) 123-4567',
    profileImage: null as string | null
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const [verificationData, setVerificationData] = useState({
    idType: '',
    idNumber: '',
    idDocument: null as string | null,
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  })

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfileData(prev => ({ ...prev, [name]: value }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordData(prev => ({ ...prev, [name]: value }))
  }

  const handleVerificationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setVerificationData(prev => ({ ...prev, [name]: value }))
  }

  const handleIdDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setVerificationData(prev => ({ ...prev, idDocument: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setVerificationData(prev => ({ ...prev, [name]: value }))
  }

  const handleVerificationSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Verification updated:', verificationData)
    setToastOpen(true)
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

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName[0]}${lastName[0]}`.toUpperCase()
  }

  const settingsTabs = [
    { id: 'profile', label: 'Profile', path: '/host/settings/profile' },
    { id: 'verification', label: 'Verification', path: '/host/settings/verification' },
    { id: 'password', label: 'Password', path: '/host/settings/password' },
  ]

  // Determine active tab from URL
  const currentPath = location.pathname
  const currentActiveTab = settingsTabs.find(tab => currentPath.includes(tab.id))?.id || 'profile'

  // Get page title based on active tab
  const getPageTitle = () => {
    switch (currentActiveTab) {
      case 'profile':
        return 'Profile settings'
      case 'verification':
        return 'Verification'
      case 'password':
        return 'Password settings'
      default:
        return 'Settings'
    }
  }

  return (
    <HostLayout title={getPageTitle()}>
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
                        color: isActive ? '#AD542D' : '#717171',
                        fontWeight: isActive ? 700 : 500,
                        bgcolor: isActive ? '#FFF5F5' : 'transparent',
                        borderRadius: 0,
                        borderLeft: isActive ? '3px solid #AD542D' : '3px solid transparent',
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
                              bgcolor: '#AD542D',
                              fontSize: '2rem',
                              fontWeight: 700
                            }}
                          >
                            {!profileData.profileImage && getInitials(profileData.firstName, profileData.lastName)}
                          </Avatar>
                          <Box
                            sx={{
                              position: 'absolute',
                              bottom: 0,
                              right: 0,
                              bgcolor: '#AD542D',
                              borderRadius: '50%',
                              p: 1,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer'
                            }}
                          >
                            <input
                              type="file"
                              accept="image/*"
                              hidden
                              id="profile-image-upload"
                              onChange={handleImageChange}
                            />
                            <label htmlFor="profile-image-upload">
                              <PhotoCameraIcon sx={{ fontSize: 20, color: '#FFFFFF' }} />
                            </label>
                          </Box>
                        </Box>
                        <Box>
                          <Button
                            variant="outlined"
                            component="label"
                            htmlFor="profile-image-upload"
                            sx={{
                              borderColor: '#D0D5DD',
                              color: '#344054',
                              textTransform: 'none',
                              borderRadius: 2,
                              py: 1,
                              px: 2,
                              '&:hover': { borderColor: '#D0D5DD', bgcolor: '#F9FAFB' }
                            }}
                          >
                            Upload picture
                          </Button>
                          <Typography variant="body2" sx={{ color: '#717171', mt: 1 }}>
                            JPG, PNG or GIF. 2MB max.
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>

                    {/* Name Fields */}
                    <Stack direction="row" spacing={2}>
                      <TextField
                        fullWidth
                        label="First Name"
                        name="firstName"
                        value={profileData.firstName}
                        onChange={handleProfileChange}
                        required
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                      />
                      <TextField
                        fullWidth
                        label="Last Name"
                        name="lastName"
                        value={profileData.lastName}
                        onChange={handleProfileChange}
                        required
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                      />
                    </Stack>

                    {/* Email Field */}
                    <TextField
                      fullWidth
                      label="Email address"
                      name="email"
                      type="email"
                      value={profileData.email}
                      onChange={handleProfileChange}
                      required
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />

                    {/* Phone Field */}
                    <TextField
                      fullWidth
                      label="Phone Number"
                      name="phone"
                      type="tel"
                      value={profileData.phone}
                      onChange={handleProfileChange}
                      required
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Button
                        type="submit"
                        variant="contained"
                        startIcon={<SaveIcon />}
                        sx={{
                          bgcolor: '#AD542D',
                          textTransform: 'none',
                          fontWeight: 700,
                          py: 1,
                          '&:hover': { bgcolor: '#78381C' }
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

          {currentActiveTab === 'verification' && (
            <Card elevation={0} sx={{ border: '1px solid #E5E7EB', borderRadius: '20px', width: '100%', maxWidth: '800px' }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#222222', mb: 1 }}>
                  Host Verification
                </Typography>
                <Typography variant="body2" sx={{ color: '#717171', mb: 4 }}>
                  Verify your identity to become a verified host
                </Typography>

                <form onSubmit={handleVerificationSubmit}>
                  <Stack spacing={3}>
                    {/* ID Type and Number */}
                    <Stack direction="row" spacing={2}>
                      <FormControl fullWidth required>
                        <InputLabel>ID Type</InputLabel>
                        <Select
                          value={verificationData.idType}
                          onChange={(e) => handleSelectChange('idType', e.target.value)}
                          label="ID Type"
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                        >
                          <MenuItem value="passport">Passport</MenuItem>
                          <MenuItem value="driving-license">Driving License</MenuItem>
                          <MenuItem value="national-id">National ID</MenuItem>
                          <MenuItem value="other">Other</MenuItem>
                        </Select>
                      </FormControl>
                      <TextField
                        fullWidth
                        label="ID Number"
                        name="idNumber"
                        value={verificationData.idNumber}
                        onChange={handleVerificationChange}
                        required
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                      />
                    </Stack>

                    {/* ID Document Upload */}
                    <Box>
                      <Typography variant="body2" sx={{ color: '#222222', fontWeight: 600, mb: 1 }}>
                        Upload ID Document
                      </Typography>
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        hidden
                        id="id-document-upload"
                        onChange={handleIdDocumentChange}
                      />
                      <label htmlFor="id-document-upload">
                        <Button
                          variant="outlined"
                          component="span"
                          startIcon={<UploadFileIcon />}
                          sx={{
                            borderColor: '#D0D5DD',
                            color: '#344054',
                            textTransform: 'none',
                            borderRadius: 2,
                            py: 1.5,
                            px: 3,
                            '&:hover': { borderColor: '#D0D5DD', bgcolor: '#F9FAFB' }
                          }}
                        >
                          {verificationData.idDocument ? 'Change Document' : 'Upload Document'}
                        </Button>
                      </label>
                      {verificationData.idDocument && (
                        <Typography variant="body2" sx={{ color: '#10B981', mt: 1 }}>
                          Document uploaded successfully
                        </Typography>
                      )}
                      <Typography variant="body2" sx={{ color: '#717171', mt: 1 }}>
                        JPG, PNG or PDF. 5MB max.
                      </Typography>
                    </Box>

                    <Divider />

                    {/* Address Information */}
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#222222', mt: 2 }}>
                      Address Information
                    </Typography>

                    <TextField
                      fullWidth
                      label="Street Address"
                      name="address"
                      value={verificationData.address}
                      onChange={handleVerificationChange}
                      required
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />

                    <Stack direction="row" spacing={2}>
                      <TextField
                        fullWidth
                        label="City"
                        name="city"
                        value={verificationData.city}
                        onChange={handleVerificationChange}
                        required
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                      />
                      <TextField
                        fullWidth
                        label="State/Province"
                        name="state"
                        value={verificationData.state}
                        onChange={handleVerificationChange}
                        required
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                      />
                    </Stack>

                    <Stack direction="row" spacing={2}>
                      <TextField
                        fullWidth
                        label="ZIP/Postal Code"
                        name="zipCode"
                        value={verificationData.zipCode}
                        onChange={handleVerificationChange}
                        required
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                      />
                      <TextField
                        fullWidth
                        label="Country"
                        name="country"
                        value={verificationData.country}
                        onChange={handleVerificationChange}
                        required
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                      />
                    </Stack>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                      <Button
                        type="submit"
                        variant="contained"
                        startIcon={<SaveIcon />}
                        sx={{
                          bgcolor: '#AD542D',
                          textTransform: 'none',
                          fontWeight: 700,
                          py: 1,
                          '&:hover': { bgcolor: '#78381C' }
                        }}
                      >
                        Submit for Verification
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
                      fullWidth
                      label="Current password"
                      type="password"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      required
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                    <TextField
                      fullWidth
                      label="New password"
                      type="password"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      required
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                    <TextField
                      fullWidth
                      label="Confirm password"
                      type="password"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      required
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Button
                        type="submit"
                        variant="contained"
                        startIcon={<SaveIcon />}
                        sx={{
                          bgcolor: '#AD542D',
                          textTransform: 'none',
                          fontWeight: 700,
                          py: 1,
                          '&:hover': { bgcolor: '#78381C' }
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
    </HostLayout>
  )
}

