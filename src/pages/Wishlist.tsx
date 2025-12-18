import { useState } from 'react'
import { Box, IconButton, Typography, Stack } from '@mui/material'
import { Container, Row, Col } from 'react-bootstrap'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import FeaturedCard from '../components/FeaturedCard'
import FavoriteIcon from '@mui/icons-material/Favorite'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import img1 from '../assets/images/filter-1.svg'
import img2 from '../assets/images/filter-2.svg'
import img3 from '../assets/images/filter-3.svg'
import img4 from '../assets/images/filter-4.svg'
import img5 from '../assets/images/filter-5.svg'
import img6 from '../assets/images/filter-6.svg'

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
    <Box>
      <Navbar />
      <Box className="wishlist-page">
        <Container>
          {/* Header Section */}
          <Box sx={{ textAlign: 'center', mb: 6, mt: 4 }}>
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={1} sx={{ mb: 2 }}>
              {/* <FavoriteIcon sx={{ color: '#AD542D', fontSize: 40 }} /> */}
              <Typography variant="h2" sx={{fontSize: '2.5rem', fontWeight: 800, color: '#222222' }}>
                My Wishlist
              </Typography>
            </Stack>
            <Typography variant="body1" sx={{ color: '#717171', fontSize: '1.125rem', maxWidth: 600, mx: 'auto' }}>
              Your saved properties for future bookings
            </Typography>
          </Box>

          {wishlistItems.length === 0 ? (
            // Empty State
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <FavoriteIcon sx={{ color: '#D1D5DB', fontSize: 80, mb: 2 }} />
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#222222', mb: 1 }}>
                Your wishlist is empty
              </Typography>
              <Typography variant="body1" sx={{ color: '#717171', mb: 3 }}>
                Start exploring and save your favorite properties
              </Typography>
            </Box>
          ) : (
            <>
              <Box sx={{ mb: 3, textAlign: { xs: 'center', md: 'left' } }}>
                <Typography variant="body1" sx={{ color: '#717171', fontWeight: 600 }}>
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
  )
}

