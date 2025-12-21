import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import SignUp from './pages/auth/SignUp'
import SignIn from './pages/auth/SignIn'
import AdminLogin from './pages/admin/auth/login'
import AdminSignup from './pages/admin/auth/signup'
import Home from './pages/Home'
import About from './pages/About'
import Listing from './pages/Listing'
import Booking from './pages/Booking'
import Confirmation from './pages/Confirmation'
import ListingDetail from './pages/ListingDetail'
import Contact from './pages/Contact'
import TermsOfService from './pages/TermsOfService'
import PrivacyPolicy from './pages/PrivacyPolicy'
import ProfileSettings from './pages/ProfileSettings'
import CustomerBookings from './pages/CustomerBookings'
import SearchResults from './pages/SearchResults'
import Wishlist from './pages/Wishlist'
import Chat from './pages/Chat'
import AdminRoutes from './routes/AdminRoutes'
import HostRoutes from './routes/HostRoutes'


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/auth/signup" element={<SignUp />} />
      <Route path="/auth/login" element={<SignIn />} />
      <Route path="/login" element={<AdminLogin />} />
      <Route path="/register" element={<AdminSignup />} />
      <Route path="/stays" element={<Listing />} />
      <Route path="/search" element={<SearchResults />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/bookings" element={<CustomerBookings />} />
      <Route path="/booking/history" element={<CustomerBookings />} />
      <Route path="/confirmation" element={<Confirmation />} />
      <Route path="/detail/:id" element={<ListingDetail />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/profile/settings" element={<ProfileSettings />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/host/*" element={<HostRoutes />} />
          <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
