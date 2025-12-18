import { useState, useRef } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PopularStays from '../components/PopularStays'
import HorizontalScrollSection from '../components/HorizontalScrollSection'
import { Box, Button, TextField, Popover, Stack, Typography, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import PersonIcon from '@mui/icons-material/Person'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
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
  const guestsAnchorRef = useRef<HTMLDivElement>(null)
  const [destination, setDestination] = useState('California')
  const [checkin, setCheckin] = useState('')
  const [checkout, setCheckout] = useState('')
  const [guestsOpen, setGuestsOpen] = useState(false)
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  const [rooms, setRooms] = useState(1)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    navigate('')
  }

  const handleGuestsClick = () => {
    setGuestsOpen(!guestsOpen)
  }

  const handleGuestsClose = () => {
    setGuestsOpen(false)
  }

  const handleIncrement = (type: 'adults' | 'children' | 'rooms') => {
    if (type === 'adults') setAdults(prev => prev + 1)
    if (type === 'children') setChildren(prev => prev + 1)
    if (type === 'rooms') setRooms(prev => prev + 1)
  }

  const handleDecrement = (type: 'adults' | 'children' | 'rooms') => {
    if (type === 'adults') setAdults(prev => Math.max(1, prev - 1))
    if (type === 'children') setChildren(prev => Math.max(0, prev - 1))
    if (type === 'rooms') setRooms(prev => Math.max(1, prev - 1))
  }

  const getGuestsText = () => {
    const parts = []
    parts.push(`${adults} ${adults === 1 ? 'adult' : 'adults'}`)
    if (children > 0) parts.push(`${children} ${children === 1 ? 'child' : 'children'}`)
    parts.push(`${rooms} ${rooms === 1 ? 'room' : 'rooms'}`)
    return parts.join(' · ')
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
              <Col lg={12}>
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
                      <Box className="search-field" ref={guestsAnchorRef}>
                        <label htmlFor="guests">Guests</label>
                        <Box
                          onClick={handleGuestsClick}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            cursor: 'pointer',
                            py: 0.5
                          }}
                        >
                          <PersonIcon sx={{ fontSize: 18, color: '#717171' }} />
                          <Typography sx={{ color: '#222222', fontSize: '0.875rem', fontWeight: 400 }}>
                            {getGuestsText()}
                          </Typography>
                          <KeyboardArrowDownIcon sx={{ fontSize: 18, color: '#717171' }} />
                        </Box>
                      </Box>
                      <Popover
                        open={guestsOpen}
                        anchorEl={guestsAnchorRef.current}
                        onClose={handleGuestsClose}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'left',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'left',
                        }}
                        PaperProps={{
                          sx: {
                            mt: 1,
                            minWidth: 320,
                            borderRadius: 2,
                            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                            p: 3
                          }
                        }}
                      >
                        <Stack spacing={3}>
                          {/* Adults */}
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography sx={{ fontWeight: 600, color: '#222222' }}>Adults</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, border: '1px solid #E5E7EB', borderRadius: 2, px: 1 }}>
                              <IconButton
                                size="small"
                                onClick={() => handleDecrement('adults')}
                                disabled={adults <= 1}
                                sx={{
                                  color: adults <= 1 ? '#D1D5DB' : '#AD542D',
                                  '&:hover': { bgcolor: adults <= 1 ? 'transparent' : '#FFF5F7' },
                                  '&.Mui-disabled': { color: '#D1D5DB' }
                                }}
                              >
                                <RemoveIcon fontSize="small" />
                              </IconButton>
                              <Typography sx={{ minWidth: 24, textAlign: 'center', fontWeight: 600, color: '#222222' }}>
                                {adults}
                              </Typography>
                              <IconButton
                                size="small"
                                onClick={() => handleIncrement('adults')}
                                sx={{
                                  color: '#AD542D',
                                  '&:hover': { bgcolor: '#FFF5F7' }
                                }}
                              >
                                <AddIcon fontSize="small" />
                              </IconButton>
                            </Box>
                          </Box>

                          {/* Children */}
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography sx={{ fontWeight: 600, color: '#222222' }}>Children</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, border: '1px solid #E5E7EB', borderRadius: 2, px: 1 }}>
                              <IconButton
                                size="small"
                                onClick={() => handleDecrement('children')}
                                disabled={children <= 0}
                                sx={{
                                  color: children <= 0 ? '#D1D5DB' : '#AD542D',
                                  '&:hover': { bgcolor: children <= 0 ? 'transparent' : '#FFF5F7' },
                                  '&.Mui-disabled': { color: '#D1D5DB' }
                                }}
                              >
                                <RemoveIcon fontSize="small" />
                              </IconButton>
                              <Typography sx={{ minWidth: 24, textAlign: 'center', fontWeight: 600, color: '#222222' }}>
                                {children}
                              </Typography>
                              <IconButton
                                size="small"
                                onClick={() => handleIncrement('children')}
                                sx={{
                                  color: '#AD542D',
                                  '&:hover': { bgcolor: '#FFF5F7' }
                                }}
                              >
                                <AddIcon fontSize="small" />
                              </IconButton>
                            </Box>
                          </Box>

                          {/* Rooms */}
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography sx={{ fontWeight: 600, color: '#222222' }}>Rooms</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, border: '1px solid #E5E7EB', borderRadius: 2, px: 1 }}>
                              <IconButton
                                size="small"
                                onClick={() => handleDecrement('rooms')}
                                disabled={rooms <= 1}
                                sx={{
                                  color: rooms <= 1 ? '#D1D5DB' : '#AD542D',
                                  '&:hover': { bgcolor: rooms <= 1 ? 'transparent' : '#FFF5F7' },
                                  '&.Mui-disabled': { color: '#D1D5DB' }
                                }}
                              >
                                <RemoveIcon fontSize="small" />
                              </IconButton>
                              <Typography sx={{ minWidth: 24, textAlign: 'center', fontWeight: 600, color: '#222222' }}>
                                {rooms}
                              </Typography>
                              <IconButton
                                size="small"
                                onClick={() => handleIncrement('rooms')}
                                sx={{
                                  color: '#AD542D',
                                  '&:hover': { bgcolor: '#FFF5F7' }
                                }}
                              >
                                <AddIcon fontSize="small" />
                              </IconButton>
                            </Box>
                          </Box>

                          {/* Done Button */}
                          <Button
                            onClick={handleGuestsClose}
                            variant="outlined"
                            fullWidth
                            sx={{
                              borderColor: '#AD542D',
                              color: '#AD542D',
                              borderRadius: 2,
                              py: 1.5,
                              fontWeight: 600,
                              textTransform: 'none',
                              '&:hover': {
                                borderColor: '#78381C',
                                bgcolor: '#FFF5F7'
                              }
                            }}
                          >
                            Done
                          </Button>
                        </Stack>
                      </Popover>
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
            title="Hotels"
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


