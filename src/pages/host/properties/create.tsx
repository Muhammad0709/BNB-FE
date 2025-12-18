import { useState } from 'react'
import { Button, Card, CardContent, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import { Row, Col } from 'react-bootstrap'
import HostLayout from '../../../components/host/HostLayout'
import Toast from '../../../components/admin/Toast'
import { useNavigate } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

export default function AddProperty() {
  const navigate = useNavigate()
  const [toastOpen, setToastOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    guests: '',
    propertyType: '',
    status: 'Pending',
    description: '',
    airportPickupEnabled: false,
    airport: '',
    pickupStartTime: '',
    pickupEndTime: '',
    airportPickupPrice: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Property data:', formData)
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
    <HostLayout title="Add Property">
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
            Property Information
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

            {/* Airport Pickup Service Section */}
            <Row className="mt-4">
              <Col xs={12}>
                <Card elevation={0} sx={{ border: '1px solid #E5E7EB', borderRadius: 2, bgcolor: '#F9FAFB' }}>
                  <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#222222', mb: 2 }}>
                      Airport Pickup Service
                    </Typography>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.airportPickupEnabled}
                          onChange={(e) => handleCheckboxChange('airportPickupEnabled', e.target.checked)}
                          sx={{ color: '#AD542D', '&.Mui-checked': { color: '#AD542D' } }}
                        />
                      }
                      label="Enable Airport Pickup Service"
                      sx={{ mb: formData.airportPickupEnabled ? 3 : 0 }}
                    />

                    {formData.airportPickupEnabled && (
                      <Stack spacing={3} sx={{ mt: 2 }}>
                        <FormControl fullWidth required>
                          <InputLabel>Select Airport</InputLabel>
                          <Select
                            value={formData.airport}
                            onChange={(e) => handleSelectChange('airport', e.target.value)}
                            label="Select Airport"
                          >
                            <MenuItem value="JFK">John F. Kennedy International Airport (JFK)</MenuItem>
                            <MenuItem value="LAX">Los Angeles International Airport (LAX)</MenuItem>
                            <MenuItem value="ORD">Chicago O'Hare International Airport (ORD)</MenuItem>
                            <MenuItem value="DFW">Dallas/Fort Worth International Airport (DFW)</MenuItem>
                            <MenuItem value="DEN">Denver International Airport (DEN)</MenuItem>
                            <MenuItem value="SFO">San Francisco International Airport (SFO)</MenuItem>
                            <MenuItem value="SEA">Seattle-Tacoma International Airport (SEA)</MenuItem>
                            <MenuItem value="MIA">Miami International Airport (MIA)</MenuItem>
                            <MenuItem value="ATL">Hartsfield-Jackson Atlanta International Airport (ATL)</MenuItem>
                            <MenuItem value="LHR">London Heathrow Airport (LHR)</MenuItem>
                            <MenuItem value="CDG">Paris Charles de Gaulle Airport (CDG)</MenuItem>
                            <MenuItem value="DXB">Dubai International Airport (DXB)</MenuItem>
                            <MenuItem value="SIN">Singapore Changi Airport (SIN)</MenuItem>
                            <MenuItem value="NRT">Tokyo Narita International Airport (NRT)</MenuItem>
                            <MenuItem value="SYD">Sydney Kingsford Smith Airport (SYD)</MenuItem>
                            <MenuItem value="LHE">Allama Iqbal International Airport, Lahore (LHE)</MenuItem>
                            <MenuItem value="KHI">Jinnah International Airport, Karachi (KHI)</MenuItem>
                            <MenuItem value="ISB">Islamabad International Airport (ISB)</MenuItem>
                          </Select>
                        </FormControl>

                        <Row>
                          <Col xs={12} md={6}>
                            <TextField
                              label="Pickup Start Time"
                              name="pickupStartTime"
                              type="time"
                              value={formData.pickupStartTime}
                              onChange={handleChange}
                              required
                              fullWidth
                              InputLabelProps={{
                                shrink: true,
                              }}
                              inputProps={{
                                step: 300, // 5 min
                              }}
                            />
                          </Col>
                          <Col xs={12} md={6}>
                            <TextField
                              label="Pickup End Time"
                              name="pickupEndTime"
                              type="time"
                              value={formData.pickupEndTime}
                              onChange={handleChange}
                              required
                              fullWidth
                              InputLabelProps={{
                                shrink: true,
                              }}
                              inputProps={{
                                step: 300, // 5 min
                              }}
                            />
                          </Col>
                        </Row>

                        <TextField
                          label="Airport Pickup Price"
                          name="airportPickupPrice"
                          type="number"
                          value={formData.airportPickupPrice}
                          onChange={handleChange}
                          required
                          fullWidth
                          placeholder="Enter price for airport pickup service"
                          InputProps={{
                            startAdornment: <Typography sx={{ mr: 1, color: '#717171' }}>$</Typography>
                          }}
                          sx={{ mt: 2 }}
                        />
                      </Stack>
                    )}
                  </CardContent>
                </Card>
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
                      bgcolor: '#AD542D',
                      textTransform: 'none',
                      fontWeight: 700,
                      '&:hover': { bgcolor: '#78381C' }
                    }}
                  >
                    Add Property
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
        message="Property created successfully!"
        severity="success"
      />
    </HostLayout>
  )
}

