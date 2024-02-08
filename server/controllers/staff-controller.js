/**
 * @file Manages all interactions with the Staff table.
 * @version 1.0.0
 */

const db = require('../db');
const pool = db.pool;

/**
 * The signIn function handles authentication when a user tries to sign in.
 * 
 * @param {string} username the username to authenticate
 * @param {int} pin the pin number to authenticate
 * @returns the matching data from the database
 */
async function signIn(username, pin) {
  try {
    console.log('Attempting to sign in...');
    const client = await pool.connect();//Establish Connection
    console.log('Connected to the database');
    const query = {
      text: 'SELECT * FROM staff WHERE staff_name = $1 AND staff_pin = $2',
      values: [username, pin],
    };
    const result = await client.query(query);
    client.release(); // Release the client back to the pool
    if (result.rows.length === 0) {
      console.log('No matching user found');
      throw new Error('Invalid username or PIN. Please check your credentials and try again.');
    }
    console.log('Sign in successful');
    return result.rows[0]; // Return the first matching staff member
  } catch (error) {
    console.error(`Error signing in: ${error.message}`);
    throw new Error(`Unable to sign in: ${error.message}`);
  }
}

/**
 * The create account function handles creating new users.
 * 
 * @param {string} username new username
 * @param {int} pin new pin number
 * @returns newly created user
 */
async function createAccount(username, pin) {
  try {
    console.log('Creating account...');
    const client = await pool.connect(); //Establish Connection
    console.log('Connected to the database');
    const query = {
      text: 'INSERT INTO staff (staff_name, staff_pin) VALUES ($1, $2) RETURNING *',
      values: [username, pin],
    };
    const result = await client.query(query);
    client.release(); // Release the client back to the pool
    console.log('Account created successfully');
    return result.rows[0]; // Return the newly created staff member
  } catch (error) {
    throw new Error(`Unable to create account: ${error.message}`);
  }
}

module.exports = { signIn, createAccount };
