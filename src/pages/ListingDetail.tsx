import { useState } from 'react'
import { Box, Breadcrumbs, Button, Paper, Typography } from '@mui/material'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import FeaturedCard from '../components/FeaturedCard'
import { Container as RBContainer, Row, Col } from 'react-bootstrap'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import StarIcon from '@mui/icons-material/Star'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import BedIcon from '@mui/icons-material/Bed'
import BathroomIcon from '@mui/icons-material/Bathroom'
import PeopleIcon from '@mui/icons-material/People'
import HomeIcon from '@mui/icons-material/Home'
import WifiIcon from '@mui/icons-material/Wifi'
import AcUnitIcon from '@mui/icons-material/AcUnit'
import KitchenIcon from '@mui/icons-material/Kitchen'
import LocalParkingIcon from '@mui/icons-material/LocalParking'
import PoolIcon from '@mui/icons-material/Pool'
import PetsIcon from '@mui/icons-material/Pets'
import { useNavigate, Link } from 'react-router-dom'
import img1 from '../assets/images/popular-stay-1.svg'
import img2 from '../assets/images/popular-stay-2.svg'
import img3 from '../assets/images/popular-stay-3.svg'

export default function ListingDetail() {
  const navigate = useNavigate()
  const [calendar1Month, setCalendar1Month] = useState(new Date(2025, 7, 1))
  const [calendar2Month, setCalendar2Month] = useState(new Date(2025, 7, 1))
  const [selectedDate1, setSelectedDate1] = useState(6)
  const [selectedDate2, setSelectedDate2] = useState(11)

  const galleryImages = [
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600585152915-d208bec867a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  ]

  // Get images for grid layout: 1 large + 2 medium + 5 small = 8 images
  const displayedImages = galleryImages.slice(0, 8)
  const remainingCount = galleryImages.length - displayedImages.length

  const handlePrevMonth = (calendar: number) => {
    const current = calendar === 1 ? calendar1Month : calendar2Month
    const newDate = new Date(current)
    newDate.setMonth(newDate.getMonth() - 1)
    if (calendar === 1) setCalendar1Month(newDate)
    else setCalendar2Month(newDate)
  }

  const handleNextMonth = (calendar: number) => {
    const current = calendar === 1 ? calendar1Month : calendar2Month
    const newDate = new Date(current)
    newDate.setMonth(newDate.getMonth() + 1)
    if (calendar === 1) setCalendar1Month(newDate)
    else setCalendar2Month(newDate)
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const daysInPrevMonth = new Date(year, month, 0).getDate()
    
    const days = []
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({ day: daysInPrevMonth - i, isOtherMonth: true })
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ day: i, isOtherMonth: false })
    }
    while (days.length < 42) {
      days.push({ day: days.length - daysInMonth - firstDay + 1, isOtherMonth: true })
    }
    return days
  }

  const formatMonthYear = (date: Date) => {
    return date.toLocaleString('default', { month: 'short', year: 'numeric' })
  }

  const calendar1Days = getDaysInMonth(calendar1Month)
  const calendar2Days = getDaysInMonth(calendar2Month)

  const reviews = [
    { name: 'Chirstina Perry', date: '14 Nov, 2021', rating: 4, text: 'Thank you very fast shipping from Poland only 3days. Very Greateful.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
    { name: 'John Smith', date: '10 Nov, 2021', rating: 5, text: 'Amazing property with beautiful views. Highly recommended!', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
    { name: 'Sarah Johnson', date: '5 Nov, 2021', rating: 4, text: 'Great location and excellent amenities. Will definitely come back.', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' },
  ]

  const popularStays = [
    { image: img1, title: 'Luxury Beachfront Villa Luxury Bea...', location: 'Malibu, California', price: 299 },
    { image: img2, title: 'Luxury Beachfront Villa Luxury Bea...', location: 'Malibu, California', price: 299 },
    { image: img3, title: 'Luxury Beachfront Villa Luxury Bea...', location: 'Malibu, California', price: 299 },
  ]

  return (
    <Box>
      <Navbar />
      <main className="property-detail-page">
        {/* Breadcrumb Section */}
        {/* <section className="breadcrumb-section">
          <RBContainer>
            <Breadcrumbs aria-label="breadcrumb" sx={{ color: '#6B7280', mb: 2 }}>
              <Typography 
                component={Link} 
                to="/" 
                color="#111827" 
                fontWeight={700}
                sx={{ textDecoration: 'none', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
              >
                Home
              </Typography>
              <Typography color="#6B7280">
                Search
              </Typography>
              <Typography color="#6B7280">Luxury Beachfront Villa Luxury Beachfront Vi</Typography>
            </Breadcrumbs>
          </RBContainer>
        </section> */}

        {/* Property Details Section */}
        <section className="property-details-section">
          <RBContainer>
            <Row>
              <Col lg={12}>
                <Paper className="property-info-card" elevation={0}>
                  <Row className="align-items-center">
                    <Col md={8}>
                      <Typography className="property-title" component="h1">
                        Luxury Beachfront Villa Luxury <br /> Beachfront Vi
                      </Typography>
                      <Box className="property-meta">
                        <Box className="location">
                          <LocationOnIcon sx={{ fontSize: 16 }} />
                          <span>Malibu, California</span>
                        </Box>
                        <Box className="rating">
                          <Box className="stars">
                            {[...Array(5)].map((_, i) => (
                              <StarIcon key={i} sx={{ fontSize: 14, color: '#FFD700' }} />
                            ))}
                          </Box>
                          <Typography className="rating-text">(123)</Typography>
                        </Box>
                      </Box>
                    </Col>
                    <Col md={4}>
                      <Box className="booking-info">
                        <Box className="price">
                          <Typography component="span" className="price-amount">$299</Typography>
                          <Typography component="span" className="price-period">/night</Typography>
                        </Box>
                        <Button
                          variant="contained"
                          className="btn-book"
                          onClick={() => navigate('/booking')}
                        >
                          Request to Book
                        </Button>
                        {/* <Typography className="booking-note">You won't be charged yes.</Typography> */}
                      </Box>
                    </Col>
                  </Row>
                </Paper>
              </Col>
            </Row>
          </RBContainer>
        </section>

        {/* Image Gallery Section */}
        <section className="gallery-section">
          <RBContainer>
            <Box className="gallery-grid-container">
              {/* Top Section: Large left image + 2 medium right images */}
              <Box className="gallery-top-section">
                {/* Large left image */}
                <Box className="gallery-large-item">
                  <button type="button" className="gallery-image-button">
                    <img 
                      src={displayedImages[0]} 
                      alt={`Property 1`} 
                      className="gallery-image"
                    />
                  </button>
                </Box>
                
                {/* Right section with 2 medium images */}
                <Box className="gallery-right-section">
                  <Box className="gallery-medium-item">
                    <button type="button" className="gallery-image-button">
                      <img 
                        src={displayedImages[1]} 
                        alt={`Property 2`} 
                        className="gallery-image"
                      />
                    </button>
                  </Box>
                  <Box className="gallery-medium-item">
                    <button type="button" className="gallery-image-button">
                      <img 
                        src={displayedImages[2]} 
                        alt={`Property 3`} 
                        className="gallery-image"
                      />
                    </button>
                  </Box>
                </Box>
              </Box>

              {/* Bottom Section: 5 small images */}
              <Box className="gallery-bottom-section">
                {displayedImages.slice(3, 8).map((image, idx) => (
                  <Box key={idx + 3} className="gallery-small-item">
                    <button type="button" className="gallery-image-button">
                      <img 
                        src={image} 
                        alt={`Property ${idx + 4}`} 
                        className="gallery-image"
                      />
                      {idx === 4 && remainingCount > 0 && (
                        <Box className="gallery-more-overlay">
                          <Typography component="span">+{remainingCount} photos</Typography>
                        </Box>
                      )}
                    </button>
                  </Box>
                ))}
              </Box>
            </Box>
          </RBContainer>
        </section>

        {/* Quick Info Section */}
        <section>
          <RBContainer className="mt-4">
            <Paper className="quick-info-section" elevation={0}>
              <Typography className="section-title" component="h2">Quick Info</Typography>
              <Row className="g-4">
                <Col md={6} sm={6}>
                  <Box className="info-item d-flex gap-2">
                      <Box className="info-icon">
                     <BedIcon sx={{ color: '#FF385C', fontSize: '24px', width: '24px', height: '24px',mr: 1.5 }} />
                      </Box>
                    <Box className="info-text">
                      <Typography component="span" className="info-number">2</Typography>
                      <Typography component="span" className="info-label">Bedrooms</Typography>
                    </Box>
                  </Box>
                </Col>
                <Col md={6} sm={6}>
                  <Box className="info-item d-flex gap-2">
                    <Box className="info-icon">
                    <BathroomIcon sx={{ color: '#FF385C', fontSize: '24px', width: '24px', height: '24px',mr: 1.5 }} />
                    </Box>
                    <Typography component="span" className="info-number">3</Typography>
                    <Typography component="span" className="info-label">Bathrooms</Typography>
                  </Box>
                </Col>
              </Row>
              <Row className="g-4 mt-2">
                <Col md={6} sm={6}>
                  <Box className="info-item d-flex gap-2">
                    <Box className="info-icon">
                    <PeopleIcon sx={{ color: '#FF385C', fontSize: '24px', width: '24px', height: '24px',mr: 1.5 }} />
                    </Box>
                    <Box className="info-text">
                      <Typography component="span" className="info-number">4</Typography>
                      <Typography component="span" className="info-label">Guests</Typography>
                    </Box>
                  </Box>
                </Col>
                <Col md={6} sm={6}>
                  <Box className="info-item d-flex gap-2">
                    <Box className="info-icon">
                    <HomeIcon sx={{ color: '#FF385C', fontSize: '24px', width: '24px', height: '24px',mr: 1.5 }} />
                    </Box>
                    <Typography component="span" className="info-label">Entire apartment</Typography>
                  </Box>
                </Col>
              </Row>
            </Paper>
          </RBContainer>
        </section>

        {/* Main Content Section */}
        <section>
          <RBContainer className="mt-4">
            <Row>
              <Col lg={12}>
                {/* About Section */}
                <Paper className="about-section" elevation={0}>
                  <Typography className="section-title" component="h2">About the Property</Typography>
                  <Typography className="about-text">
                    Experience unparalleled comfort and convenience in our modern apartment located right in the heart of Lahore. Designed with sophisticated aesthetics and equipped with all essential amenities, this apartment offers a serene escape amidst the bustling city. Perfect for families, business travelers, or anyone looking to explore Lahore with ease, our property ensures a memorable stay with its prime location and luxurious features. Enjoy spacious living areas, a fully equipped kitchen, and breathtaking city views from large windows.
                  </Typography>
                  <Typography className="about-text">
                    Experience unparalleled comfort and convenience in our modern apartment located right in the heart of Lahore. Designed with sophisticated aesthetics and equipped with all essential amenities, this apartment offers a serene escape amidst the bustling city.
                  </Typography>
                </Paper>

                {/* Amenities Section */}
                <Box className="mt-4">
                  <Paper className="amenities-section" elevation={0}>
                    <Typography className="section-title" component="h2">Amenities</Typography>
                    <Row className="g-3">
                      <Col md={6} sm={6}>
                        <Box className="info-item d-flex gap-2" sx={{ alignItems: 'center', mb: 2 }}>
                          <Box className="info-icon" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 1.5 }}>
                            <WifiIcon sx={{ color: '#FF385C', fontSize: '24px', width: '24px', height: '24px' }} />
                          </Box>
                          <Typography component="span" className="info-label" sx={{ fontSize: '0.875rem', color: '#6B7280' }}>Free WiFi</Typography>
                        </Box>
                      </Col>
                      <Col md={6} sm={6}>
                        <Box className="info-item d-flex gap-2" sx={{ alignItems: 'center', mb: 2 }}>
                          <Box className="info-icon" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 1.5 }}>
                            <AcUnitIcon sx={{ color: '#FF385C', fontSize: '24px', width: '24px', height: '24px' }} />
                          </Box>
                          <Typography component="span" className="info-label" sx={{ fontSize: '0.875rem', color: '#6B7280' }}>Central AC</Typography>
                        </Box>
                      </Col>
                    </Row>
                    <Row className="mt-3">
                      <Col md={6} sm={6}>
                        <Box className="info-item d-flex gap-2" sx={{ alignItems: 'center', mb: 2 }}>
                          <Box className="info-icon" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 1.5 }}>
                            <KitchenIcon sx={{ color: '#FF385C', fontSize: '24px', width: '24px', height: '24px' }} />
                          </Box>
                          <Typography component="span" className="info-label" sx={{ fontSize: '0.875rem', color: '#6B7280' }}>Fully Equipped Kitchen</Typography>
                        </Box>
                      </Col>
                      <Col md={6} sm={6}>
                        <Box className="info-item d-flex gap-2" sx={{ alignItems: 'center', mb: 2 }}>
                          <Box className="info-icon" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 1.5 }}>
                            <LocalParkingIcon sx={{ color: '#FF385C', fontSize: '24px', width: '24px', height: '24px' }} />
                          </Box>
                          <Typography component="span" className="info-label" sx={{ fontSize: '0.875rem', color: '#6B7280' }}>Free Parking</Typography>
                        </Box>
                      </Col>
                    </Row>
                    <Row className="mt-3">
                      <Col md={6} sm={6}>
                        <Box className="info-item d-flex gap-2" sx={{ alignItems: 'center', mb: 2 }}>
                          <Box className="info-icon" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 1.5 }}>
                            <PoolIcon sx={{ color: '#FF385C', fontSize: '24px', width: '24px', height: '24px' }} />
                          </Box>
                          <Typography component="span" className="info-label" sx={{ fontSize: '0.875rem', color: '#6B7280' }}>Private Pool</Typography>
                        </Box>
                      </Col>
                      <Col md={6} sm={6}>
                        <Box className="info-item d-flex gap-2" sx={{ alignItems: 'center', mb: 2 }}>
                          <Box className="info-icon" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 1.5 }}>
                            <PetsIcon sx={{ color: '#FF385C', fontSize: '24px', width: '24px', height: '24px' }} />
                          </Box>
                          <Typography component="span" className="info-label" sx={{ fontSize: '0.875rem', color: '#6B7280' }}>Pet Friendly</Typography>
                        </Box>
                      </Col>
                    </Row>
                  </Paper>
                </Box>

                {/* Rules Section */}
                <Paper className="rules-section mt-4" elevation={0}>
                  <Typography className="section-title" component="h2">Roles</Typography>
                  <Box className="rules-list">
                    {[
                      'Check-in: 3:00 PM - 10:00 PM',
                      'Check-out: 11:00 AM',
                      'No parties or events allowed',
                      'Pets allowed [with prior notification]',
                      'No smoking indoors',
                    ].map((rule, idx) => (
                      <Box key={idx} className="rule-item">
                        <CheckCircleIcon sx={{ color: '#28a745', fontSize: 16 }} />
                        <Typography component="span">{rule}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Paper>

                {/* Availability Section */}
                <Paper className="availability-section mt-4" elevation={0}>
                  <Typography className="section-title" component="h2">Availability</Typography>
                  <Row>
                    <Col md={6}>
                      <Paper className="calendar-widget" elevation={0}>
                        <Box className="calendar-header">
                          <Button size="small" onClick={() => handlePrevMonth(1)}><ChevronLeftIcon /></Button>
                          <Typography component="span" className="month-year">{formatMonthYear(calendar1Month)}</Typography>
                          <Button size="small" onClick={() => handleNextMonth(1)}><ChevronRightIcon /></Button>
                        </Box>
                        <Box className="calendar-grid">
                          <Box className="calendar-weekdays">
                            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                              <Box key={day}>{day}</Box>
                            ))}
                          </Box>
                          <Box className="calendar-days">
                            {calendar1Days.slice(0, 35).map((d, idx) => (
                              <Box
                                key={idx}
                                className={`day ${d.isOtherMonth ? 'other-month' : ''} ${!d.isOtherMonth && d.day === selectedDate1 ? 'selected start-range' : ''}`}
                                onClick={() => !d.isOtherMonth && setSelectedDate1(d.day)}
                              >
                                {d.day}
                              </Box>
                            ))}
                          </Box>
                        </Box>
                      </Paper>
                    </Col>
                    <Col md={6}>
                      <Paper className="calendar-widget" elevation={0}>
                        <Box className="calendar-header">
                          <Button size="small" onClick={() => handlePrevMonth(2)}><ChevronLeftIcon /></Button>
                          <Typography component="span" className="month-year">{formatMonthYear(calendar2Month)}</Typography>
                          <Button size="small" onClick={() => handleNextMonth(2)}><ChevronRightIcon /></Button>
                        </Box>
                        <Box className="calendar-grid">
                          <Box className="calendar-weekdays">
                            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                              <Box key={day}>{day}</Box>
                            ))}
                          </Box>
                          <Box className="calendar-days">
                            {calendar2Days.slice(0, 35).map((d, idx) => (
                              <Box
                                key={idx}
                                className={`day ${d.isOtherMonth ? 'other-month' : ''} ${!d.isOtherMonth && d.day === selectedDate2 ? 'selected single' : ''}`}
                                onClick={() => !d.isOtherMonth && setSelectedDate2(d.day)}
                              >
                                {d.day}
                              </Box>
                            ))}
                          </Box>
                        </Box>
                      </Paper>
                    </Col>
                  </Row>
                </Paper>

                {/* Reviews Section */}
                <Box className="reviews-section mt-4">
                  <Row>
                    <Typography className="reviews-title" component="h2">Reviews (120)</Typography>
                    <Col lg={8}>
                      <Box className="reviews-list">
                        {reviews.map((review, idx) => (
                          <Box key={idx} className="review-item">
                            <Box className="reviewer-info">
                              <Box className="reviewer-avatar">
                                <img src={review.avatar} alt={review.name} />
                              </Box>
                              <Typography className="reviewer-name">{review.name}</Typography>
                              <Typography className="review-date">{review.date}</Typography>
                            </Box>
                            <Box className="review-content">
                              <Box className="stars">
                                {[...Array(5)].map((_, i) => (
                                  <StarIcon key={i} sx={{ fontSize: 14, color: i < review.rating ? '#ffc107' : '#e9ecef' }} />
                                ))}
                              </Box>
                              <Typography className="review-text">{review.text}</Typography>
                              <Typography className="helpful-text">Was this review helpful to you?</Typography>
                            </Box>
                          </Box>
                        ))}
                      </Box>
                    </Col>
                    <Col lg={4}>
                      <Paper className="rating-summary" elevation={0}>
                        <Box className="average-rating">
                          <Typography className="rating-title">Average rating</Typography>
                          <Typography className="rating-score">4/5</Typography>
                          <Box className="stars">
                            {[...Array(5)].map((_, i) => (
                              <StarIcon key={i} sx={{ fontSize: 16, color: i < 4 ? '#ffc107' : '#e9ecef' }} />
                            ))}
                          </Box>
                          <Typography className="total-reviews">(8.24kreviews)</Typography>
                        </Box>
                        <Box className="rating-breakdown">
                          {[
                            { label: '5 star', width: 40, count: '32K' },
                            { label: '4 star', width: 60, count: '54K' },
                            { label: '3 star', width: 45, count: '37K' },
                            { label: '2 star', width: 50, count: '42K' },
                            { label: '1 star', width: 70, count: '65K' },
                          ].map((r, idx) => (
                            <Box key={idx} className="rating-bar">
                              <Typography className="rating-label">{r.label}</Typography>
                              <Box className="bar-container">
                                <Box className="bar-fill" sx={{ width: `${r.width}%` }}></Box>
                              </Box>
                              <Typography className="rating-count">{r.count}</Typography>
                            </Box>
                          ))}
                        </Box>
                      </Paper>
                    </Col>
                  </Row>
                  <Box className="text-center mt-4">
                    <Button className="explore-more" variant="contained">Explore More</Button>
                  </Box>
                </Box>

                {/* Host Section */}
                <Paper className="host-section mt-4" elevation={0}>
                  <Typography className="section-title" component="h2">About Your Host</Typography>
                  <Box className="host-info">
                    <Box className="host-avatar">
                      <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Aisha M." style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                    </Box>
                    <Box className="host-details">
                      <Typography className="host-name" component="h5">Hosted by Aisha M.</Typography>
                      <Typography className="host-joined">joined in 2021</Typography>
                      <Typography className="host-description">
                        Aisha is a passionate traveler and local expert in Lahore, dedicated to providing guests with exceptional stays. She takes pride in ensuring her properties are clean, comfortable, and well-equipped for a memorable experience. Aisha is always available to offer recommendations and assistance during your visit.
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Col>
            </Row>
          </RBContainer>
        </section>

        {/* Popular Stays Section */}
        <section className="popular-stays-section">
          <RBContainer>
            <Typography className="section-title" component="h2">Popular Stays Near You</Typography>
            <Row className="g-4">
              {popularStays.map((stay, idx) => (
                <Col key={idx} lg={4} md={6}>
                  <FeaturedCard image={stay.image} title={stay.title} location={stay.location} price={stay.price} id={idx + 1} />
                </Col>
              ))}
            </Row>
          </RBContainer>
        </section>
      </main>
      <Footer />
    </Box>
  )
}

