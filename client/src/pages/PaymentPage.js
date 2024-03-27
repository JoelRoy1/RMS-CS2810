/**
 * React component for handling payment process.
 * @module client/payment
 */

import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Grid } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

/**
 * Represents the payment page component.
 * @returns {JSX.Element} The payment page JSX template.
 */
const PaymentPage = () => {
  const navigate = useNavigate(); // Hook for programmatic navigation

  /**
   * State for form data and its setter function.
   * @type {object}
   * @property {string} table_number - The table number.
   * @property {string} amount - The payment amount.
   * @property {string} card_number - The card number.
   * @property {string} card_holder - The card holder's name.
   * @property {string} card_expiry - The card expiry date.
   * @property {string} card_cvc - The card CVC.
   */
  const [formData, setFormData] = useState({
    table_number: sessionStorage.getItem('table'),
    amount: sessionStorage.getItem('amount'),
    card_number: '',
    card_holder: '',
    card_expiry: '',
    card_cvc: '',
  });

  /**
   * State for payment status.
   * @type {string | null}
   */
  const [paymentStatus, setPaymentStatus] = useState(null);

  /**
   * State for form submission status.
   * @type {boolean}
   */
  const [submitting, setSubmitting] = useState(false);

  /**
   * State for form validation errors.
   * @type {object}
   */
  const [errors, setErrors] = useState({});

  /**
   * Handles changes in form fields.
   * @param {Event} e - The change event.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  /**
   * Handles form submission.
   * @param {Event} e - The submit event.
   * @returns {Promise<void>}
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    if (submitting) return; // Prevent multiple submissions

    // Reset errors
    setErrors({});

    // Validation checks
    const errors = {};
    if (formData.card_number.length !== 16) {
      errors.card_number = 'Card number must be 16 digits long';
    }
    if (formData.card_cvc.length !== 3) {
      errors.card_cvc = 'CVC must be 3 digits long';
    }
    const expiryRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
    if (!expiryRegex.test(formData.card_expiry)) {
      errors.card_expiry = 'Invalid expiry date format (MM/YY)';
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    setSubmitting(true); // Disable the submit button
    try {
      await axios.post('http://localhost:9000/payment', formData);
      setPaymentStatus('success');
      setTimeout(() => navigate('/payment-info'), 500); // Navigate to menu after 2 seconds
    } catch (error) {
      console.error('Payment Failed', error);
      setPaymentStatus('failed');
    } finally {
      setSubmitting(false); // Re-enable the submit button
    }
  };

  return (
    <Container component="main" maxWidth="xs" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <div>
        <Typography component="h1" variant="h5" style={{ color: '#333', marginBottom: '2rem' }}>
          Order Payment
        </Typography>
        {paymentStatus === 'success' && (
          <Typography style={{ color: 'green', marginBottom: '1rem' }}>
            Transaction Successful. Redirecting to order tracking...
          </Typography>
        )}
        {paymentStatus === 'failed' && (
          <Typography style={{ color: 'red', marginBottom: '1rem' }}>
            Transaction Failed. Please try again.
          </Typography>
        )}
        <form style={{ width: '100%' }} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Table Number"
                name="table_number"
                value={formData.table_number}
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Amount"
                name="amount"
                value={formData.amount}
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Card Number"
                name="card_number"
                value={formData.card_number}
                onChange={handleChange}
                error={errors.card_number}
                helperText={errors.card_number}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Card Holder"
                name="card_holder"
                value={formData.card_holder}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                fullWidth
                label="Card Expiry"
                name="card_expiry"
                value={formData.card_expiry}
                onChange={handleChange}
                error={errors.card_expiry}
                helperText={errors.card_expiry}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                fullWidth
                label="Card CVC"
                name="card_cvc"
                value={formData.card_cvc}
                onChange={handleChange}
                error={errors.card_cvc}
                helperText={errors.card_cvc}
              />
            </Grid>
          </Grid>
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
