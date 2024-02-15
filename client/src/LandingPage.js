import React from 'react'
import './LandingPage.css'; // CSS file
import backgroundImage from './restaurant_background.jpg' // Importing the background image here

const LandingPage = () => {
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
        <button className="App-button-staff">Staff</button>
      </div>
    </header>
  )
}

export default LandingPage
