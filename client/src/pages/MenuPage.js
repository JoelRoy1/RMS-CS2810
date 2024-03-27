/**
<<<<<<< HEAD
 * React component to handle rendering of the menu page.
 * @module client/menu
 */
=======
 * Represents a page displaying a menu with options to filter allergens and add items to cart for ordering.
 * @module MenuPage
 */

>>>>>>> 78ba41f6c4f7f9bb38319ebf420e1486d10229f7
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

/**
 * Represents the theme for the MenuPage.
 * @constant {object}
 */
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

/**
 * Represents a page displaying a menu with options to filter allergens and add items to cart for ordering.
 * @returns {JSX.Element} The JSX element representing the MenuPage.
 */
const MenuPage = () => {
  /**
   * State hook to manage the list of dishes.
   * @type {Array}
   */
  const [dishes, setDishes] = useState([]);
  
  /**
   * State hook to manage the list of items in the cart.
   * @type {Array}
   */
  const [cartItems, setCartItems] = useState([]);
  
  /**
   * State hook to manage the list of selected allergens for filtering.
   * @type {Array}
   */
  const [allergens, setAllergens] = useState([]);
  
  /**
   * State hook to manage the list of filtered dishes based on allergens.
   * @type {Array}
   */
  const [filteredDishes, setFilteredDishes] = useState([]);
  
  /**
   * React hook for navigation management.
   */
  const navigate = useNavigate();

  /**
   * Effect hook to fetch menu items when the component mounts.
   */
  useEffect(() => {
    fetchMenuItems();
  }, []);

  /**
   * @function fetchMenuItems fetches all menu items.
   */
  const fetchMenuItems = async () => {
    try {
      const response = await axios.get('http://localhost:9000/menu');
      setDishes(response.data);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };
  /**
   * @function AddtoCart Adds items to cart.
   * @param {*} dishToAdd The item we want to add to cart.
   */
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
  /**
   * @function removeFromCart Removes items from cart
   * @param {*} id 
   */
  const removeFromCart = (id) => {
    const updatedCartItems = cartItems.filter((item) => item.dish_id !== id);
    setCartItems(updatedCartItems);
  };
  /**
   * @function calculateTotal Calculates total cost.
   * @returns the total cost of items in the cart.
   */
  const calculateTotal = () => {
    if (cartItems.length === 0) {
      return 0;
    }
    return cartItems.reduce((total, item) => total + item.dish_price * item.quantity, 0);
  };
  /**
   * @function storeOrderTotal stores the total order cost.
   */
  const storeOrderTotal = () => {
    const total = calculateTotal().toFixed(2);
    sessionStorage.setItem('amount', total);
  };
  /**
   * @function handleCheckout handles the checkout component.
   */
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
  /**
   * @function handleAllergenChange handles when allergens are changed in the menu.
   * @param {*} event 
   */
  const handleAllergenChange = (event) => {
    const { value } = event.target;
    if (allergens.includes(value)) {
      setAllergens(allergens.filter((allergen) => allergen !== value));
    } else {
      setAllergens([...allergens, value]);
    }
  };

  /**
   * @function filterMenuItems handles filtering of menu items.
   */
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
