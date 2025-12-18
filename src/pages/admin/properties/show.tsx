import { useState, useEffect } from 'react'
import { Box, Button, Card, CardContent, Chip, Divider, Stack, Typography } from '@mui/material'
import { Row, Col } from 'react-bootstrap'
import AdminLayout from '../../../components/admin/AdminLayout'
import { useNavigate, useParams } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import BedIcon from '@mui/icons-material/Bed'
import BathtubIcon from '@mui/icons-material/Bathtub'
import PeopleIcon from '@mui/icons-material/People'
import HomeIcon from '@mui/icons-material/Home'
import img1 from '../../../assets/images/filter-1.svg'
import img2 from '../../../assets/images/filter-2.svg'
import img3 from '../../../assets/images/filter-3.svg'

export default function ViewProperty() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [property, setProperty] = useState({
    id: '',
    title: '',
    location: '',
    price: 0,
    bedrooms: 0,
    bathrooms: 0,
    guests: 0,
    propertyType: '',
    status: '',
    description: '',
    amenities: [] as string[],
    images: [] as string[],
    bookings: 0,
    createdAt: ''
  })

  // Mock data - in real app, fetch from API
  useEffect(() => {
    const mockProperty = {
      id: id || '1',
      title: 'Luxury Beachfront Villa',
      location: 'Malibu, California',
      price: 299,
      bedrooms: 2,
      bathrooms: 3,
      guests: 4,
      propertyType: 'Villa',
      status: 'Active',
      description: 'Experience unparalleled comfort and convenience in our modern apartment located right in the heart of Lahore. Designed with sophisticated aesthetics and equipped with all essential amenities, this apartment offers a serene escape amidst the bustling city. Perfect for families, business travelers, or anyone looking to explore Lahore with ease, our property ensures a memorable stay with its prime location and luxurious features. Enjoy spacious living areas, a fully equipped kitchen, and breathtaking city views from large windows.\n\nExperience unparalleled comfort and convenience in our modern apartment located right in the heart of Lahore. Designed with sophisticated aesthetics and equipped with all essential amenities, this apartment offers a serene escape amidst the bustling city.',
      amenities: ['Free WiFi', 'Central AC', 'Fully Equipped Kitchen', 'Free Parking', 'Private Pool', 'Pet Friendly'],
      images: [img1, img2, img3],
      bookings: 45,
      createdAt: '2024-01-15'
    }
    setProperty(mockProperty)
  }, [id])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return '#10B981'
      case 'Inactive': return '#717171'
      case 'Pending': return '#F59E0B'
      default: return '#717171'
    }
  }

  const getPropertyTypeLabel = (type: string) => {
    const types: { [key: string]: string } = {
      apartment: 'Apartment',
      house: 'House',
      villa: 'Villa',
      studio: 'Studio',
      condo: 'Condo'
    }
    return types[type.toLowerCase()] || type
  }

  const handleStatusChange = () => {
    const newStatus = property.status === 'Active' ? 'Inactive' : 'Active'
    setProperty(prev => ({ ...prev, status: newStatus }))
    // In real app: API call to update status
    console.log('Status changed to:', newStatus)
  }

  return (
    <AdminLayout title="View Property">
      <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={{ xs: 'flex-start', sm: 'center' }} justifyContent="space-between" sx={{ mb: 3, gap: 2 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/admin/properties')}
          sx={{
            color: '#717171',
            textTransform: 'none',
            '&:hover': { bgcolor: '#F9FAFB', color: '#222222' }
          }}
        >
          Back to Properties
        </Button>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ width: { xs: '100%', sm: 'auto' } }}>
          <Button
            variant="outlined"
            startIcon={property.status === 'Active' ? <VisibilityOffIcon /> : <VisibilityIcon />}
            onClick={handleStatusChange}
            sx={{
              borderColor: property.status === 'Active' ? '#EF4444' : '#10B981',
              color: property.status === 'Active' ? '#EF4444' : '#10B981',
              textTransform: 'none',
              fontWeight: 600,
              '&:hover': {
                borderColor: property.status === 'Active' ? '#DC2626' : '#059669',
                bgcolor: property.status === 'Active' ? '#FEF2F2' : '#ECFDF5'
              }
            }}
          >
            {property.status === 'Active' ? 'Deactivate' : 'Activate'}
          </Button>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => navigate(`/admin/properties/edit/${id}`)}
            sx={{
              bgcolor: '#AD542D',
              textTransform: 'none',
              fontWeight: 700,
              '&:hover': { bgcolor: '#78381C' }
            }}
          >
            Edit Property
          </Button>
        </Stack>
      </Stack>

      {/* Property Header */}
      <Card elevation={0} sx={{ border: '1px solid #E5E7EB', borderRadius: 2, mb: 3 }}>
        <CardContent sx={{ p: { xs: 2, md: 4 } }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={{ xs: 'flex-start', sm: 'flex-start' }} justifyContent="space-between" sx={{ mb: 3, gap: 2 }}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#222222', mb: 2 }}>
                {property.title}
              </Typography>
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <LocationOnIcon sx={{ fontSize: 18, color: '#717171' }} />
                  <Typography sx={{ color: '#717171' }}>{property.location}</Typography>
                </Stack>
                <Chip
                  label={property.status}
                  size="small"
                  sx={{
                    bgcolor: `${getStatusColor(property.status)}15`,
                    color: getStatusColor(property.status),
                    fontWeight: 600,
                    fontSize: 12
                  }}
                />
              </Stack>
            </Box>
            <Box sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#222222' }}>
                ${property.price}
                <Typography component="span" sx={{ fontSize: 16, color: '#717171', fontWeight: 400, ml: 0.5 }}>
                  /night
                </Typography>
              </Typography>
            </Box>
          </Stack>

          {/* Image Gallery */}
          <Row className="g-2">
            {property.images.slice(0, 3).map((img, index) => (
              <Col key={index} xs={12} md={4}>
                <Box
                  component="img"
                  src={img}
                  alt={`Property ${index + 1}`}
                  sx={{
                    width: '100%',
                    height: 200,
                    objectFit: 'cover',
                    borderRadius: 2
                  }}
                />
              </Col>
            ))}
          </Row>
        </CardContent>
      </Card>

      {/* Property Details */}
      <Row>
        <Col xs={12} md={8}>
          <Card elevation={0} sx={{ border: '1px solid #E5E7EB', borderRadius: 2, mb: 3 }}>
            <CardContent sx={{ p: { xs: 2, md: 4 } }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#222222', mb: 3 }}>
                About the Property
              </Typography>
              <Typography sx={{ color: '#4A5568', lineHeight: 1.8, whiteSpace: 'pre-line' }}>
                {property.description}
              </Typography>
            </CardContent>
          </Card>

          <Card elevation={0} sx={{ border: '1px solid #E5E7EB', borderRadius: 2 }}>
            <CardContent sx={{ p: { xs: 2, md: 4 } }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#222222', mb: 3 }}>
                Amenities
              </Typography>
              <Row>
                {property.amenities.map((amenity, index) => (
                  <Col key={index} xs={12} sm={6} md={4}>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                      <Box
                        sx={{
                          width: 20,
                          height: 20,
                          borderRadius: '50%',
                          bgcolor: '#10B981',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Typography sx={{ color: 'white', fontSize: 12 }}>✓</Typography>
                      </Box>
                      <Typography sx={{ color: '#4A5568' }}>{amenity}</Typography>
                    </Stack>
                  </Col>
                ))}
              </Row>
            </CardContent>
          </Card>
        </Col>

        <Col xs={12} md={4}>
          <Card elevation={0} sx={{ border: '1px solid #E5E7EB', borderRadius: 2 }}>
            <CardContent sx={{ p: { xs: 2, md: 4 } }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#222222', mb: 3 }}>
                Property Details
              </Typography>

              <Stack spacing={3}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 2,
                      bgcolor: '#F3F4F6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <HomeIcon sx={{ fontSize: 20, color: '#717171' }} />
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: 12, color: '#717171', mb: 0.5 }}>Property Type</Typography>
                    <Typography sx={{ fontWeight: 600, color: '#222222' }}>
                      {getPropertyTypeLabel(property.propertyType)}
                    </Typography>
                  </Box>
                </Stack>

                <Divider />

                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 2,
                      bgcolor: '#F3F4F6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <BedIcon sx={{ fontSize: 20, color: '#717171' }} />
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: 12, color: '#717171', mb: 0.5 }}>Bedrooms</Typography>
                    <Typography sx={{ fontWeight: 600, color: '#222222' }}>{property.bedrooms}</Typography>
                  </Box>
                </Stack>

                <Divider />

                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 2,
                      bgcolor: '#F3F4F6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <BathtubIcon sx={{ fontSize: 20, color: '#717171' }} />
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: 12, color: '#717171', mb: 0.5 }}>Bathrooms</Typography>
                    <Typography sx={{ fontWeight: 600, color: '#222222' }}>{property.bathrooms}</Typography>
                  </Box>
                </Stack>

                <Divider />

                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 2,
                      bgcolor: '#F3F4F6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <PeopleIcon sx={{ fontSize: 20, color: '#717171' }} />
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: 12, color: '#717171', mb: 0.5 }}>Guests</Typography>
                    <Typography sx={{ fontWeight: 600, color: '#222222' }}>{property.guests}</Typography>
                  </Box>
                </Stack>

                <Divider />

                <Box>
                  <Typography sx={{ fontSize: 12, color: '#717171', mb: 1 }}>Total Bookings</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: '#222222' }}>
                    {property.bookings}
                  </Typography>
                </Box>

                <Divider />

                <Box>
                  <Typography sx={{ fontSize: 12, color: '#717171', mb: 1 }}>Created At</Typography>
                  <Typography sx={{ fontWeight: 600, color: '#222222' }}>
                    {new Date(property.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Col>
      </Row>
    </AdminLayout>
  )
}

