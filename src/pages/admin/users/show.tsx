import { useState, useEffect } from 'react'
import { Avatar, Box, Button, Card, CardContent, Chip, Divider, Stack, Typography } from '@mui/material'
import { Row, Col } from 'react-bootstrap'
import AdminLayout from '../../../components/admin/AdminLayout'
import DeleteConfirmationDialog from '../../../components/admin/DeleteConfirmationDialog'
import { useNavigate, useParams } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import DeleteIcon from '@mui/icons-material/Delete'

export default function ViewUser() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    status: '',
    bookings: 0,
    joined: '',
    profileImage: ''
  })
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  // Mock data - in real app, fetch from API
  useEffect(() => {
    const mockUser = {
      id: id || '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      status: 'Active',
      bookings: 12,
      joined: '2024-01-15',
      profileImage: ''
    }
    setUser(mockUser)
  }, [id])

  const getStatusColor = (status: string) => {
    return status === 'Active' ? '#10B981' : '#717171'
  }

  const handleStatusChange = () => {
    const newStatus = user.status === 'Active' ? 'Inactive' : 'Active'
    setUser(prev => ({ ...prev, status: newStatus }))
    // In real app: API call to update status
    console.log('Status changed to:', newStatus)
  }

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = () => {
    // Handle delete logic here
    console.log('Deleting user:', user.id)
    // In real app: API call to delete user
    navigate('/admin/users')
  }

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false)
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  return (
    <AdminLayout title="View User">
      <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={{ xs: 'flex-start', sm: 'center' }} justifyContent="space-between" sx={{ mb: 3, gap: 2 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/admin/users')}
          sx={{
            color: '#717171',
            textTransform: 'none',
            '&:hover': { bgcolor: '#F9FAFB', color: '#222222' }
          }}
        >
          Back to Users
        </Button>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ width: { xs: '100%', sm: 'auto' } }}>
          <Button
            variant="outlined"
            startIcon={user.status === 'Active' ? <VisibilityOffIcon /> : <VisibilityIcon />}
            onClick={handleStatusChange}
            sx={{
              borderColor: user.status === 'Active' ? '#EF4444' : '#10B981',
              color: user.status === 'Active' ? '#EF4444' : '#10B981',
              textTransform: 'none',
              borderRadius: 2,
              fontWeight: 600,
              '&:hover': {
                borderColor: user.status === 'Active' ? '#DC2626' : '#059669',
                bgcolor: user.status === 'Active' ? '#FEF2F2' : '#ECFDF5'
              }
            }}
          >
            {user.status === 'Active' ? 'Deactivate' : 'Activate'}
          </Button>
          <Button
            variant="outlined"
            startIcon={<DeleteIcon />}
            onClick={handleDeleteClick}
            sx={{
              borderColor: '#EF4444',
              color: '#EF4444',
              textTransform: 'none',
              borderRadius: 2,
              fontWeight: 600,
              '&:hover': {
                borderColor: '#DC2626',
                bgcolor: '#FEF2F2'
              }
            }}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => navigate(`/admin/users/edit/${id}`)}
            sx={{
              bgcolor: '#FF385C',
              textTransform: 'none',
              borderRadius: 2,
              fontWeight: 700,
              '&:hover': { bgcolor: '#E61E4D' }
            }}
          >
            Edit User
          </Button>
        </Stack>
      </Stack>

      {/* User Header */}
      <Card elevation={0} sx={{ border: '1px solid #E5E7EB', borderRadius: 2, mb: 3 }}>
        <CardContent sx={{ p: { xs: 2, md: 4 } }}>
          <Stack direction="row" alignItems="center" spacing={3}>
            <Avatar
              src={user.profileImage}
              sx={{
                width: 120,
                height: 120,
                bgcolor: '#FF385C',
                fontSize: '3rem',
                fontWeight: 700
              }}
            >
              {!user.profileImage && getInitials(user.name)}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#222222', mb: 1 }}>
                {user.name}
              </Typography>
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <EmailIcon sx={{ fontSize: 18, color: '#717171' }} />
                  <Typography sx={{ color: '#717171' }}>{user.email}</Typography>
                </Stack>
                <Chip
                  label={user.status}
                  size="small"
                  sx={{
                    bgcolor: `${getStatusColor(user.status)}15`,
                    color: getStatusColor(user.status),
                    fontWeight: 600,
                    fontSize: 12
                  }}
                />
              </Stack>
              <Stack direction="row" spacing={3}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <PhoneIcon sx={{ fontSize: 18, color: '#717171' }} />
                  <Typography sx={{ color: '#717171' }}>{user.phone}</Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <CalendarTodayIcon sx={{ fontSize: 18, color: '#717171' }} />
                  <Typography sx={{ color: '#717171' }}>
                    Joined {new Date(user.joined).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {/* User Details */}
      <Row>
        <Col xs={12} md={6}>
          <Card elevation={0} sx={{ border: '1px solid #E5E7EB', borderRadius: 2, mb: 3 }}>
            <CardContent sx={{ p: { xs: 2, md: 4 } }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#222222', mb: 3 }}>
                User Information
              </Typography>
              <Stack spacing={3}>
                <Box>
                  <Typography sx={{ fontSize: 12, color: '#717171', mb: 0.5 }}>Full Name</Typography>
                  <Typography sx={{ fontWeight: 600, color: '#222222' }}>{user.name}</Typography>
                </Box>
                <Divider />
                <Box>
                  <Typography sx={{ fontSize: 12, color: '#717171', mb: 0.5 }}>Email Address</Typography>
                  <Typography sx={{ fontWeight: 600, color: '#222222' }}>{user.email}</Typography>
                </Box>
                <Divider />
                <Box>
                  <Typography sx={{ fontSize: 12, color: '#717171', mb: 0.5 }}>Phone Number</Typography>
                  <Typography sx={{ fontWeight: 600, color: '#222222' }}>{user.phone}</Typography>
                </Box>
                <Divider />
                <Box>
                  <Typography sx={{ fontSize: 12, color: '#717171', mb: 0.5 }}>Status</Typography>
                  <Chip
                    label={user.status}
                    size="small"
                    sx={{
                      bgcolor: `${getStatusColor(user.status)}15`,
                      color: getStatusColor(user.status),
                      fontWeight: 600,
                      fontSize: 12
                    }}
                  />
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Col>
        <Col xs={12} md={6}>
          <Card elevation={0} sx={{ border: '1px solid #E5E7EB', borderRadius: 2 }}>
            <CardContent sx={{ p: { xs: 2, md: 4 } }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#222222', mb: 3 }}>
                Activity Statistics
              </Typography>
              <Stack spacing={3}>
                <Box>
                  <Typography sx={{ fontSize: 12, color: '#717171', mb: 1 }}>Total Bookings</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#222222' }}>
                    {user.bookings}
                  </Typography>
                </Box>
                <Divider />
                <Box>
                  <Typography sx={{ fontSize: 12, color: '#717171', mb: 1 }}>Member Since</Typography>
                  <Typography sx={{ fontWeight: 600, color: '#222222' }}>
                    {new Date(user.joined).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Col>
      </Row>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Are you sure you want to delete this user?"
        itemName="the user"
      />
    </AdminLayout>
  )
}

