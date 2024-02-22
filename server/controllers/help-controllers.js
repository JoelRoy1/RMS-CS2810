const db = require('../db');
const pool = db.pool;

async function requestHelp(customerId) {
  try {
    console.log('Submitting help request...');
    const client = await pool.connect();
    console.log('Connected to the database');
    await client.query('INSERT INTO needs_help (customer_id) VALUES ($1)', [customerId]);
    client.release();
    console.log('Help request submitted successfully');
  } catch (error) {
    throw new Error(`Error submitting help request: ${error.message}`);
  }
}

async function getCustomersNeedingHelp() {
    try {
      console.log('Retrieving customers needing help...');
      const client = await pool.connect();
      console.log('Connected to the database');
      const result = await client.query('SELECT * FROM needs_help');
      client.release();
      console.log('Customers retrieved successfully');
      return result.rows;
    } catch (error) {
      throw new Error(`Error retrieving customers needing help: ${error.message}`);
    }
  }

module.exports = { requestHelp,getCustomersNeedingHelp };
