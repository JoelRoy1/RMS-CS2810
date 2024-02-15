import React from 'react'
import './DishCard.css' 
import vegPastaImage from './assets/veg-pasta.jpg'; 

const DishCard = () => {
  // Dummy data for a dish
  const dish = {
    description: 'Whole wheat pasta with a variety of fresh vegetables.',
    price: '$12.99',
    calories: '550 kcal',
    allergens: ['Nuts', 'Gluten'],
  }

  return (
    <div className="dish-card">
      <img src={vegPastaImage} alt={dish.name} className="dish-image" />
      <div className="dish-info">
        <h3 className="dish-name">{dish.name}</h3>
        <p className="dish-description">{dish.description}</p>
        <p className="dish-price">Price: {dish.price}</p>
        <p className="dish-calories">Calories: {dish.calories}</p>
        <p className="dish-allergy-info">
          Allergy info: {dish.allergens.join(', ')}
        </p>
      </div>
    </div>
  )
}

export default DishCard
