/**
 * @file Manages all interactions with the orders table.
 * @version 1.0.0
 */

/**
 * The cancelOrder function deletes the corresponding order when a csutomer wishes to cancel.
 * 
 * @param {int} orderId the orderId of the order to delete
 * @returns the matching data from the database
 */
const db = require('../db');
const pool = db.pool;

async function cancelOrder(orderId) {
  try {
    console.log('Attempting to cancel order...');
    const client = await pool.connect();
    console.log('Connected to the database');
    await client.query('DELETE FROM orders WHERE order_id = $1', [orderId]);
    client.release();
    console.log('Order cancelled successfully');
  } catch (error) {
    console.error(`Error cancelling order: ${error.message}`);
  }
}

module.exports = { cancelOrder };
