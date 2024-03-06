import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet';
import Button from '@mui/material/Button'
import { Box, Typography } from '@mui/material'
import Carousel from 'react-material-ui-carousel'
import { Paper } from '@mui/material'
import carousel from '../assets/carousel.jpg'
import carousel2 from '../assets/carousel2.jpg'


const LandingPage = () => {
  let navigate = useNavigate()

  const handleStaffClick = () => {
    navigate('/staff-login')
  }

  const handleCustomerClick = () => {
    navigate('/customer-login')
  }

  const items = [
    {
      name: 'Item 1',
      description: 'Description 1',
      imgSrc: carousel,
    },
    {
      name: 'Item 2',
      description: 'Description 2',
      imgSrc: carousel2,
    },
    // Add more items as needed
  ]

  return (

    <Box sx={{ textAlign: 'center', color: 'white' }}>
      <Carousel
        sx={{
          '.MuiPaper-root': {
            maxHeight: '50vh', // Limit height to viewport height
            overflow: 'hidden',
          },
          img: {
            width: '100%',
            height: '100vh', // Make each image cover the viewport height
            objectFit: 'cover', // Ensure the aspect ratio is maintained while covering the area
          },
        }}
      >
        {items.map((item, i) => (
          <Paper key={i} elevation={0}>
            <img src={item.imgSrc} alt={item.name} />
            {/* Optional: Display name and description on top of the image */}
          </Paper>
        ))}
      </Carousel>
      <Box sx={{ paddingY: '2rem' }}>
        {' '}
        {/* Add some vertical padding around the text */}
        <Typography variant="h1" color="black">
          OAXACA
        </Typography>
        <Typography variant="h5" color="black">
          CHICKEN WINGS EXTRAORDINAIRE
        </Typography>
        <Typography variant="h6" color="black">
          Est. 2005
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          marginY: '1rem',
        }}
      >
        <Button
          variant="contained"
          onClick={handleCustomerClick}
          sx={{
            backgroundColor: '#ffdf00',
            color: 'black',
            '&:hover': { backgroundColor: 'white', color: '#563d7c' },
          }}
        >
          Customer
        </Button>
        <Button
          variant="contained"
          onClick={handleStaffClick}
          sx={{
            backgroundColor: '#ffdf00',
            color: 'black',
            '&:hover': { backgroundColor: 'white', color: '#563d7c' },
          }}
        >
          Staff
        </Button>
      </Box>
    </Box>
  )
}

export default LandingPage
