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
  let client;
  try {
    console.log('Attempting to cancel order...');
    const client = await pool.connect();
    console.log('Connected to the database');
    await client.query('DELETE FROM orders WHERE order_id = $1', [orderId]);
    console.log('Order cancelled successfully');
  } catch (error) {
    console.error(`Error cancelling order: ${error.message}`);
  } finally {
    if (client) {
      client.release();
    }
  }
}

async function placeOrder(customerId, staffId, orderStatus, orderDetails) {
  let client;
  try {
    const client = await pool.connect();
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
    if (client) {
      client.release();
    }
  }
}

async function orderDelivered(orderId, staffId) {
  let client;
  try {
    console.log('Attempting to deliver order...');
    const client = await pool.connect();
    const query = `
      UPDATE orders
      SET order_status = 'delivered'
      WHERE order_id = ${orderId}
      AND staff_id = ${staffId};
    `;
    const result = await client.query(query, values);
    console.log('Order marked delivered successfully');
    console.log('Order:', result.rows[0].order_id, ' marked as delivered by staff memeber:',  result.rows[0].staff_id);
  } catch (error) {
    console.error('Error confirming order as delivered', error);
  } finally {
    if (client) {
      client.release();
    }
  }
}

module.exports = { cancelOrder, placeOrder, orderDelivered };
