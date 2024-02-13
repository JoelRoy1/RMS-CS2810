const db = require('../db');
const pool = db.pool;

async function cancelOrder(req, res) {
  const orderId = req.params.orderId;
  try {
    console.log('Attempting to cancel order...');
    const client = await pool.connect();
    console.log('Connected to the database');
    const query = {
      text: 'DELETE FROM orders WHERE order_id = $1',
      values: [orderId],
    };
    await client.query(query);
    client.release();
    console.log('Order cancelled successfully');
    res.status(200).json({ message: 'Order cancelled successfully' });
  } catch (error) {
    console.error(`Error cancelling order: ${error.message}`);
    res.status(500).json({ error: 'Failed to cancel order' });
  }
}

module.exports = { cancelOrder };
