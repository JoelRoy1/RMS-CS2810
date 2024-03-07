import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import StaffLoginPage from './pages/StaffLoginPage'
import MenuPage from './pages/MenuPage'
import MenuManagement from './pages/MenuManagement'
import CustomerLoginPage from './pages/CustomerLoginPage'
import Dashboard from './pages/Dashboard'
import './styles/App.css'


function App() {
  const [showNav, setShowNav] = useState(false)

  return (
    <Router>
      <div className="App">
        {/* Navigation bar */}
        <div
          className="App-nav-wrapper"
          onMouseEnter={() => setShowNav(true)}
          onMouseLeave={() => setShowNav(false)}
        >
          <div className="App-nav-trigger" />
          <nav className={`App-nav ${showNav ? 'show' : ''}`}>
            <Link to="/">Home</Link>
            <Link to="/menu">Menu</Link>
            <Link to="/about">About Us</Link>
            <Link to="/menu-management">Menu Management</Link>
            <Link to="/dashboard">Dashboard</Link>
          </nav>
        </div>

        {/* Main content */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/staff-login" element={<StaffLoginPage />} />
          <Route path="/customer-login" element={<CustomerLoginPage />} />
          <Route path="/menu-management" element={<MenuManagement />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Other routes here */}
        </Routes>

        {/* Footer */}
        <footer className="App-footer">
          <p>The Exquisite Oaxaca</p>
        </footer>
      </div>
    </Router>
  )
}

export default App
