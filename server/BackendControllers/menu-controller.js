const db = require('../db');
const pool = db.pool;

//function to retrieve all the items from the menu table in the db
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
}

module.exports = { getAllMenuItems }; //Export controller for use in router
