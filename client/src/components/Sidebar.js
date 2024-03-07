import React from 'react'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'
import HomeIcon from '@mui/icons-material/Home'
import SettingsIcon from '@mui/icons-material/Settings'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LockIcon from '@mui/icons-material/Lock'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import avatar from '../assets/avatar.png'

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const theme = useTheme()

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={toggleSidebar}
        sx={{
          position: 'fixed',
          zIndex: theme.zIndex.drawer + 2,
          top: theme.spacing(2),
          left: isOpen ? null : theme.spacing(2),
          ...(isOpen && { display: 'none' }),
        }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="left"
        open={isOpen}
        onClose={toggleSidebar}
        sx={{
          '& .MuiDrawer-paper': {
            backgroundColor: 'rgba(55, 55, 55, 0.9)', // Dark gray with opacity for blur effect
            backdropFilter: 'blur(4px)',
            width: 280, // Increased width
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            p: 1,
          }}
        >
          <IconButton onClick={toggleSidebar}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            p: 2,
          }}
        >
          <Avatar src={avatar} sx={{ width: 56, height: 56, mb: 2 }} />
          <div className="sidebar-username">Subaru</div>
          <div className="sidebar-role">Delulu</div>
        </Box>
        <List>
          {[
            { icon: <HomeIcon />, text: 'Home' },
            { icon: <SettingsIcon />, text: 'Settings' },
            { icon: <AccountCircleIcon />, text: 'Profile' },
            { icon: <LockIcon />, text: 'Sign Out' },
          ].map((item, index) => (
            <ListItem button key={index}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  )
}

export default Sidebar
