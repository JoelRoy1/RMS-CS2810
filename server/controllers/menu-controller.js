/**
 * @file Manages all interactions with the Menu table.
 * @version 1.1.0
 */
const db = require('../db');
const pool = db.pool;

/**
 * function to retrieve all the items from the menu table in the db.
 * 
 * @returns menu items in db
 */
async function getAllMenuItems() {
  let client;
  try {
    console.log('Attempting to connect to database...');
    const client = await pool.connect(); //Establish connection to db
    console.log('Connection successful');
    const query = 'SELECT * FROM menu';
    const result = await client.query(query);
    console.log('Menu item retrieval successful');
    return result.rows;
  } catch (error) {
    throw new Error(`Error fetching menu items: ${error.message}`);
  } finally {
    if (client) {
      client.release(); //Release client back into pool
    }
  }
};

/**
 * function to filters items from the menu table in the db based on allergens.
 * 
 * @returns menu items in db
 */
async function filterOutAllergens(allergens) {
  console.log('Attempting to connect to database...');
  const client = await pool.connect(); //Establish connection to db
  try {
    console.log('Connection successful');
    const query = `
      SELECT * FROM menu 
      WHERE dish_id NOT IN (
        SELECT da.dish_id 
        FROM dish_allergens da 
        JOIN allergens a ON da.allergen_id = a.allergen_id 
        WHERE a.allergen_name = ANY($1)
      )`;
    const result = await client.query(query, [allergens.split(',').map(allergen => allergen.trim())]);
    console.log('Menu item filtering successful');
    return result.rows;
  } catch (error) {
    throw new Error(`Error filtering out allergens: ${error.message}`);
  } finally {
    if (client) {
      client.release(); //Release client back into pool
    }
  }
};

/**
 * function to filter items from the menu table based on if calories are lower
 * than input value.
 * @param {int} calories calorie limit 
 * @returns menu items below the calorie limit
 */
async function filterCalories(calories) {
  const client = await pool.connect(); //Establish connection to db
  try {
    console.log('connection successful');
    const query = `SELECT * FROM menu WHERE dish_calories <= $1`;
    const result = await client.query(query, calories);
    console.log('calorie filtering successful');
    return result.rows;
  } catch (error) {
    console.error('error filtering calories: ', $(error.message));
  } finally {
    client.release();
  }
};

/**
 * function to add items to the menu table.
 * @param {string} dishName  the name of the dish to add
 * @param {int} dishCalories the number of calories in the dish
 * @param {float} dishPrice the price of the dish
 */
async function createMenuItem(dishName, dishCalories, dishPrice) { 
  let client;
  try {
    console.log('Attempting to create item...')
    const client = await pool.connect(); // Establish connection to db
    const query = `
      INSERT INTO menu (dish_name, dish_calories, dish_price)
      VALUES ($1, $2, $3)
      RETURNING dish_id;
    `;
    const values = [dishName, dishCalories, dishPrice];
    const result = await client.query(query, values);
    console.log('New item added with ID:', result.rows[0].dish_id);
  } catch (error) {
    console.error('Error adding new item:', $(error.message));
  } finally {
    client.release();
  }
};

/**
 * function to delete menu items from the db based on dish ID.
 * @param {int} dishID the ID of menu item to delete
 */
async function deleteMenuItem(dishID) {
  let client;
  try {
    console.log('Attempting to delete item...');
    const client = await pool.connect();  // Establish connection to db
    const query = 'DELETE FROM menu WHERE dish_id = $1 RETURNING *;';
    const values = [dishID];
    const result = await client.query(query, values);
    console.log('item deleted: ', result.rows[0]);
  } catch (error) {
    console.error(`Error deleting item: ${error.message}`);
  } finally {
    client.release();
  }
}

module.exports = { 
  getAllMenuItems, 
  filterOutAllergens, 
  filterCalories,
  createMenuItem, 
  deleteMenuItem 
}; //Export controller for use in router