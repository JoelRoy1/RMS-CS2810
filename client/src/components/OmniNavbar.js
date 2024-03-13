import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import MenuIcon from '@mui/icons-material/Menu'
import IconButton from '@mui/material/IconButton'
import Drawer from '@mui/material/Drawer'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'

function OmniNavbar() {
  const [open, setOpen] = useState(false)

  const handleDrawerToggle = () => {
    setOpen(!open)
  }

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: 'transparent',
          backgroundImage: 'none',
          mt: 2,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              borderRadius: '999px',
              bgcolor: 'rgba(255, 255, 255, 0.4)',
              backdropFilter: 'blur(24px)',
            }}
          >
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Link to="/" style={{ textDecoration: 'none' }}>
                <Button sx={{ color: 'black' }}>Home</Button>
              </Link>
              <Link to="/menu" style={{ textDecoration: 'none' }}>
                <Button sx={{ color: 'black' }}>Menu</Button>
              </Link>
              <Link to="/menu-management" style={{ textDecoration: 'none' }}>
                <Button sx={{ color: 'black' }}>Menu Management</Button>
              </Link>
              <Link to="/about-us" style={{ textDecoration: 'none' }}>
                <Button sx={{ color: 'black' }}>About Us</Button>
              </Link>
            </Box>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={open} onClose={handleDrawerToggle}>
              <Box sx={{ width: 250, p: 2 }}>
                <Link to="/" style={{ textDecoration: 'none' }}>
                  <MenuItem onClick={handleDrawerToggle}>Home</MenuItem>
                </Link>
                <Link to="/menu" style={{ textDecoration: 'none' }}>
                  <MenuItem onClick={handleDrawerToggle}>Menu</MenuItem>
                </Link>
                <Link to="/menu-management" style={{ textDecoration: 'none' }}>
                  <MenuItem onClick={handleDrawerToggle}>
                    Menu Management
                  </MenuItem>
                </Link>
                <Link to="/about-us" style={{ textDecoration: 'none' }}>
                  <MenuItem onClick={handleDrawerToggle}>About Us</MenuItem>
                </Link>
                <Divider />
              </Box>
            </Drawer>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  )
}

export default OmniNavbar
