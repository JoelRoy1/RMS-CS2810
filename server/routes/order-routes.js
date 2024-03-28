/**
 * @file order-routes.js manages all order routes.
 * @module server/order
 * @version 1.5.0
 */

const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order-controllers');


/**
 * place an order
 */
router.post('/', async (req, res) => {
  const { customerId, staffId, orderStatus, orderAllergies, items } = req.body;
  try {
    const orderSummary = await orderController.placeOrder(customerId, staffId, orderStatus, orderAllergies, items);
    // Send the order summary as JSON response
    res.status(200).json(orderSummary);
  } catch (error) {
    console.error(`Error placing order: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
});


/**
 * delete order route
 */
router.delete('/cancel-order/:orderId', async (req, res) => {
  const orderId = req.params.orderId;
  try {
    await orderController.cancelOrder(orderId);
    res.status(200).json({ message: 'Order canceled successfully' });
  } catch (error) {
    res.status(500).json({ error: `Error canceling order: ${error.message}`});
  }
});


/**
 * mark an order with new status
 */
router.post('/mark-status', async (req, res) => {
  const { orderStatus, orderId, staffId } = req.body;
  try {
    await orderController.changeStatus(orderStatus, orderId, staffId);
    res.status(200).json({ message: 'Order status changed successfully' });
  } catch (error) {
    console.error(`Error changing status: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Retrieves the count of orders marked as delivered.
 */
router.get('/get-delivered', async (req, res) => {
  try {
    const deliveredOrderCount = await orderController.getDeliveredOrderCount();
    res.status(200).json({ deliveredOrderCount });
  } catch (error) {
    console.error(`Error retrieving delivered order count: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Retrieves the count of pending orders.
 */
router.get('/get-pending-orders', async (req, res) => {
  try {
    const pendingOrderCount = await orderController.getPendingOrderCount();
    res.status(200).json({ pendingOrderCount });
  } catch (error) {
    console.error(`Error retrieving pending order count: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Retrieves an array of all orders.
 */
router.get('/fetch-all',  async (req, res) => { // Get all orders
  try {
    const orders = await orderController.getAllOrders();
    res.json(orders);
  } catch (error) {
    console.error(`Error fetching orders: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
});

router.get('/customer-order', async (req, res) => { // Get order details by customer ID
  try {
      const { customer_id } = req.query;
      const orderDetails = await orderController.getCustomerOrder(customer_id);
      res.json(orderDetails);
  } catch (error) {
      console.error('Error retrieving order details by customer ID:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

/**
 * Retrieves the status of an order by customer ID.
 */
router.get('/status', async (req, res) => { // Get order status by customer ID
  try {
      const { customer_id } = req.query;
      const orderDetails = await orderController.getOrderStatus(customer_id);
      res.json(orderDetails);
  } catch (error) {
      console.error('Error retrieving order status by customer ID:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;