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
    client = await pool.connect();
    await client.query('BEGIN');
    
    // Delete order details first
    const deleteOrderDetailsQuery = 'DELETE FROM order_details WHERE order_id = $1';
    await client.query(deleteOrderDetailsQuery, [orderId]);
    
    // Then delete the order
    const deleteOrderQuery = 'DELETE FROM orders WHERE order_id = $1';
    await client.query(deleteOrderQuery, [orderId]);
    
    await client.query('COMMIT');
    
    console.log('Order ID:', orderId, 'cancelled');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error(`Error cancelling order: ${error.message}`);
    throw error;
  } finally {
    if (client) {
      console.log('client released');
      client.release();
    }
  }
}

async function placeOrder(customerId, staffId, orderStatus, orderAllergies, items) {
  let client;
  try {
    client = await pool.connect();
    await client.query('BEGIN');
    let totalPrice = 0;
    const values = [];
    const orderSummary = [];
    const orderDetails = []; // to keep track of order details for orderSummary

    const orderQuery = `
      INSERT INTO orders (customer_id, staff_id, order_status, order_allergies)
      VALUES ($1, $2, $3, $4)
      RETURNING order_id;
    `;
    const orderResult = await client.query(orderQuery, [customerId, staffId, orderStatus, orderAllergies]);
    const orderId = orderResult.rows[0].order_id;
    
    for (const item of items) {
      const menuQuery = 'SELECT dish_name, dish_price FROM menu WHERE dish_id = $1';
      const menuResult = await client.query(menuQuery, [item.dishId]);
      const dishName = menuResult.rows[0].dish_name;
      const dishPrice = menuResult.rows[0].dish_price;
      const itemTotalPrice = dishPrice * item.quantity;
      totalPrice += itemTotalPrice;

      const orderDetailQuery = `
        INSERT INTO order_details (order_id, dish_id, quantity)
        VALUES ($1, $2, $3);
      `;
      await client.query(orderDetailQuery, [orderId, item.dishId, item.quantity]);
      
      // Log the item and its total price
      console.log(`Item ${item.dishId}: Dish Name: ${dishName}, Quantity: ${item.quantity}, Price per item: ${dishPrice}, Total Price: ${itemTotalPrice}`);
      orderSummary.push({
        dishId: item.dishId,
        dishName: dishName,
        quantity: item.quantity,
        pricePerItem: dishPrice,
        totalPrice: itemTotalPrice
      });
      orderDetails.push({ dishName, quantity: item.quantity }); // Adding order details to track in orderSummary
    }
    
    // Check if the provided staffId corresponds to a waiter
    const staffQuery = 'SELECT staff_type FROM staff WHERE staff_id = $1';
    const staffResult = await client.query(staffQuery, [staffId]);
    const staff_type = staffResult.rows[0].staff_type;
    if (staff_type !== 1) {
      throw new Error('Staff ID must correspond to a waiter.');
    }

    await client.query('COMMIT');
    orderSummary.push({totalOrderPrice:totalPrice});
    console.log('New order placed successfully');
    console.log(orderSummary);
    return { orderId, orderSummary}; // Returning order ID, summary, and details for reference
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error adding new order:', error);
    throw error;
  } finally {
    if (client) {
      console.log('client released');
      client.release();
    }
  }
}


async function orderDelivered(orderId, staffId) {
  let client;
  try {
    console.log('Attempting to deliver order...');
    client = await pool.connect();
    const query = `
      UPDATE orders
      SET order_status = 'delivered'
      WHERE order_id = $1
      AND staff_id = $2;
    `;
    const query2 = 'SELECT order_id FROM orders WHERE order_id = $1 AND staff_id = $2;';
    const getWaiter = 'SELECT staff_name FROM staff WHERE staff_id = $1;';
    const values = [orderId, staffId];
    await client.query(query, values);
    const values2 = [staffId];
    const result = await client.query(query2, values);
    const result2 = await client.query(getWaiter, values2);
    console.log('Order marked delivered successfully');
    console.log('Order:', result.rows[0].order_id, 'marked as delivered by :',  result2.rows[0].staff_name);
  } catch (error) {
    console.error('Error confirming order as delivered', error);
  } finally {
    if (client) {
      console.log('client released');
      client.release();
    }
  }
}

async function orderConfirmed(orderId, staffId) {
  let client;
  try {
    console.log('Attempting to confirm order...');
    client = await pool.connect();
    const query = `
      UPDATE orders
      SET order_status = 'confirmed'
      WHERE order_id = $1
      AND staff_id = $2;
    `;
    const query2 = 'SELECT order_id FROM orders WHERE order_id = $1 AND staff_id = $2;';
    const getWaiter = 'SELECT staff_name FROM staff WHERE staff_id = $1;';
    const values = [orderId, staffId];
    await client.query(query, values);
    const values2 = [staffId];
    const result = await client.query(query2, values);
    const result2 = await client.query(getWaiter, values2);
    console.log('Order marked confirmed successfully');
    console.log('Order:', result.rows[0].order_id, 'marked as confirmed by :',  result2.rows[0].staff_name);
  } catch (error) {
    console.error('Error confirming order as confirmed', error);
  } finally {
    if (client) {
      client.release();
    }
  }
}

async function getDeliveredOrderCount() {
  let client;
  try {
    console.log('Retrieving delivered order count...');
    client = await pool.connect();
    const query = `
      SELECT COUNT(*) AS delivered_order_count
      FROM orders
      WHERE order_status = 'delivered';
    `;
    const result = await client.query(query);
    const deliveredOrderCount = parseInt(result.rows[0].delivered_order_count);
    console.log('Delivered order count:', deliveredOrderCount);
    return deliveredOrderCount;
  } catch (error) {
    console.error('Error retrieving delivered order count:', error);
    throw error;
  } finally {
    if (client) {
      console.log('client released');
      client.release();
    }
  }
}

async function getPendingOrderCount() {
  let client;
  try {
    console.log('Retrieving pending order count...');
    client = await pool.connect();
    const query = `
      SELECT COUNT(*) AS pending_order_count
      FROM orders
      WHERE order_status <> 'delivered';
    `;
    const result = await client.query(query);
    const pendingOrderCount = parseInt(result.rows[0].pending_order_count);
    console.log('Pending order count:', pendingOrderCount);
    return pendingOrderCount;
  } catch (error) {
    console.error('Error retrieving pending order count:', error);
    throw error;
  } finally {
    if (client) {
      console.log('client released');
      client.release();
    }
  }
}

async function getAllOrders() {
  let client;
  try {
    client = await pool.connect();
    const query = `
      SELECT o.order_id, o.customer_id, c.customer_name, o.staff_id, s.staff_name, o.order_status, o.order_allergies, o.order_time,
             od.dish_id, od.quantity,
             m.dish_name, m.dish_price,
             t.table_number
      FROM orders o
      INNER JOIN order_details od ON o.order_id = od.order_id
      INNER JOIN menu m ON od.dish_id = m.dish_id
      INNER JOIN staff s ON o.staff_id = s.staff_id
      INNER JOIN tables t ON o.customer_id = t.customer_id
      INNER JOIN customer c ON o.customer_id = c.customer_id
    `;
    const result = await client.query(query);
    const orders = result.rows;

    // Grouping orders by order_id
    const groupedOrders = {};
    orders.forEach(order => {
      if (!groupedOrders[order.order_id]) {
        groupedOrders[order.order_id] = {
          order_id: order.order_id,
          customer_id: order.customer_id,
          customer_name: order.customer_name, // Include customer_name in the grouped order
          staff_id: order.staff_id,
          staff_name: order.staff_name,
          order_status: order.order_status,
          order_allergies: order.order_allergies,
          order_time: order.order_time,
          items: [],
          totalOrderPrice: 0,
          table_number: order.table_number
        };
      }
      const itemTotalPrice = order.dish_price * order.quantity;
      groupedOrders[order.order_id].items.push({
        dish_id: order.dish_id,
        dish_name: order.dish_name,
        quantity: order.quantity,
        dish_price: order.dish_price
      });
      groupedOrders[order.order_id].totalOrderPrice += itemTotalPrice;
    });

    // Converting object to array of orders
    const processedOrders = Object.values(groupedOrders);
    return processedOrders;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  } finally {
    if (client) {
      console.log('client released');
      client.release();
    }
  }
};

async function getCustomerOrder(customerId) {
  let client;
  try {
      client = await pool.connect();
      const query = `
          SELECT m.dish_name, m.dish_price, od.quantity, (m.dish_price * od.quantity) as price
          FROM order_details od
          INNER JOIN orders o ON od.order_id = o.order_id
          INNER JOIN menu m ON od.dish_id = m.dish_id
          WHERE o.customer_id = $1`;
      const values = [customerId];
      const result = await client.query(query, values);
      return result.rows;
  } catch (error) {
      console.error('Error retrieving order details by customer ID', error);
      throw error; // Re-throw the error to handle it outside of this function
  } finally {
      if (client) {
          console.log('Client released');
          client.release();
      }
  }
}

module.exports = { cancelOrder, placeOrder, orderDelivered, getDeliveredOrderCount, getPendingOrderCount, getAllOrders, getCustomerOrder };
