import { useState } from 'react'
import { Box, IconButton, Typography, Stack } from '@mui/material'
import { Container, Row, Col } from 'react-bootstrap'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import FeaturedCard from '../Components/FeaturedCard'
import FavoriteIcon from '@mui/icons-material/Favorite'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { Head } from '@inertiajs/react'

// Images served from public directory
const img1 = '/images/filter-1.svg'
const img2 = '/images/filter-2.svg'
const img3 = '/images/filter-3.svg'
const img4 = '/images/filter-4.svg'
const img5 = '/images/filter-5.svg'
const img6 = '/images/filter-6.svg'

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([
    { id: 1, image: img1, title: 'Luxury Beachfront Villa Luxury Beachfront', location: 'Malibu, California', price: 299 },
    { id: 2, image: img2, title: 'Luxury Beachfront Villa Luxury Beachfront', location: 'Malibu, California', price: 299 },
    { id: 3, image: img3, title: 'Luxury Beachfront Villa Luxury Beachfront', location: 'Malibu, California', price: 299 },
    { id: 4, image: img4, title: 'Luxury Beachfront Villa Luxury Beachfront', location: 'Malibu, California', price: 299 },
    { id: 5, image: img5, title: 'Luxury Beachfront Villa Luxury Beachfront', location: 'Malibu, California', price: 299 },
    { id: 6, image: img6, title: 'Luxury Beachfront Villa Luxury Beachfront', location: 'Malibu, California', price: 299 },
  ])

  const handleRemove = (id: number) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id))
  }

  return (
    <>
      <Head title="Wishlist" />
      <Box>
        <Navbar />
        <Box className="wishlist-page">
          <Container>
            {/* Header Section */}
            <Box sx={{ textAlign: 'center', mb: 6, mt: 4 }}>
              <Stack direction="row" alignItems="center" justifyContent="center" spacing={1} sx={{ mb: 2 }}>
                <Typography variant="h2" sx={{fontSize: '2rem', fontWeight: 800, color: '#111827' }}>
                  My Wishlist
                </Typography>
              </Stack>
              <Typography variant="body1" sx={{ color: '#6B7280', fontSize: '1rem', maxWidth: 600, mx: 'auto' }}>
                Your saved properties for future bookings
              </Typography>
            </Box>

            {wishlistItems.length === 0 ? (
              // Empty State
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <FavoriteIcon sx={{ color: '#D1D5DB', fontSize: 80, mb: 2 }} />
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#111827', mb: 1 }}>
                  Your wishlist is empty
                </Typography>
                <Typography variant="body1" sx={{ color: '#6B7280', mb: 3 }}>
                  Start exploring and save your favorite properties
                </Typography>
              </Box>
            ) : (
              <>
                <Box sx={{ mb: 3, textAlign: { xs: 'center', md: 'left' } }}>
                  <Typography variant="body1" sx={{ color: '#6B7280', fontWeight: 600 }}>
                    {wishlistItems.length} {wishlistItems.length === 1 ? 'property' : 'properties'} saved
                  </Typography>
                </Box>

                <Row className="g-3">
                  {wishlistItems.map((item) => (
                    <Col key={item.id} xs={12} sm={6} md={6} lg={4}>
                      <Box sx={{ position: 'relative' }}>
                        <FeaturedCard
                          image={item.image}
                          title={item.title}
                          location={item.location}
                          price={item.price}
                          id={item.id}
                        />
                        <IconButton
                          onClick={() => handleRemove(item.id)}
                          sx={{
                            position: 'absolute',
                            top: 12,
                            right: 12,
                            bgcolor: 'rgba(255, 255, 255, 0.9)',
                            '&:hover': {
                              bgcolor: 'rgba(255, 255, 255, 1)'
                            },
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                          }}
                          aria-label="remove from wishlist"
                        >
                          <DeleteOutlineIcon sx={{ color: '#EF4444' }} />
                        </IconButton>
                      </Box>
                    </Col>
                  ))}
                </Row>
              </>
            )}
          </Container>
        </Box>
        <Footer />
      </Box>
    </>
  )
}
