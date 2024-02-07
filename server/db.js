/**
 * Creates a Connection Pool to the Postgres database,
 * which we can use to make queries.
 * @constant {Pool} DB_POOL 
 */
const { Pool } = require('pg');

const pool = new Pool({
  host: 'postgresdb',
  port: 5432,
  user: 'root',
  password: 'pass',
  database: "rms_db"
})

//function to retrieve all the items from the menu table in the db
async function getAllMenuItems() {
  try {
    const query = 'SELECT * FROM menu';
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    throw new Error(`Error fetching menu items: ${error.message}`);
  }
}

module.exports = { pool, getAllMenuItems };
