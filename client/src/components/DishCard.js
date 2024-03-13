import React, { useState } from 'react'
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Collapse,
} from '@mui/material'

const DishCard = ({ dish, onAddToCart }) => {
  const [expanded, setExpanded] = useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <Card sx={{ maxWidth: 345, minHeight: 400 }}>
      <CardMedia
        component="img"
        height="140"
        image={dish.image}
        alt={dish.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {dish.name}
        </Typography>
        <Typography variant="body1" component="p">
          Price: {dish.price}
        </Typography>
        <Typography variant="body1" component="p">
          Calories: {dish.calories}
        </Typography>
        <Typography variant="body1" component="p">
          Allergy info: {dish.allergens.join(', ')}
        </Typography>
        <CardActions disableSpacing>
          <Button size="small" onClick={handleExpandClick}>
            {expanded ? 'Hide' : 'Show'} Description
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={() => onAddToCart(dish)}
          >
            Add to Cart
          </Button>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Typography variant="body2" color="text.secondary">
            {dish.description}
          </Typography>
        </Collapse>
      </CardContent>
    </Card>
  )
}

export default DishCard
