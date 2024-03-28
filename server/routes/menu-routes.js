/**
 * @file menu-routes.js manages all menu routes.
 * @module server/menu
 * @version 1.1.1
 */
const express = require('express')
const router = express.Router()
const controller = require('../controllers/menu-controller')
/**
 * get menu items route
 */
router.get('/', async (req, res) => {
  try {
    const menu = await controller.getAllMenuItems()
    res.json(menu)
  } catch (error) {
    console.error(`Error: ${error.message}`)
    res.status(500).json({ error: 'failed to retrieve menu items' })
  }
})

/**
 * filter menu items based on allergen route
 */
router.get('/filter-allergens', async (req, res) => {
  const { allergens } = req.query
  try {
    const menu = await controller.filterOutAllergens(allergens)
    res.json(menu)
  } catch (error) {
    res.status(500).json({ error: `Error: ${error.message}` })
  }
})

/**
 * create menu items
 */
router.post(`/create-item`, async (req, res) => {
  const { dishName, dishCalories, dishPrice, dishDescription } = req.body

  try {
    const menu = await controller.createMenuItem(
      dishName,
      dishCalories,
      dishPrice,
      dishDescription
    )
    res.status(200).json({ message: 'Dish created succesfully' })
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error creating dish: ${error.message} ${dishName}` })
  }
})

/**
 * delete menu items
 */
router.delete(`/:itemID`, async (req, res) => {
  const dishID = req.params.itemID
  try {
    await controller.deleteMenuItem(dishID)
    res.status(200).json({ message: 'Dish deleted succesfully' })
  } catch (error) {
    res.status(500).json({ error: `Error deleting dish: ${error.message}` })
  }
})

/**
 * filter menu items based on calories route
 */
router.get('/filter-calories', async (req, res) => {
  const { calories } = req.body
  try {
    const menu = await controller.filterCalories(calories)
    res.json(menu)
  } catch (error) {
    res.status(500).json({ error: `Error: ${error.message}` })
  }
})

/**
 * Update menu item route
 */
router.put('/:itemID', async (req, res) => {
  const dishID = req.params.itemID
  const { dishName, dishCalories, dishPrice, dishDescription } = req.body
  try {
    await controller.updateMenuItem(
      dishID,
      dishName,
      dishCalories,
      dishPrice,
      dishDescription
    )
    res.status(200).json({ message: 'Dish updated successfully' })
  } catch (error) {
    res.status(500).json({ error: `Error updating dish: ${error.message}` })
  }
})

module.exports = router
