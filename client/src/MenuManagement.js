import React, { useState, useEffect } from 'react'
import axios from 'axios'

const MenuManagementPage = () => {
  const [dishes, setDishes] = useState([])
  const [form, setForm] = useState({
    dish_name: '',
    dish_calories: '',
    dish_price: '',
  })
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    // Fetch dishes from the backend when the component mounts
    axios
      .get('http://localhost:9000/menu')
      .then((response) => setDishes(response.data))
      .catch((error) => console.error('Fetch dishes error:', error))
  }, [])

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const method = editingId ? 'put' : 'post'
    const url = editingId
      ? `http://localhost:9000/menu/${editingId}`
      : 'http://localhost:9000/menu/create-item'

    axios[method](url, { ...form, dish_id: editingId })
      .then((response) => {
        if (editingId) {
          setDishes(
            dishes.map((dish) =>
              dish.dish_id === editingId ? response.data : dish
            )
          )
        } else {
          setDishes([...dishes, response.data])
        }
        setForm({ dish_name: '', dish_calories: '', dish_price: '' })
        setEditingId(null)
      })
      .catch((error) => console.error('Submit dish error:', error))
  }

  const handleEditClick = (dish) => {
    setForm({
      dish_name: dish.dish_name,
      dish_calories: dish.dish_calories,
      dish_price: dish.dish_price,
    })
    setEditingId(dish.dish_id)
  }

  const handleDeleteClick = (dishId) => {
    if (window.confirm('Are you sure you want to delete this dish?')) {
      axios
        .delete(`http://localhost:9000/menu/delete-item/${dishId}`)
        .then(() => {
          setDishes(dishes.filter((dish) => dish.dish_id !== dishId))
        })
        .catch((error) => console.error('Delete dish error:', error))
    }
  }

  return (
    <div>
      <h1>Menu Management</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="dish_name"
          value={form.dish_name}
          onChange={handleInputChange}
          placeholder="Dish Name"
          required
        />
        <input
          name="dish_calories"
          type="number"
          value={form.dish_calories}
          onChange={handleInputChange}
          placeholder="Calories"
          required
        />
        <input
          name="dish_price"
          value={form.dish_price}
          onChange={handleInputChange}
          placeholder="Price"
          required
        />
        <button type="submit">{editingId ? 'Update' : 'Add'} Dish</button>
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
