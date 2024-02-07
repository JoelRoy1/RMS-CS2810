import React from 'react';

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
      {/* Add menu items for each category */}
    </div>
  );
}

export default MenuPage;
