const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order-controllers');

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

module.exports = router;
