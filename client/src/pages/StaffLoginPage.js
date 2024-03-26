import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import {
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  Container,
  Box,
} from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme()

function StaffLoginPage() {
  const [username, setUsername] = useState('')
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post('http://localhost:9000/signin', {
        username,
        pin: parseInt(pin, 10),
      })

      // Checking for successful response status
      if (response.data === username) {
        sessionStorage.setItem('valid_user', true);
        sessionStorage.setItem('staff_name', username)
        navigate('/dashboard');
      } else {
        setError('Incorrect username or pincode') // Error message for invalid credentials
      }
    } catch (err) {
      setError('An error occurred during login.') // Error message for server error
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container 
        component="main" 
        maxWidth="sm"
        sx={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Helmet>
          <title>Oaxaca | Staff Login</title>
        </Helmet>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Paper
            sx={{
              marginTop: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: 3,
              backgroundColor: '#f5f5f5',
              borderRadius: '8px',
              boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.1)',
            }}
            elevation={0}
          >
            <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
              Staff Login
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Staff ID"
                name="username"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                sx={{ '& input:focus': { color: '#333' } }} // Set the input text color on focus
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="pin"
                label="Pincode"
                type="password"
                id="pin"
                autoComplete="current-pin"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                sx={{ '& input:focus': { color: '#333' } }} // Set the input text color on focus
              />

              {error && (
                <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
                  {error}
                </Alert>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: '#333', color: '#fff', '&:hover': { backgroundColor: '#666' } }}
              >
                Submit
              </Button>
            </Box>
          </Paper>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default StaffLoginPage
