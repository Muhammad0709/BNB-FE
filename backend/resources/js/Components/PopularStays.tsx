import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Typography } from '@mui/material'
import FeaturedCard from './FeaturedCard'
// Images served from public directory
const img1 = '/images/popular-stay-1.svg'
const img2 = '/images/popular-stay-2.svg'
const img3 = '/images/popular-stay-3.svg'

export default function PopularStays() {
  const items = [
    { image: img1, title: 'Luxury Beachfront Villa Luxury Beachfront', location: 'Malibu, California', price: 299 },
    { image: img2, title: 'Luxury Beachfront Villa Luxury Beachfront', location: 'Malibu, California', price: 299 },
    { image: img3, title: 'Luxury Beachfront Villa Luxury Beachfront', location: 'Malibu, California', price: 299 },
  ]

  return (
    <section className="popular-stays">
      <Container>
        <Typography component="h2" className="popular-title">Popular Stays Near You</Typography>
        <Row className="g-3 mt-2">
          {items.map((i, idx) => (
            <Col key={idx} xs={12} md={4}>
              <FeaturedCard image={i.image} title={i.title} location={i.location} price={i.price} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}

