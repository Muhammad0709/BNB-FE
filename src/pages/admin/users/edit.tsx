import { useState, useEffect } from 'react'
import { Avatar, Button, Card, CardContent, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import { Row, Col } from 'react-bootstrap'
import AdminLayout from '../../../components/admin/AdminLayout'
import Toast from '../../../components/admin/Toast'
import { useNavigate, useParams } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'

export default function EditUser() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [toastOpen, setToastOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    status: 'Active',
    profileImage: ''
  })

  // Mock data - in real app, fetch from API
  useEffect(() => {
    const mockUser = {
      id: id || '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      status: 'Active',
      profileImage: ''
    }
    setFormData({
      name: mockUser.name,
      email: mockUser.email,
      phone: mockUser.phone,
      status: mockUser.status,
      profileImage: mockUser.profileImage
    })
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, status: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, profileImage: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Updated user data:', formData)
    setToastOpen(true)
    // Navigate back to users list after successful submission
    setTimeout(() => {
      navigate('/admin/users')
    }, 1500)
  }

  const handleToastClose = () => {
    setToastOpen(false)
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  return (
    <AdminLayout title="Edit User">
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/admin/users')}
        sx={{
          mb: 3,
          color: '#717171',
          textTransform: 'none',
          '&:hover': { bgcolor: '#F9FAFB', color: '#222222' }
        }}
      >
        Back to Users
      </Button>

      <Card elevation={0} sx={{ border: '1px solid #E5E7EB', borderRadius: 2 }}>
        <CardContent sx={{ p: { xs: 2, md: 4 } }}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#222222', mb: 4 }}>
            User Information
          </Typography>

          <form onSubmit={handleSubmit}>
            {/* Profile Picture */}
            <Row className="mb-4">
              <Col xs={12}>
                <Stack direction="row" spacing={3} alignItems="center">
                  <Avatar
                    src={formData.profileImage}
                    sx={{
                      width: 100,
                      height: 100,
                      bgcolor: '#AD542D',
                      fontSize: '2.5rem',
                      fontWeight: 700
                    }}
                  >
                    {!formData.profileImage && getInitials(formData.name)}
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
                      <input type="file" hidden accept="image/*" onChange={handleImageChange} />
                    </Button>
                    <Typography variant="body2" sx={{ color: '#717171' }}>
                      JPG, PNG or GIF. Max size 2MB
                    </Typography>
                  </Stack>
                </Stack>
              </Col>
            </Row>

            <Row>
              <Col xs={12} md={6}>
                <Stack spacing={3} sx={{ mb: { xs: 3, md: 0 } }}>
                  <TextField
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                  <TextField
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                </Stack>
              </Col>
              <Col xs={12} md={6}>
                <Stack spacing={3}>
                  <TextField
                    label="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={formData.status}
                      onChange={(e) => handleSelectChange(e.target.value)}
                      label="Status"
                    >
                      <MenuItem value="Active">Active</MenuItem>
                      <MenuItem value="Inactive">Inactive</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
              </Col>
            </Row>

            <Row className="mt-4">
              <Col xs={12}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="flex-end" sx={{ width: '100%' }}>
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/admin/users')}
                    sx={{
                      textTransform: 'none',
                      borderRadius: 2,
                      borderColor: '#D1D5DB',
                      color: '#717171',
                      '&:hover': { borderColor: '#9CA3AF', bgcolor: '#F9FAFB' }
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      bgcolor: '#AD542D',
                      textTransform: 'none',
                      borderRadius: 2,
                      fontWeight: 700,
                      '&:hover': { bgcolor: '#78381C' }
                    }}
                  >
                    Update User
                  </Button>
                </Stack>
              </Col>
            </Row>
          </form>
        </CardContent>
      </Card>
      <Toast
        open={toastOpen}
        onClose={handleToastClose}
        message="User updated successfully!"
        severity="success"
      />
    </AdminLayout>
  )
}

