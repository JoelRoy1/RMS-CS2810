const { Client } = require('pg');
const bcrypt = require('bcrypt');
const { dbConfig } = require('../db')

async function signIn(username, password) {
  try {
    const client = new Client(dbConfig);
    await client.connect();

    const result = await client.query('SELECT * FROM staff WHERE username = $1', [username]);
    const staff = result.rows[0];

    if (!staff) {
      return { error: 'Invalid username or password' };
    }

    const passwordMatch = await bcrypt.compare(password, staff.password);

    if (passwordMatch) {
      return { message: 'Login successful' };
    } else {
      return { error: 'Invalid username or password' };
    }

    await client.end();
  } catch (error) {
    console.error('Error during sign-in:', error);
    return { error: 'Internal Server Error' };
  }
}

async function createAccount(username, password) {
  try {
    const client = new Client(dbConfig);
    await client.connect();

    // Check if the username already exists
    const existingStaff = await client.query('SELECT * FROM staff WHERE username = $1', [username]);

    if (existingStaff.rows.length > 0) {
      await client.end(); // Close the client connection
      return { error: 'Username already exists' };
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new account into the database
    await client.query('INSERT INTO staff (username, password) VALUES ($1, $2)', [username, hashedPassword]);

    await client.end(); // Close the client connection

    return { message: 'Account created successfully' };
  } catch (error) {
    console.error('Error during account creation:', error);
    return { error: 'Internal Server Error LMAOOOOOOOO' };
  }
}

module.exports = { signIn, createAccount };
