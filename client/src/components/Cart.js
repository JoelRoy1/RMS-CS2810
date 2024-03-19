import React from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  Paper,
  Box,
} from '@mui/material';

const Cart = ({ cartItems, removeFromCart, calculateTotal, handleCheckout }) => {
  return (
    <Paper elevation={3} style={{ position: 'sticky', top: '100px', maxHeight: 'calc(100vh - 120px)', overflowY: 'auto', padding: '20px', borderRadius: '10px', background: '#f9f9f9' }}>
      <Typography variant="h6" gutterBottom style={{ color: '#333', textAlign: 'center', marginBottom: '20px' }}>
        Order Cart
      </Typography>
      {cartItems.length === 0 ? (
        <>
          <Typography variant="body1" style={{ color: '#555', textAlign: 'center' }}>Your cart is empty.</Typography>
        </>
      ) : (
        <>
          <List>
            {cartItems.map((item) => (
              <React.Fragment key={item.dish_id}>
                <ListItem>
                  <ListItemText
                    primary={item.dish_name}
                    secondary={`Quantity: ${item.quantity}`}
                    style={{ color: '#333' }}
                  />
                  <Typography style={{ color: '#333', marginLeft: 'auto' }}>£{(item.dish_price * item.quantity).toFixed(2)}</Typography>
                  <Button onClick={() => removeFromCart(item.dish_id)} size="small" style={{ color: '#fff', background: '#666', marginLeft: '8px' }}>Remove</Button>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
          <Box display="flex" justifyContent="center">
            <Typography variant="h6" style={{ marginTop: '20px', color: '#333' }}>
              Total: £{(calculateTotal()).toFixed(2)}
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: '20px', color: '#fff', background: '#333' }}
            onClick={handleCheckout}
          >
            Pay Now
          </Button>
        </>
      )}
    </Paper>
  );
};

export default Cart;
