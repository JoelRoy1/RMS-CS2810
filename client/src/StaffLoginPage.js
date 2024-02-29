import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './StaffLoginPage.css'

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
    <div className="staff-login-page">
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="username" className="login-label">
            Staff ID
          </label>
          <input
            type="text"
            id="username"
            className="login-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="pin" className="login-label">
            Pincode
          </label>
          <input
            type="password"
            id="pin"
            className="login-input"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
          />

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default StaffLoginPage
