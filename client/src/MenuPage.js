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

  return (
    <div className="menu-page">
      <h1>Menu</h1>
      <div className="filter-checkboxes">
        <label>
          <input type="checkbox" defaultChecked={true} />
          Dairy
        </label>
        <label>
          <input type="checkbox" defaultChecked={true}/>
          Gluten
        </label>
        <label>
          <input type="checkbox" defaultChecked={true}/>
          Nuts
        </label>
        <label>
          <input type="checkbox" defaultChecked={true}/>
          Shellfish
        </label>
        <label>
          <input type="checkbox" defaultChecked={false}/>
          Vegetarian
        </label>
        <label>
          <input type="checkbox" defaultChecked={false}/>
          Vegan
        </label>
      </div>
      <div className="dishes-list">
        {dishes.map((dish, index) => (
          <DishCard key={index} dish={dish} />
        ))}
      </div>
    </div>
  );
}

export default MenuPage;
