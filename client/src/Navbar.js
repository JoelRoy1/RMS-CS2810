import React from 'react';
import 'styles/Navbar.css';

const Navbar = () => {
    return (
      <nav className="navbar">
        <div className="oaxaca-title">
          Oaxaca
        </div>
        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/menu">Menu</a>
        </div>
      </nav>
    );
    }
    export default Navbar;