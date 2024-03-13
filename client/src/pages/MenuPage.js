import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  Typography,
  Container,
  Grid,
  CssBaseline,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import DishCard from '../components/DishCard';
import { Helmet } from 'react-helmet';
import Cart from '../components/Cart';

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, sans-serif',
    color: '#333',
  },
});

const MenuPage = () => {
  const [dishes, setDishes] = useState([])
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    fetchMenuItems()
  }, [])

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get('http://localhost:9000/menu')
      setDishes(response.data)
    } catch (error) {
      console.error('Error fetching menu items:', error)
    }
  }

  const addToCart = (dishToAdd) => {
    const existingItem = cartItems.find(
      (item) => item.dish_id === dishToAdd.dish_id
    )
    if (existingItem) {
      const updatedCartItems = cartItems.map((item) =>
        item.dish_id === dishToAdd.dish_id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
      setCartItems(updatedCartItems)
    } else {
      setCartItems([...cartItems, { ...dishToAdd, quantity: 1 }])
    }
  }

  const removeFromCart = (id) => {
    const updatedCartItems = cartItems.filter((item) => item.dish_id !== id) // Fixed filter condition
    setCartItems(updatedCartItems)
  }

  const calculateTotal = () => {
    if (cartItems.length === 0) {
      return 0 // Return 0 if the cart is empty
    }
    return cartItems.reduce(
      (total, item) => total + item.dish_price * item.quantity,
      0
    )
  }

  const handleCheckout = async () => {
    const customerID = 1 // Assigning customer ID manually
    const staffID = 2 // Assigning staff ID manually
    const orderStatus = 'pending'
    const orderAllergies = 'No allergies'
    const items = cartItems.map((item) => ({
      dishId: item.dish_id,
      dishName: item.dish_name,
      quantity: item.quantity, // Use the actual quantity from the cart
      dishPrice: item.dish_price,
    }))

    try {
      const response = await axios.post('http://localhost:9000/order', {
        customerId: customerID,
        staffId: staffID,
        orderStatus: orderStatus,
        orderAllergies: orderAllergies,
        items: items,
      })
      console.log('Order placed successfully:', response.data)
      // Optionally, you can clear the cart after placing the order
      setCartItems([])
    } catch (error) {
      console.error('Error placing order:', error)
    }
  }

  console.log('cartItems:', cartItems)
  console.log('cartItems:', cartItems)
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Helmet>
        <title>Your Restaurant Name | Menu</title>
      </Helmet>
      {/* Adjusted Container to include top margin */}
      <Container maxWidth="lg" style={{ marginTop: '100px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Typography
              style={{ color: '#000' }}
              variant="h4"
              gutterBottom
              align="center"
            >
              Menu
            </Typography>
            <Grid container spacing={2}>
              {dishes.map((dish) => (
                <Grid item key={dish.dish_id} xs={12} sm={6} md={4}>
                  <DishCard dish={dish} onAddToCart={() => addToCart(dish)} />
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12} md={4}>
            <Cart
              cartItems={cartItems}
              removeFromCart={removeFromCart}
              calculateTotal={calculateTotal}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleCheckout}
            >
              Checkout
            </Button>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  )
}

export default MenuPage