import { useState, useEffect } from 'react'
import { Button, Card, CardContent, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import { Row, Col } from 'react-bootstrap'
import HostLayout from '../../../components/host/HostLayout'
import Toast from '../../../components/admin/Toast'
import { useNavigate, useParams } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import img1 from '../../../assets/images/filter-1.svg'

export default function EditProperty() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [toastOpen, setToastOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    guests: '',
    propertyType: '',
    status: 'Active',
    description: ''
  })

  // Mock data - in real app, fetch from API
  useEffect(() => {
    // Simulate fetching property data
    const mockProperty = {
      id: id,
      title: 'Luxury Beachfront Villa',
      location: 'Malibu, California',
      price: 299,
      bedrooms: 2,
      bathrooms: 3,
      guests: 4,
      propertyType: 'villa',
      status: 'Active',
      description: 'Experience unparalleled comfort and convenience in our modern apartment located right in the heart of Lahore. Designed with sophisticated aesthetics and equipped with all essential amenities.',
      image: img1
    }

    setFormData({
      title: mockProperty.title,
      location: mockProperty.location,
      price: mockProperty.price.toString(),
      bedrooms: mockProperty.bedrooms.toString(),
      bathrooms: mockProperty.bathrooms.toString(),
      guests: mockProperty.guests.toString(),
      propertyType: mockProperty.propertyType,
      status: mockProperty.status,
      description: mockProperty.description
    })
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Updated property data:', formData)
    setToastOpen(true)
    // Navigate back to properties list after successful submission
    setTimeout(() => {
      navigate('/host/properties')
    }, 1500)
  }

  const handleToastClose = () => {
    setToastOpen(false)
  }

  return (
    <HostLayout title="Edit Property">
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/host/properties')}
        sx={{
          mb: 3,
          color: '#717171',
          textTransform: 'none',
          '&:hover': { bgcolor: '#F9FAFB', color: '#222222' }
        }}
      >
        Back to Properties
      </Button>

      <Card elevation={0} sx={{ border: '1px solid #E5E7EB', borderRadius: 2 }}>
        <CardContent sx={{ p: { xs: 2, md: 4 } }}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#222222', mb: 4 }}>
            Edit Property Information
          </Typography>

          <form onSubmit={handleSubmit}>
            <Row>
              <Col xs={12} md={6}>
                <Stack spacing={3} sx={{ mb: { xs: 3, md: 0 } }}>
                  <TextField
                    label="Property Title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    label="Location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    fullWidth
                    placeholder="e.g., Malibu, California"
                  />
                  <TextField
                    label="Price per Night"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    fullWidth
                    InputProps={{
                      startAdornment: <Typography sx={{ mr: 1, color: '#717171' }}>$</Typography>
                    }}
                  />
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={formData.status}
                      onChange={(e) => handleSelectChange('status', e.target.value)}
                      label="Status"
                    >
                      <MenuItem value="Pending">Pending</MenuItem>
                      <MenuItem value="Active">Active</MenuItem>
                      <MenuItem value="Inactive">Inactive</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
              </Col>
              <Col xs={12} md={6}>
                <Stack spacing={3}>
                  <FormControl fullWidth required>
                    <InputLabel>Property Type</InputLabel>
                    <Select
                      value={formData.propertyType}
                      onChange={(e) => handleSelectChange('propertyType', e.target.value)}
                      label="Property Type"
                    >
                      <MenuItem value="apartment">Apartment</MenuItem>
                      <MenuItem value="house">House</MenuItem>
                      <MenuItem value="villa">Villa</MenuItem>
                      <MenuItem value="studio">Studio</MenuItem>
                      <MenuItem value="condo">Condo</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    label="Bedrooms"
                    name="bedrooms"
                    type="number"
                    value={formData.bedrooms}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                  <TextField
                    label="Bathrooms"
                    name="bathrooms"
                    type="number"
                    value={formData.bathrooms}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                  <TextField
                    label="Guests"
                    name="guests"
                    type="number"
                    value={formData.guests}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                </Stack>
              </Col>
            </Row>

            <Row className="mt-3">
              <Col xs={12}>
                <TextField
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  fullWidth
                  multiline
                  rows={6}
                  placeholder="Describe the property in detail..."
                />
              </Col>
            </Row>

            <Row className="mt-4">
              <Col xs={12}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="flex-end" sx={{ width: '100%' }}>
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/host/properties')}
                    sx={{
                      textTransform: 'none',
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
                      bgcolor: '#FF385C',
                      textTransform: 'none',
                      fontWeight: 700,
                      '&:hover': { bgcolor: '#E61E4D' }
                    }}
                  >
                    Update Property
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
        message="Property updated successfully!"
        severity="success"
      />
    </HostLayout>
  )
}

