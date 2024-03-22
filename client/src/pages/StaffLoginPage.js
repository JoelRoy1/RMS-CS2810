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
      if (response.data === 'admin') {
        navigate('/success')
      } else {
        setError('Incorrect username or pincode')
      }
    } catch (err) {
      setError('An error occurred during login.')
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Helmet>
          <title>Oaxaca | Staff Login</title>
        </Helmet>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Staff Login
          </Typography>
          <Paper
            sx={{
              marginTop: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: 2,
            }}
            elevation={2}
          >
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
                sx={{ mt: 3, mb: 2 }}
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
