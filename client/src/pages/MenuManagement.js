/**
 * React component to handle management of the menu.
 * @module client/menu
 */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
} from '@mui/material';
import Alert from '@mui/material/Alert';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

/**
 * React component for managing menu items.
 * Allows adding, editing, and deleting dishes from the menu.
 * Utilizes Material-UI components for UI elements.
 * Uses Axios for making HTTP requests.
 *
 * @component
 * @returns {JSX.Element} MenuManagementPage component
 */
const MenuManagementPage = () => {
  /**
   * State hook to manage the list of dishes.
   * @type {Array<Object>}
   */
  const [dishes, setDishes] = useState([]);

  /**
   * State hook to manage the form data for adding/editing dishes.
   * @type {Array<Object>} 
   */
  const [form, setForm] = useState({
    dishName: '',
    dishCalories: '',
    dishPrice: '',
    dishDescription: ''
  });

  /**
   * State hook to manage the ID of the dish being edited.
   * @type {Array<Object>} 
   */
  const [editingID, setEditingId] = useState(null);

  /**
   * State hook to manage the visibility of the dialog for adding/editing dishes.
   * @type {Array<Object>} 
   */
  const [openDialog, setOpenDialog] = useState(false);

  /**
   * State hook to manage the snackbar for displaying notifications.
   * @type {Array<Object>} 
   */
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  /**
   * Effect hook to fetch dishes from the server on component mount.
   */
  useEffect(() => {
    fetchDishes();
  }, []);

  /**
   * Fetches dishes from the server.
   */
  const fetchDishes = () => {
    axios
      .get('http://localhost:9000/menu')
      .then((response) => setDishes(response.data))
      .catch((error) => handleError('Fetch dishes error:', error));
  };

  /**
   * Handles input change in the form fields.
   * @param {Event} event - The input change event.
   */
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  /**
   * Handles form submission for adding/editing dishes.
   * @param {Event} event - The form submit event.
   */
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      dishName: form.dishName,
      dishCalories: form.dishCalories,
      dishPrice: form.dishPrice,
      dishDescription: form.dishDescription
    };

    try {
      const endpoint = editingID ? `/menu/${editingID}` : '/menu/create-item';
      const method = editingID ? 'put' : 'post';

      const response = await axios[method](
        `http://localhost:9000${endpoint}`,
        payload
      );
      handleCloseDialog();
      fetchDishes(); // Refetch dishes to get the updated list
      setSnackbar({
        open: true,
        message: 'Dish processed successfully',
        severity: 'success',
      });
    } catch (error) {
      handleError('Submit dish error:', error);
    }
  };

  /**
   * Handles click event for editing a dish.
   * @param {Object} dish - The dish object to edit.
   */
  const handleEditClick = (dish) => {
    setForm({
      dishName: dish.dish_name,
      dishCalories: dish.dish_calories.toString(),
      dishPrice: dish.dish_price.toString(),
      dishDescription: dish.dish_description
    });
    setEditingId(dish.dish_id);
    setOpenDialog(true);
  };

  /**
   * Handles click event for deleting a dish.
   * @param {number} dishID - The ID of the dish to delete.
   */
  const handleDeleteClick = async (dishID) => {
    if (window.confirm('Are you sure you want to delete this dish?')) {
      try {
        await axios.delete(`http://localhost:9000/menu/delete-item/${dishID}`);
        fetchDishes(); // Refetch dishes to get the updated list
        setSnackbar({
          open: true,
          message: 'Dish deleted successfully',
          severity: 'info',
        });
      } catch (error) {
        handleError('Delete dish error:', error);
      }
    }
  };

  /**
   * Handles errors occurred during HTTP requests.
   * @param {string} message - The error message.
   * @param {Error} error - The error object.
   */
  const handleError = (message, error) => {
    console.error(message, error);
    const errorMessage =
      error.response?.data?.error || 'An unexpected error occurred';
    setSnackbar({ open: true, message: errorMessage, severity: 'error' });
  };

  /**
   * Handles closing of the dialog for adding/editing dishes.
   */
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingId(null);
    setForm({ dishName: '', dishCalories: '', dishPrice: '', dishDescription: '' });
  };

  /**
   * Handles closing of the snackbar for notifications.
   * @param {Event} event - The closing event.
   * @param {string} reason - The reason for closing.
   */
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ open: false, message: '', severity: 'success' });
  };

  return (
    <Container style={{ paddingTop: '100px' }}>
      <div style={{ color: '#333', maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ color: '#333', textAlign: 'center', marginBottom: '30px' }}>Menu Management</h1>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setOpenDialog(true)}
          style={{ marginBottom: '20px', color: '#333' }}
        >
          Add New Dish
        </Button>
        <List>
          {dishes.map((dish) => (
            <ListItem
              key={dish.dish_id}
              style={{ backgroundColor: '#fff', marginBottom: '10px' }}
              secondaryAction={
                <>
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={() => handleEditClick(dish)}
                  >
                    <EditIcon style={{ color: '#333' }} />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteClick(dish.dish_id)}
                  >
                    <DeleteIcon style={{ color: '#333' }} />
                  </IconButton>
                </>
              }
            >
              <ListItemText
                primary={<span style={{ color: '#333' }}>{dish.dish_name}</span>}
                secondary={`Calories: ${dish.dish_calories}, Price: ${dish.dish_price}, Description: ${dish.dish_description} `}
              />
            </ListItem>
          ))}
        </List>

        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle style={{ color: '#333' }}>{editingID ? 'Edit Dish' : 'Add New Dish'}</DialogTitle>
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
                style={{ marginBottom: '20px' }}
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
                style={{ marginBottom: '20px' }}
              />
              <TextField
                name="dishPrice"
                value={form.dishPrice}
                onChange={handleInputChange}
                label="Price"
                fullWidth
                variant="outlined"
                required
                style={{ marginBottom: '20px' }}
              />
              <TextField
                name="dishDescription"
                value={form.dishDescription}
                onChange={handleInputChange}
                label="Description"
                fullWidth
                variant="outlined"
                required
                style={{ marginBottom: '20px' }}
              />
              <DialogActions>
                <Button onClick={handleCloseDialog} style={{ color: '#333' }}>Cancel</Button>
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
