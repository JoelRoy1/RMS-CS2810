import React from 'react'
import { useNavigate } from 'react-router-dom'
import './LandingPage.css' // CSS file
import backgroundImage from './restaurant_background.jpg'

const LandingPage = () => {
  let navigate = useNavigate()

  const handleStaffClick = () => {
    navigate('/staff-login')
  }

  return (
    <header
      className="App-header"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <h1>OAXACA</h1>
      <p>CHICKEN WINGS EXTRAORDINAIRE</p>
      <p>Est. 2005</p>
      <div className="App-buttons">
        <button className="App-button-customer">Customer</button>
        <button className="App-button-staff" onClick={handleStaffClick}>
          Staff
        </button>
      </div>
    </header>
  )
}

export default LandingPage
