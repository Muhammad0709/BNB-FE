import { useState } from 'react'
import { Box, Button, Card, CardContent, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, InputAdornment, Chip } from '@mui/material'
import { Row, Col } from 'react-bootstrap'
import AdminLayout from '../../../components/admin/AdminLayout'
import DeleteConfirmationDialog from '../../../components/admin/DeleteConfirmationDialog'
import ActionsMenu from '../../../components/admin/ActionsMenu'
import SearchIcon from '@mui/icons-material/Search'
import { useNavigate } from 'react-router-dom'
import img1 from '../../../assets/images/filter-1.svg'
import img2 from '../../../assets/images/filter-2.svg'
import img3 from '../../../assets/images/filter-3.svg'

export default function AdminProperties() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [propertyToDelete, setPropertyToDelete] = useState<{ id: number; title: string } | null>(null)

  const properties = [
    { id: 1, title: 'Luxury Beachfront Villa', location: 'Malibu, California', price: 299, status: 'Active', bookings: 45, image: img1 },
    { id: 2, title: 'Modern Apartment', location: 'Los Angeles, CA', price: 199, status: 'Active', bookings: 32, image: img2 },
    { id: 3, title: 'Cozy Studio', location: 'San Francisco, CA', price: 149, status: 'Inactive', bookings: 12, image: img3 },
    { id: 4, title: 'Luxury Beachfront Villa', location: 'Malibu, California', price: 299, status: 'Active', bookings: 45, image: img1 },
    { id: 5, title: 'Modern Apartment', location: 'Los Angeles, CA', price: 199, status: 'Pending', bookings: 32, image: img2 },
    { id: 6, title: 'Cozy Studio', location: 'San Francisco, CA', price: 149, status: 'Active', bookings: 12, image: img3 },
  ]

  const filteredProperties = properties.filter(property =>
    property.title.toLowerCase().includes(search.toLowerCase()) ||
    property.location.toLowerCase().includes(search.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return '#10B981'
      case 'Inactive': return '#717171'
      case 'Pending': return '#F59E0B'
      default: return '#717171'
    }
  }

  const handleDeleteClick = (property: { id: number; title: string }) => {
    setPropertyToDelete(property)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = () => {
    if (propertyToDelete) {
      // Handle delete logic here
      console.log('Deleting property:', propertyToDelete.id)
      // In real app: API call to delete property
      // After successful delete, update the properties list
      setDeleteDialogOpen(false)
      setPropertyToDelete(null)
    }
  }

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false)
    setPropertyToDelete(null)
  }

  return (
    <AdminLayout title="Properties">
      {/* Properties Table */}
      <Row>
        <Col xs={12}>
          <Card elevation={0} sx={{ border: '1px solid #E5E7EB', borderRadius: 2 }}>
            <CardContent>
              <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={{ xs: 'flex-start', sm: 'center' }} justifyContent="space-between" sx={{ mb: 3, gap: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#222222' }}>
                  All Properties
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" sx={{ width: { xs: '100%', sm: 'auto' } }}>
                  <TextField
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search properties..."
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
                  <Button
                    variant="contained"
                    onClick={() => navigate('/admin/properties/create')}
                    fullWidth={window.innerWidth < 600}
                    sx={{
                      bgcolor: '#FF385C',
                      textTransform: 'none',
                      fontWeight: 700,
                      '&:hover': { bgcolor: '#E61E4D' }
                    }}
                  >
                    Add Property
                  </Button>
                </Stack>
              </Stack>

              <TableContainer sx={{ overflowX: 'auto', maxWidth: '100%', WebkitOverflowScrolling: 'touch' }}>
                <Table sx={{ minWidth: 800, width: '100%' }}>
                  <TableHead>
                    <TableRow sx={{ bgcolor: '#F9FAFB' }}>
                      <TableCell sx={{ fontWeight: 700, color: '#222222', whiteSpace: 'nowrap' }}>Property</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#222222', whiteSpace: 'nowrap' }}>Location</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#222222', whiteSpace: 'nowrap' }}>Price</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#222222', whiteSpace: 'nowrap' }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#222222', whiteSpace: 'nowrap' }}>Bookings</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#222222', whiteSpace: 'nowrap' }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredProperties.length === 0 ? (
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
                      filteredProperties.map((property) => (
                        <TableRow key={property.id} sx={{ '&:hover': { bgcolor: '#F9FAFB' } }}>
                          <TableCell>
                            <Stack direction="row" spacing={2} alignItems="center">
                              <Box
                                component="img"
                                src={property.image}
                                alt={property.title}
                                sx={{
                                  width: 60,
                                  height: 60,
                                  objectFit: 'cover',
                                  borderRadius: 1
                                }}
                              />
                              <Typography sx={{ fontWeight: 600, color: '#222222' }}>
                                {property.title}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell sx={{ color: '#717171' }}>{property.location}</TableCell>
                          <TableCell sx={{ fontWeight: 700, color: '#222222' }}>
                            ${property.price}/night
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={property.status}
                              size="small"
                              sx={{
                                bgcolor: `${getStatusColor(property.status)}15`,
                                color: getStatusColor(property.status),
                                fontWeight: 600,
                                fontSize: 12
                              }}
                            />
                          </TableCell>
                          <TableCell sx={{ color: '#717171' }}>{property.bookings}</TableCell>
                          <TableCell>
                            <ActionsMenu
                              onView={() => navigate(`/admin/properties/show/${property.id}`)}
                              onEdit={() => navigate(`/admin/properties/edit/${property.id}`)}
                              onDelete={() => handleDeleteClick({ id: property.id, title: property.title })}
                              viewLabel="View"
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
        title="Are you sure you want to delete this property?"
        itemName="the property"
      />
    </AdminLayout>
  )
}

