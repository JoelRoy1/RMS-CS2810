import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { 
    Box, 
    Button, 
    Typography, 
    TextField, 
    FormControl, 
    InputLabel, 
    Select, 
    MenuItem 
} from '@mui/material';

const PaymentPage = () => {
  let navigate = useNavigate();

  const handleCancel = () => {
    navigate('/Menu');
  };

  const handlePayNow = () => {
    alert('Payment Successful!');
    navigate('/');
  };

  // payment options, not functional at all
  const paymentOptions = [
    'Credit Card',
    'Debit Card',
    'PayPal',
    'Google Pay',
    'Apple Pay'
  ];

  // need to implement function for different payment options
  const handlePaymentOptionChange = (e) => {
  };

  return (
    <Box sx={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
      <Helmet>
        <title>Payment | OAXACA</title>
      </Helmet>
      <Typography variant="h4" color="black" gutterBottom>
        Payment Details
      </Typography>
      <FormControl margin="normal" style={{ width: '100%' }}>
        <InputLabel id="payment-option-label">Select Payment Option</InputLabel>
        <Select
          labelId="payment-option-label"
          id="payment-option-select"
          value={''}
          onChange={handlePaymentOptionChange}
          label="Select Payment Option"
        >
          {paymentOptions.map((option, index) => (
            <MenuItem key={index} value={option}>{option}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField label="Card Number" variant="outlined" margin="normal" style={{ width: '100%' }} />
      <TextField label="Expiry Date" variant="outlined" margin="normal" style={{ width: '100%' }} />
      <TextField label="CVV" variant="outlined" margin="normal" style={{ width: '100%' }} />
      <TextField label="Name on Card" variant="outlined" margin="normal" style={{ width: '100%' }} />
      <Box sx={{ marginTop: '2rem' }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleCancel}
          sx={{ marginRight: '1rem' }}
        >
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handlePayNow}>
          Pay Now
        </Button>
      </Box>
    </Box>
  );
};

export default PaymentPage;
