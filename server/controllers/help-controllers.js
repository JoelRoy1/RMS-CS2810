/**
 * @file Manages all help functionality.
 * @version 1.2.0
 */
const db = require('../db');
const pool = db.pool;

/**
 * Submits a help request for a customer to the database.
 * @async
 * @param {number} customerId - The ID of the customer needing help.
 * @throws {Error} Throws an error if there's an issue submitting the help request.
 * @returns {Promise<void>} A Promise that resolves when the help request is successfully submitted.
 */
async function requestHelp(customerId) { 
  let client;
  try {
    console.log('Submitting help request...');
    client = await pool.connect();
    console.log('Connected to the database');
    await client.query('INSERT INTO needs_help (customer_id) VALUES ($1)', [customerId]);
    client.release();
    console.log('Help request submitted successfully');
  } catch (error) {
    throw new Error(`Error submitting help request: ${error.message}`);
  } finally {
    if (client) {
      console.log('client released');
      client.release();
    }
  }
};

/**
 * Retrieves a list of customers needing help from the database.
 * @async
 * @throws {Error} Throws an error if there's an issue retrieving the customers needing help.
 * @returns List of all customers who need help
 */
async function getCustomersNeedingHelp() {
  let client;
  try {
    console.log('Retrieving customers needing help...');
    client = await pool.connect();
    console.log('Connected to the database');
    const result = await client.query('SELECT * FROM needs_help');
    client.release();
    console.log('Customers retrieved successfully');
    return result.rows;
  } catch (error) {
    throw new Error(`Error retrieving customers needing help: ${error.message}`);
  } finally {
    if (client) {
      console.log('client released');
      client.release();
    }
  }
};

/**
 * Resolves a help request for a customer in the database.
 * @async
 * @param {number} helpId - The ID of the help request to be resolved.
 * @throws {Error} Throws an error if there's an issue resolving the help request.
 * @returns The help request that has now been resolved.
 */
async function resolveHelpRequest(helpId) {
  let client;
  try {
    console.log('Attempting to resolve the help request');
    client = await pool.connect();
    console.log('Connected to the database');
    const query = 'UPDATE needs_help SET resolved = true WHERE help_id = $1 RETURNING *';
    const result = await client.query(query, [helpId]);
    console.log('Resolved help request successfully');
    return result.rows;
  } catch (error) {
    throw new Error(`Error resolving customer needing help: ${error.message}`);
  } finally {
    if (client) {
      console.log('client released');
      client.release();
    }
  }
};

module.exports = { requestHelp,getCustomersNeedingHelp, resolveHelpRequest };
