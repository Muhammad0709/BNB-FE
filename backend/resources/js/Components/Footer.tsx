import React from 'react'
import { Box, Chip, Container as MUIContainer, Stack, Typography } from '@mui/material'
// Images served from public directory
const logoUrl = '/images/lipabnb-logo.svg'

const amenities = [
  'Basic Amenities',
  'Dining & Kitchen',
  'Sleeping & Bath',
  'LaundryB21',
  'SafetyB26',
  'OutdoorB31',
  'Parking & Access',
  'Family-Friendly',
  'ExtrasB46',
]

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: '#1E1E1E', color: '#E5E7EB', borderTop: '1px solid #2A2A2A' }}>
      <MUIContainer maxWidth={false} sx={{ maxWidth: { xs: '100%', md: 1160, xl: 1440 }, px: { xs: 2, md: 3 }, py: { xs: 5, md: 8 }, mx: 'auto' }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.2fr 1fr 1.2fr' }, gap: { xs: 4, md: 6 }, alignItems: 'start' }}>
          {/* Brand + description */}
          <Box>
            <Box component="img" src={logoUrl} alt="lipabnb" sx={{ height: 32, mb: 2 }} />
            <Typography sx={{ color: '#C7CAD3' }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
              Ipsum has been the industry's standard dummy text ever since
            </Typography>
          </Box>

          {/* Quick links */}
          <Box>
            <Typography sx={{ color: '#FFFFFF', fontWeight: 700, mb: 2 }}>Quick Links</Typography>
            <Stack spacing={1.5} sx={{ color: '#C7CAD3' }}>
              <Box component="a" href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Box>
              <Box component="a" href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Listing page</Box>
              <Box component="a" href="#" style={{ color: 'inherit', textDecoration: 'none' }}>popular Location</Box>
              <Box component="a" href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Contact Us</Box>
            </Stack>
          </Box>

          {/* Amenities tags */}
          <Box>
            <Typography sx={{ color: '#FFFFFF', fontWeight: 700, mb: 2 }}>Amenities</Typography>
            <Stack direction="row" spacing={1.2} useFlexGap flexWrap="wrap">
              {amenities.map((a) => (
                <Chip key={a} label={a} sx={{ bgcolor: '#FF385C', color: '#fff', borderRadius: 999, px: 1, '& .MuiChip-label': { px: 1 } }} />
              ))}
            </Stack>
          </Box>
        </Box>
      </MUIContainer>
    </Box>
  )
}

