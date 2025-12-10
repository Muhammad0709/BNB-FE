import { useState } from 'react'
import { Avatar, Box, Card, CardContent, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, InputAdornment } from '@mui/material'
import { Row, Col } from 'react-bootstrap'
import AdminLayout from '../../../components/admin/AdminLayout'
import DeleteConfirmationDialog from '../../../components/admin/DeleteConfirmationDialog'
import ActionsMenu from '../../../components/admin/ActionsMenu'
import { useNavigate } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search'

export default function AdminUsers() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<{ id: number; name: string } | null>(null)

  const users = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '+1 (555) 123-4567', status: 'Active',  joined: '2024-01-15', profileImage: '' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '+1 (555) 234-5678', status: 'Active', joined: '2024-02-20', profileImage: '' },
    { id: 3, name: 'Mike Johnson', email: 'mike.johnson@example.com', phone: '+1 (555) 345-6789', status: 'Inactive', joined: '2024-03-10', profileImage: '' },
    { id: 4, name: 'Sarah Williams', email: 'sarah.williams@example.com', phone: '+1 (555) 456-7890', status: 'Active', joined: '2024-01-05', profileImage: '' },
    { id: 5, name: 'David Brown', email: 'david.brown@example.com', phone: '+1 (555) 567-8901', status: 'Active', joined: '2024-04-12', profileImage: '' },
    { id: 6, name: 'Emily Davis', email: 'emily.davis@example.com', phone: '+1 (555) 678-9012', status: 'Inactive', joined: '2024-05-18', profileImage: '' },
  ]

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    return status === 'Active' ? '#10B981' : '#717171'
  }

  const handleDeleteClick = (user: { id: number; name: string }) => {
    setUserToDelete(user)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = () => {
    if (userToDelete) {
      // Handle delete logic here
      console.log('Deleting user:', userToDelete.id)
      // In real app: API call to delete user
      // After successful delete, update the users list
      setDeleteDialogOpen(false)
      setUserToDelete(null)
    }
  }

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false)
    setUserToDelete(null)
  }

  return (
    <AdminLayout title="Users"> 
      {/* Users Table */}
      <Row>
        <Col xs={12}>
          <Card elevation={0} sx={{ border: '1px solid #E5E7EB', borderRadius: 2 }}>
            <CardContent>
              <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={{ xs: 'flex-start', sm: 'center' }} justifyContent="space-between" sx={{ mb: 3, gap: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#222222' }}>
                  All Users
                </Typography>
                <TextField
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search users..."
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
                <Table sx={{ minWidth: 800, width: '100%' }}>
                  <TableHead>
                    <TableRow sx={{ bgcolor: '#F9FAFB' }}>
                      <TableCell sx={{ fontWeight: 700, color: '#222222', whiteSpace: 'nowrap' }}>Name</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#222222', whiteSpace: 'nowrap' }}>Email</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#222222', whiteSpace: 'nowrap' }}>Phone</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#222222', whiteSpace: 'nowrap' }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#222222', whiteSpace: 'nowrap' }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredUsers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} sx={{ border: 'none', py: 8 }}>
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
                      filteredUsers.map((user) => (
                        <TableRow key={user.id} sx={{ '&:hover': { bgcolor: '#F9FAFB' } }}>
                          <TableCell>
                            <Stack direction="row" spacing={2} alignItems="center">
                              <Avatar
                                src={user.profileImage}
                                sx={{
                                  width: 40,
                                  height: 40,
                                  bgcolor: '#FF385C',
                                  fontSize: '1rem',
                                  fontWeight: 600,
                                  cursor: 'pointer'
                                }}
                                onClick={() => navigate(`/admin/users/view/${user.id}`)}
                              >
                                {!user.profileImage && getInitials(user.name)}
                              </Avatar>
                              <Typography
                                sx={{
                                  fontWeight: 600,
                                  color: '#222222',
                                  cursor: 'pointer',
                                  '&:hover': { color: '#FF385C' }
                                }}
                                onClick={() => navigate(`/admin/users/view/${user.id}`)}
                              >
                                {user.name}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell sx={{ color: '#717171' }}>{user.email}</TableCell>
                          <TableCell sx={{ color: '#717171' }}>{user.phone}</TableCell>
                          <TableCell>
                            <Box
                              sx={{
                                display: 'inline-block',
                                px: 1.5,
                                py: 0.5,
                                borderRadius: 1,
                                bgcolor: `${getStatusColor(user.status)}15`,
                                color: getStatusColor(user.status),
                                fontWeight: 600,
                                fontSize: 12
                              }}
                            >
                              {user.status}
                            </Box>
                          </TableCell>
                          <TableCell>
                            <ActionsMenu
                              onEdit={() => navigate(`/admin/users/edit/${user.id}`)}
                              onDelete={() => handleDeleteClick({ id: user.id, name: user.name })}
                              editLabel="Edit"
                            />
                          </TableCell>
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

