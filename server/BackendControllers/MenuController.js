const db = require('../db');

async function getMenuItems(req, res) {
  try {
    const menuItems = await db.getAllMenuItems();
    res.json(menuItems);
  } catch (error) {
    console.error(`Error fetching menu items: ${error.message}`);
    res.status(500).json({ error: 'Failed to fetch menu items' });
  }
}

module.exports = { getMenuItems };
