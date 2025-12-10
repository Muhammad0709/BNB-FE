import { Box, Paper, Stack, Typography } from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import StarIcon from '@mui/icons-material/Star'

type Props = {
  image: string
  title: string
  location: string
  reviews?: number
  rating?: number
}

export default function ListingPreviewCard({ image, title, location, reviews = 123, rating = 4 }: Props) {
  const stars = Array.from({ length: 5 })
  return (
    <Paper elevation={0} className="summary-card">
      <Stack direction="row" spacing={1.5} alignItems="center">
        <Box className="summary-thumb">
          <Box component="img" src={image} alt={title} />
        </Box>
        <Box sx={{ minWidth: 0 }}>
          <Typography className="sum-title">{title}</Typography>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ color: '#717171', fontSize: 12 }}>
            <LocationOnIcon sx={{ fontSize: 16 }} />
            <span>{location}</span>
          </Stack>
          <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mt: .5 }}>
            {stars.map((_, i) => (
              <StarIcon key={i} sx={{ fontSize: 16, color: i < Math.round(rating) ? '#F59E0B' : '#D1D5DB' }} />
            ))}
            <Typography sx={{ color: '#717171', fontSize: 12 }}>({reviews})</Typography>
          </Stack>
        </Box>
      </Stack>
    </Paper>
  )
}


