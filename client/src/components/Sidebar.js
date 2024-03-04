import React from 'react'
import '../styles/Sidebar.css'
import avatar from '../assets/avatar.png'
import iconHome from '../assets/icon-home.svg'
import iconSettings from '../assets/icon-settings.svg'
import iconAccounts from '../assets/icon-accounts.svg'
import iconLock from '../assets/icon-lock.svg'
import iconBurger from '../assets/icon-burger.svg'
import iconClose from '../assets/icon-close.svg'

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      <div
        className={`overlay ${isOpen ? 'show' : ''}`}
        onClick={toggleSidebar}
      ></div>
      <button
        type="button"
        className={`burger ${isOpen ? 'close' : 'show'}`}
        onClick={toggleSidebar}
      >
        {isOpen ? (
          <img src={iconClose} className="close-icon" alt="Close" />
        ) : (
          <img src={iconBurger} className="burger-icon" alt="Menu" />
        )}
      </button>
      <aside className={`sidebar ${isOpen ? 'show' : 'hide'}`}>
        <img className="sidebar-avatar" src={avatar} alt="Avatar" />
        <div className="sidebar-username">Subaru</div>
        <div className="sidebar-role">Delulu</div>
        <nav className="sidebar-menu">
          <button type="button">
            <img src={iconHome} alt="Home" />
            <span>Home</span>
          </button>
          <button type="button">
            <img src={iconSettings} alt="Settings" />
            <span>Settings</span>
          </button>
          <button type="button">
            <img src={iconAccounts} alt="Profile" />
            <span>Profile</span>
          </button>
          <button type="button">
            <img src={iconLock} alt="Sign Out" />
            <span>Sign Out</span>
          </button>
        </nav>
      </aside>
    </>
  )
}

export default Sidebar
