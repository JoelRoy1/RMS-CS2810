import React from 'react'
import {
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

const Cart = ({ cartItems, removeFromCart, calculateTotal }) => {
  return (
    <div>
      <Typography variant="h2" component="h2" style={{ color: '#000' }}>
        Your Cart
      </Typography>
      <List dense>
        {cartItems.map((item, index) => (
          <ListItem
            key={index}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => removeFromCart(item.id)}
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText
              primary={
                <Typography style={{ color: '#000' }}>{item.name}</Typography>
              }
              secondary={
                <Typography style={{ color: '#000' }}>
                  Price: £{item.price.toFixed(2)} Qty: {item.quantity}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
      <Typography variant="h3" component="h3" style={{ color: '#000' }}>
        Total: £{calculateTotal()}
      </Typography>
      <Button variant="contained" color="primary">
        Checkout
      </Button>
    </div>
  )
}

export default Cart
