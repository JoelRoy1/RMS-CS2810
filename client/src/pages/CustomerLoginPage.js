/**
 * Represents a page component for customer login.
 * @module CustomerLoginPage
 */
import { Helmet } from 'react-helmet';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Grid, Paper } from "@mui/material";
import React, { useState } from "react";

/**
 * React functional component for the customer login page.
 * Allows customers to enter their name and login as a guest.
 * @component
 * @returns {JSX.Element} CustomerLoginPage component
 */
function CustomerLoginPage() {
  /**
   * State variable to hold error message if any occurs during form submission.
   * @type {[string | null, function]} State variable and its setter function
   */
  const [error, setError] = useState(null);

  /**
   * State variable to indicate successful form submission.
   * @type {[boolean, function]} State variable and its setter function
   */
  const [success, setSuccess] = useState(false);

  /**
   * State variable to hold the table number assigned after successful login.
   * @type {[number | null, function]} State variable and its setter function
   */
  const [tableNumber, setTableNumber] = useState(null);

  /**
   * State variable to hold the customer's name entered in the form.
   * @type {[string, function]} State variable and its setter function
   */
  const [customerName, setCustomerName] = useState("");

  /**
   * React hook for navigation to other pages.
   * @type {function}
   */
  const navigate = useNavigate();

  /**
   * Handles the form submission by sending a POST request to the server.
   * @param {Event} event - The form submit event
   * @returns {Promise<void>}
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:9000/customer/", { customerName });
      const { customerId, tableNumber } = response.data; // Extract customerId and tableNumber from response
      sessionStorage.setItem('id', customerId);
      sessionStorage.setItem('customer_name', customerName);
      sessionStorage.setItem('table', tableNumber);
      setTableNumber(tableNumber);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate("/menu");
      }, 1000); // Hide table number after 1 second
    } catch (err) {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <Grid container justify="center" alignItems="center" style={{ maxWidth: "500px" }}>
        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: 20, borderRadius: "8px", boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.1)' }}>
            <Helmet>
              <title>Oaxaca | Customer Login</title>
            </Helmet>
            <Typography variant="h5" align="center" gutterBottom style={{ color: "#333" }}>Welcome to Oaxaca</Typography>
            <Typography variant="body1" align="center" gutterBottom style={{ color: "#333" }}>Please enter your name</Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                    InputProps={{ style: { color: "#333" } }} // Set the input text color
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" color="primary" type="submit" fullWidth style={{ backgroundColor: "#333", color: "#fff", '&:hover': { backgroundColor: "#666" } }}>
                    Guest Login
                  </Button>
                </Grid>
                {success && tableNumber && (
                  <Grid item xs={12}>
                    <Typography variant="body1" align="center" style={{ backgroundColor: "#f0f0f0", padding: "10px", borderRadius: "5px", color: "#333" }}>
                      Your table number is: {tableNumber}
                    </Typography>
                  </Grid>
                )}
                {error && <Grid item xs={12}><Typography variant="subtitle2" color="error">{error}</Typography></Grid>}
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default CustomerLoginPage;
