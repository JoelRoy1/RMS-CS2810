import React from 'react'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'

const DishCard = ({ dish }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
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
        <Typography variant="body2" color="text.secondary">
          {dish.description}
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
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  )
}

export default DishCard
