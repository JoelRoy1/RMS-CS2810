/**
 * React component to handle rendering of customer login page.
 * @module client/customer
 */

import React, { useState } from "react";
import { Helmet } from 'react-helmet';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Grid, Paper } from "@mui/material";
import React, { useState } from "react";

/**
 * Represents the customer login page component.
 * @returns {JSX.Element} The customer login page JSX template.
 */
function CustomerLoginPage() {
  /**
   * State to check if an error has occured.
   * @type {Array<Object>}
   */
  const [error, setError] = useState(null);
  /**
   * State to check if login is succesful.
   * @type {Array<Object>}
   */
  const [success, setSuccess] = useState(false);
  /**
   * State to store table number.
   * @type {Array<Object>}
   */
  const [tableNumber, setTableNumber] = useState(null);
  const navigate = useNavigate();
  /**
   * State to store customer name.
   * @type {Array<Object>}
   */
  const [customerName, setCustomerName] = useState("");
 /**
  * @function handleSubmit handles a customer login.
  * @param {*} event login button is pressed.
  */
  const handleSubmit = async (event) => { // Function to handle form submission
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
