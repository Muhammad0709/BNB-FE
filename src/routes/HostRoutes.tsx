import { Routes, Route } from 'react-router-dom'
import HostDashboard from '../pages/host/dashboard'
import HostProperties from '../pages/host/properties/index'
import AddProperty from '../pages/host/properties/create'
import EditProperty from '../pages/host/properties/edit'
import ViewProperty from '../pages/host/properties/show'
import HostBookings from '../pages/host/bookings/index'
import CreateBooking from '../pages/host/bookings/create'
import EditBooking from '../pages/host/bookings/edit'
import ShowBooking from '../pages/host/bookings/show'
import HostEarnings from '../pages/host/earnings/index'
import ShowEarning from '../pages/host/earnings/show'
import ShowPayout from '../pages/host/earnings/payout'
import RequestPayout from '../pages/host/earnings/request-payout'
import HostProfileSettings from '../pages/host/settings/profile'

export default function HostRoutes() {
  return (
    <Routes>
      <Route path="dashboard" element={<HostDashboard />} />
      <Route path="properties/create" element={<AddProperty />} />
      <Route path="properties/edit/:id" element={<EditProperty />} />
      <Route path="properties/show/:id" element={<ViewProperty />} />
      <Route path="properties" element={<HostProperties />} />
      <Route path="bookings/create" element={<CreateBooking />} />
      <Route path="bookings/edit/:id" element={<EditBooking />} />
      <Route path="bookings/show/:id" element={<ShowBooking />} />
      <Route path="bookings" element={<HostBookings />} />
      <Route path="earnings/request-payout" element={<RequestPayout />} />
      <Route path="earnings/show/:id" element={<ShowEarning />} />
      <Route path="earnings/payout/:id" element={<ShowPayout />} />
      <Route path="earnings" element={<HostEarnings />} />
      <Route path="settings/profile" element={<HostProfileSettings />} />
      <Route path="settings/verification" element={<HostProfileSettings />} />
      <Route path="settings/password" element={<HostProfileSettings />} />
      <Route path="settings" element={<HostProfileSettings />} />
    </Routes>
  )
}

