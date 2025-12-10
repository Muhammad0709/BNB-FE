import { Routes, Route } from 'react-router-dom'
import AdminDashboard from '../pages/admin/dashboard'
import AdminUsers from '../pages/admin/users/index'
import ViewUser from '../pages/admin/users/show'
import EditUser from '../pages/admin/users/edit'
import AdminProperties from '../pages/admin/properties/index'
import AddProperty from '../pages/admin/properties/create'
import EditProperty from '../pages/admin/properties/edit'
import ViewProperty from '../pages/admin/properties/show'
import AdminBookings from '../pages/admin/bookings/index'
import ShowBooking from '../pages/admin/bookings/show'
import EditBooking from '../pages/admin/bookings/edit'
import CreateBooking from '../pages/admin/bookings/create'
import SystemSettings from '../pages/admin/settings/index'
import ProfileSettings from '../pages/admin/settings/profile'
import AdminSupportTickets from '../pages/admin/support-tickets/index'
import CreateSupportTicket from '../pages/admin/support-tickets/create'
import EditSupportTicket from '../pages/admin/support-tickets/edit'
import ShowSupportTicket from '../pages/admin/support-tickets/show'

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="dashboard" element={<AdminDashboard />} />
      <Route path="users/view/:id" element={<ViewUser />} />
      <Route path="users/edit/:id" element={<EditUser />} />
      <Route path="users" element={<AdminUsers />} />
      <Route path="properties/create" element={<AddProperty />} />
      <Route path="properties/edit/:id" element={<EditProperty />} />
      <Route path="properties/show/:id" element={<ViewProperty />} />
      <Route path="properties" element={<AdminProperties />} />
      <Route path="bookings/create" element={<CreateBooking />} />
      <Route path="bookings/edit/:id" element={<EditBooking />} />
      <Route path="bookings/show/:id" element={<ShowBooking />} />
      <Route path="bookings" element={<AdminBookings />} />
      <Route path="support-tickets/create" element={<CreateSupportTicket />} />
      <Route path="support-tickets/edit/:id" element={<EditSupportTicket />} />
      <Route path="support-tickets/show/:id" element={<ShowSupportTicket />} />
      <Route path="support-tickets" element={<AdminSupportTickets />} />
      <Route path="settings/profile" element={<ProfileSettings />} />
      <Route path="settings/password" element={<ProfileSettings />} />
      <Route path="settings" element={<SystemSettings />} />
    </Routes>
  )
}

