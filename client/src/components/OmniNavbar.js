import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AppBar, Box, Button, Container, Toolbar } from '@mui/material'

function OmniNavbar() {
  const location = useLocation()
  const navigate = useNavigate()

  // Retrieve valid_user from session storage
  const validUser = sessionStorage.getItem('valid_user') === 'true'

  // Retrieve staff name from session storage
  const staffName = sessionStorage.getItem('staff_name')

  const handleLogout = () => {
    // Logout logic: set valid_user to false and route to /staff-login
    sessionStorage.setItem('valid_user', 'false')
    navigate('/')
  }

  // Define menu items based on the value of valid_user
  const menuItems = validUser
    ? [
        { path: '/dashboard', label: 'Dashboard' },
        { path: '/table-info', label: 'Table Info' },
        { path: '/menu-management', label: 'Menu Management' },
      ]
    : [
        { path: '/', label: 'Home' },
        { path: '/about-us', label: 'About Us' },
      ]

  return (
    <AppBar
      position="fixed"
      sx={{
        boxShadow: 'none',
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 2,
        transition: 'all 0.3s ease-in-out',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            borderRadius: '20px',
            bgcolor: 'rgba(211, 211, 211, 0.8)', // light gray with transparency
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            p: '6px 20px', // Reduced padding to decrease height
            minHeight: '40px', // Adjusted minimum height for smaller toolbar
            // Contain the background effect within the toolbar
            overflow: 'hidden',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {validUser && (
              <Button
                onClick={handleLogout}
                sx={{
                  color: 'black',
                  '&:hover': {
                    bgcolor: 'rgba(0, 0, 0, 0.04)',
                    color: 'primary.main',
                  },
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                Home
              </Button>
            )}
            {menuItems.map(({ path, label }) => (
              <Button
                key={label}
                component={path ? Link : 'button'}
                to={path}
                sx={{
                  color: location.pathname === path ? 'primary.main' : 'black',
                  fontWeight: location.pathname === path ? 'bold' : 'normal',
                  '&:hover': {
                    bgcolor: 'rgba(0, 0, 0, 0.04)',
                    color: 'primary.main',
                  },
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                {label}
              </Button>
            ))}
          </Box>
          <Box>
            {validUser && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <span style={{ color: 'black' }}>{staffName}</span>
                <Button
                  onClick={handleLogout}
                  sx={{
                    color: 'black',
                    '&:hover': {
                      bgcolor: 'rgba(0, 0, 0, 0.04)',
                      color: 'primary.main',
                    },
                    transition: 'all 0.2s ease-in-out',
                  }}
                >
                  Logout
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
};       

export default OmniNavbar
