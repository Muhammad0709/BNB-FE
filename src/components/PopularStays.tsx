import HorizontalScrollSection from './HorizontalScrollSection'
import img1 from '../assets/images/popular-stay-1.svg'
import img2 from '../assets/images/popular-stay-2.svg'
import img3 from '../assets/images/popular-stay-3.svg'
import filter1 from '../assets/images/filter-1.svg'
import filter2 from '../assets/images/filter-2.svg'
import filter3 from '../assets/images/filter-3.svg'

export default function PopularStays() {
  const items = [
    { image: img1, title: 'Luxury Beachfront Villa', location: 'Malibu, California', price: 299, rating: 4.93, reviews: 123, isGuestFavorite: true },
    { image: img2, title: 'Modern Downtown Apartment', location: 'Los Angeles, California', price: 189, rating: 4.87, reviews: 89, isGuestFavorite: false },
    { image: img3, title: 'Cozy Mountain Cabin', location: 'Lake Tahoe, California', price: 249, rating: 4.95, reviews: 156, isGuestFavorite: true },
    { image: filter1, title: 'Beachside Condo', location: 'San Diego, California', price: 179, rating: 4.82, reviews: 67, isGuestFavorite: false },
    { image: filter2, title: 'Luxury Beachfront Villa', location: 'Malibu, California', price: 299, rating: 4.91, reviews: 134, isGuestFavorite: true },
    { image: filter3, title: 'City Center Loft', location: 'San Francisco, California', price: 219, rating: 4.88, reviews: 98, isGuestFavorite: false },
    { image: img1, title: 'Ocean View Penthouse', location: 'Santa Monica, California', price: 349, rating: 4.96, reviews: 201, isGuestFavorite: true },
    { image: img2, title: 'Historic Victorian Home', location: 'San Francisco, California', price: 279, rating: 4.89, reviews: 112, isGuestFavorite: false },
    { image: img3, title: 'Desert Oasis Retreat', location: 'Palm Springs, California', price: 229, rating: 4.84, reviews: 78, isGuestFavorite: false },
    { image: filter1, title: 'Wine Country Estate', location: 'Napa Valley, California', price: 399, rating: 4.97, reviews: 167, isGuestFavorite: true },
  ]

  return (
    <section className="popular-stays">
      <HorizontalScrollSection 
        title="Popular"
        items={items}
      />
    </section>
  )
}


