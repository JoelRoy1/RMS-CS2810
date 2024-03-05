/**
 * @file Manages all table functionality.
 * @version 1.0.0
 */
const db = require('../db');
const pool = db.pool;

async function showTables() {
    let client;
    try {
        client = await pool.connect();
        const query = 'SELECT * FROM tables';
        const result = await client.query(query);
        return result.rows;
    } catch (error) {
        console.error('Error getting tables from database:', error);
    } finally {
        if (client) {
            client.release(); // Release the client back to the pool
        }
    }
}

//
async function showAssigned(staffId) {
    let client;
    try {
        client = await pool.connect();
        const query = 'SELECT * FROM tables WHERE staff_id = $1';
        const result = await client.query(query);
        return result.rows;
    } catch (error) {
        if (client) {
            client.release(); //Release the client back to the pool
        }
    }
};

//customer joins a table so assign staff memeber to the table
async function assignToTable(customerId) {
    let client;
    try {
        client = await pool.connect(); // Establish Connection

        // Find a free table
        const freeTableQuery = 'SELECT table_number FROM tables WHERE customer_id IS NULL LIMIT 1';
        const freeTableResult = await client.query(freeTableQuery);
        const freeTableId = freeTableResult.rows[0].table_number;

        // Assign the customer to the free table
        const assignCustomerQuery = 'UPDATE tables SET customer_id = $1 WHERE table_number = $2';
        await client.query(assignCustomerQuery, [customerId, freeTableId]);

        // Fetch all waiter staff members
        const waiterQuery = 'SELECT staff_id FROM staff WHERE staff_type = $1';
        const waiterResult = await client.query(waiterQuery, 1); 
        const waiterStaffMembers = waiterResult.rows;

        // Find the waiter staff member with the least workload
        let leastLoadedWaiterId = null;
        let minTableCount = Infinity;
        for (const waiter of waiterStaffMembers) {
            const waiterId = waiter.staff_id;
            const waiterWorkloadQuery = 'SELECT COUNT(*) AS table_count FROM tables WHERE staff_id = $1';
            const waiterWorkloadResult = await client.query(waiterWorkloadQuery, [waiterId]);
            const tableCount = parseInt(waiterWorkloadResult.rows[0].table_count);
            if (tableCount < minTableCount) {
                minTableCount = tableCount;
                leastLoadedWaiterId = waiterId;
            }
        }

        // Assign the waiter staff member to the table
        const assignWaiterQuery = 'UPDATE tables SET staff_id = $1 WHERE table_number = $2';
        await client.query(assignWaiterQuery, [leastLoadedWaiterId, freeTableId]);

        console.log(`Customer ${customerId} assigned to table ${freeTableId}.`);
        console.log(`Waiter, staffID-> ${leastLoadedWaiterId} assigned to table ${freeTableId}.`);
    } catch (error) {
        console.error('Error assigning customer and waiter:', error);
    } finally {
        client.release(); // Release the client back to the pool
    }
}

module.exports = { showTables, showAssigned, assignToTable }