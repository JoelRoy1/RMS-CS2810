import React, { useEffect, useState } from 'react';
import '../styles/Dashboard.css';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import {Button} from "@mui/material"

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:9000/order/fetch-all');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleCancel=()=>{
    console.log("Cancelled");
  };
  const handleDelivered = () => {
    console.log("Delivered");
  };

   // Function to format date and time
   const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    return dateTime.toLocaleString(); // Adjust toLocaleString parameters for custom formatting
  };

  return (
    <div className="dashboard-container">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="header-stats">
        <div className="stat-item">Total Orders: {orders.length}</div>
      </div>

      <div>
        <Helmet>
          <title>Oaxaca | Dashboard</title>
        </Helmet>
      </div>

      <div className="order-status">
        <h2>Order Information</h2>
        <div className="order-status-table">
          <div className="order-status-header-item">Order ID</div>
          <div className="order-status-header-item">Waiter</div>
          <div className="order-status-header-item">Time</div>
          <div className="order-status-header-item">Price</div>
          <div className="order-status-header-item">Order Status</div>
          <div className="order-status-header-item">Set delivery</div>
          <div className="order-status-header-item"> Cancel</div>
        </div>
          
        <div className="order-status-content">
          {orders.map(order => (
            <><div key={order.order_id} className="order-status-row">
              <div>{order.order_id}</div>
              <div>{order.staff_name}</div>
              <div>{formatDateTime(order.order_time)}</div> {/* Format date and time here */}
              <div>{order.totalOrderPrice}</div> {/* Display totalOrderPrice */}
              <div>{order.order_status}</div>
            </div><div>
                <Button
                  onClick={handleCancel}
                  variant="contained"
                  color="error"
                >
                  Cancel
                </Button>

                <Button
                  onClick={handleDelivered}
                  variant="contained"
                  color="success"
                >
                  Mark as delivered
                </Button>
              </div></>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
