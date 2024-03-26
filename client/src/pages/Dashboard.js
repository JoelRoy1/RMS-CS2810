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
  Tooltip,
  Paper,
  Typography,
  Box,
  Container,
} from '@mui/material'

import CancelIcon from '@mui/icons-material/Cancel'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import DoneAllIcon from '@mui/icons-material/DoneAll'

import FilterListIcon from '@mui/icons-material/FilterList'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'



const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('all') // New state for filter

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

  const changeStatus = async (orderStatus, orderId, staffId) => {
    try {
      await axios.post('http://localhost:9000/order/mark-status', {
        orderStatus,
        orderId,
        staffId,
      })
      console.log(`Order ${orderId} status changed successfully`)
      fetchOrders() // Refresh orders after marking as delivered
    } catch (error) {
      console.error('Error changing status:', error)
      setError('Error changing order status. Please try again later.')
    }
  }

  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString)
    return dateTime.toLocaleString()
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

const filteredOrders = orders.filter((order) => {
  switch (filter) {
    case 'all':
      return true // Show all orders
    case 'confirmed':
      return order.order_status === 'confirmed' // when you select 'confirm' on the filter menu
    case 'ready to deliver':
      return order.order_status === 'ready to deliver' // when you select 'Ready to be delivered' on the filter menu
    case 'delivered':
      return order.order_status === 'delivered' //  when you select 'Delivered' on the filter menu
    default:
      return order.order_status === filter // This will match the filter for any other statuses
  }
})


return (
  <Container maxWidth="lg">
    <Helmet>
      <title>Oaxaca | Dashboard</title>
    </Helmet>
    <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    <Typography variant="h4" gutterBottom component="div" sx={{ my: 4 }}>
      Order Information
    </Typography>

    <FormControl fullWidth sx={{ mb: 2 }}>
      <InputLabel id="order-status-filter-label">Filter by Status</InputLabel>
      <Select
        labelId="order-status-filter-label"
        value={filter}
        label="Filter by Status"
        onChange={handleFilterChange}
      >
        <MenuItem value="all">All</MenuItem>
        <MenuItem value="pending">Pending</MenuItem>
        <MenuItem value="ready to deliver">Ready to be Delivered</MenuItem>
        <MenuItem value="confirmed">Confirmed</MenuItem>
        <MenuItem value="delivered">Delivered</MenuItem>
      </Select>
    </FormControl>

    <TableContainer component={Paper}>
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
          ) : filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
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
                  <Tooltip title="Cancel order">
                    <IconButton
                      onClick={() => handleCancel(order.order_id)}
                      color="error"
                    >
                      <CancelIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Mark as delivered">
                    <IconButton
                      onClick={() =>
                        changeStatus(
                          'delivered',
                          order.order_id,
                          order.staff_id
                        )
                      }
                      color="success"
                    >
                      <LocalShippingIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Confirm order">
                    <IconButton
                      onClick={() =>
                        changeStatus(
                          'confirmed',
                          order.order_id,
                          order.staff_id
                        )
                      }
                    >
                      <CheckCircleIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Ready to deliver">
                    <IconButton
                      onClick={() =>
                        changeStatus(
                          'ready to deliver',
                          order.order_id,
                          order.staff_id
                        )
                      }
                      color="primary"
                    >
                      <DoneAllIcon />
                    </IconButton>
                  </Tooltip>
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

export default Dashboard;