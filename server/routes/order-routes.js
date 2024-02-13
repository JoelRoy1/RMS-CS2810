const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order-controller');

router.delete('/:orderId', orderController.cancelOrder);

module.exports = router;
