import { useState } from 'react'
import { Card, CardContent, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Chip, Box, TextField, InputAdornment } from '@mui/material'
import { Row, Col } from 'react-bootstrap'
import SearchIcon from '@mui/icons-material/Search'
import DashboardIcon from '@mui/icons-material/Dashboard'
import HotelIcon from '@mui/icons-material/Hotel'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import HostLayout from '../../components/host/HostLayout'

export default function HostDashboard() {
  const [search, setSearch] = useState('')
  const stats = [
    { title: 'Total Properties', value: '12', icon: HotelIcon, color: '#AD542D', change: '+2 this month' },
    { title: 'Total Bookings', value: '89', icon: DashboardIcon, color: '#4F46E5', change: '+15%' },
    { title: 'Revenue', value: '$24,560', icon: TrendingUpIcon, color: '#10B981', change: '+22%' },
    { title: 'Upcoming Bookings', value: '8', icon: CalendarTodayIcon, color: '#F59E0B', change: 'Next 7 days' },
  ]

  const recentBookings = [
    { id: 1, guest: 'John Doe', property: 'Luxury Beachfront Villa', checkin: '2025-01-20', checkout: '2025-01-25', status: 'Confirmed', amount: '$1,495' },
    { id: 2, guest: 'Jane Smith', property: 'Modern Apartment', checkin: '2025-01-22', checkout: '2025-01-26', status: 'Pending', amount: '$799' },
    { id: 3, guest: 'Mike Johnson', property: 'Cozy Studio', checkin: '2025-01-25', checkout: '2025-01-30', status: 'Confirmed', amount: '$625' },
    { id: 4, guest: 'Sarah Williams', property: 'Luxury Beachfront Villa', checkin: '2025-01-28', checkout: '2025-02-02', status: 'Confirmed', amount: '$1,495' },
  ]

  const filteredBookings = recentBookings.filter(booking =>
    booking.guest.toLowerCase().includes(search.toLowerCase()) ||
    booking.property.toLowerCase().includes(search.toLowerCase()) ||
    booking.status.toLowerCase().includes(search.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed': return '#10B981'
      case 'Pending': return '#F59E0B'
      case 'Cancelled': return '#EF4444'
      default: return '#717171'
    }
  }

  return (
    <HostLayout title="Dashboard">
      {/* Stats Cards */}
      <Row className="g-3 mb-4">
        {stats.map((stat, idx) => (
          <Col key={idx} xs={12} sm={6} lg={3}>
            <Card elevation={0} sx={{ border: '1px solid #E5E7EB', borderRadius: 2 }}>
              <CardContent>
                <Stack direction="row" alignItems="center" sx={{ mb: 2 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      bgcolor: `${stat.color}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <stat.icon sx={{ color: stat.color, fontSize: 24 }} />
                  </Box>
                </Stack>
                <Typography variant="h5" sx={{ fontWeight: 800, color: '#222222', mb: 0.5 }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" sx={{ color: '#717171' }}>
                  {stat.title}
                </Typography>
              </CardContent>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Recent Bookings Table */}
      <Row>
        <Col xs={12}>
          <Card elevation={0} sx={{ border: '1px solid #E5E7EB', borderRadius: 2 }}>
            <CardContent>
              <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={{ xs: 'flex-start', sm: 'center' }} justifyContent="space-between" sx={{ mb: 3, gap: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#222222' }}>
                  Recent Bookings
                </Typography>
                <TextField
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search bookings..."
                  size="small"
                  sx={{ width: { xs: '100%', sm: 250 } }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" sx={{ color: '#9CA3AF' }} />
                      </InputAdornment>
                    )
                  }}
                />
              </Stack>

              <TableContainer sx={{ overflowX: 'auto', maxWidth: '100%', WebkitOverflowScrolling: 'touch' }}>
                <Table sx={{ minWidth: 650, width: '100%' }}>
                  <TableHead>
                    <TableRow sx={{ bgcolor: '#F9FAFB' }}>
                      <TableCell sx={{ fontWeight: 700, color: '#222222', whiteSpace: 'nowrap' }}>Guest</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#222222', whiteSpace: 'nowrap' }}>Property</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#222222', whiteSpace: 'nowrap' }}>Check-in</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#222222', whiteSpace: 'nowrap' }}>Check-out</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#222222', whiteSpace: 'nowrap' }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#222222', whiteSpace: 'nowrap' }}>Amount</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredBookings.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} sx={{ border: 'none', py: 8 }}>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: '100%'
                            }}
                          >
                            <Typography variant="body1" sx={{ color: '#717171', fontWeight: 600 }}>
                              No data found
                            </Typography>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredBookings.map((booking) => (
                        <TableRow key={booking.id} sx={{ '&:hover': { bgcolor: '#F9FAFB' } }}>
                          <TableCell>{booking.guest}</TableCell>
                          <TableCell>{booking.property}</TableCell>
                          <TableCell>{booking.checkin}</TableCell>
                          <TableCell>{booking.checkout}</TableCell>
                          <TableCell>
                            <Chip
                              label={booking.status}
                              size="small"
                              sx={{
                                bgcolor: `${getStatusColor(booking.status)}15`,
                                color: getStatusColor(booking.status),
                                fontWeight: 600,
                                fontSize: 12
                              }}
                            />
                          </TableCell>
                          <TableCell sx={{ fontWeight: 700, color: '#222222', whiteSpace: 'nowrap' }}>{booking.amount}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Col>
      </Row>
    </HostLayout>
  )
}

