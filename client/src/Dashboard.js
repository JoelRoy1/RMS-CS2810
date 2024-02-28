import React, { useEffect, useState } from 'react'; 
import './Dashboard.css';
import Sidebar from './Sidebar'; 
import { Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  // State to control the sidebar's visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []); // Fetchs all the orders when the page is loaded

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:9000/order');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  // render order status table headers with up and down arrows
  const renderTableHeaders = () => {
    return (
      <tr>
        <th>Order ID ▲▼</th>
        <th>Status ▲▼</th>
        <th>Waiter ▲▼</th>
        <th>Time Order Placed ▲▼</th>
        <th>Price ▲▼</th>
      </tr>
    );
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="dashboard-container">
      {/* Include the Sidebar component */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Header stats */}
      <div className="header-stats">
        <div className="stat-item">23 Orders Done</div>
        <div className="stat-item">6 Preparing</div>
        <div className="stat-item">8 Pending Orders</div>
      </div>

      {/* Order Status Table */}
      <div className="order-status">
        <h2>Order Status</h2>
        <table>
          <thead>
            {renderTableHeaders()}
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map(order => (
                <tr key={order.order_id}>
                  <td>{order.order_id}</td>
                  <td>{order.customer_id}</td>
                  <td>{order.staff_id}</td>
                  <td>{order.order_status}</td>
                  <td>{order.order_allergies}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No orders available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
