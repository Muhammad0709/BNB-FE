import { useState } from 'react'
import { Box, Breadcrumbs, Button, Paper, Typography, TextField, Rating, Alert } from '@mui/material'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import FeaturedCard from '../Components/FeaturedCard'
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
import { router, Link, Head, usePage, useForm } from '@inertiajs/react'

// Images served from public directory
const img1 = '/images/popular-stay-1.svg'
const img2 = '/images/popular-stay-2.svg'
const img3 = '/images/popular-stay-3.svg'

const DEFAULT_IMAGE = '/images/popular-stay-1.svg'

export default function ListingDetail() {
  const { props } = usePage()
  const property = (props as any).property
  const reviews = (props as any).reviews || []
  const ratingStats = (props as any).ratingStats || { average: 0, total: 0, breakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } }
  const auth = (props as any).auth || null

  // Show not found if property doesn't exist
  if (!property) {
    return (
      <>
        <Head title="Property Not Found" />
        <Box>
          <Navbar />
          <Box sx={{ textAlign: 'center', py: 10 }}>
            <Typography variant="h4">Property Not Found</Typography>
            <Button onClick={() => router.visit('/listing')} sx={{ mt: 2 }}>
              Back to Listings
            </Button>
          </Box>
          <Footer />
        </Box>
      </>
    )
  }

  const [calendar1Month, setCalendar1Month] = useState(new Date())
  const [calendar2Month, setCalendar2Month] = useState(new Date())
  const [selectedDate1, setSelectedDate1] = useState<number | null>(null)
  const [selectedDate2, setSelectedDate2] = useState<number | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showReviewForm, setShowReviewForm] = useState(false)

  const { data, setData, post, processing, errors, reset } = useForm({
    property_id: property?.id || 0,
    rating: 5,
    comment: '',
  })

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    post('/reviews', {
      preserveScroll: true,
      onSuccess: () => {
        reset()
        setShowReviewForm(false)
        router.reload()
      },
    })
  }

  // Use property images or fallback to default
  const galleryImages = property.images && property.images.length > 0 
    ? property.images.map((img: string) => {
        if (img.startsWith('http') || img.startsWith('/')) {
          return img
        }
        return img.startsWith('storage/') ? `/${img}` : `/storage/${img}`
      })
    : property.image 
      ? [property.image.startsWith('http') || property.image.startsWith('/') 
          ? property.image 
          : (property.image.startsWith('storage/') ? `/${property.image}` : `/storage/${property.image}`)]
      : [DEFAULT_IMAGE]

  const getVisibleImages = () => {
    const visible = []
    for (let i = 0; i < 3; i++) {
      const index = (currentImageIndex + i) % galleryImages.length
      visible.push({ image: galleryImages[index], index })
    }
    return visible
  }

  const handleScroll = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length)
    } else {
      setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
    }
  }

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

  // Calculate rating breakdown percentages
  const getRatingPercentage = (starCount: number) => {
    if (ratingStats.total === 0) return 0
    return Math.round((starCount / ratingStats.total) * 100)
  }

  const popularStays = [
    { image: img1, title: 'Luxury Beachfront Villa Luxury Bea...', location: 'Malibu, California', price: 299 },
    { image: img2, title: 'Luxury Beachfront Villa Luxury Bea...', location: 'Malibu, California', price: 299 },
    { image: img3, title: 'Luxury Beachfront Villa Luxury Bea...', location: 'Malibu, California', price: 299 },
  ]

  return (
    <>
      <Head title={property.title} />
      <Box>
        <Navbar />
        <main className="property-detail-page">
          {/* Hero Section */}
          <section className="hero-section">
            <Box className="hero-image">
              <img 
                src={galleryImages[0] || DEFAULT_IMAGE} 
                alt={property.title}
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement
                  if (!target.src.includes(DEFAULT_IMAGE)) {
                    target.src = DEFAULT_IMAGE
                  }
                }}
              />
            </Box>
          </section>

          {/* Property Details Section */}
          <section className="property-details-section">
            <RBContainer>
              <Row>
                <Col lg={12}>
                  <Paper className="property-info-card" elevation={0}>
                    <Row className="align-items-center">
                      <Col md={8}>
                        <Typography className="property-title" component="h1">
                          {property.title}
                        </Typography>
                        <Box className="property-meta">
                          <Box className="location">
                            <LocationOnIcon sx={{ fontSize: 16 }} />
                            <span>{property.location}</span>
                          </Box>
                          <Box className="rating">
                            <Box className="stars">
                              {[...Array(5)].map((_, i) => (
                                <StarIcon key={i} sx={{ fontSize: 14, color: i < Math.round(ratingStats.average) ? '#FFD700' : '#D1D5DB' }} />
                              ))}
                            </Box>
                            <Typography className="rating-text">({ratingStats.total})</Typography>
                          </Box>
                        </Box>
                      </Col>
                      <Col md={4}>
                        <Box className="booking-info">
                          <Box className="price">
                            <Typography component="span" className="price-amount">${property.price}</Typography>
                            <Typography component="span" className="price-period">/night</Typography>
                          </Box>
                          <Button
                            variant="contained"
                            className="btn-book"
                            onClick={() => router.visit(`/booking?property_id=${property.id}`)}
                          >
                            Request to Book
                          </Button>
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
              <Box sx={{ position: 'relative' }}>
                <Row className="g-0">
                  {getVisibleImages().map((item, idx) => (
                    <Col key={idx} md={4}>
                      <Box 
                        className="gallery-item"
                        sx={{ 
                          position: 'relative',
                          cursor: idx === 0 ? 'pointer' : 'default',
                          transition: 'opacity 0.3s',
                          '&:hover': idx === 0 ? { opacity: 0.9 } : {}
                        }}
                        onClick={() => idx === 0 && handleScroll('left')}
                      >
                        <img src={item.image} alt={`Property ${item.index + 1}`} className="img-fluid" />
                        {idx === 2 && currentImageIndex + 2 < galleryImages.length - 1 && (
                          <Box className="more-overlay">
                            <Typography component="span">+ {galleryImages.length - (currentImageIndex + 3)} More</Typography>
                          </Box>
                        )}
                      </Box>
                    </Col>
                  ))}
                </Row>
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
                       <BedIcon sx={{ color: '#FF8C75', fontSize: '24px', width: '24px', height: '24px',mr: 1.5 }} />
                        </Box>
                      <Box className="info-text">
                        <Typography component="span" className="info-number">{property.bedrooms}</Typography>
                        <Typography component="span" className="info-label">Bedrooms</Typography>
                      </Box>
                    </Box>
                  </Col>
                  <Col md={6} sm={6}>
                    <Box className="info-item d-flex gap-2">
                      <Box className="info-icon">
                      <BathroomIcon sx={{ color: '#FF8C75', fontSize: '24px', width: '24px', height: '24px',mr: 1.5 }} />
                      </Box>
                      <Typography component="span" className="info-number">{property.bathrooms}</Typography>
                      <Typography component="span" className="info-label">Bathrooms</Typography>
                    </Box>
                  </Col>
                </Row>
                <Row className="g-4 mt-2">
                  <Col md={6} sm={6}>
                    <Box className="info-item d-flex gap-2">
                      <Box className="info-icon">
                      <PeopleIcon sx={{ color: '#FF8C75', fontSize: '24px', width: '24px', height: '24px',mr: 1.5 }} />
                      </Box>
                      <Box className="info-text">
                        <Typography component="span" className="info-number">{property.guests}</Typography>
                        <Typography component="span" className="info-label">Guests</Typography>
                      </Box>
                    </Box>
                  </Col>
                  <Col md={6} sm={6}>
                    <Box className="info-item d-flex gap-2">
                      <Box className="info-icon">
                      <HomeIcon sx={{ color: '#FF8C75', fontSize: '24px', width: '24px', height: '24px',mr: 1.5 }} />
                      </Box>
                      <Typography component="span" className="info-label">Entire {property.property_type}</Typography>
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
                    {property.description ? (
                      property.description.split('\n').map((paragraph: string, idx: number) => (
                        paragraph.trim() && (
                          <Typography key={idx} className="about-text">
                            {paragraph}
                    </Typography>
                        )
                      ))
                    ) : (
                    <Typography className="about-text">
                        Experience unparalleled comfort and convenience in this {property.property_type} located in {property.location}. 
                        Perfect for families, business travelers, or anyone looking to explore with ease.
                    </Typography>
                    )}
                  </Paper>

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
                      <Col lg={12}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                          <Typography className="reviews-title" component="h2" sx={{ mb: 0 }}>
                            {ratingStats.total > 0 ? `Reviews (${ratingStats.total})` : 'Reviews'}
                          </Typography>
                          {auth && !showReviewForm && (
                            <Button 
                              variant="contained" 
                              onClick={() => setShowReviewForm(true)}
                              sx={{ bgcolor: '#FF8C75', '&:hover': { bgcolor: '#E61E4D' } }}
                            >
                              Write a Review
                            </Button>
                          )}
                        </Box>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={ratingStats.total > 0 ? 8 : 12}>
                        {/* Review Form for Authenticated Users */}
                        {auth && showReviewForm && (
                          <Paper elevation={0} sx={{ p: 3, mb: 3, border: '1px solid #E7E7F4', borderRadius: '12px' }}>
                            <Typography variant="h6" sx={{ mb: 2 }}>Write a Review</Typography>
                            <form onSubmit={handleSubmitReview}>
                              <Box sx={{ mb: 2 }}>
                                <Typography component="legend" sx={{ mb: 1 }}>Rating</Typography>
                                <Rating
                                  value={data.rating}
                                  onChange={(_, value) => setData('rating', value || 5)}
                                  size="large"
                                />
                                {errors.rating && (
                                  <Typography color="error" sx={{ fontSize: '0.75rem', mt: 0.5 }}>
                                    {errors.rating}
                                  </Typography>
                                )}
                              </Box>
                              <Box sx={{ mb: 2 }}>
                                <TextField
                                  fullWidth
                                  multiline
                                  rows={4}
                                  label="Your Review"
                                  value={data.comment}
                                  onChange={(e) => setData('comment', e.target.value)}
                                  error={!!errors.comment}
                                  helperText={errors.comment}
                                />
                              </Box>
                              <Box sx={{ display: 'flex', gap: 2 }}>
                                <Button 
                                  type="submit" 
                                  variant="contained"
                                  disabled={processing}
                                  sx={{ bgcolor: '#FF8C75', '&:hover': { bgcolor: '#E61E4D' } }}
                                >
                                  {processing ? 'Submitting...' : 'Submit Review'}
                                </Button>
                                <Button 
                                  variant="outlined"
                                  onClick={() => {
                                    setShowReviewForm(false)
                                    reset()
                                  }}
                                >
                                  Cancel
                                </Button>
                              </Box>
                            </form>
                          </Paper>
                        )}

                        {!auth && (
                          <Box sx={{ mb: 3 }}>
                            <Alert severity="info">
                              Please <Link href="/auth/login">login</Link> to write a review.
                            </Alert>
                          </Box>
                        )}

                        <Box className="reviews-list">
                          {reviews.length === 0 ? (
                            <Typography sx={{ color: '#6B7280', py: 4, textAlign: 'center' }}>
                              No reviews yet. Be the first to review this property!
                            </Typography>
                          ) : (
                            reviews.map((review: any) => {
                              const defaultAvatar = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
                              const avatarSrc = review.user.profile_picture || defaultAvatar
                              
                              return (
                                <Box key={review.id} className="review-item">
                              <Box className="reviewer-info">
                                <Box className="reviewer-avatar">
                                      <img 
                                        src={avatarSrc} 
                                        alt={review.user.name}
                                        onError={(e) => {
                                          const target = e.currentTarget as HTMLImageElement
                                          // If profile picture fails, use default fallback
                                          if (target.src !== defaultAvatar) {
                                            target.src = defaultAvatar
                                          }
                                        }}
                                      />
                                </Box>
                                    <Typography className="reviewer-name">{review.user.name}</Typography>
                              </Box>
                              <Box className="review-content">
                                <Box className="stars">
                                  {[...Array(5)].map((_, i) => (
                                    <StarIcon key={i} sx={{ fontSize: 14, color: i < review.rating ? '#ffc107' : '#e9ecef' }} />
                                  ))}
                                </Box>
                                    {review.comment && (
                                      <Typography className="review-text">{review.comment}</Typography>
                                    )}
                              </Box>
                            </Box>
                              )
                            })
                          )}
                        </Box>
                      </Col>
                      {ratingStats.total > 0 && (
                      <Col lg={4}>
                        <Paper className="rating-summary" elevation={0}>
                          <Box className="average-rating">
                            <Typography className="rating-title">Average rating</Typography>
                              <Typography className="rating-score">{ratingStats.average}/5</Typography>
                            <Box className="stars">
                              {[...Array(5)].map((_, i) => (
                                  <StarIcon key={i} sx={{ fontSize: 16, color: i < Math.round(ratingStats.average) ? '#ffc107' : '#e9ecef' }} />
                              ))}
                              </Box>
                              <Typography className="total-reviews">({ratingStats.total} {ratingStats.total === 1 ? 'review' : 'reviews'})</Typography>
                          </Box>
                          <Box className="rating-breakdown">
                            {[
                                { label: '5 star', count: ratingStats.breakdown[5] },
                                { label: '4 star', count: ratingStats.breakdown[4] },
                                { label: '3 star', count: ratingStats.breakdown[3] },
                                { label: '2 star', count: ratingStats.breakdown[2] },
                                { label: '1 star', count: ratingStats.breakdown[1] },
                              ].map((r, idx) => {
                                const percentage = getRatingPercentage(r.count)
                                return (
                              <Box key={idx} className="rating-bar">
                                <Typography className="rating-label">{r.label}</Typography>
                                <Box className="bar-container">
                                      <Box className="bar-fill" sx={{ width: `${percentage}%` }}></Box>
                                </Box>
                                <Typography className="rating-count">{r.count}</Typography>
                              </Box>
                                )
                              })}
                          </Box>
                        </Paper>
                      </Col>
                      )}
                    </Row>
                  </Box>

                  {/* Host Section */}
                  <Paper className="host-section mt-4" elevation={0}>
                    <Typography className="section-title" component="h2">About Your Host</Typography>
                    <Box className="host-info">
                      <Box className="host-avatar">
                        <img 
                          src={property.host.profile_picture || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'} 
                          alt={property.host.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                          onError={(e) => {
                            const target = e.currentTarget as HTMLImageElement
                            target.src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
                          }}
                        />
                      </Box>
                      <Box className="host-details">
                        <Typography className="host-name" component="h5">Hosted by {property.host.name}</Typography>
                        <Typography className="host-joined">
                          joined in {property.host.created_at ? new Date(property.host.created_at).getFullYear() : new Date().getFullYear()}
                        </Typography>
                        <Typography className="host-description">
                          {property.host.name} is a passionate traveler and local expert in {property.location}, dedicated to providing guests with exceptional stays. 
                          They take pride in ensuring properties are clean, comfortable, and well-equipped for a memorable experience.
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
    </>
  )
}
