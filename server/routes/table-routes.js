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
        const tables = await tableController.showTables(); // Call the seeTables
        res.status(200).json({tables});
    } catch (error) {
        console.error('Error getting tables:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//GET route to see all tables for a specific staff member
router.get('/view-assigned', async (req, res) => {
    try {
        const { staffId } = req.body;
        await tableController.showAssigned(staffId) //Call the seeAssigned function with staffId
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
        const tables = await tableController.assignToTable(customerId); // Call the assignToTable function with customerId
        res.status(200).json({tables});
    } catch (error) {
        console.error('Error assigning customer to a table:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Post route to assign a waiter to a table that has a customer on it but no waiter
router.post('/assign-waiter', async (req, res) => {
    try {
        const tables = await tableController.assignWaiterToTable();
        res.status(200).json({tables});
    } catch (error) {
        console.error('Error assigning a waiter to tables', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/clear', async (req, res) => {
    try {
        const { tableNumber } = req.body;
        const tables = await tableController.clearTable(tableNumber); // Call the assignToTable function with customerId
        res.status(200).json({tables});
    } catch (error) {
        console.error('Error clearing table:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

module.exports = router
