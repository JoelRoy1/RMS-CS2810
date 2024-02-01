import React, { useState } from 'react'
import './App.css'
import backgroundImage from './restaurant_background.jpg'

function App() {
  const [showNav, setShowNav] = useState(false)

  return (
    <div className="App">
      {/* Trigger area to show navbar on hover */}
      <div
        className="App-nav-trigger"
        onMouseOver={() => setShowNav(true)}
        onFocus={() => setShowNav(true)} // only for pc
        onMouseOut={() => setShowNav(false)}
        onBlur={() => setShowNav(false)} // only for pc
      />
      <nav className={`App-nav ${showNav ? 'show' : ''}`}>
        {/* Navigation links */}
        <a href="#home">Home</a>
        <a href="#menu">Menu</a>
        <a href="#about">About Us</a>
      </nav>
      <header
        className="App-header"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        {/* Section with restaurant name */}
        <h1>OAXACA</h1>
        <p>CHICKEN WINGS EXTRAORDINAIRE</p>
        <p>Est. 2005</p>
        {/* Buttons for customer and staff */}
        <div className="App-buttons">
          <button className="App-button-customer">Customer</button>
          <button className="App-button-staff">Staff</button>
        </div>
      </header>
      <main>{/* Content sections */}</main>
      <footer className="App-footer">
        {/* Footer content */}
        <p>The Exquisite Oaxaca</p>
      </footer>
    </div>
  )
}

export default App
