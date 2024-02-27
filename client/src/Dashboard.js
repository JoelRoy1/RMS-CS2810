import React, { useEffect, useState } from 'react' 
import './Dashboard.css'
import Sidebar from './Sidebar' 
import { Link } from 'react-router-dom'

const Dashboard = () => {
  // State to control the sidebar's visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [orders, setOrders] = useState([])

  useEffect(() => {
    fetchOrders()
  }, []) //Fetchs all the orders when page is loaded

  const fetchOrders = () => {
    fetch('/api/orders')
      .then((res) => res.json())
      .then((data) => {
        setOrders(data)
      })
      .catch((error) => console.error('Error fetching orders:', error))
  }


  // dummy data for the orders table
  const ordersData = [
    {
      id: 14,
      status: 'KOT Pending',
      waiter: 'Joseph Bravo',
      time: '22:51:36',
      price: '$16.00',
    },
    {
      id: 13,
      status: 'Items Served',
      waiter: 'Martha Stevens',
      time: '22:50:21',
      price: '$32.00',
    },
    // Add more orders as needed
  ]

 const toggleSidebar = () => {
   setIsSidebarOpen(!isSidebarOpen)
 }


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

      {/* Order Status Table also the dummy values are not displaying because i forgor to
       change the text colour in the dashboard.css i leave the rest to you thanks - zul */}
      <div className="order-status">
        <h2>Order Status</h2>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Status</th>
              <th>Waiter</th>
              <th>Time Order Placed</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.status}</td>
                <td>{order.waiter}</td>
                <td>{order.time}</td>
                <td>{order.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Placeholder for if we need to add more ( which we probably will lmao XD ) functionality - zul */}
    </div>
  )
}

export default Dashboard
