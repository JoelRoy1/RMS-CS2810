/**
 * @file Manages all payment functionality.
 * @version 1.0.0
 */
const db = require('../db');
const pool = db.pool;
const stripe = require('stripe')('sk_test_51OrP3NFH91vMUm0iDEYKaWF0bnVLTYPXHF9rFSeHo8b9zGDgXc1ceXRBHpdKUg4CUjLAJvIDzIdCvSU9kEmtvdMX00kBFQLZmp');

async function addPayment(amount, table_number, card_number, card_holder, card_expiry, card_cvc) {
    let client;
    try {
        const stripePaymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'gdp',
            payment_method_data: {
                type: 'card',
                card: {
                    number: card_number,
                    exp_month: card_expiry.split('/')[0],
                    exp_year: card_expiry.split('/')[1],
                    cvc: card_cvc,
                    name: card_holder
                }
            },
            confirm: true
        })

        if (stripePaymentIntent === 'succeeded') {
            const client = await pool.connect();
            const card_ending = card_number.split(-4); //store only last 4 digits of card number
            const timestamp = new Date();
            const query = `INSERT INTO payments (payment_time, payment_amount, table_number, card_holder, card_ending, card_expiry)
            VALUES ($1, $2, $3, $4, $5, $6)`;
            const values = [timestamp, amount, table_number, card_holder, card_ending, card_expiry];
            await client.query(query, values);
            return 'Payment made successully';
        }
    } catch (error) {
        console.error('Error processing payment', error);
        res.status(500).send('Internal Server Error');
    } finally {
        if (client) {
            client.release();
        }
    }
}

module.exports = { addPayment };