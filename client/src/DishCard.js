import React from 'react';
import './DishCard.css';

const DishCard = ({ dish }) => {
  return (
    <div className="dish-card">
      <img src={dish.image} alt={dish.name} className="dish-image" />
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
  );
}

export default DishCard;
