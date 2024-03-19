import React, { useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Collapse,
} from '@mui/material';

const DishCard = ({ dish, onAddToCart }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card style={{ maxWidth: 345, minHeight: 400, borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <CardMedia
        component="img"
        height="140"
        image={dish.image} // Assuming the dish object has an 'image' property
        alt={dish.name}
        style={{ borderRadius: '10px 10px 0 0' }}
      />
      <CardContent style={{ textAlign: 'center' }}>
        <Typography variant="h5" component="div" style={{ color: '#333', fontWeight: 'bold', marginBottom: '10px', fontSize: '1.5rem' }}>
          {dish.dish_name} {/* Displaying the dish name */}
        </Typography>
        <Typography variant="body1" component="p" style={{ color: '#666', marginBottom: '8px', fontSize: '1rem' }}>
          Price: £{dish.dish_price} {/* Displaying the dish price */}
        </Typography>
        <Typography variant="body1" component="p" style={{ color: '#666', marginBottom: '8px', fontSize: '1rem' }}>
          Calories: {dish.dish_calories} {/* Displaying the dish calories */}
        </Typography>
        {/* Display allergens or "No allergens" if allergens are null */}
        <Typography variant="body1" component="p" style={{ color: '#666', marginBottom: '10px', fontSize: '1rem' }}>
          Allergy info: {dish.allergens && dish.allergens.length > 0 ? dish.allergens.join(', ') : 'No allergens'}
        </Typography>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Typography variant="body2" color="text.secondary" style={{ color: '#666', marginBottom: '10px', fontSize: '0.9rem' }}>
            {dish.dish_description}
          </Typography>
        </Collapse>
      </CardContent>
      <CardActions style={{ justifyContent: 'center' }}>
        <Button onClick={handleExpandClick} style={{ color: '#333', textTransform: 'none', marginRight: '12px', width: '180px' }}>
          {expanded ? 'Hide Description' : 'Show Description'}
        </Button>
        <Button onClick={() => onAddToCart(dish)} style={{ textTransform: 'none', backgroundColor: '#333', color: '#fff', width: '180px' }}>
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default DishCard;
