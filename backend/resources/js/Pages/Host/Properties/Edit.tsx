import React, { useState, useEffect } from 'react'
import { Box, Button, Card, CardContent, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography, IconButton } from '@mui/material'
import { Row, Col } from 'react-bootstrap'
import HostLayout from '../../../Components/Host/HostLayout'
import Toast from '../../../Components/Admin/Toast'
import { router, usePage } from '@inertiajs/react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import DeleteIcon from '@mui/icons-material/Delete'

interface Property {
  id: number
  title: string
  location: string
  price: number
  bedrooms: number
  bathrooms: number
  guests: number
  property_type: string
  status: string
  description: string
  amenities: string[]
  image?: string
}

export default function EditProperty() {
  const { property, propertyTypes } = usePage<{ property: Property, propertyTypes: string[] }>().props
  const [toastOpen, setToastOpen] = useState(false)
  const [newAmenity, setNewAmenity] = useState('')
  const [customAmenities, setCustomAmenities] = useState<string[]>([])
  const [imagePreview, setImagePreview] = useState<string | null>(
    property.image ? `/storage/${property.image}` : null
  )
  const [formData, setFormData] = useState({
    title: property.title,
    location: property.location,
    price: property.price.toString(),
    bedrooms: property.bedrooms.toString(),
    bathrooms: property.bathrooms.toString(),
    guests: property.guests.toString(),
    property_type: property.property_type,
    status: property.status,
    description: property.description,
    amenities: property.amenities || [],
    image: null as File | null
  })

  const amenitiesList = [
    'Free WiFi',
    'Central AC',
    'Fully Equipped Kitchen',
    'Free Parking',
    'Private Pool',
    'Pet Friendly',
    'Washer/Dryer',
    'TV',
    'Gym',
    'Balcony'
  ]

  // Combine predefined and custom amenities
  const allAmenities = [...amenitiesList, ...customAmenities]

  // Extract custom amenities on component mount
  useEffect(() => {
    const existingCustomAmenities = (property.amenities || []).filter(
      amenity => !amenitiesList.includes(amenity)
    )
    setCustomAmenities(existingCustomAmenities)
  }, [property.amenities])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({ ...formData, image: file })
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setFormData({ ...formData, image: null })
    setImagePreview(null)
  }

  const handleAmenityToggle = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }))
  }

  const handleAddCustomAmenity = () => {
    if (newAmenity.trim() && !allAmenities.includes(newAmenity.trim())) {
      setCustomAmenities(prev => [...prev, newAmenity.trim()])
      setFormData(prev => ({
        ...prev,
        amenities: [...prev.amenities, newAmenity.trim()]
      }))
      setNewAmenity('')
    }
  }

  const handleRemoveCustomAmenity = (amenity: string) => {
    setCustomAmenities(prev => prev.filter(a => a !== amenity))
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.filter(a => a !== amenity)
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const submitData = new FormData()
    submitData.append('title', formData.title)
    submitData.append('location', formData.location)
    submitData.append('price', formData.price)
    submitData.append('bedrooms', formData.bedrooms)
    submitData.append('bathrooms', formData.bathrooms)
    submitData.append('guests', formData.guests)
    submitData.append('property_type', formData.property_type)
    submitData.append('description', formData.description)
    submitData.append('_method', 'PUT')
    
    // Add amenities
    formData.amenities.forEach((amenity, index) => {
      submitData.append(`amenities[${index}]`, amenity)
    })
    
    // Add image if selected
    if (formData.image) {
      submitData.append('image', formData.image)
    }
    
    router.post(`/host/properties/${property.id}`, submitData, {
      onSuccess: () => {
        setToastOpen(true)
      }
    })
  }

  const handleToastClose = () => {
    setToastOpen(false)
  }

  return (
    <HostLayout title="Edit Property">
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => router.visit('/host/properties')}
        sx={{
          mb: 3,
          color: '#6B7280',
          textTransform: 'none',
          '&:hover': { bgcolor: '#F9FAFB', color: '#111827' }
        }}
      >
        Back to Properties
      </Button>

      <Card elevation={0} sx={{ border: '1px solid #E5E7EB', borderRadius: 2 }}>
        <CardContent sx={{ p: { xs: 2, md: 4 } }}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#111827', mb: 4 }}>
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
                      startAdornment: <Typography sx={{ mr: 1, color: '#6B7280' }}>$</Typography>
                    }}
                  />
                </Stack>
              </Col>
              <Col xs={12} md={6}>
                <Stack spacing={3}>
                  <FormControl fullWidth required>
                    <InputLabel>Property Type</InputLabel>
                    <Select
                      value={formData.property_type}
                      onChange={(e) => handleSelectChange('property_type', e.target.value)}
                      label="Property Type"
                    >
                      {propertyTypes.map((type) => (
                        <MenuItem key={type} value={type}>
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </MenuItem>
                      ))}
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
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#111827', mb: 2 }}>
                  Amenities
                </Typography>
                
                {/* Add Custom Amenity */}
                <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                  <TextField
                    placeholder="Add custom amenity"
                    value={newAmenity}
                    onChange={(e) => setNewAmenity(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        handleAddCustomAmenity()
                      }
                    }}
                    size="small"
                    sx={{ flex: 1 }}
                  />
                  <Button
                    variant="contained"
                    onClick={handleAddCustomAmenity}
                    disabled={!newAmenity.trim() || allAmenities.includes(newAmenity.trim())}
                    sx={{
                      bgcolor: '#FF8C75',
                      minWidth: 'auto',
                      px: 2,
                      '&:hover': { bgcolor: '#ff7a61' }
                    }}
                  >
                    <AddIcon />
                  </Button>
                </Stack>

                {/* Amenities List */}
                <Stack direction="row" spacing={2} flexWrap="wrap" sx={{ gap: 1, width: '100%' }}>
                  {allAmenities.map((amenity) => {
                    const isCustom = customAmenities.includes(amenity)
                    const isSelected = formData.amenities.includes(amenity)
                    return (
                      <Box
                        key={amenity}
                        sx={{
                          position: 'relative',
                          display: 'inline-flex'
                        }}
                      >
                        <Button
                          variant={isSelected ? 'contained' : 'outlined'}
                          onClick={() => handleAmenityToggle(amenity)}
                          sx={{
                            textTransform: 'none',
                            borderRadius: 2,
                            borderColor: '#D1D5DB',
                            color: isSelected ? '#FFFFFF' : '#6B7280',
                            bgcolor: isSelected ? '#FF8C75' : 'transparent',
                            pr: isCustom ? 4 : 2,
                            '&:hover': {
                              bgcolor: isSelected ? '#ff7a61' : '#F9FAFB',
                              borderColor: '#9CA3AF'
                            }
                          }}
                        >
                          {amenity}
                        </Button>
                        {isCustom && (
                          <IconButton
                            size="small"
                            onClick={() => handleRemoveCustomAmenity(amenity)}
                            sx={{
                              position: 'absolute',
                              right: 4,
                              top: '50%',
                              transform: 'translateY(-50%)',
                              width: 20,
                              height: 20,
                              bgcolor: 'rgba(0,0,0,0.1)',
                              color: '#FFFFFF',
                              '&:hover': {
                                bgcolor: 'rgba(0,0,0,0.2)',
                                color: '#FFFFFF'
                              }
                            }}
                          >
                            <CloseIcon sx={{ fontSize: 14 }} />
                          </IconButton>
                        )}
                      </Box>
                    )
                  })}
                </Stack>
              </Col>
            </Row>

            {/* Image Upload Section */}
            <Row className="mt-4">
              <Col xs={12}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#111827', mb: 2 }}>
                  Property Image
                </Typography>
                
                {!imagePreview ? (
                  <Box
                    sx={{
                      border: '2px dashed #D1D5DB',
                      borderRadius: 2,
                      p: 4,
                      textAlign: 'center',
                      cursor: 'pointer',
                      '&:hover': {
                        borderColor: '#FF8C75',
                        bgcolor: '#FFF7F5'
                      }
                    }}
                    onClick={() => document.getElementById('image-upload-edit')?.click()}
                  >
                    <CloudUploadIcon sx={{ fontSize: 48, color: '#9CA3AF', mb: 2 }} />
                    <Typography variant="h6" sx={{ color: '#374151', mb: 1 }}>
                      Upload Property Image
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#6B7280' }}>
                      Click to browse or drag and drop your image here
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#9CA3AF', mt: 1, display: 'block' }}>
                      PNG, JPG, GIF up to 2MB
                    </Typography>
                  </Box>
                ) : (
                  <Box sx={{ position: 'relative', display: 'inline-block' }}>
                    <Box
                      component="img"
                      src={imagePreview}
                      alt="Property preview"
                      sx={{
                        width: '100%',
                        maxWidth: 300,
                        height: 200,
                        objectFit: 'cover',
                        borderRadius: 2,
                        border: '1px solid #E5E7EB'
                      }}
                    />
                    <IconButton
                      onClick={removeImage}
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        bgcolor: 'rgba(0,0,0,0.7)',
                        color: 'white',
                        '&:hover': {
                          bgcolor: 'rgba(0,0,0,0.8)'
                        }
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                )}
                
                <input
                  id="image-upload-edit"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
              </Col>
            </Row>

            <Row className="mt-4">
              <Col xs={12}>
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
              </Col>
            </Row>

            <Row className="mt-4">
              <Col xs={12}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="flex-end" sx={{ width: '100%' }}>
                  <Button
                    variant="outlined"
                    onClick={() => router.visit('/host/properties')}
                    sx={{
                      textTransform: 'none',
                      borderColor: '#D1D5DB',
                      color: '#6B7280',
                      '&:hover': { borderColor: '#9CA3AF', bgcolor: '#F9FAFB' }
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      bgcolor: '#FF8C75',
                      textTransform: 'none',
                      fontWeight: 700,
                      '&:hover': { bgcolor: '#ff7a61' }
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

