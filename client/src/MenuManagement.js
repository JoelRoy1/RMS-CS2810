import React, { useState, useEffect } from 'react'
import axios from 'axios'

const MenuManagementPage = () => {
  const [dishes, setDishes] = useState([])
  const [form, setForm] = useState({
    name: '',
    description: '',
    imageUrl: '',
    price: '',
  })
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    // Fetch dishes from the backend
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

    axios[method](url, form)
      .then((response) => {
        setDishes(
          editingId
            ? dishes.map((dish) =>
                dish.id === editingId ? response.data : dish
              )
            : [...dishes, response.data]
        )
        setForm({ name: '', description: '', imageUrl: '', price: '' })
        setEditingId(null)
      })
      .catch((error) => console.error('Submit dish error:', error))
  }

  const handleEditClick = (dish) => {
    setForm(dish)
    setEditingId(dish.id)
  }

  const handleDeleteClick = (dishId) => {
    if (window.confirm('Are you sure you want to delete this dish?')) {
      axios
        .delete(`http://localhost:9000/menu/delete-item/${dishId}`)
        .then(() => {
          setDishes(dishes.filter((dish) => dish.id !== dishId))
        })
        .catch((error) => console.error('Delete dish error:', error))
    }
  }

  return (
    <div>
      <h1>Menu Management</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={form.name}
          onChange={handleInputChange}
          placeholder="Name"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleInputChange}
          placeholder="Description"
          required
        />
        <input
          name="imageUrl"
          value={form.imageUrl}
          onChange={handleInputChange}
          placeholder="Image URL"
          required
        />
        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleInputChange}
          placeholder="Price"
          required
        />
        <button type="submit">{editingId ? 'Update' : 'Add'} Dish</button>
      </form>
      <ul>
        {dishes.map((dish) => (
          <li key={dish.id}>
            <img src={dish.imageUrl} alt={dish.name} />
            <h3>{dish.name}</h3>
            <p>{dish.description}</p>
            <p>{dish.price}</p>
            <button onClick={() => handleEditClick(dish)}>Edit</button>
            <button onClick={() => handleDeleteClick(dish.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MenuManagementPage
