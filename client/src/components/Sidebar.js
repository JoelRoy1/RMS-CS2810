/**
 * React component to handle operations of the sidebar.
 * @module client/sidebar
 */

import React, { useState, useEffect } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import axios from 'axios';
import avatarPlaceholder from '../assets/avatar.png';
/**
 * @function Sidebar handles rendering of the sidebar.
 * @returns {JSX.Element} The sidebar JSX template.
 */
const Sidebar = ({ isOpen, toggleSidebar }) => {
  const theme = useTheme();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/user/profile');
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

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
            backgroundColor: 'rgba(55, 55, 55, 0.9)',
            backdropFilter: 'blur(4px)',
            width: 280,
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
          <Avatar src={userData?.profilePicture || avatarPlaceholder} sx={{ width: 56, height: 56, mb: 2 }} />
          <div className="sidebar-username">{userData?.name}</div>
          <div className="sidebar-role">{userData?.role}</div>
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
