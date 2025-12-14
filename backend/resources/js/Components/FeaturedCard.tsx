import React from 'react'
import { Box, Paper, Typography } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import { Button } from 'react-bootstrap'
import { router } from '@inertiajs/react'
// Images served from public directory
const locationIcon = '/images/location.svg'

type FeaturedCardProps = {
  image: string
  title: string
  location: string
  price: number
  id?: number | string
  rating?: number
  reviewsCount?: number
}

export default function FeaturedCard({ image, title, location, price, id = 1, rating = 0, reviewsCount = 0 }: FeaturedCardProps) {
  const handleClick = () => {
    router.visit(`/detail/${id}`)
  }

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    router.visit(`/detail/${id}`)
  }

  return (
    <Paper 
      className="tiles-card" 
      elevation={0} 
      sx={{ 
        cursor: 'pointer',
        borderRadius: '14px !important',
        overflow: 'hidden',
      }} 
      onClick={handleClick}
    >
      <Box className="tiles-image" onClick={handleImageClick} sx={{ cursor: 'pointer' }}>
        <img src={image} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </Box>
      <Box className="tiles-body">
        <Typography className="tiles-title" component="h3" title={title}>{title}</Typography>
        <Box className="tiles-meta">
          <img src={locationIcon} alt="location" />
          <span>{location}</span>
        </Box>
        <Box className="tiles-row">
          <Box className="tiles-price">${price}<small>/ night</small></Box>
          <Box className="tiles-stars" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {rating > 0 ? (
              <>
                {[...Array(5)].map((_, i) => (
                  <StarIcon 
                    key={i} 
                    sx={{ 
                      fontSize: 14, 
                      color: i < Math.round(rating) ? '#FFD700' : '#D1D5DB' 
                    }} 
                  />
                ))}
                <small>({reviewsCount})</small>
              </>
            ) : (
              <small style={{ color: '#9CA3AF' }}>No reviews yet</small>
            )}
          </Box>
        </Box>
        <Button 
          className="tiles-book-btn" 
          type="button" 
          onClick={(e) => { e.stopPropagation(); handleClick() }}
        >
          Book Now
        </Button>
      </Box>
    </Paper>
  )
}

