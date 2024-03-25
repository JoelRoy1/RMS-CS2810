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
    client = await pool.connect(); //Establish connection to db
    console.log('Connection successful');
    
    const query = `
      SELECT m.*, array_agg(a.allergen_name) AS allergens
      FROM menu m
      LEFT JOIN dish_allergens da ON m.dish_id = da.dish_id
      LEFT JOIN allergens a ON da.allergen_id = a.allergen_id
      GROUP BY m.dish_id;
    `;
    
    const result = await client.query(query);
    console.log('Menu item retrieval successful');
    return result.rows;
  } catch (error) {
    throw new Error(`Error fetching menu items: ${error.message}`);
  } finally {
    if (client) {
      console.log('client released');
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
  client = await pool.connect(); //Establish connection to db
  try {
    console.log('Connection successful');
    const query = `
      SELECT * FROM menu 
      WHERE dish_id NOT IN (
        SELECT da.dish_id 
        FROM dish_allergens da 
        JOIN allergens a ON da.allergen_id = a.allergen_id 
        WHERE a.allergen_name = ANY($1::text[])
      )`;
    const result = await client.query(query, [allergens.split(',').map(allergen => allergen.trim())]);
    console.log('Menu item filtering successful');
    return result.rows;
  } catch (error) {
    throw new Error(`Error filtering out allergens: ${error.message}`);
  } finally {
    if (client) {
      console.log('client released');
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
  let client;
  try {
    client = await pool.connect(); //Establish connection to db
    console.log('connection successful');
    const query = `SELECT * FROM menu WHERE dish_calories <= $1`;
    const result = await client.query(query, calories);
    console.log('calorie filtering successful');
    return result.rows;
  } catch (error) {
    console.error('error filtering calories: ', $(error.message));
  } finally {
    if(client){
      console.log('client released');
      client.release();
    }
  }
};

/**
 * function to add items to the menu table.
 * @param {string} dishName  the name of the dish to add
 * @param {int} dishCalories the number of calories in the dish
 * @param {float} dishPrice the price of the dish
 */
async function createMenuItem(dishName, dishCalories, dishPrice, dishDescription) { 
  let client;
  try {
    console.log('Attempting to create item...')
    client = await pool.connect(); // Establish connection to db
    const query = `
      INSERT INTO menu (dish_name, dish_calories, dish_price, dish_description)
      VALUES ($1, $2, $3, $4)
      RETURNING dish_id;
    `;
    const values = [dishName, dishCalories, dishPrice, dishDescription];
    const result = await client.query(query, values);
    console.log('New item added with ID:', result.rows[0].dish_id);
  } catch (error) {
    console.error('Error adding new item:', (error.message));
  } finally {
    if(client){
      console.log('client released');
      client.release();
    }
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
    client = await pool.connect();  // Establish connection to db
    const query = 'DELETE FROM menu WHERE dish_id = $1 RETURNING *;';
    const values = [dishID];
    const result = await client.query(query, values);
    console.log('item deleted: ', result.rows[0]);
  } catch (error) {
    console.error(`Error deleting item: ${error.message}`);
  } finally {
    if(client){
      console.log('client released');
      client.release();
    }
  }
}


/**
 * function to update menu items in the db.
 * @param {int} dishID the ID of the dish to update
 * @param {string} dishName the new name of the dish
 * @param {int} dishCalories the new number of calories in the dish
 * @param {float} dishPrice the new price of the dish
 * @param {string} dishDescription the new description of the dish
 */
async function updateMenuItem(dishID, dishName, dishCalories, dishPrice, dishDescription) {
  let client;
  try {
    console.log('Attempting to update item...');
    client = await pool.connect(); // Establish connection to db
    const query = `
      UPDATE menu 
      SET dish_name = $1, dish_calories = $2, dish_price = $3, dish_description = $4 
      WHERE dish_id = $5;
    `;
    const values = [dishName, dishCalories, dishPrice, dishDescription, dishID];
    await client.query(query, values);
    console.log('Item updated successfully');
  } catch (error) {
    console.error(`Error updating item: ${error.message}`);
  } finally {
    if(client){
      console.log('client released');
      client.release();
    }
  }
}

/**
 * Function to retrieve image data for a specific dish ID.
 * @param {number} dishID The ID of the dish to retrieve image data for.
 * @returns {Promise<string|null>} The image data as a Base64 encoded string, or null if no image found.
 */
async function getMenuImageByDishID(dishID) {
  let client;
  try {
    client = await pool.connect();
    const query = 'SELECT image_data FROM menu_images WHERE dish_id = $1;';
    const result = await client.query(query, [dishID]);
    return result.rows.length > 0 ? result.rows[0].image_data : null;
  } catch (error) {
    throw new Error(`Error retrieving menu image: ${error.message}`);
  } finally {
    if (client) {
      client.release();
    }
  }
}

/**
 * Function to add a new menu image entry.
 * @param {number} dishID The ID of the dish the image belongs to.
 * @param {string} imageData The Base64 encoded image data.
 */
async function addMenuImage(dishID, imageData) {
  let client;
  try {
    client = await pool.connect();
    const query = 'INSERT INTO menu_images (dish_id, image_data) VALUES ($1, $2);';
    await client.query(query, [dishID, imageData]);
    console.log('New menu image added for dish ID:', dishID);
  } catch (error) {
    throw new Error(`Error adding menu image: ${error.message}`);
  } finally {
    if (client) {
      client.release();
    }
  }
}

module.exports = { 
  getAllMenuItems, filterOutAllergens, filterCalories, createMenuItem, 
  deleteMenuItem, updateMenuItem, getMenuImageByDishID, addMenuImage
}; //Export controller for use in router