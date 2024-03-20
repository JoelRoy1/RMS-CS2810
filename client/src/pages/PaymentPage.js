import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PaymentPage = () => {
  const navigate = useNavigate(); // Hook for programmatic navigation
  const [formData, setFormData] = useState({
    table_number: sessionStorage.getItem('table'),
    amount: sessionStorage.getItem('amount'),
    card_number: '',
    card_holder: '',
    card_expiry: '',
    card_cvc: '',
  });
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    if (submitting) return; // Prevent multiple submissions

    setSubmitting(true); // Disable the submit button
    try {
      await axios.post('http://localhost:9000/payment', formData);
      setPaymentStatus('success');
      setTimeout(() => navigate('/menu'), 1000); // Navigate to menu after 2 seconds
    } catch (error) {
      console.error('Payment Failed', error);
      setPaymentStatus('failed');
    } finally {
      setSubmitting(false); // Re-enable the submit button
    }
  };  

  return (
    <Container component="main" maxWidth="xs">
      <div style={{ marginTop: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5" style={{ color: '#333', marginBottom: '2rem' }}>
          Payment Details
        </Typography>
        {paymentStatus === 'success' && (
          <Typography style={{ color: 'green', marginBottom: '1rem' }}>
            Transaction Successful. Redirecting to menu...
          </Typography>
        )}
        {paymentStatus === 'failed' && (
          <Typography style={{ color: 'red', marginBottom: '1rem' }}>
            Transaction Failed. Please try again.
          </Typography>
        )}
        <form style={{ width: '100%', marginTop: '1rem' }} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Table Number"
            name="table_number"
            value={formData.table_number}
            disabled
            style={{ backgroundColor: '#f5f5f5' }}
            InputProps={{ style: { color: '#333' } }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Amount"
            name="amount"
            value={formData.amount}
            disabled
            style={{ backgroundColor: '#f5f5f5' }}
            InputProps={{ style: { color: '#333' } }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Card Number"
            name="card_number"
            value={formData.card_number}
            onChange={handleChange}
            style={{ backgroundColor: '#f5f5f5' }}
            InputProps={{ style: { color: '#333' } }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Card Holder"
            name="card_holder"
            value={formData.card_holder}
            onChange={handleChange}
            style={{ backgroundColor: '#f5f5f5' }}
            InputProps={{ style: { color: '#333' } }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Card Expiry"
            name="card_expiry"
            value={formData.card_expiry}
            onChange={handleChange}
            style={{ backgroundColor: '#f5f5f5' }}
            InputProps={{ style: { color: '#333' } }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Card CVC"
            name="card_cvc"
            value={formData.card_cvc}
            onChange={handleChange}
            style={{ backgroundColor: '#f5f5f5' }}
            InputProps={{ style: { color: '#333' } }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            style={{ backgroundColor: '#333', color: '#fff', marginTop: '2rem' }}
            disabled={submitting} // Disable button while submitting
          >
            Submit
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default PaymentPage;
