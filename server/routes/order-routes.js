/**
 * @file Manges all order routes.
 * @version 1.0.0
 */

const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order-controllers');

/**
 * delete order route
 */
router.delete('/:orderId', async (req, res) => {
  const orderId = req.params.orderId;
  try {
    await orderController.cancelOrder(orderId);
    res.status(200).json({ message: 'Order canceled successfully' });
  } catch (error) {
    console.error(`Error canceling order: ${error.message}`);
    res.status(500).json({ error: 'Failed to cancel order' });
  }
});

router.post('/placeOrder', async (req, res) => {
  const { customerId, staffId, orderStatus, orderItems, orderDetails } = req.body;
  try {
    await orderController.placeOrder(customerId, staffId, orderStatus, orderDetails);
    res.status(200).json({ message: 'Order placed successfully' });
  } catch (error) {
    console.error(`Error placing order: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
