/**
 * @file Manages all customer functionality.
 * @version 1.0.0
 */
const db = require('../db');
const pool = db.pool;
const tableController = require('../controllers/table-controllers');

async function addCustomer(customerName, customerAllergies) {
    let client;
    try {
        console.log('Connecting to database');
        const client = await pool.connect();
        console.log('Connected to the database');
        const result = await client.query('INSERT INTO customer (customer_name, customer_allergies) VALUES ($1, $2) RETURNING customer_id', [customerName, customerAllergies]);
        const customerId = result.rows[0].customer_id;
        console.log(customerId);
        console.log('Customer added to table');
        return tableController.assignToTable(customerId);
      } catch (error) {
        throw new Error(`Error submitting help request: ${error.message}`);
      } finally {
        if (client) {
          client.release();
        }
      }
};

module.exports = {addCustomer}