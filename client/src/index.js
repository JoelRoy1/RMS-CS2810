import React from 'react';
import ReactDOM from 'react-dom/client';
import 'styles/index.css';
import App from './App';
import StaffLoginPage from './StaffLoginPage';
import MenuPage from './MenuPage';
import Dashboard from './Dashboard';
import reportWebVitals from './reportWebVitals';



const root = ReactDOM.createRoot(document.getElementById('root'));
const path = window.location.pathname;

switch (path) {
  case '/staff':
    root.render(
      <React.StrictMode>
        <StaffLoginPage />
      </React.StrictMode>
    );
    break;
  case '/Menu':
    root.render(
      <React.StrictMode>
        <MenuPage />
      </React.StrictMode>
    );
    break;
  case '/dashboard':
    root.render(
      <React.StrictMode>
        <Dashboard />
      </React.StrictMode>
    );
    break;
  default:
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
