/**
 * Functional component for displaying payment information.
 * @module PaymentInfoPage
 */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Box, Grid, Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useHistory hook

/**
 * Displays payment information including customer orders, payment details, and order status.
 * @returns {JSX.Element} JSX for PaymentInfoPage component.
 */
const PaymentInfoPage = () => {
  const [paymentInfo, setPaymentInfo] = useState([]); // State for payment information
  const [customerOrders, setCustomerOrders] = useState([]); // State for customer orders
  const [orderStatus, setOrderStatus] = useState(''); // State for order status
  const [totalPrice, setTotalPrice] = useState(null); // State for total price
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(''); // State for error message
  const navigate = useNavigate(); // useHistory hook for navigation

  /**
   * Fetches payment information, customer orders, and order status from the server.
   */
  useEffect(() => {
    /**
     * Fetches data from the server asynchronously.
     * @async
     */
    const fetchData = async () => {
      const tableNumber = sessionStorage.getItem('table'); // Retrieve table number from session storage
      const customerId = sessionStorage.getItem('id'); // Retrieve customer ID from session storage
      const totalPriceFromStorage = sessionStorage.getItem('amount'); // Retrieve total price from session storage

      try {
        // Fetch payment information from the server
        const paymentInfoResponse = await axios.get('http://localhost:9000/payment/get-info', {
          params: {
            table_number: tableNumber
          }
        });
        setPaymentInfo(paymentInfoResponse.data); // Set payment information state
      } catch (error) {
        console.error('Error fetching payment info:', error);
        setError('Error fetching payment info');
      }

      try {
        // Fetch customer orders from the server
        const customerOrdersResponse = await axios.get('http://localhost:9000/order/customer-order', {
          params: {
            customer_id: customerId
          }
        });
        setCustomerOrders(customerOrdersResponse.data); // Set customer orders state
      } catch (error) {
        console.error('Error fetching customer orders:', error);
        setError('Error fetching customer orders');
      }

      try {
        // Fetch order status from the server
        const orderStatusResponse = await axios.get('http://localhost:9000/order/status', {
          params: {
            customer_id: customerId
          }
        });
        setOrderStatus(orderStatusResponse.data); // Set order status state
      } catch (error) {
        console.error('Error fetching order status:', error);
        setError('Error fetching order status');
      }

      // Set total price from session storage
      setTotalPrice(totalPriceFromStorage);

      setLoading(false); // Set loading state to false after data fetching completes
    };

    fetchData(); // Call fetchData function
  }, []); // Run effect only once after initial render

  /**
   * Handles updating order status and clearing the table.
   */
  const handleUpdateStatus = async () => {
    try {
      // Post request to clear table
      await axios.post('http://localhost:9000/table/clear', { tableNumber: sessionStorage.getItem('table') });
      navigate('/'); // Navigate to 'Home'
    } catch (error) {
      console.error('Error updating order status:', error);
      setError('Error updating order status');
    }
  };

  // Render loading message if data is still loading
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render error message if an error occurred
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Render payment information component
  return (
    <Container style={{ marginTop: '64px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h4" gutterBottom style={{ color: '#FFF', marginBottom: '20px' }}>Order Details</Typography>

      <Grid container spacing={3}>
        {/* Display customer orders */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ backgroundColor: '#f7f7f7', padding: '20px' }}>
            <Box textAlign="center">
              <Typography variant="h5" gutterBottom style={{ color: '#333', marginBottom: '15px' }}>Your Order</Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ color: '#666' }}>Dish Name</TableCell>
                      <TableCell style={{ color: '#666' }}>Quantity</TableCell>
                      <TableCell style={{ color: '#666' }}>Price</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* Map through customer orders and display each order */}
                    {customerOrders.map(order => (
                      <TableRow key={`${order.dish_name}-${order.quantity}`}>
                        <TableCell style={{ color: '#333' }}>{order.dish_name}</TableCell>
                        <TableCell style={{ color: '#333' }}>{order.quantity}</TableCell>
                        <TableCell style={{ color: '#333' }}>£{order.price}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Box mt={3}>
                <Typography variant="h6" gutterBottom style={{ color: '#333' }}>Total Price: £{totalPrice}</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Display payment information */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ backgroundColor: '#f7f7f7', padding: '20px' }}>
            <Box textAlign="center">
              <Typography variant="h5" gutterBottom style={{ color: '#333', marginBottom: '15px' }}>Payment Information</Typography>
              {/* Map through payment information and display each detail */}
              {paymentInfo.map(info => (
                <div key={info.payment_id}>
                  <Typography variant="body1" style={{ color: '#333', marginBottom: '5px' }}>Payment ID: {info.payment_id}</Typography>
                  <Typography variant="body1" style={{ color: '#333', marginBottom: '5px' }}>Payment Time: {info.payment_time}</Typography>
                  <Typography variant="body1" style={{ color: '#333', marginBottom: '5px' }}>Table Number: {info.table_number}</Typography>
                  <Typography variant="body1" style={{ color: '#333', marginBottom: '5px' }}>Card Holder: {info.card_holder}</Typography>
                  <Typography variant="body1" style={{ color: '#333', marginBottom: '5px' }}>Card Ending: {info.card_ending}</Typography>
                  <Typography variant="body1" style={{ color: '#333', marginBottom: '5px' }}>Card Expiry: {info.card_expiry}</Typography>
                </div>
              ))}
            </Box>
          </Paper>
          <Box mt={3}>
            <Paper elevation={3} style={{ backgroundColor: '#f7f7f7', padding: '20px' }}>
              <Typography variant="h5" gutterBottom style={{ color: '#333', marginBottom: '15px' }}>Your Order Status</Typography>
              <Typography variant="body1" style={{ color: '#333', marginBottom: '5px' }}>{orderStatus}</Typography>
              {orderStatus === 'Your order has been delivered. Bon Apetite!' && ( // Conditionally render the button
                <Button variant="contained" onClick={handleUpdateStatus}>Leave Table</Button>
              )}
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PaymentInfoPage;
