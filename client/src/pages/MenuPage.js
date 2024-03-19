// MenuPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
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
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, sans-serif',
    color: '#333',
  },
});

const MenuPage = () => {
  const [dishes, setDishes] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get('http://localhost:9000/menu');
      setDishes(response.data);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };

  const addToCart = (dishToAdd) => {
    const existingItem = cartItems.find(
      (item) => item.dish_id === dishToAdd.dish_id
    );
    if (existingItem) {
      const updatedCartItems = cartItems.map((item) =>
        item.dish_id === dishToAdd.dish_id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...dishToAdd, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    const updatedCartItems = cartItems.filter((item) => item.dish_id !== id);
    setCartItems(updatedCartItems);
  };

  const calculateTotal = () => {
    if (cartItems.length === 0) {
      return 0;
    }
    return cartItems.reduce(
      (total, item) => total + item.dish_price * item.quantity,
      0
    );
  };

  const handleCheckout = async () => {
    navigate('/payment');
    // Add your checkout logic here
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Helmet>
        <title>Oaxaca Menu</title>
      </Helmet>
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
              handleCheckout={handleCheckout}
            />
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default MenuPage;
