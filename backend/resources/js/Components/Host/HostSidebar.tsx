import React, { useState } from 'react'
import { Avatar, Box, Button, Divider, Menu, MenuItem, Stack, Typography } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import HotelIcon from '@mui/icons-material/Hotel'
import BookOnlineIcon from '@mui/icons-material/BookOnline'
import SettingsIcon from '@mui/icons-material/Settings'
import LogoutIcon from '@mui/icons-material/Logout'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import { router, usePage } from '@inertiajs/react'

type HostSidebarProps = {
  sidebarOpen: boolean
}

export default function HostSidebar({ sidebarOpen }: HostSidebarProps) {
  const { auth } = usePage().props as any
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const menuOpen = Boolean(anchorEl)

  const hostUser = {
    name: auth?.user?.name || 'Host User',
    email: auth?.user?.email || 'host@example.com',
    initials: auth?.user?.name?.charAt(0).toUpperCase() || 'H'
  }

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleSettingsClick = () => {
    router.visit('/host/settings')
    handleMenuClose()
  }

  const handleLogoutClick = () => {
    router.post('/host/logout')
    handleMenuClose()
  }

  const isActive = (path: string) => {
    if (path === '/host/dashboard') {
      return window.location.pathname === '/host/dashboard'
    }
    return window.location.pathname.startsWith(path)
  }

  const menuItems = [
    {
      label: 'Dashboard',
      icon: DashboardIcon,
      path: '/host/dashboard',
      onClick: () => router.visit('/host/dashboard')
    },
    {
      label: 'Manage Properties',
      icon: HotelIcon,
      path: '/host/properties',
      onClick: () => router.visit('/host/properties')
    },
    {
      label: 'Bookings',
      icon: BookOnlineIcon,
      path: '/host/bookings',
      onClick: () => router.visit('/host/bookings')
    },
    {
      label: 'Earnings / Payouts',
      icon: AccountBalanceWalletIcon,
      path: '/host/earnings',
      onClick: () => router.visit('/host/earnings')
    },
  ]

  return (
    <>
      <Box
        sx={{
          position: { xs: 'fixed', md: 'fixed' },
          top: 0,
          left: 0,
          width: { xs: sidebarOpen ? 280 : 0, md: sidebarOpen ? 280 : 0 },
          bgcolor: '#FFFFFF',
          borderRight: '1px solid #E5E7EB',
          transition: 'width 0.3s',
          overflow: 'hidden',
          display: { xs: sidebarOpen ? 'flex' : 'none', md: 'flex' },
          flexDirection: 'column',
          height: '100vh',
          zIndex: { xs: 1300, md: 1000 }
        }}
      >
        <Box sx={{ p: 3, borderBottom: '1px solid #E5E7EB' }}>
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#111827' }}>
            Host Panel
          </Typography>
        </Box>
        <Stack spacing={1} sx={{ p: 2, flex: 1, overflowY: 'auto' }}>
          {menuItems.map((item) => {
            const active = isActive(item.path)
            const Icon = item.icon
            return (
              <Button
                key={item.path}
                fullWidth
                startIcon={<Icon />}
                onClick={item.onClick}
                sx={{
                  justifyContent: 'flex-start',
                  bgcolor: active ? '#FFF2EE' : 'transparent',
                  color: active ? '#FF385C' : '#717171',
                  fontWeight: active ? 700 : 600,
                  textTransform: 'none',
                  '&:hover': {
                    bgcolor: active ? '#FFF2EE' : '#F9FAFB'
                  }
                }}
              >
                {item.label}
              </Button>
            )
          })}
        </Stack>

        {/* User Profile Section */}
        <Box
          sx={{
            borderTop: '1px solid #E5E7EB',
            p: 2,
            bgcolor: '#FFFFFF',
            flexShrink: 0,
            mt: 'auto'
          }}
        >
          <Button
            fullWidth
            onClick={handleMenuClick}
            sx={{
              justifyContent: 'flex-start',
              textTransform: 'none',
              p: 1.5,
              borderRadius: 1,
              bgcolor: menuOpen ? '#FFF2EE' : 'transparent',
              '&:hover': {
                bgcolor: menuOpen ? '#FFF2EE' : '#F9FAFB'
              }
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center" sx={{ width: '100%' }}>
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: '#FF385C',
                  fontSize: '0.875rem',
                  fontWeight: 700
                }}
              >
                {hostUser.initials}
              </Avatar>
              <Box sx={{ flex: 1, textAlign: 'left' }}>
                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: '#111827',
                    lineHeight: 1.2
                  }}
                >
                  {hostUser.name}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 12,
                    color: '#6B7280',
                    lineHeight: 1.2,
                    mt: 0.5
                  }}
                >
                  {hostUser.email}
                </Typography>
              </Box>
              <KeyboardArrowDownIcon
                sx={{
                  fontSize: 20,
                  color: '#6B7280',
                  transform: menuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s'
                }}
              />
            </Stack>
          </Button>
        </Box>
      </Box>

      {/* User Menu Dropdown */}
      <Menu
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 240,
            borderRadius: 1,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            border: '1px solid #E5E7EB',
            overflow: 'hidden',
            '& .MuiList-root': {
              paddingTop: '2px',
              paddingBottom: '2px'
            }
          }
        }}
      >
        {/* User Info Section */}
        <Box sx={{ p: 2, bgcolor: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar
              sx={{
                width: 40,
                height: 40,
                bgcolor: '#FF8C75',
                fontSize: '0.875rem',
                fontWeight: 700
              }}
            >
              {hostUser.initials}
            </Avatar>
            <Box>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#111827',
                  lineHeight: 1.2
                }}
              >
                {hostUser.name}
              </Typography>
              <Typography
                sx={{
                  fontSize: 12,
                  color: '#6B7280',
                  lineHeight: 1.2,
                  mt: 0.5
                }}
              >
                {hostUser.email}
              </Typography>
            </Box>
          </Stack>
        </Box>

        <Box sx={{ py: 1 }}>
          <MenuItem
            onClick={handleSettingsClick}
            sx={{
              py: 1.5,
              px: 2,
              mx: 1,
              borderRadius: 1,
              '&:hover': { bgcolor: '#F9FAFB' }
            }}
          >
            <SettingsIcon sx={{ fontSize: 18, color: '#6B7280', mr: 1.5 }} />
            <Typography sx={{ fontSize: 14, color: '#111827', fontWeight: 500 }}>
              Settings
            </Typography>
          </MenuItem>
          <Box sx={{ px: 1, py: 0.5 }}>
            <Divider
              sx={{
                borderColor: '#E5E7EB',
                borderWidth: '1px',
                borderStyle: 'solid'
              }}
            />
          </Box>
          <MenuItem
            onClick={handleLogoutClick}
            sx={{
              py: 1.5,
              px: 2,
              mx: 1,
              borderRadius: 1,
              '&:hover': { bgcolor: '#F9FAFB' }
            }}
          >
            <LogoutIcon sx={{ fontSize: 18, color: '#6B7280', mr: 1.5 }} />
            <Typography sx={{ fontSize: 14, color: '#111827', fontWeight: 500 }}>
              Log out
            </Typography>
          </MenuItem>
        </Box>
      </Menu>
    </>
  )
}
