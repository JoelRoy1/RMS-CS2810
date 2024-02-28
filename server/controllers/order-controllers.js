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

async function placeOrder(customerId, staffId, orderStatus, orderAllergies, items) {
  let client;
  try {
    client = await pool.connect();
    // Start a transaction
    await client.query('BEGIN');
    let totalPrice = 0;
    const values = [];
    for (const item of items) {
      // Fetch dish price from the menu table
      const menuQuery = 'SELECT dish_price FROM menu WHERE dish_id = $1';
      const menuResult = await client.query(menuQuery, [item.dishId]);
      const dishPrice = menuResult.rows[0].dish_price;
      // Calculate total price for this item
      const itemTotalPrice = dishPrice * item.quantity;
      totalPrice += itemTotalPrice;
      // Add item data to the values array
      values.push([customerId, staffId, orderStatus, orderAllergies, item.dishId, item.quantity, dishPrice]);
      // Log the item and its total price
      console.log(`Item ${item.dishId}: Price: ${dishPrice}, Quantity: ${item.quantity}, Total Price: ${itemTotalPrice}`);
    }
    // Construct the SQL query to insert all items in a single transaction
    const orderQuery = `
      INSERT INTO orders (customer_id, staff_id, order_status, order_allergies, quantity, price)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    // Execute the query
    const orderResult = await client.query(orderQuery, [customerId, staffId, orderStatus, orderAllergies, items.length, totalPrice]);
    // Commit the transaction
    await client.query('COMMIT');
    // Log the entire order with total price
    console.log('New order:', orderResult.rows[0], 'Total Price:', totalPrice);
  } catch (error) {
    // Rollback the transaction if an error occurs
    await client.query('ROLLBACK');
    console.error('Error adding new order:', error);
    throw error; // Rethrow the error to be caught by the caller
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
