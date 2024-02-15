/**
 * @file Manges all order routes.
 * @version 1.1.0
 */

const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order-controllers');

/**
 * place an order
 */
router.post('/', async (req, res) => {
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

module.exports = router;
