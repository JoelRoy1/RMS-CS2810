import React, { useState } from 'react'
import './StaffLoginPage.css'

function StaffLoginPage() {

  return (
    <div className="staff-login-page">
      <div className="login-container">
        <form className="login-form">
          <label htmlFor="username" className="login-label">
            Staff ID
          </label>
          <input type="text" id="username" className="login-input" />

          <label htmlFor="password" className="login-label">
            Password
          </label>
          <input type="password" id="password" className="login-input" />
          <label htmlFor="Error-message" className="error-label">
            Error message placeholder
          </label>
          <button type="submit" className="login-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default StaffLoginPage