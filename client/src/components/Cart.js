import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Cart = ({ cartItems, removeFromCart, calculateTotal }) => {
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/payment'); 
  };

  return (
    <div>
      <Typography variant="h2" component="h2" style={{ color: '#000' }}>
        Your Cart
      </Typography>
      <List dense>
        {cartItems.map((item, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={<Typography style={{ color: '#000' }}>{item.dish_name}</Typography>}
              secondary={<Typography style={{ color: '#000' }}> {item.dish_price ? `Price: £${parseFloat(item.dish_price).toFixed(2)}` : 'Price: N/A'} Qty: {item.quantity} </Typography>}
            />
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => removeFromCart(item.dish_id)}
            >
              Remove
            </Button>
          </ListItem>
        ))}
      </List>
      <Typography variant="h3" component="h3" style={{ color: '#000' }}>
        Total: £{calculateTotal().toFixed(2)}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleCheckout}
      >
        Pay Now
      </Button>
    </div>
  );
};

export default Cart;
