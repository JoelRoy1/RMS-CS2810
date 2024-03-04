import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Helmet } from 'react-helmet';

const MenuManagementPage = () => {
  const [dishes, setDishes] = useState([])
  const [form, setForm] = useState({
    dishName: '',
    dishCalories: '',
    dishPrice: '',
  })
  const [editingID, setEditingId] = useState(null)

  useEffect(() => {
    axios
      .get('http://localhost:9000/menu')
      .then((response) => setDishes(response.data))
      .catch((error) => console.error('Fetch dishes error:', error))
  }, [])

  const handleInputChange = (event) => {
    const { name, value } = event.target
    if (name === 'dishName' && !/^[a-zA-Z\s]*$/.test(value)) {
      return
    }
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const endpoint = editingID ? `/menu/${editingID}` : '/menu/create-item'
    const payload = {
      dishName: form.dishName,
      dishCalories: parseInt(form.dishCalories),
      dishPrice: parseFloat(form.dishPrice).toFixed(2), // Ensures the price is a string with two decimal places
    }

    axios
      .post(`http://localhost:9000${endpoint}`, payload)
      .then((response) => {
        // Update the dishes state based on whether we're adding or editing
        if (editingID) {
          setDishes(
            dishes.map((dish) =>
              dish.dish_id === editingID ? response.data : dish
            )
          )
        } else {
          setDishes([...dishes, response.data])
        }
        setForm({ dishName: '', dishCalories: '', dishPrice: '' })
        setEditingId(null)
      })
      .catch((error) => console.error('Submit dish error:', error))
  }

  const handleEditClick = (dish) => {
    setForm({
      dishName: dish.dish_name,
      dishCalories: dish.dish_calories.toString(),
      dishPrice: dish.dish_price.toString(),
    })
    setEditingId(dish.dish_id)
  }

  const handleDeleteClick = (dishID) => {
    if (window.confirm('Are you sure you want to delete this dish?')) {
      axios
        .delete(`http://localhost:9000/menu/delete-item/${dishID}`)
        .then(() => {
          setDishes(dishes.filter((dish) => dish.dish_id !== dishID))
        })
        .catch((error) => console.error('Delete dish error:', error))
    }
  }

  return (
    <div>
      <div>
        <Helmet>
          <title>Oaxaca | Manage Menu</title>
        </Helmet>
      </div>
      <h1>Menu Management</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="dishName"
          value={form.dishName}
          onChange={handleInputChange}
          placeholder="Dish Name"
          required
        />
        <input
          name="dishCalories"
          type="number"
          value={form.dishCalories}
          onChange={handleInputChange}
          placeholder="Calories"
          required
        />
        <input
          name="dishPrice"
          type="text"
          value={form.dishPrice}
          onChange={handleInputChange}
          placeholder="Price"
          required
        />
        <button type="submit">{editingID ? 'Update' : 'Add'} Dish</button>
      </form>
      <ul>
        {dishes.map((dish) => (
          <li key={dish.dish_id}>
            <h3>{dish.dish_name}</h3>
            <p>Calories: {dish.dish_calories}</p>
            <p>Price: {dish.dish_price}</p>
            <button onClick={() => handleEditClick(dish)}>Edit</button>
            <button onClick={() => handleDeleteClick(dish.dish_id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MenuManagementPage
