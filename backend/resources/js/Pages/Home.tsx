import React, { useState } from 'react'
import { Head, router, usePage } from '@inertiajs/react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import HowItWorks from '../Components/HowItWorks'
import PopularStays from '../Components/PopularStays'
import CtaReady from '../Components/CtaReady'
import ChooseUs from '../Components/ChooseUs'
import FeaturedCard from '../Components/FeaturedCard'
import { Box, Button, TextField, MenuItem, Select, FormControl, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
// Images served from public directory
const img1 = '/images/filter-1.svg'
const img2 = '/images/filter-2.svg'
const img3 = '/images/filter-3.svg'
const img4 = '/images/filter-4.svg'
const img5 = '/images/filter-5.svg'
const img6 = '/images/filter-6.svg'
import { Container, Row, Col } from 'react-bootstrap'

export default function Home() {
  const { props } = usePage()
  const [destination, setDestination] = useState('California')
  const [checkin, setCheckin] = useState('')
  const [checkout, setCheckout] = useState('')
  const [guests, setGuests] = useState('1')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.visit('/listing')
  }

  // Get properties from backend props
  const featuredProperties = (props as any)?.featuredProperties || []

  return (
    <>
      <Head title="Home" />
      <div className="index-page">
        <Navbar />
        {/* Hero Section */}
        <section className="hero-section">
          <Container>
            <Box className="hero-content">
              <Row className="justify-content-center">
                <Col lg={8} className="text-center">
                  <h1 className="hero-title">Find Your Perfect Stay, Anytime, Anywhere</h1>
                  <p className="hero-subtitle">Discover a diverse selection of rentals, from cozy apartments to luxurious villas, tailored to your preferences.</p>
                </Col>
              </Row>
            </Box>
          </Container>

          {/* Search Form - Positioned at bottom */}
          <Box className="hero-search-wrapper">
            <Container>
              <Row className="justify-content-center">
                <Col lg={10}>
                  <Box className="hero-search-form">
                    <form className="search-form" onSubmit={handleSearch}>
                      <Box className="search-input-group">
                        <Box className="search-field">
                          <label htmlFor="destination">Destination</label>
                          <TextField
                            id="destination"
                            name="destination"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            placeholder="Where are you going?"
                            variant="standard"
                            InputProps={{ disableUnderline: true }}
                            sx={{ '& .MuiInput-input': { border: 'none', padding: 0 } }}
                          />
                        </Box>
                        <Box className="search-field">
                          <label htmlFor="checkin">Checkin</label>
                          <TextField
                            id="checkin"
                            name="checkin"
                            type="date"
                            value={checkin}
                            onChange={(e) => setCheckin(e.target.value)}
                            variant="standard"
                            InputProps={{ disableUnderline: true }}
                            sx={{ '& .MuiInput-input': { border: 'none', padding: 0 } }}
                            InputLabelProps={{ shrink: true }}
                          />
                        </Box>
                        <Box className="search-field">
                          <label htmlFor="checkout">Checkout</label>
                          <TextField
                            id="checkout"
                            name="checkout"
                            type="date"
                            value={checkout}
                            onChange={(e) => setCheckout(e.target.value)}
                            variant="standard"
                            InputProps={{ disableUnderline: true }}
                            sx={{ '& .MuiInput-input': { border: 'none', padding: 0 } }}
                            InputLabelProps={{ shrink: true }}
                          />
                        </Box>
                        <Box className="search-field">
                          <label htmlFor="guests">Guests</label>
                          <FormControl variant="standard" sx={{ width: '100%' }}>
                            <Select
                              id="guests"
                              name="guests"
                              value={guests}
                              onChange={(e) => setGuests(e.target.value)}
                              disableUnderline
                              sx={{ border: 'none', padding: 0, '&:before': { display: 'none' }, '&:after': { display: 'none' } }}
                            >
                              <MenuItem value="1">1 Guests</MenuItem>
                              <MenuItem value="2">2 Guests</MenuItem>
                              <MenuItem value="3">3 Guests</MenuItem>
                              <MenuItem value="4">4 Guests</MenuItem>
                              <MenuItem value="5">5+ Guests</MenuItem>
                            </Select>
                          </FormControl>
                        </Box>
                        <Button 
                          type="submit" 
                          className="search-button"
                          disableElevation
                          sx={{
                            '&.search-button': {
                              background: '#FE8267 !important',
                              color: '#ffffff !important',
                              border: 'none !important',
                              borderRadius: '0 50px 50px 0 !important',
                              padding: '0 24px !important',
                              fontSize: '0.95rem !important',
                              fontWeight: 600,
                              cursor: 'pointer',
                              transition: 'all 0.3s ease',
                              display: 'flex !important',
                              alignItems: 'center !important',
                              justifyContent: 'center !important',
                              minWidth: '120px !important',
                              height: '100% !important',
                              gap: '6px !important',
                              textTransform: 'none !important',
                              boxShadow: 'none !important',
                              '& .MuiButton-root': {
                                borderRadius: '0 50px 50px 0 !important',
                              }
                            },
                            '&.search-button:hover': {
                              background: '#e76f5a !important',
                              boxShadow: 'none !important',
                            }
                          }}
                        >
                          <SearchIcon sx={{ fontSize: '0.9rem' }} />
                          <span>Search</span>
                        </Button>
                      </Box>
                    </form>
                  </Box>
                </Col>
              </Row>
            </Container>
          </Box>
        </section>

        <section className="featured-section">
          <Container>
            <h2 className="featured-heading">Featured Listings</h2>
            <p className="featured-sub">Book your perfect stay in just three simple steps</p>

            {featuredProperties.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography variant="h5" sx={{ color: '#6B7280', fontWeight: 600 }}>
                  No properties found
                </Typography>
              </Box>
            ) : (
              <Row className="g-3 mt-2">
                {featuredProperties.map((property: any, idx: number) => (
                  <Col key={property.id || idx} xs={12} sm={6} md={4}>
                    <FeaturedCard 
                      image={property.image || img1} 
                      title={property.title} 
                      location={property.location} 
                      price={property.price} 
                      id={property.id || idx + 1}
                      rating={property.rating || 0}
                      reviewsCount={property.reviews_count || 0}
                    />
                  </Col>
                ))}
              </Row>
            )}
          </Container>
        </section>
        <HowItWorks />
        <PopularStays />
        <ChooseUs />
        <CtaReady />
        <Footer />
      </div>
    </>
  )
}

