import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import OmniNavbar from './components/OmniNavbar' // Assuming you've created this based on previous discussions
import LandingPage from './pages/LandingPage'
import MenuPage from './pages/MenuPage'
import MenuManagement from './pages/MenuManagement'
import CustomerLoginPage from './pages/CustomerLoginPage'
import StaffLoginPage from './pages/StaffLoginPage'
import Dashboard from './pages/Dashboard'
import './styles/App.css'
import PaymentPage from './pages/PaymentPage';
import PaymentInfoPage from './pages/PaymentInfoPage'
import TableStatusPage from './pages/TableStatusPage'
import ProtectdRoute from './ProtectedRoute'

function App() {
  return (
    <div className="App">
      <Router>
        <OmniNavbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/customer-login" element={<CustomerLoginPage />} />
          <Route path="/staff-login" element={<StaffLoginPage/>} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/payment-info" element={<PaymentInfoPage />} />
          <Route element = {<ProtectdRoute/>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/menu-management" element={<MenuManagement />} />
            <Route path="/table-info" element={< TableStatusPage/>} />
          </Route>
        </Routes>
        <footer className="App-footer">
          <p>The Exquisite Oaxaca</p>
        </footer>
      </Router>
    </div>
  )
}

export default App;

