import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AppBar, Box, Button, Container, Toolbar } from '@mui/material'

function OmniNavbar() {
  const location = useLocation()

  const menuItems = [
    { path: '/', label: 'Home' },
    { path: '/menu', label: 'Menu' },
    { path: '/menu-management', label: 'Menu Management' },
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
          <Box sx={{ display: 'flex', gap: 2 }}>
            {menuItems.map(({ path, label }) => (
              <Button
                key={path}
                component={Link}
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
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default OmniNavbar
