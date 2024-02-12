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
  try {
    console.log('Attempting to connect to database...');
    const client = await pool.connect(); //Establish connection to db
    console.log('Connection successful');
    const query = 'SELECT * FROM menu';
    const result = await client.query(query);
    client.release(); //Release client back into pool
    console.log('Menu item retrieval successful');
    return result.rows;
  } catch (error) {
    throw new Error(`Error fetching menu items: ${error.message}`);
  }
};

/**
 * function to filters items from the menu table in the db based on allergens.
 * 
 * @returns menu items in db
 */
async function filterOutAllergens(allergens) {
  try {
    console.log('Attempting to connect to database...');
    const client = await pool.connect(); //Establish connection to db
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
    client.release(); //Release client back into pool
    console.log('Menu item filtering successful');
    return result.rows;
  } catch (error) {
    throw new Error(`Error filtering out allergens: ${error.message}`);
  }
};

module.exports = { getAllMenuItems, filterOutAllergens }; //Export controller for use in router