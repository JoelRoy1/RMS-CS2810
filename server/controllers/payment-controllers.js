/**
 * @file Manages all payment functionality.
 * @version 1.2.2
 */
const db = require('../db');
const pool = db.pool;
const stripe = require('stripe')('sk_test_51OrP3NFH91vMUm0iDEYKaWF0bnVLTYPXHF9rFSeHo8b9zGDgXc1ceXRBHpdKUg4CUjLAJvIDzIdCvSU9kEmtvdMX00kBFQLZmp');

/**
 * Function to add a new payment to the database.
 * @param {number} amount The amount to be paid.
 * @param {number} table_number The table number the payment is for.
 * @param {string} card_number The card number used for the payment.
 * @param {string} card_holder The card holder's name.
 * @param {string} card_expiry The card's expiry date.
 * @param {string} card_cvc The card's security code.
 */
async function addPayment(amount, table_number, card_number, card_holder, card_expiry, card_cvc) { // Function to add a new payment to the database
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
            client = await pool.connect();
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
/**
 * Function to receive payment information from the database.
 * @param {number} table_number The table number to retrieve payment information for.
 * @throws {Error} Throws an error if payment information is not retrievable.
 * @returns {json} Information about the payment.
 */
async function getPayment(table_number) { // Function to retrieve payment information from the database
    let client;
    try {
        client = await pool.connect();
        const query = `SELECT payment_id, payment_time, payment_amount, table_number, card_holder, card_ending, '***' as card_cvc, card_expiry 
                      FROM payments WHERE table_number = $1`;
        const values = [table_number];
        const result = await client.query(query, values);
        return result.rows;
    } catch (error) {
        console.error('Error retrieving payment by table ID', error);
        throw error; // Re-throw the error to handle it outside of this function
    } finally {
        if (client) {
            console.log('client released');
            client.release();
        }
    }
}

module.exports = { addPayment, getPayment };