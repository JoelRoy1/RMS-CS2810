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
    const query = 'DELETE FROM orders WHERE order_id = $1;';
    const value = [orderId];
    console.log('Connected to the database');
    await client.query(query, value);
    console.log('Order ID: ',orderId, 'cancelled');
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
    const query = `
      INSERT INTO orders (customer_id, staff_id, order_status, order_details)
      VALUES ($1, $2, $3, $4)
      RETURNING order_id;
    `;
    const values = [customerId, staffId, orderStatus, orderDetails];
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
      WHERE order_id = $1
      AND staff_id = $2;
    `;
    const query2 = 'SELECT * FROM orders WHERE order_id = $1 AND staff_id = $2;';
    const values = [orderId, staffId];
    const result = await client.query(query, values);
    const result2 = await client.query(query2, values);
    console.log('Order marked delivered successfully');
    console.log('Order:', result2.rows[0].order_id, 'marked as delivered by staff memeber:',  result2.rows[0].staff_id);
  } catch (error) {
    console.error('Error confirming order as delivered', error);
  } finally {
    if (client) {
      client.release();
    }
  }
}

module.exports = { cancelOrder, placeOrder, orderDelivered };
