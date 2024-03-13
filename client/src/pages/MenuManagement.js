import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  IconButton,
  Container,
} from '@mui/material'
import Alert from '@mui/material/Alert'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

const MenuManagementPage = () => {
  const [dishes, setDishes] = useState([])
  const [form, setForm] = useState({
    dishName: '',
    dishCalories: '',
    dishPrice: '',
  })
  const [editingID, setEditingId] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  })

  useEffect(() => {
    fetchDishes()
  }, [])

  const fetchDishes = () => {
    axios
      .get('http://localhost:9000/menu')
      .then((response) => setDishes(response.data))
      .catch((error) => handleError('Fetch dishes error:', error))
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setForm({ ...form, [name]: value })
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault()
    const payload = {
      dishName: form.dishName,
      dishCalories: form.dishCalories,
      dishPrice: form.dishPrice,
    }

    try {
      const endpoint = editingID ? `/menu/${editingID}` : '/menu/create-item'
      const method = editingID ? 'put' : 'post'

      const response = await axios[method](
        `http://localhost:9000${endpoint}`,
        payload
      )
      handleCloseDialog()
      fetchDishes() // Refetch dishes to get the updated list
      setSnackbar({
        open: true,
        message: 'Dish processed successfully',
        severity: 'success',
      })
    } catch (error) {
      handleError('Submit dish error:', error)
    }
  }

  const handleEditClick = (dish) => {
    setForm({
      dishName: dish.dish_name,
      dishCalories: dish.dish_calories.toString(),
      dishPrice: dish.dish_price.toString(),
    })
    setEditingId(dish.dish_id)
    setOpenDialog(true)
  }

  const handleDeleteClick = async (dishID) => {
    if (window.confirm('Are you sure you want to delete this dish?')) {
      try {
        await axios.delete(`http://localhost:9000/menu/delete-item/${dishID}`)
        fetchDishes() // Refetch dishes to get the updated list
        setSnackbar({
          open: true,
          message: 'Dish deleted successfully',
          severity: 'info',
        })
      } catch (error) {
        handleError('Delete dish error:', error)
      }
    }
  }

  const handleError = (message, error) => {
    console.error(message, error)
    const errorMessage =
      error.response?.data?.error || 'An unexpected error occurred'
    setSnackbar({ open: true, message: errorMessage, severity: 'error' })
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setEditingId(null)
    setForm({ dishName: '', dishCalories: '', dishPrice: '' })
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setSnackbar({ open: false, message: '', severity: 'success' })
  }

  return (
  <Container style={{ paddingTop: '100px' }}> {/* Padding applied here */}
    <div>
      <h1 style={{ color: 'black' }}>Menu Management</h1>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => setOpenDialog(true)}
      >
        Add New Dish
      </Button>
      <List>
        {dishes.map((dish) => (
          <ListItem
            key={dish.dish_id}
            secondaryAction={
              <>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={() => handleEditClick(dish)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDeleteClick(dish.dish_id)}
                >
                  <DeleteIcon />
                </IconButton>
              </>
            }
          >
            <ListItemText
              primary={<span style={{ color: 'black' }}>{dish.dish_name}</span>}
              secondary={`Calories: ${dish.dish_calories}, Price: ${dish.dish_price}`}
            />
          </ListItem>
        ))}
      </List>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{editingID ? 'Edit Dish' : 'Add New Dish'}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleFormSubmit}>
            <TextField
              name="dishName"
              value={form.dishName}
              onChange={handleInputChange}
              label="Dish Name"
              fullWidth
              variant="outlined"
              required
            />
            <TextField
              name="dishCalories"
              value={form.dishCalories}
              onChange={handleInputChange}
              label="Calories"
              fullWidth
              variant="outlined"
              required
              type="number"
            />
            <TextField
              name="dishPrice"
              value={form.dishPrice}
              onChange={handleInputChange}
              label="Price"
              fullWidth
              variant="outlined"
              required
            />
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button type="submit" color="primary">
                {editingID ? 'Update' : 'Add'} Dish
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  </Container>
);
          };
export default MenuManagementPage;