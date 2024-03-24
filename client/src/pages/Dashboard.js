import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import axios from 'axios'
import { Helmet } from 'react-helmet'
import {
  IconButton,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Container,
} from '@mui/material'

import CancelIcon from '@mui/icons-material/Cancel'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import DoneAllIcon from '@mui/icons-material/DoneAll'


const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:9000/order/fetch-all')
      setOrders(response.data)
      setError('')
    } catch (error) {
      console.error('Error fetching orders:', error)
      setError('Error fetching orders. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  const handleCancel = async (orderId) => {
    try {
      await axios.delete(`http://localhost:9000/order/cancel-order/${orderId}`)
      console.log(`Order ${orderId} cancelled successfully`)
      fetchOrders() // Refresh orders after cancellation
    } catch (error) {
      console.error('Error cancelling order:', error)
      setError('Error cancelling order. Please try again later.')
    }
  }

  const handleDelivered = async (orderId, staffId) => {
    try {
      await axios.post('http://localhost:9000/order/mark-delivered', {
        orderId,
        staffId,
      })
      console.log(`Order ${orderId} marked as delivered successfully`)
      fetchOrders() // Refresh orders after marking as delivered
    } catch (error) {
      console.error('Error marking order as delivered:', error)
      setError('Error marking order as delivered. Please try again later.')
    }
  }

  const handleConfirmed = async (orderId, staffId) => {
    try {
      await axios.post('http://localhost:9000/order/mark-confirmed', {
        orderId,
        staffId,
      })
      console.log(`Order ${orderId} marked as confirmed successfully`)
      fetchOrders() // Refresh orders after marking as confirmed
    } catch (error) {
      console.error('Error marking order as confirmed:', error)
      setError('Error marking order as confirmed. Please try again later.')
    }
  }

  const handleReadyToDeliver = async (orderId, staffId) => {
    try {
      await axios.post('http://localhost:9000/order/mark-ready', {
        orderId,
        staffId,
      })
      console.log(`Order ${orderId} marked as ready successfully`)
      fetchOrders() // Refresh orders after marking as ready
    } catch (error) {
      console.error('Error marking order as ready:', error)
      setError('Error marking order as ready. Please try again later.')
    }
  }

  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString)
    return dateTime.toLocaleString()
  }

  return (
    <Container maxWidth="lg">
      <Helmet>
        <title>Oaxaca | Dashboard</title>
      </Helmet>

      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <Typography variant="h4" gutterBottom component="div" sx={{ my: 4 }}>
        Order Information
      </Typography>

      <TableContainer component={Paper} sx={{ marginBottom: 4 }}>
        <Table aria-label="order table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Order ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Waiter</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Customer</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Table Number</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Time</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Items</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Price</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Order Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  {error}
                </TableCell>
              </TableRow>
            ) : orders.length > 0 ? (
              orders.map((order) => (
                <TableRow key={order.order_id}>
                  <TableCell>{order.order_id}</TableCell>
                  <TableCell>{order.staff_name}</TableCell>
                  <TableCell>{order.customer_name}</TableCell>
                  <TableCell>{order.table_number}</TableCell>
                  <TableCell>{formatDateTime(order.order_time)}</TableCell>
                  <TableCell>
                    {order.items.map((item) => (
                      <Box
                        key={item.dish_id}
                      >{`${item.dish_name} x ${item.quantity}`}</Box>
                    ))}
                  </TableCell>
                  <TableCell>£{order.totalOrderPrice.toFixed(2)}</TableCell>
                  <TableCell>{order.order_status}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleCancel(order.order_id)}
                      color="error"
                    >
                      <CancelIcon />
                    </IconButton>
                    <IconButton
                      onClick={() =>
                        handleDelivered(order.order_id, order.staff_id)
                      }
                      color="success"
                    >
                      <LocalShippingIcon />
                    </IconButton>
                    <IconButton
                      onClick={() =>
                        handleConfirmed(order.order_id, order.staff_id)
                      }
                    >
                      <CheckCircleIcon />
                    </IconButton>
                    <IconButton
                      onClick={() =>
                        handleReadyToDeliver(order.order_id, order.staff_id)
                      }
                      color="primary"
                    >
                      <DoneAllIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  No orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default Dashboard
