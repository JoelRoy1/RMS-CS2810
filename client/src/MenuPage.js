import React, { useState, useEffect } from 'react';
import DishCard from './DishCard';
import './styles/MenuPage.css';
import './styles/styles.css';
import vegPastaImage from './assets/veg-pasta.jpg';
import chickenTacosImage from './assets/chicken-tacos.jpg';
import MolePoblanoImage from './assets/MolePoblanoImage.jpeg';
import ChilesRellenosImage from './assets/ChilesRellenosImage.jpg';
import EnchiladasSuizasImage from './assets/EnchiladasSuizasImage.jpg';
import CarnitasImage from './assets/CarnitasImage.jpg';
import ShrimpTacosImage from './assets/ShrimpTacosImage.jpg';
import Navbar from './Navbar';
import CategoryBar from './CategoryBar';
import { useNavigate,NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const CartItem = ({ cartItem, removeFromCart, updateQuantity }) => {
  const handleRemoveFromCart = () => {
      removeFromCart(cartItem.id);
  };

  const handleQuantityChange = (e) => {
      updateQuantity(cartItem.id, parseInt(e.target.value));
  };

  const handleIncrement = () => {
      updateQuantity(cartItem.id, cartItem.quantity + 1);
  };

  const handleDecrement = () => {
      if (cartItem.quantity > 1) {
          updateQuantity(cartItem.id, cartItem.quantity - 1);
      }
  };

  return (
      <div className="border p-4 mb-4">
          <div className="flex justify-between" style={{display:'flex', justifyContent:'space-between'}}>
              <h3>{cartItem.name}</h3>
              <h4 className="font-semibold">{cartItem.price}</h4>
          </div>
          <div className="quantity-control gap-2 my-4  inline-flex" style={{display:'flex', justifyContent:'space-evenly'}}>
              <button className="bg-slate-600" style={{ background:'#363636'}} onClick={handleDecrement}>-</button>
              <input
                  type="number"
                  className="text-center w-16 p-0 rounded-lg border flex-grow"
                  value={cartItem.quantity}
                  readOnly
                  style={{width:'40px',height:'30px',textAlign:'center', marginLeft:'30px',marginRight:'30px'}}
              />
              <button className="bg-slate-600"  style={{background:'#363636'}} onClick={handleIncrement}>+</button>
          </div>
          <div className="flex justify-end py-3">
              <button className="" onClick={handleRemoveFromCart} style={{background:'#EF4040',margin:'20px 0px'}}>Remove</button>
          </div>
      </div>
  );
};
const MenuPage = () => {
  const [Dairy, setDairy] = useState(false);
  const [Gluten, setGluten] = useState(false);
  const [Nuts, setNuts] = useState(false);
  const [Shellfish, setShellfish] = useState(false);
  const [Vegetarian, setVegetarian] = useState(false);
  const [Vegan, setVegan] = useState(false);
  const [tableNumber, setTableNumber] = useState('');
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);


  const addToCart = (dish) => {
      let check = cart?.filter(val => val?.name == dish?.name);
      if(check && check?.length){
          let temp = cart?.map(val => {
              if(val?.name == dish?.name){
                  return{
                      ...val,  quantity: val?.quantity+1  
                  }
              }else {
                  return val
              }
          })
          setCart(temp);
      }else {
          const newCartItem = { ...dish, id: cart.length + 1, quantity: 1 };
          setCart([...cart, newCartItem]);
      }
      
  };

  const removeFromCart = (id) => {
      const removedItem = cart.find(item => item.id === id);
      // Calculate the price of the removed item
      const removedItemPrice = parseFloat(removedItem.price.replace('$', '')) * removedItem.quantity;
      // Remove the item from the cart
      setCart(cart.filter((item) => item.id !== id));
      // Update the total by subtracting the price of the removed item
      setTotal(total - removedItemPrice);
  };
  const updateQuantity = (id, quantity) => {
      setCart(
          cart.map((item) =>
              item.id === id ? { ...item, quantity: quantity } : item
          )
      );
      updateTotal();
  };

  const updateTotal = () => {
      const totalPrice = cart.reduce((sum, item) => {
          const price = parseFloat(item.price.replace('$', ''));
          return sum + (price * item.quantity || 0);
      }, 0);
      setTotal(totalPrice);
  };
  
  
  useEffect(() => {
      console.log('cart', cart)
      updateTotal();
  }, [cart])
  const callWaiter = () => {
      alert("Waiter called for Table " + tableNumber);
      setTableNumber('');
  }; 

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
  const navigate =useNavigate()

  
  const handleOrder = () => {
      // Prepare cart data
      const cartData = cart.map(item => ({
          name: item.name,
          image: item.image,
          quantity: item.quantity,
          price: item.price
      }));
  
      // Store cart data in local storage
      localStorage.setItem('orders', JSON.stringify(cartData));
  
      // Clear the cart
      setCart([]);
      navigate('/order')
  };
  
  return (
      <>
      <div>
        <Helmet>
          <title>Oaxaca | Menu</title>
        </Helmet>
      </div>
      <div className='container'>
          <div className='row' style={{display:'flex', flexWrap:'wrap', justifyContent:''}} >

          <div className='col-md-3' style={{width:'200px'}}>
          <div className="filter-checkboxes" style={{marginTop:'60px'}}>
              <h4>
                  Filter by allergens and dietary preferences:
              </h4>
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
          
          <div className="container"  >
              <h2>Call Waiter for Help</h2>
              <p>Enter your table number to call the waiter:</p>
              <input
                  type="number"
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  placeholder="Table Number"
                  />
              <button onClick={callWaiter} style={{marginTop:'10px'}}>Call Waiter</button>
          </div>
          </div>
          <div className='col-md-6' style={{width:'900px'}}>
          <h1 style={{textAlign:'center'}}>Menu</h1>
      
      <div className="dishes-list">
          {filteredDishes.map((dish, index) => (
              <div key={index}>
                  <DishCard dish={dish}/>
                  <button onClick={() => addToCart(dish)} className='btn'>Add to Cart</button>
              </div>
          ))}
      </div>
          </div>
          <div className='' >
          <div className="App">
              <h1>Cart</h1>
              <div className='cart-item'>
              {cart.map((item) => (
                  <CartItem
                  key={item.id}
                      cartItem={item}
                      removeFromCart={removeFromCart}
                      updateQuantity={updateQuantity}
                      />
                      ))}
              </div>
              <div style={{display:'flex', justifyContent:'space-between', flexWrap:'wrap'}}>
                  
              <h4>Total: ${total.toFixed(2)}</h4>
              <button onClick={handleOrder} style={{marginLeft: '20px'}}>Order</button>
              </div>
          </div>
          </div>
          </div>
      </div>

      <div className="menu-page">
         
     
      </div>

                  </>
  );
};
export default MenuPage;