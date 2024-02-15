import React from 'react';
import DishCard from './DishCard';
import './MenuPage.css';
import vegPastaImage from './assets/veg-pasta.jpg';
import chickenTacosImage from './assets/chicken-tacos.jpg';

const MenuPage = () => {
  const dishes = [
    {
      name: 'Veg Pasta',
      description: 'Whole wheat pasta with a variety of fresh vegetables.',
      price: '$12.99',
      calories: '550 kcal',
      allergens: ['Nuts', 'Gluten'],
      image: vegPastaImage 
    },
    {
      name: 'Crunchy Chicken Tacos',
      description: 'Crispy corn tacos filled with seasoned chicken, lettuce, cheese, and salsa.',
      price: '$10.99',
      calories: '450 kcal',
      allergens: ['Gluten', 'Dairy'],
      image: chickenTacosImage
    }
  ];

  return (
    <div className="menu-page">
      <h1>Menu</h1>
      <div className="dishes-list">
        {dishes.map((dish, index) => (
          <DishCard key={index} dish={dish} />
        ))}
      </div>
    </div>
  );
}

export default MenuPage;
