import React, { useState } from 'react'
import {
  Checkbox,
  FormControlLabel,
  Typography,
  Container,
  Grid,
  CssBaseline,
  createTheme,
  ThemeProvider,
} from '@mui/material'
import DishCard from '../components/DishCard'
import { Helmet } from 'react-helmet'
import vegPastaImage from '../assets/veg-pasta.jpg'
import chickenTacosImage from '../assets/chicken-tacos.jpg'
import MolePoblanoImage from '../assets/MolePoblanoImage.jpeg'
import ChilesRellenosImage from '../assets/ChilesRellenosImage.jpg'
import EnchiladasSuizasImage from '../assets/EnchiladasSuizasImage.jpg'
import CarnitasImage from '../assets/CarnitasImage.jpg'
import ShrimpTacosImage from '../assets/ShrimpTacosImage.jpg'
import Cart from '../components/Cart'

// Create a theme instance.
const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, sans-serif',
    color: '#333', 
  },
});

const MenuPage = () => {
  const [Dairy, setDairy] = useState(false)
  const [Gluten, setGluten] = useState(false)
  const [Nuts, setNuts] = useState(false)
  const [Shellfish, setShellfish] = useState(false)
  const [Vegetarian, setVegetarian] = useState(false)
  const [Vegan, setVegan] = useState(false)

  const dishes = [
    {
      id: 1,
      name: 'Veg Pasta',
      description: 'Whole wheat pasta with a variety of fresh vegetables.',
      price: '£12.99',
      calories: '550 kcal',
      allergens: ['Nuts', 'Gluten'],
      image: vegPastaImage,
    },
    {
      id: 2,
      name: 'Crunchy Chicken Tacos',
      description:
        'Crispy corn tacos filled with seasoned chicken, lettuce, cheese, and salsa.',
      price: '£10.99',
      calories: '450 kcal',
      allergens: ['Gluten', 'Dairy'],
      image: chickenTacosImage,
    },
    {
      id: 3,
      name: 'Chicken Mole Poblano',
      description:
        'Chicken served with a rich, flavourful sauce made from chili peppers, chocolate and spices.',
      price: '£14.99',
      calories: '550 kcal',
      allergens: ['Gluten', 'Nuts'],
      image: MolePoblanoImage,
    },
    {
      id: 4,
      name: 'Chiles Rellenos',
      description:
        'Roasted poblano peppers stuffed with cheese, battered and fried, and served with a spicy tomato sauce.',
      price: '£17.99',
      calories: '750 kcal',
      allergens: ['Gluten', 'Dairy'],
      image: ChilesRellenosImage,
    },
    {
      id: 5,
      name: 'Enchiladas Suizas',
      description:
        'Corn tortillas filled with chicken, topped with a creamy green sauce made from tomatillos, and melted cheese.',
      price: '£15.99',
      calories: '700 kcal',
      allergens: ['Gluten', 'Dairy'],
      image: EnchiladasSuizasImage,
    },
    {
      id: 6,
      name: 'Carnitas',
      description:
        'Slow-cooked pork shoulder seasoned with citrus and spices, served with tortillas and salsa.',
      price: '£14.99',
      calories: '650 kcal',
      allergens: ['Gluten'],
      image: CarnitasImage,
    },
    {
      id: 7,
      name: 'Shrimp Tacos',
      description:
        'Grilled or sautéed shrimp served in corn or flour tortillas, topped with cabbage slaw and salsa.',
      price: '£18.99',
      calories: '350 kcal',
      allergens: ['Gluten', 'Shellfish'],
      image: ShrimpTacosImage,
    },
  ]
  // State to manage the items in the cart
  const [cartItems, setCartItems] = useState([])

 const addToCart = (dishToAdd) => {
   // Make sure that the price is a number when adding to cart otherwise code will run into parsing error for total
   const priceNumber = parseFloat(dishToAdd.price.replace('£', ''))
   const existingItem = cartItems.find((item) => item.id === dishToAdd.id)
   if (existingItem) {
     setCartItems(
       cartItems.map((item) =>
         item.id === dishToAdd.id
           ? { ...item, quantity: item.quantity + 1 }
           : item
       )
     )
   } else {
     setCartItems([
       ...cartItems,
       { ...dishToAdd, price: priceNumber, quantity: 1 },
     ])
   }
 }

  // Function to remove an item from the cart
  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  // Function to calculate total price of the items in the cart
 const calculateTotal = () => {
   return cartItems
     .reduce((acc, item) => acc + item.quantity * item.price, 0)
     .toFixed(2)
 }

  const filteredDishes = dishes.filter((dish) => {
    return (
      (!Dairy || !dish.allergens.includes('Dairy')) &&
      (!Gluten || !dish.allergens.includes('Gluten')) &&
      (!Nuts || !dish.allergens.includes('Nuts')) &&
      (!Shellfish || !dish.allergens.includes('Shellfish')) &&
      (!Vegetarian || dish.allergens.includes('Vegetarian')) &&
      (!Vegan || dish.allergens.includes('Vegan'))
    )
  })

 return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Helmet>
        <title>Oaxaca | Menu</title>
      </Helmet>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Typography  style={{ color: '#000' }} variant="h4" gutterBottom align="center">
              Menu
            </Typography>
            <Grid container spacing={2}>
              {filteredDishes.map((dish) => (
                <Grid item key={dish.id} xs={12} sm={6} md={4}>
                  <DishCard dish={dish} onAddToCart={() => addToCart(dish)} />
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12} md={4}>
            <Cart cartItems={cartItems} removeFromCart={removeFromCart} calculateTotal={calculateTotal} />
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default MenuPage;