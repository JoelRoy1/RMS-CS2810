import React from 'react'
import { useNavigate } from 'react-router-dom'
import './styles/LandingPage.css' // CSS file
import backgroundImage from './assets/restaurant_background.jpg'

const LandingPage = () => {
  let navigate = useNavigate()

  const handleStaffClick = () => {
    navigate('/staff-login')

  }
  const handleCustomerClick = () => {
    navigate('/customer-login')
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
        <button className="App-button-customer" onClick= {handleCustomerClick}>Customer</button>
        <button className="App-button-staff" onClick={handleStaffClick}>
          Staff
        </button>
      </div>
    </header>
  )
}

export default LandingPage
