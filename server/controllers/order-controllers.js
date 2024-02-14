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

async function placeOrder(customerId, staffId, orderStatus, orderDetails) {
  const client = await pool.connect();
  try {
    const orderTime = new Date().toISOString().slice(11, 19); // Get current time in 'HH:MM:SS' format
    const query = `
      INSERT INTO orders (customer_id, staff_id, order_status, order_details, order_time)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING order_id;
    `;
    const values = [customerId, staffId, orderStatus, orderDetails, orderTime];
    const result = await client.query(query, values);
    console.log('New order added with ID:', result.rows[0].order_id);
  } catch (error) {
    console.error('Error adding new order:', error);
  } finally {
    client.release();
  }
}

module.exports = { cancelOrder, placeOrder};
