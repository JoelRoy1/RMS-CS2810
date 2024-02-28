/**
 * @file Manges all order routes.
 * @version 1.1.0
 */

const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order-controllers');

//fetch order
router.get('/', async (req, res) => {
  try {
    const orders = await orderController.getAllOrders();
    res.json(orders);
  } catch (error) {
    console.error(`Error fetching orders: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
});

/**
 * place an order
 */
router.post('/place-order', async (req, res) => {
  const { customerId, staffId, orderStatus, orderDetails } = req.body;
  try {
    await orderController.placeOrder(customerId, staffId, orderStatus, orderDetails);
    res.status(200).json({ message: 'Order placed successfully' });
  } catch (error) {
    console.error(`Error placing order: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
});

/**
 * delete order route
 */
router.delete('/cancel-order', async (req, res) => {
  const orderId = req.body;
  try {
    await orderController.cancelOrder(orderId);
    res.status(200).json({ message: 'Order canceled successfully' });
  } catch (error) {
    res.status(500).json({ error: `Error canceling order: ${error.message}`});
  }
});

/**
 * mark an order as delivered
 */
router.post('/mark-delivered', async (req, res) => {
  const { orderId, staffId } = req.body;
  try {
    await orderController.placeOrder(orderId, staffId);
    res.status(200).json({ message: 'Order marked devlivered successfully' });
  } catch (error) {
    console.error(`Error confirming delivery: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
});
//fetch all orders
router.get('/fetch-all',  async (req, res) => {
  try {
    const orders = await orderController.getAllOrders();
    res.json(orders);
  } catch (error) {
    console.error(`Error fetching orders: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;