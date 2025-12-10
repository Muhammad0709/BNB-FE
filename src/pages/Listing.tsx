import { useMemo, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import FeaturedCard from '../components/FeaturedCard'
import { Container as RBContainer, Row, Col } from 'react-bootstrap'
import { Box, Breadcrumbs, Checkbox, Divider, IconButton, InputAdornment, MenuItem, Paper, Select, Slider, Stack, TextField, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import img1 from '../assets/images/popular-stay-1.svg'
import img2 from '../assets/images/popular-stay-2.svg'
import img3 from '../assets/images/popular-stay-3.svg'

type Item = { 
  image: string
  title: string
  location: string
  price: number
  rating?: number
  reviews?: number
  isGuestFavorite?: boolean
}

const allItems: Item[] = [
  { image: img1, title: 'Luxury Beachfront Villa', location: 'Malibu, California', price: 299, rating: 4.93, reviews: 123, isGuestFavorite: true },
  { image: img2, title: 'Modern Downtown Apartment', location: 'Los Angeles, California', price: 199, rating: 4.87, reviews: 89, isGuestFavorite: false },
  { image: img3, title: 'Cozy Mountain Cabin', location: 'Lake Tahoe, California', price: 399, rating: 4.95, reviews: 156, isGuestFavorite: true },
  { image: img1, title: 'Beachside Condo', location: 'San Diego, California', price: 149, rating: 4.82, reviews: 67, isGuestFavorite: false },
  { image: img2, title: 'City Center Loft', location: 'San Francisco, California', price: 249, rating: 4.88, reviews: 98, isGuestFavorite: false },
  { image: img3, title: 'Luxury Beachfront Villa', location: 'Malibu, California', price: 349, rating: 4.91, reviews: 134, isGuestFavorite: true },
]

export default function Listing() {
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('featured')
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedCheckin, setSelectedCheckin] = useState<Date | null>(null)
  const [selectedCheckout, setSelectedCheckout] = useState<Date | null>(null)
  const [guests, setGuests] = useState<number>(1)

  // Calculate min and max prices from items
  const minPrice = Math.min(...allItems.map(item => item.price))
  const maxPrice = Math.max(...allItems.map(item => item.price))
  const [priceRange, setPriceRange] = useState<number[]>([minPrice, maxPrice])

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
    if (!selectedCheckin || selectedCheckout) {
      setSelectedCheckin(date)
      setSelectedCheckout(null)
    } else if (date < selectedCheckin) {
      setSelectedCheckin(date)
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

  const filtered = useMemo(() => {
    let result = allItems.filter(i => 
      (!search || i.title.toLowerCase().includes(search.toLowerCase())) &&
      i.price >= priceRange[0] && i.price <= priceRange[1]
    )

    if (sortBy === 'price_low') result.sort((a, b) => a.price - b.price)
    else if (sortBy === 'price_high') result.sort((a, b) => b.price - a.price)

    return result
  }, [search, priceRange, sortBy])

  return (
    <Box>
      <Navbar />
      <Box className="listing-page">
        <RBContainer>
          {/* Breadcrumbs */}
          {/* <Breadcrumbs aria-label="breadcrumb" sx={{ color: '#717171', mb: 2 }}>
            <Typography 
              component={Link} 
              to="/" 
              color="#222222" 
              fontWeight={700}
              sx={{ textDecoration: 'none', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
            >
              Home
            </Typography>
            <Typography color="#717171">Search</Typography>
          </Breadcrumbs> */}

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
                  {[
                    ['North America', 4],
                    ['South America', 6],
                    ['Africa', 8],
                    ['Rhodium', 1],
                    ['Iridium', 1],
                  ].map(([label, count]) => (
                    <Stack key={label as string} direction="row" alignItems="center" justifyContent="space-between" className="check-row">
                      <Stack direction="row" alignItems="center" spacing={1.2}>
                        <Checkbox size="small" />
                        <Typography className="check-label">{label as string}</Typography>
                      </Stack>
                      <Typography className="check-count">{count as number}</Typography>
                    </Stack>
                  ))}
                </Stack>

                <Typography className="filter-group">Price Range</Typography>
                <Box sx={{ px: 1 }}>
                  <Slider 
                    size="small" 
                    value={priceRange} 
                    onChange={(_, v) => setPriceRange(v as number[])} 
                    min={minPrice} 
                    max={maxPrice}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => `$${value}`}
                    className="price-slider" 
                  />
                  <Stack direction="row" justifyContent="space-between" sx={{ color: '#9CA3AF', fontSize: 12, mt: 1, mb: 2 }}>
                    <span>${minPrice}</span>
                    <span>${maxPrice}</span>
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
                          onClick={() => !isDisabled && d.date && handleDateClick(d.date)}
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
                  {[
                    ['WiFi', 4],
                    ['Parking', 6],
                    ['Pool', 9],
                    ['AC', 1],
                    ['Pet-Friendly', 0],
                    ['Kitchen', 0],
                    ['Balcony', 0],
                    ['Gym', 0],
                  ].map(([label, count], i) => (
                    <Stack key={`${label}-${i}`} direction="row" alignItems="center" justifyContent="space-between" className="check-row">
                      <Stack direction="row" alignItems="center" spacing={1.2}>
                        <Checkbox size="small" />
                        <Typography className="check-label">{label as string}</Typography>
                      </Stack>
                      <Typography className="check-count">{count as number}</Typography>
                    </Stack>
                  ))}
                </Stack>
              </Paper>
            </Col>

            {/* Content */}
            <Col xs={12} md={9}>
              <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'stretch', sm: 'center' }} spacing={2} sx={{ mb: 2 }}>
                <Typography className="results-text">Showing 1-9 of {filtered.length} results</Typography>
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
                  </Select>
                </Stack>
              </Stack>

               {filtered.length === 0 ? (
                 <Box sx={{ 
                   display: 'flex', 
                   flexDirection: 'column', 
                   alignItems: 'center', 
                   justifyContent: 'center', 
                   minHeight: '400px',
                   textAlign: 'center'
                 }}>
                   <Typography variant="h5" sx={{ color: '#717171', mb: 1, fontWeight: 600 }}>
                     No data found
                   </Typography>
                   <Typography variant="body2" sx={{ color: '#9CA3AF' }}>
                     Try adjusting your search or filter criteria
                   </Typography>
                 </Box>
               ) : (
                 <Row className="g-3">
                   {filtered.map((i, idx) => (
                     <Col key={idx} xs={12} md={6} lg={6}>
                       <FeaturedCard 
                         image={i.image} 
                         title={i.title} 
                         location={i.location} 
                         price={i.price} 
                         id={idx + 1}
                         rating={i.rating}
                         reviews={i.reviews}
                         isGuestFavorite={i.isGuestFavorite}
                       />
                     </Col>
                   ))}
                 </Row>
               )}
            </Col>
          </Row>
        </RBContainer>
      </Box>
      <Footer />
    </Box>
  )
}


