import React from 'react';
import DishCard from './DishCard';
import './MenuPage.css';
import vegPastaImage from './assets/veg-pasta.jpg';
import chickenTacosImage from './assets/chicken-tacos.jpg';
import MolePoblanoImage from './assets/MolePoblanoImage.jpeg';
import ChilesRellenosImage from './assets/ChilesRellenosImage.jpg';
import EnchiladasSuizasImage from './assets/EnchiladasSuizasImage.jpg';
import CarnitasImage from './assets/CarnitasImage.jpg';
import ShrimpTacosImage from './assets/ShrimpTacosImage.jpg';
import { useState } from 'react';

const MenuPage = () => {
  const [Dairy, setDairy] = useState(false);
  const [Gluten, setGluten] = useState(false);
  const [Nuts, setNuts] = useState(false);
  const [Shellfish, setShellfish] = useState(false);
  const [Vegetarian, setVegetarian] = useState(false);
  const [Vegan, setVegan] = useState(false);
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
    },
    {
      name: 'Chicken Mole Poblano',
      description: 'Chicken served with a rich, flavourful sauce made from chili peppers, chocolate and spices.',
      price: '$14.99',
      calories: '550 kcal',
      allergens: ['Gluten', 'Nuts'],
      image: MolePoblanoImage
    },
    {
      name: 'Chiles Rellenos',
      description: 'Roasted poblano peppers stuffed with cheese, battered and fried, and served with a spicy tomato sauce.',
      price: '$17.99',
      calories: '750 kcal',
      allergens: ['Gluten', 'Dairy'],
      image: ChilesRellenosImage
    },
    {
      name: 'Enchiladas Suizas',
      description: 'Corn tortillas filled with chicken, topped with a creamy green sauce made from tomatillos, and melted cheese.',
      price: '$15.99',
      calories: '700 kcal',
      allergens: ['Gluten', 'Dairy'],
      image: EnchiladasSuizasImage
    },
    {
      name: 'Carnitas',
      description: 'Slow-cooked pork shoulder seasoned with citrus and spices, served with tortillas and salsa.',
      price: '$14.99',
      calories: '650 kcal',
      allergens: ['Gluten'],
      image: CarnitasImage
    },
    {
      name: 'Shrimp Tacos',
      description: 'Grilled or sautéed shrimp served in corn or flour tortillas, topped with cabbage slaw and salsa.',
      price: '$18.99',
      calories: '350 kcal',
      allergens: ['Gluten', 'Shellfish'],
      image: ShrimpTacosImage
    }
    
    
  ];

  const filteredDishes = dishes.filter(dish => {
    if (
      (!Dairy || !dish.allergens.includes('Dairy')) &&
      (!Gluten || !dish.allergens.includes('Gluten')) &&
      (!Nuts || !dish.allergens.includes('Nuts')) &&
      (!Shellfish || !dish.allergens.includes('Shellfish'))
    ) {
      return true;
    } else {
      return false;
    }
  });

  return (
    <div className="menu-page">
      <h1>Menu</h1>
      <div className="filter-checkboxes">
        <label>
          Filter by allergens and dietary preferences:
        </label>
        <label>
          <input type="checkbox" checked={Dairy}  onChange={() => setDairy((prev) => !prev)} />
          Dairy
        </label>
        <label>
          <input type="checkbox"  checked={Gluten} onChange={() => setGluten((prev) => !prev)}/>
          Gluten
        </label>
        <label>
          <input type="checkbox" checked={Nuts} onChange={() => setNuts((prev) => !prev)}/>
          Nuts
        </label>
        <label>
          <input type="checkbox"  checked={Shellfish} onChange={() => setShellfish((prev) => !prev)}/>
          Shellfish
        </label>
        <label>
          <input type="checkbox" checked={Vegetarian} onChange={() => setVegetarian((prev) => !prev)}/>
          Vegetarian
        </label>
        <label>
          <input type="checkbox"  checked={Vegan} onChange={() => setVegan((prev) => !prev)}/>
          Vegan
        </label>
      </div>
      <div className="dishes-list">
        {filteredDishes.map((dish, index) => (
          <DishCard key={index} dish={dish} />
        ))}
      </div>
    </div>
  );
}

export default MenuPage;
