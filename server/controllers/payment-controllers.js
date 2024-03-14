/**
 * @file Manages all payment functionality.
 * @version 1.2.2
 */
const db = require('../db');
const pool = db.pool;
const stripe = require('stripe')('sk_test_51OrP3NFH91vMUm0iDEYKaWF0bnVLTYPXHF9rFSeHo8b9zGDgXc1ceXRBHpdKUg4CUjLAJvIDzIdCvSU9kEmtvdMX00kBFQLZmp');

async function addPayment(amount, table_number, card_number, card_holder, card_expiry, card_cvc) {
    let client;
    try {
        if (isNaN(amount)) {
            throw new Error('Invalid amount');
        }
        const stripePaymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100,
            currency: 'gbp',
            payment_method_types: ['card'],
            payment_method: 'pm_card_visa', //mock up card for stripe api
            confirm: true,
            description: `Payment for table ${table_number} by ${card_holder}`,
            return_url: 'http://localhost:9000'
        })
        if (stripePaymentIntent.status === 'succeeded') {
            const client = await pool.connect();
            const card_ending = card_number.substring(card_number.length - 4); //store only last 4 digits of card number
            const timestamp = new Date();
            const query = `INSERT INTO payments (payment_time, payment_amount, table_number, card_holder, card_ending, card_expiry)
            VALUES ($1, $2, $3, $4, $5, $6)`;
            const values = [timestamp, amount, table_number, card_holder, card_ending, card_expiry];
            await client.query(query, values);
            return 'Payment made successfully';
        }
    } catch (error) {
        console.error('Error processing payment', error);
        res.status(500).send('Internal Server Error');
    } finally {
        if (client) {
            console.log('client released');
            client.release();
        }
    }
};

async function refundPayment(paymentId) {
    try {
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentId);

        if (paymentIntent.status === 'succeeded') {
            const refund = await stripe.refunds.create({
                payment_intent: paymentId,
            });

            console.log('Refund requested:', refund);
            return refund;
        } else {
            throw new Error('Payment intent is not in a succeeded state');
        }
    } catch (error) {
        console.error('Error requesting refund:', error);
        throw error;
    }
};

module.exports = { addPayment, refundPayment };