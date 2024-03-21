/**
 * @file Manges all payment routes.
 * @version 1.1.0
 */
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment-controllers'); // Import the module containing table functionality

router.post('/', async (req, res) => {
    try {
        const { amount, table_number, card_number, card_holder, card_expiry, card_cvc } = req.body;
        await paymentController.addPayment(amount, table_number, card_number, card_holder, card_expiry, card_cvc);
        res.status(200).json({ message: 'Transaction Successful.' });
    } catch (error) {
        console.error('Payment Failed', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/get-info', async (req, res) => {
    try {
        const {table_number} = req.body;
        const payments = await paymentController.getPayment(table_number);
        res.json(payments);
    } catch (error) {
        console.error('Error getting payments by customer ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router