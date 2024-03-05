/**
 * @file Manges all payment routes.
 * @version 1.0.0
 */
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment-controllers'); // Import the module containing table functionality

router.post('/', async (req, res) => {
    try {
        const { amount, table_number, card_number, card_holder, card_expiry, card_cvc } = req.body;
        await tableController.assignToTable(amount, table_number, card_number, card_holder, card_expiry, card_cvc);
        res.status(200).json({ message: 'Transaction Successful.' });
    } catch (error) {
        console.error('Payment Failed', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router