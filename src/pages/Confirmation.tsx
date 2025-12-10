import { Box, Button, Typography } from '@mui/material'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Container, Row, Col } from 'react-bootstrap'
import ListingPreviewCard from '../components/ListingPreviewCard'
import BookingSummaryCard from '../components/BookingSummaryCard'
import img1 from '../assets/images/popular-stay-1.svg'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useNavigate } from 'react-router-dom'

export default function Confirmation() {
  const navigate = useNavigate()

  return (
    <Box>
      <Navbar />
      <Box className="confirmation-page">
        <Container>
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
            <Typography color="#717171">
              Search
            </Typography>
            <Typography color="#717171">Luxury Beachfront Villa Luxury Beachfront Vi</Typography>
          </Breadcrumbs> */}

          <Box className="confirmation-content">
            <Box className="success-icon-wrapper">
              <CheckCircleIcon className="success-icon" />
            </Box>
            <Typography className="confirmation-title">Request Submitted</Typography>
            <Typography className="confirmation-subtitle">Your Request has been Successfully Submitted</Typography>
          </Box>

          <Row className="justify-content-center">
            <Col xs={12} md={10} lg={8}>
              <ListingPreviewCard
                image={img1}
                title="Luxury Beachfront Villa Luxury Beachfront Vi"
                location="Malibu, California"
                reviews={123}
                rating={4}
              />
            </Col>
          </Row>

          <Row className="justify-content-center">
            <Col xs={12} md={10} lg={8}>
              <BookingSummaryCard
                rules={[
                  'Check-in: 3:00 PM - 10:00 PM',
                  'Check-out: 11:00 AM',
                  'No parties or events allowed',
                  'Pets allowed (with prior notification)',
                  'No smoking indoors',
                ]}
                costs={[
                  { label: '$87 × 7 nights', amount: '$585' },
                  { label: 'Cleaning fee', amount: '$25' },
                  { label: 'Service fee', amount: '$71' },
                ]}
                totalLabel="Totaal"
                totalAmount="$631"
              />
            </Col>
          </Row>

          <Box className="return-btn-wrapper">
            <Button
              variant="contained"
              className="return-home-btn"
              onClick={() => navigate('/')}
            >
              Return to Home
            </Button>
          </Box>
        </Container>
      </Box>
      <Footer />
    </Box>
  )
}

