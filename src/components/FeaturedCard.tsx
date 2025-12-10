import { Box, Paper, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import StarIcon from '@mui/icons-material/Star'

type FeaturedCardProps = {
  image: string
  title: string
  location: string
  price: number
  id?: number | string
  rating?: number
  reviews?: number
  isGuestFavorite?: boolean
}

export default function FeaturedCard({ 
  image, 
  title, 
  location: _location, 
  price, 
  id = 1,
  rating = 4.93,
  reviews: _reviews,
  isGuestFavorite: _isGuestFavorite
}: FeaturedCardProps) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/detail/${id}`)
  }

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigate(`/detail/${id}`)
  }


  return (
    <Paper 
      className="airbnb-card" 
      elevation={0} 
      sx={{ 
        cursor: 'pointer'
      }} 
      onClick={handleClick}
    >
      <Box 
        className="airbnb-card-image-wrapper" 
        onClick={handleImageClick} 
        sx={{ cursor: 'pointer' }}
      >
        <img 
          src={image} 
          alt={title} 
          className="airbnb-card-image"
        />
      </Box>
      <Box className="airbnb-card-body">
        <Typography className="airbnb-card-title" component="h3" title={title}>
          {title}
        </Typography>
        <Box className="airbnb-card-price-rating">
          <Typography component="span" className="airbnb-card-price-text">
            ${price}
          </Typography>
          <Typography component="span" className="airbnb-card-night-text">
            {' '}night
          </Typography>
          <Box className="airbnb-card-rating-inline">
            <StarIcon sx={{ fontSize: 12, color: '#222222', marginLeft: 1 }} />
            <Typography component="span" sx={{ fontSize: 14, fontWeight: 600, color: '#222222', marginLeft: 0.5 }}>
              {rating.toFixed(2)}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  )
}


