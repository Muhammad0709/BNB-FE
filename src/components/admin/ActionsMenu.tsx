import { useState } from 'react'
import { IconButton, Menu, MenuItem, Typography } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'

type ActionsMenuProps = {
  onEdit?: () => void
  onDelete: () => void
  onView?: () => void
  editLabel?: string
  deleteLabel?: string
  viewLabel?: string
}

export default function ActionsMenu({
  onEdit,
  onDelete,
  onView,
  editLabel = 'Edit',
  deleteLabel = 'Delete',
  viewLabel = 'View'
}: ActionsMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleEdit = () => {
    if (onEdit) {
      onEdit()
    }
    handleClose()
  }

  const handleDelete = () => {
    onDelete()
    handleClose()
  }

  const handleView = () => {
    if (onView) {
      onView()
    }
    handleClose()
  }

  return (
    <>
      <IconButton
        size="small"
        onClick={handleClick}
        sx={{
          color: '#717171',
          '&:hover': { bgcolor: '#F9FAFB', color: '#222222' }
        }}
      >
        <MoreVertIcon fontSize="small" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            borderRadius: 1,
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            border: '1px solid #E5E7EB',
            minWidth: 140
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {onView && (
          <MenuItem
            onClick={handleView}
            sx={{
              py: 1,
              px: 1.5,
              '&:hover': { bgcolor: '#F9FAFB' }
            }}
          >
            <VisibilityIcon sx={{ fontSize: 16, color: '#717171', mr: 1 }} />
            <Typography sx={{ color: '#222222', fontSize: 14 }}>{viewLabel}</Typography>
          </MenuItem>
        )}
        {onEdit && (
          <MenuItem
            onClick={handleEdit}
            sx={{
              py: 1,
              px: 1.5,
              '&:hover': { bgcolor: '#F9FAFB' }
            }}
          >
            <EditIcon sx={{ fontSize: 16, color: '#717171', mr: 1 }} />
            <Typography sx={{ color: '#222222', fontSize: 14 }}>{editLabel}</Typography>
          </MenuItem>
        )}
        <MenuItem
          onClick={handleDelete}
          sx={{
            py: 1,
            px: 1.5,
            '&:hover': { bgcolor: '#FEF2F2' }
          }}
        >
          <DeleteIcon sx={{ fontSize: 16, color: '#EF4444', mr: 1 }} />
          <Typography sx={{ color: '#EF4444', fontSize: 14 }}>{deleteLabel}</Typography>
        </MenuItem>
      </Menu>
    </>
  )
}

