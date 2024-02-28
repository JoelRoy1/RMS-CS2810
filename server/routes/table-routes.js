/**
 * @file Manges all table routes.
 * @version 1.0.0
 */
const express = require('express');
const router = express.Router();
const tableController = require('../controllers/table-controller'); // Import the module containing table functionality

//GET route to see all tables
router.get('/', async (req, res) => {
    try {
        await tableController.showTables(); // Call the seeTables
        res.status(200).json({ message: 'Tables retrieved successfully.' });
    } catch (error) {
        console.error('Error getting tables:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST route to assign a customer to a table and assign staff
router.post('/assign', async (req, res) => {
    try {
        const { customerId } = req.body;
        await tableController.assignToTable(customerId); // Call the assignToTable function with customerId
        res.status(200).json({ message: 'Customer assigned to a table successfully.' });
    } catch (error) {
        console.error('Error assigning customer and staff:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router
