import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import OmniNavbar from './components/OmniNavbar' // Assuming you've created this based on previous discussions
import LandingPage from './pages/LandingPage'
import MenuPage from './pages/MenuPage'
import MenuManagement from './pages/MenuManagement'
import CustomerLoginPage from './pages/CustomerLoginPage'
import Dashboard from './pages/Dashboard'
import './styles/App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <OmniNavbar /> {/* Use your dedicated Navbar component here */}
        {/* Main content */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/menu-management" element={<MenuManagement />} />
          <Route path="/customer-login" element={<CustomerLoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Add more routes as needed */}
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
