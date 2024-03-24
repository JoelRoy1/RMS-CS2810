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
  Paper,
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
  palette: {
    primary: {
      main: '#333',
    },
    text: {
      primary: '#333',
    },
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

  const storeOrderTotal = () => {
    const total = calculateTotal().toFixed(2);
    sessionStorage.setItem('amount', total);
  };

  const handleCheckout = async () => {
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
      setCartItems([]);
      storeOrderTotal();
      navigate('/payment');
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
        <title>Oaxaca Menu</title>
      </Helmet>
      <Container maxWidth="lg" style={{ marginTop: '100px' }}>
        <Paper style={{ marginBottom: '20px', padding: '20px', background: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', zIndex: '100' }}>
          <Typography variant="h6" gutterBottom align="left">
            Allergen Filters
          </Typography>
          <FormControl component="fieldset">
            <FormGroup row>
              <FormControlLabel
                control={<Checkbox checked={allergens.includes('Gluten')} onChange={handleAllergenChange} value="Gluten" />}
                label="Gluten"
              />
              <FormControlLabel
                control={<Checkbox checked={allergens.includes('Dairy')} onChange={handleAllergenChange} value="Dairy" />}
                label="Dairy"
              />
              <FormControlLabel
                control={<Checkbox checked={allergens.includes('Nuts')} onChange={handleAllergenChange} value="Nuts" />}
                label="Nuts"
              />
            </FormGroup>
          </FormControl>
          <Button variant="contained" color="primary" onClick={filterMenuItems} style={{ marginTop: '10px' }}>
            Apply Filters
          </Button>
        </Paper>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              {(filteredDishes.length > 0 ? filteredDishes : dishes).map((dish) => (
                <Grid item key={dish.dish_id} xs={12} sm={6} md={4}>
                  <DishCard dish={dish} onAddToCart={() => addToCart(dish)} />
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12} md={4} style={{ position: 'sticky', top: '100px', height: 'fit-content' }}>
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
