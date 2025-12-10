import { Container } from 'react-bootstrap'
import { Box, Button, Typography } from '@mui/material'

export default function CtaReady() {
  return (
    <Box className="cta-ready">
      <Container>
        <Typography component="h2" className="cta-title">Ready to Book Your Next Stay?</Typography>
        <Typography className="cta-sub">Join thousands of happy travelers who have found their perfect accommodations with us</Typography>
        <Button variant="contained" className="cta-btn">Explore Listings</Button>
      </Container>
    </Box>
  )
}


