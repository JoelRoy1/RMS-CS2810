import React from 'react';
import './CategoryBar.css';

const CategoryBar = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="category-bar">
      {categories.map((category) => (
        <div
          key={category}
          className={`category-tab ${category === selectedCategory ? 'active' : ''}`}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </div>
      ))}
    </div>
  );
}

export default CategoryBar;