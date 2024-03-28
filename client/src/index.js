import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import StaffLoginPage from './pages/StaffLoginPage';
import MenuPage from './pages/MenuPage';
import Dashboard from './pages/Dashboard';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
const path = window.location.pathname;

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


reportWebVitals();
