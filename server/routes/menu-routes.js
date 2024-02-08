/**
 * @file Manges all menu routes.
 * @version 1.0.0
 */
const express = require('express');
const router = express.Router();
const controller = require('../controllers/menu-controller');

/**
 * get menu items route
 */
router.get('/', async (req, res) => {
    try {
      const menu = await controller.getAllMenuItems();
      res.json(menu);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      res.status(500).json({ error: 'Failed to retrieve menu items' });
    }
});

module.exports = router;
