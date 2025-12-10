import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PopularStays from '../components/PopularStays'
import HorizontalScrollSection from '../components/HorizontalScrollSection'
import { Box, Button, TextField, MenuItem, Select, FormControl } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import img1 from '../assets/images/filter-1.svg'
import img2 from '../assets/images/filter-2.svg'
import img3 from '../assets/images/filter-3.svg'
import img4 from '../assets/images/filter-4.svg'
import img5 from '../assets/images/filter-5.svg'
import img6 from '../assets/images/filter-6.svg'
import popularImg1 from '../assets/images/popular-stay-1.svg'
import popularImg2 from '../assets/images/popular-stay-2.svg'
import popularImg3 from '../assets/images/popular-stay-3.svg'
import { Container, Row, Col, Container as RBContainer } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()
  const [destination, setDestination] = useState('California')
  const [checkin, setCheckin] = useState('')
  const [checkout, setCheckout] = useState('')
  const [guests, setGuests] = useState('1')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    navigate('')
  }

  // Featured Listings - filter images
  const featuredItems = [
    { image: img1, title: 'Luxury Beachfront Villa', location: 'Malibu, California', price: 299, rating: 4.93, reviews: 123, isGuestFavorite: true },
    { image: img2, title: 'Modern Downtown Apartment', location: 'Los Angeles, California', price: 189, rating: 4.87, reviews: 89, isGuestFavorite: false },
    { image: img3, title: 'Cozy Mountain Cabin', location: 'Lake Tahoe, California', price: 249, rating: 4.95, reviews: 156, isGuestFavorite: true },
    { image: img4, title: 'Beachside Condo', location: 'San Diego, California', price: 179, rating: 4.82, reviews: 67, isGuestFavorite: false },
    { image: img5, title: 'Luxury Beachfront Villa', location: 'Malibu, California', price: 299, rating: 4.91, reviews: 134, isGuestFavorite: true },
    { image: img6, title: 'City Center Loft', location: 'San Francisco, California', price: 219, rating: 4.88, reviews: 98, isGuestFavorite: false },
    { image: img1, title: 'Ocean View Penthouse', location: 'Santa Monica, California', price: 349, rating: 4.96, reviews: 201, isGuestFavorite: true },
    { image: img2, title: 'Historic Victorian Home', location: 'San Francisco, California', price: 279, rating: 4.89, reviews: 112, isGuestFavorite: false },
    { image: img3, title: 'Desert Oasis Retreat', location: 'Palm Springs, California', price: 229, rating: 4.84, reviews: 78, isGuestFavorite: false },
    { image: img4, title: 'Wine Country Estate', location: 'Napa Valley, California', price: 399, rating: 4.97, reviews: 167, isGuestFavorite: true },
  ]

  // Favorites - popular-stay images aur filter-5, filter-6
  const favoritesItems = [
    { image: popularImg1, title: 'Luxury Beachfront Villa', location: 'Malibu, California', price: 299, rating: 4.93, reviews: 123, isGuestFavorite: true },
    { image: popularImg2, title: 'Cozy Mountain Cabin', location: 'Lake Tahoe, California', price: 249, rating: 4.95, reviews: 156, isGuestFavorite: true },
    { image: popularImg3, title: 'Luxury Beachfront Villa', location: 'Malibu, California', price: 299, rating: 4.91, reviews: 134, isGuestFavorite: true },
    { image: img5, title: 'Ocean View Penthouse', location: 'Santa Monica, California', price: 349, rating: 4.96, reviews: 201, isGuestFavorite: true },
    { image: img6, title: 'Wine Country Estate', location: 'Napa Valley, California', price: 399, rating: 4.97, reviews: 167, isGuestFavorite: true },
    { image: popularImg1, title: 'Beachfront Paradise', location: 'Miami, Florida', price: 329, rating: 4.94, reviews: 145, isGuestFavorite: true },
    { image: popularImg2, title: 'Mountain View Retreat', location: 'Aspen, Colorado', price: 279, rating: 4.92, reviews: 98, isGuestFavorite: true },
    { image: popularImg3, title: 'Luxury Penthouse Suite', location: 'New York, New York', price: 449, rating: 4.98, reviews: 203, isGuestFavorite: true },
  ]

  return (
    <div className="index-page">
      <Navbar />
      {/* Hero Section */}
      <section className="hero-section">
        {/* <Container>
          <Box className="hero-content">
            <Row className="justify-content-center">
              <Col lg={8} className="text-center">
                <h1 className="hero-title">Find Your Perfect Stay, Anytime, Anywhere</h1>
                <p className="hero-subtitle">Discover a diverse selection of rentals, from cozy apartments to luxurious villas, tailored to your preferences.</p>
              </Col>
            </Row>
          </Box>
        </Container> */}

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
                      <Button type="submit" className="search-button">
                        <SearchIcon sx={{ fontSize: '1.3rem' }} />
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
        <RBContainer fluid>
          <HorizontalScrollSection 
            title="Featured Listings"
            items={featuredItems}
          />
        </RBContainer>
      </section>
      <section className="popular-stays-section">
        <RBContainer fluid>
          <PopularStays />
        </RBContainer>
      </section>
      <section className="favorites-section">
        <RBContainer fluid>
          <HorizontalScrollSection 
            title="Favorites"
            items={favoritesItems}
          />
        </RBContainer>
      </section>
      <Footer />
    </div>
  )
}


