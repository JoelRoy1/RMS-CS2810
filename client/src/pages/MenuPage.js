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
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
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
  const [allergens, setAllergens] = useState([]);
  const [filteredDishes, setFilteredDishes] = useState([]);
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
    const existingItem = cartItems.find((item) => item.dish_id === dishToAdd.dish_id);
    if (existingItem) {
      const updatedCartItems = cartItems.map((item) =>
        item.dish_id === dishToAdd.dish_id ? { ...item, quantity: item.quantity + 1 } : item
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
    return cartItems.reduce((total, item) => total + item.dish_price * item.quantity, 0);
  };

  const handleCheckout = async () => {
    navigate('/payment');
    const customerID = sessionStorage.getItem('id');
    const staffID = 2; // Assigning staff ID manually
    const orderStatus = 'pending';
    const orderAllergies = 'No allergies';
    const items = cartItems.map((item) => ({
      dishId: item.dish_id,
      dishName: item.dish_name,
      quantity: item.quantity,
      dishPrice: item.dish_price,
    }));

    try {
      const response = await axios.post('http://localhost:9000/order', {
        customerId: customerID,
        staffId: staffID,
        orderStatus: orderStatus,
        orderAllergies: orderAllergies,
        items: items,
      });
      console.log('Order placed successfully:', response.data);
      sessionStorage.setItem('amount', calculateTotal());
      setCartItems([]);
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  const handleAllergenChange = (event) => {
    const { value } = event.target;
    if (allergens.includes(value)) {
      setAllergens(allergens.filter((allergen) => allergen !== value));
    } else {
      setAllergens([...allergens, value]);
    }
  };

  const filterMenuItems = async () => {
    try {
      const response = await axios.get('http://localhost:9000/menu/filter-allergens', {
        params: {
          allergens: allergens.join(','),
        },
      });
      setFilteredDishes(response.data);
    } catch (error) {
      console.error('Error filtering menu items:', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Helmet>
        <title>Your Restaurant Name | Menu</title>
      </Helmet>
      <Container maxWidth="lg" style={{ marginTop: '100px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" gutterBottom align="center">
              Menu
            </Typography>
            {/* Allergen filter */}
            <FormControl component="fieldset">
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={allergens.includes('Gluten')} onChange={handleAllergenChange} value="Gluten" />}
                  label={<Typography color="textPrimary">Gluten</Typography>}
                />
                <FormControlLabel
                  control={<Checkbox checked={allergens.includes('Dairy')} onChange={handleAllergenChange} value="Dairy" />}
                  label={<Typography color="textPrimary">Dairy</Typography>}
                />
                <FormControlLabel
                  control={<Checkbox checked={allergens.includes('Nuts')} onChange={handleAllergenChange} value="Nuts" />}
                  label={<Typography color="textPrimary">Nuts</Typography>}
                />
              </FormGroup>
            </FormControl>
            <Button variant="contained" color="primary" onClick={filterMenuItems}>
              Apply Filters
            </Button>
            <Grid container spacing={2}>
              {(filteredDishes.length > 0 ? filteredDishes : dishes).map((dish) => (
                <Grid item key={dish.dish_id} xs={12} sm={6} md={4}>
                  <DishCard dish={dish} onAddToCart={() => addToCart(dish)} />
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12} md={4} style={{position: 'sticky', top:'100px', height: 'fit-content'}}>
            <Cart
              cartItems={cartItems}
              removeFromCart={removeFromCart}
              calculateTotal={calculateTotal}
            />
            <div style={{marginTop: '20px'}}>
            <Button variant="contained" color="primary" fullWidth onClick={handleCheckout} style={{marginTop: '20px'}}>
              Pay Now
            </Button>
            </div>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default MenuPage;
