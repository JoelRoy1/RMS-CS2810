const express = require('express');
const router = express.Router();
const controller = require('../BackendControllers/MenuController');

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
