import React from 'react';
import DishCard from './DishCard'; 
import './MenuPage.css';

function MenuPage() {
  return (
    <div className="menu-page">
      <h1>Menu</h1>
      <div className="categories">
        <button>Popular</button>
        <button>Antojitos</button>
        <button>Tacos</button>
        <button>Platos</button>
      </div>
      <div className="dishes-list">
        {/* Example usage of DishCard component */}
        <DishCard />
        <DishCard />
        {/* Add more DishCard components for each menu item */}
      </div>
    </div>
  );
}

export default MenuPage; // Type localhost:3000/Menu to checkout MenuPage


