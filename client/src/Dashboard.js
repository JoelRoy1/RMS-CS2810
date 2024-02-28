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
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:9000/order');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const dummyOrders = [
    { id: 1, waiter: 'woo', time: '10:30 AM', price: '£1000.00', status: 'Pending' },
    { id: 2, waiter: 'adi', time: '11:45 AM', price: '£32.50', status: 'Completed' },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="dashboard-container">
      {/* Include the Sidebar component */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Order Status Table */}
      <div className="order-status">
        <h2>Order Status</h2>
        <div className="order-status-table">
          <div className="order-status-header-item">Order ID</div>
          <div className="order-status-header-item">Waiter</div>
          <div className="order-status-header-item">Time</div>
          <div className="order-status-header-item">Price</div>
          <div className="order-status-header-item">Order Status</div>
        </div>
        <div className="order-status-content">
          {orders.length > 0 ? (
            orders.map(order => (
              <div key={order.id} className="order-status-row">
                <div>{order.id}</div>
                <div>{order.waiter}</div>
                <div>{order.time}</div>
                <div>{order.price}</div>
                <div>{order.status}</div>
              </div>
            ))
          ) : (
            dummyOrders.map(order => (
              <div key={order.id} className="order-status-row">
                <div>{order.id}</div>
                <div>{order.waiter}</div>
                <div>{order.time}</div>
                <div>{order.price}</div>
                <div>{order.status}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
