import React, { useMemo, useState, useCallback } from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import FeaturedCard from '../Components/FeaturedCard'
import { Container as RBContainer, Row, Col } from 'react-bootstrap'
import { Box, Breadcrumbs, Button, Checkbox, Divider, IconButton, InputAdornment, MenuItem, Paper, Select, Slider, Stack, TextField, Typography } from '@mui/material'
import { Link, router, usePage } from '@inertiajs/react'
import SearchIcon from '@mui/icons-material/Search'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import { Head } from '@inertiajs/react'

// Images served from public directory
const img1 = '/images/popular-stay-1.svg'

type Property = {
  id: number
  title: string
  location: string
  price: number
  guests: number
  bedrooms: number
  bathrooms: number
  property_type: string
  image: string | null
  amenities: string[]
}

export default function Listing() {
  const { props } = usePage()
  const properties = (props as any).properties || { data: [] }
  const filters = (props as any).filters || {}
  const priceRange = (props as any).priceRange || { min: 0, max: 1000 }
  const propertyTypes = (props as any).propertyTypes || []
  const availableLocations = (props as any).availableLocations || []
  const availableAmenities = (props as any).availableAmenities || []

  // Simple state initialization
  const [search, setSearch] = useState(filters.search || '')
  const [sortBy, setSortBy] = useState(filters.sort_by || 'featured')
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedCheckin, setSelectedCheckin] = useState<Date | null>(null)
  const [selectedCheckout, setSelectedCheckout] = useState<Date | null>(null)
  const [guests, setGuests] = useState(filters.guests || 1)
  const [localPriceRange, setLocalPriceRange] = useState([
    filters.min_price || priceRange.min,
    filters.max_price || priceRange.max
  ])
  const [selectedLocations, setSelectedLocations] = useState(filters.locations || [])
  const [selectedAmenities, setSelectedAmenities] = useState(filters.amenities || [])

  // Initialize dates from URL only once on mount
  React.useEffect(() => {
    if (filters.checkin) {
      const checkinDate = new Date(filters.checkin)
      if (!isNaN(checkinDate.getTime())) {
        setSelectedCheckin(checkinDate)
      }
    }
    if (filters.checkout) {
      const checkoutDate = new Date(filters.checkout)
      if (!isNaN(checkoutDate.getTime())) {
        setSelectedCheckout(checkoutDate)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Calendar helpers
  const changeMonth = (direction: number) => {
    const newDate = new Date(currentMonth)
    newDate.setMonth(newDate.getMonth() + direction)
    setCurrentMonth(newDate)
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
      days.push({ day: i, isOtherMonth: false, date: new Date(year, month, i) })
    }
    for (let i = 1; i <= 42 - days.length; i++) {
      days.push({ day: i, isOtherMonth: true })
    }
    return days
  }

  const handleDateClick = (date: Date) => {
    // Simple logic - just set dates
    if (!selectedCheckin || selectedCheckout) {
      setSelectedCheckin(date)
      setSelectedCheckout(null)
    } else if (date < selectedCheckin) {
      setSelectedCheckin(date)
      setSelectedCheckout(null)
    } else {
      setSelectedCheckout(date)
    }
  }

  const getDateState = (date: Date | undefined) => {
    if (!date) return { isSelected: false, isInRange: false, isPast: false }
    
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const isPast = date < today
    
    const isSelected = (selectedCheckin && date.getTime() === selectedCheckin.getTime()) || 
                      (selectedCheckout && date.getTime() === selectedCheckout.getTime())
    const isInRange = selectedCheckin && selectedCheckout && 
                      date > selectedCheckin && date < selectedCheckout
    return { isSelected, isInRange, isPast }
  }

  const calendarDays = getDaysInMonth(currentMonth)

  // Handle filter updates - simple approach, backend handles filtering
  const updateFilters = useCallback(() => {
    const params: Record<string, any> = {}
    
    if (search) params.search = search
    if (localPriceRange[0] !== priceRange.min) params.min_price = localPriceRange[0]
    if (localPriceRange[1] !== priceRange.max) params.max_price = localPriceRange[1]
    if (selectedCheckin) params.checkin = selectedCheckin.toISOString().split('T')[0]
    if (selectedCheckout) params.checkout = selectedCheckout.toISOString().split('T')[0]
    if (guests > 1) params.guests = guests
    if (selectedLocations.length > 0) params.locations = selectedLocations
    if (selectedAmenities.length > 0) params.amenities = selectedAmenities
    if (sortBy !== 'featured') params.sort_by = sortBy

    router.get('/listing', params, { preserveState: true })
  }, [search, localPriceRange, priceRange.min, priceRange.max, selectedCheckin, selectedCheckout, guests, selectedLocations, selectedAmenities, sortBy])

  // Handle location filter change
  const handleLocationChange = (location: string, checked: boolean) => {
    const newLocations = checked 
      ? [...selectedLocations, location]
      : selectedLocations.filter(l => l !== location)
    setSelectedLocations(newLocations)
  }

  // Handle amenity filter change
  const handleAmenityChange = (amenity: string, checked: boolean) => {
    const newAmenities = checked 
      ? [...selectedAmenities, amenity]
      : selectedAmenities.filter(a => a !== amenity)
    setSelectedAmenities(newAmenities)
  }

  // Update filters when values change - simple debounced approach
  React.useEffect(() => {
    const timer = setTimeout(() => {
      updateFilters()
    }, 500)
    return () => clearTimeout(timer)
  }, [search, sortBy, guests, selectedLocations, selectedAmenities, localPriceRange, selectedCheckin, selectedCheckout, updateFilters])

  // Handle price range change
  const handlePriceRangeChange = (newRange: number[]) => {
    setLocalPriceRange(newRange)
  }

  return (
    <>
      <Head title="Listings" />
      <Box>
        <Navbar />
        <Box className="listing-page">
          <RBContainer>
            <Row>
              {/* Sidebar Filters */}
              <Col xs={12} md={3}>
                <Paper className="filter-card" elevation={0}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                    <Typography className="filter-title">Filters</Typography>
                    <IconButton size="small"><ExpandMoreIcon /></IconButton>
                  </Stack>
                  <Divider sx={{ mb: 2 }} />

                  {/* Location */}
                  <Typography className="filter-group">Location</Typography>
                  <Stack spacing={1} sx={{ mb: 2 }}>
                    {availableLocations.map((location: string) => {
                      const count = properties.data.filter((p: Property) => 
                        p.location.toLowerCase().includes(location.toLowerCase())
                      ).length
                      return (
                        <Stack key={location} direction="row" alignItems="center" justifyContent="space-between" className="check-row">
                          <Stack direction="row" alignItems="center" spacing={1.2}>
                            <Checkbox 
                              size="small" 
                              checked={selectedLocations.includes(location)}
                              onChange={(e) => handleLocationChange(location, e.target.checked)}
                            />
                            <Typography className="check-label">{location}</Typography>
                          </Stack>
                          <Typography className="check-count">{count}</Typography>
                        </Stack>
                      )
                    })}
                  </Stack>

                  <Typography className="filter-group">Price Range</Typography>
                  <Box sx={{ px: 1 }}>
                    <Slider 
                      size="small" 
                      value={localPriceRange} 
                      onChange={(_, v) => handlePriceRangeChange(v as number[])} 
                      min={priceRange.min} 
                      max={priceRange.max}
                      valueLabelDisplay="auto"
                      valueLabelFormat={(value) => `$${value}`}
                      className="price-slider" 
                    />
                    <Stack direction="row" justifyContent="space-between" sx={{ color: '#9CA3AF', fontSize: 12, mt: 1, mb: 2 }}>
                      <span>${priceRange.min}</span>
                      <span>${priceRange.max}</span>
                    </Stack>
                  </Box>

                  <Typography className="filter-group">Checkin / Checkout</Typography>
                  <Box className="mini-calendar">
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                      <IconButton size="small" onClick={() => changeMonth(-1)}><RemoveIcon fontSize="small" /></IconButton>
                      <Typography className="cal-month">
                        {currentMonth.toLocaleString('default', { month: 'short', year: 'numeric' })}
                      </Typography>
                      <IconButton size="small" onClick={() => changeMonth(1)}><AddIcon fontSize="small" /></IconButton>
                    </Stack>
                    <Box className="cal-grid">
                      {['Su','Mo','Tu','We','Th','Fr','Sa'].map((day) => (
                        <span key={day} className="cal-cell head">{day}</span>
                      ))}
                      {calendarDays.map((d, idx) => {
                        const { isSelected, isInRange, isPast } = getDateState(d.date)
                        const isDisabled = d.isOtherMonth || isPast
                        
                        return (
                          <span
                            key={idx}
                            className={`cal-cell ${d.isOtherMonth ? 'other-month' : ''} ${isSelected ? 'selected' : ''} ${isInRange ? 'in-range' : ''} ${isDisabled ? 'disabled' : ''}`}
                            onClick={() => {
                              if (!isDisabled && d.date) {
                                handleDateClick(d.date)
                              }
                            }}
                            style={{ 
                              cursor: isDisabled ? 'not-allowed' : 'pointer',
                              pointerEvents: isDisabled ? 'none' : 'auto'
                            }}
                          >
                            {d.day}
                          </span>
                        )
                      })}
                    </Box>
                  </Box>

                  <Typography className="filter-group">Guest</Typography>
                  <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
                    <IconButton size="small" className="guest-btn" onClick={() => setGuests((g) => Math.max(1, g - 1))}><RemoveIcon fontSize="small" /></IconButton>
                    <Box className="guest-count">{guests}</Box>
                    <IconButton size="small" className="guest-btn" onClick={() => setGuests((g) => g + 1)}><AddIcon fontSize="small" /></IconButton>
                  </Stack>

                  <Typography className="filter-group">Amenities</Typography>
                  <Stack spacing={1} sx={{ mb: 1.5 }}>
                    {availableAmenities.map((amenity: string) => {
                      const count = properties.data.filter((p: Property) => 
                        p.amenities && p.amenities.some((a: string) => 
                          a.toLowerCase().trim() === amenity.toLowerCase().trim()
                        )
                      ).length
                      return (
                        <Stack key={amenity} direction="row" alignItems="center" justifyContent="space-between" className="check-row">
                          <Stack direction="row" alignItems="center" spacing={1.2}>
                            <Checkbox 
                              size="small" 
                              checked={selectedAmenities.includes(amenity)}
                              onChange={(e) => handleAmenityChange(amenity, e.target.checked)}
                            />
                            <Typography className="check-label">{amenity}</Typography>
                          </Stack>
                          <Typography className="check-count">{count}</Typography>
                        </Stack>
                      )
                    })}
                  </Stack>
                </Paper>
              </Col>

              {/* Content */}
              <Col xs={12} md={9}>
                <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'stretch', sm: 'center' }} spacing={2} sx={{ mb: 2 }}>
                  <Typography className="results-text">
                    Showing {properties.from || 0}-{properties.to || 0} of {properties.total || 0} results
                  </Typography>
                  <Stack direction="row" spacing={1.5} flex={1} sx={{ maxWidth: 560, ml: { sm: 'auto' } }}>
                    <TextField
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="search"
                      size="small"
                      fullWidth
                      className="listing-search"
                      InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment> }}
                    />
                    <Select size="small" value={sortBy} onChange={(e) => setSortBy(e.target.value)} sx={{ minWidth: 170 }} className="listing-sort">
                      <MenuItem value="featured">Sort by: Featured</MenuItem>
                      <MenuItem value="price_low">Price: Low to High</MenuItem>
                      <MenuItem value="price_high">Price: High to Low</MenuItem>
                      <MenuItem value="newest">Newest First</MenuItem>
                    </Select>
                  </Stack>
                </Stack>

                 {properties.data.length === 0 ? (
                   <Box sx={{ 
                     display: 'flex', 
                     flexDirection: 'column', 
                     alignItems: 'center', 
                     justifyContent: 'center', 
                     minHeight: '400px',
                     textAlign: 'center'
                   }}>
                     <Typography variant="h5" sx={{ color: '#6B7280', mb: 1, fontWeight: 600 }}>
                       No properties found
                     </Typography>
                     <Typography variant="body2" sx={{ color: '#9CA3AF' }}>
                       Try adjusting your search or filter criteria
                     </Typography>
                   </Box>
                 ) : (
                   <>
                     <Row className="g-3">
                       {properties.data.map((property: Property) => (
                         <Col key={property.id} xs={12} md={6} lg={6}>
                           <FeaturedCard 
                             image={property.image || img1} 
                             title={property.title} 
                             location={property.location} 
                             price={property.price} 
                             id={property.id} 
                           />
                         </Col>
                       ))}
                     </Row>
                   </>
                 )}
              </Col>
            </Row>
          </RBContainer>
        </Box>
        <Footer />
      </Box>
    </>
  )
}
