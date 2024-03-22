import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Box, Grid, Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

const PaymentInfoPage = () => {
  const [paymentInfo, setPaymentInfo] = useState([]);
  const [customerOrders, setCustomerOrders] = useState([]);
  const [orderStatus, setOrderStatus] = useState('');
  const [totalPrice, setTotalPrice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const tableNumber = sessionStorage.getItem('table');
      const customerId = sessionStorage.getItem('id');
      const totalPriceFromStorage = sessionStorage.getItem('amount');

      try {
        const paymentInfoResponse = await axios.get('http://localhost:9000/payment/get-info', {
          params: {
            table_number: tableNumber
          }
        });
        setPaymentInfo(paymentInfoResponse.data);
      } catch (error) {
        console.error('Error fetching payment info:', error);
        setError('Error fetching payment info');
      }

      try {
        const customerOrdersResponse = await axios.get('http://localhost:9000/order/customer-order', {
          params: {
            customer_id: customerId
          }
        });
        setCustomerOrders(customerOrdersResponse.data);
      } catch (error) {
        console.error('Error fetching customer orders:', error);
        setError('Error fetching customer orders');
      }

      try {
        const orderStatusResponse = await axios.get('http://localhost:9000/order/status', {
          params: {
            customer_id: customerId
          }
        });
        setOrderStatus(orderStatusResponse.data);
      } catch (error) {
        console.error('Error fetching order status:', error);
        setError('Error fetching order status');
      }

      // Set total price from session storage
      setTotalPrice(totalPriceFromStorage);

      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container style={{ marginTop: '64px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h4" gutterBottom style={{ color: '#FFF', marginBottom: '20px' }}>Order Details</Typography>

      <Grid container spacing={3}>
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

        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ backgroundColor: '#f7f7f7', padding: '20px' }}>
            <Box textAlign="center">
              <Typography variant="h5" gutterBottom style={{ color: '#333', marginBottom: '15px' }}>Payment Information</Typography>
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
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PaymentInfoPage;
