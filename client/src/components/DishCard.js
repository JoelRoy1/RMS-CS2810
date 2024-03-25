import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Collapse,
} from '@mui/material';

const fetchImages = async (searchTerm) => {
  try {
    const response = await axios.get('https://api.unsplash.com/search/photos', {
      params: {
        query: searchTerm,
        per_page: 1, // Number of images to fetch
        client_id: 'h0R5KSpe27itJHrcy8DLqDKbmMv2zapc5060cgHO0nk', //Unsplash API access key
      },
    });
    return response.data.results[0].urls.regular; // Return the URL of the first image
  } catch (error) {
    console.error('Error fetching images:', error);
    return ''; // Return an empty string if there's an error
  }
};

const DishCard = ({ dish, onAddToCart }) => {
  const [image, setImage] = useState('');

  useEffect(() => {
    const fetchImageForDish = async () => {
      const imageUrl = await fetchImages(dish.dish_name);
      setImage(imageUrl);
    };

    fetchImageForDish();
  }, [dish.dish_name]);

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card style={{ maxWidth: 345, minHeight: 400, borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <CardMedia
        component="img"
        height="140"
        image={image}
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
