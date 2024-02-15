import React, { useState } from 'react';
import './App.css';
import backgroundImage from './restaurant_background.jpg';

function App() {
  const [showNav, setShowNav] = useState(false);

  return (
    <div className="App">
      {/* Trigger area and navbar */}
      <div
        className="App-nav-wrapper"
        onMouseEnter={() => setShowNav(true)}
        onMouseLeave={() => setShowNav(false)}
      >
        {/* Trigger area */}
        <div className="App-nav-trigger" />
        {/* Navbar */}
        <nav className={`App-nav ${showNav ? 'show' : ''}`}>
          {/* Navigation links */}
          <a href="#home">Home</a>
          <a href="menu">Menu</a>
          <a href="#about">About Us</a>
        </nav>
      </div>
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
  );
}

export default App;

