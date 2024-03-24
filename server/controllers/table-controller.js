/**
 * @file Manages all table functionality.
 * @version 2.0.0
 */
const db = require('../db');
const pool = db.pool;

async function showTables() {
    let client;
    try {
        client = await pool.connect();
        const query = 'SELECT * FROM tables ORDER BY table_number';
        const result = await client.query(query);
        return result.rows;
    } catch (error) {
        console.error('Error getting tables from database:', error);
    } finally {
        if (client) {
            console.log('client released');
            client.release(); // Release the client back to the pool
        }
    }
}

/**
 * Shows all the tables that a particular waiter has been assigned.
 * @param {int} staffId- The ID of the waiter
 * @returns- The tables that the corresponding waiter has been assigned.
 */
async function showAssigned(staffId) {
    let client;
    try {
        client = await pool.connect();
        const query = 'SELECT * FROM tables WHERE staff_id = $1';
        const values = [staffId]
        const result = await client.query(query, staffId);
        return result.rows;
    } catch (error) {
        if (client) {
            console.log('client released');
            client.release(); //Release the client back to the pool
        }
    }
};

/**
 * Assigns a table to a customer.
 * Called at the same time a customer logs in to the restaurant system.
 * @param {int} customerId- The ID of the customer that the table is being assigned to.
 * @returns- A random table number assigned to the customer.
 */
async function assignToTable(customerId) {
    let client;
    try {
        client = await pool.connect(); // Establish Connection

        // Find a free table
        const freeTableQuery = 'SELECT table_number FROM tables WHERE customer_id IS NULL LIMIT 1';
        const freeTableResult = await client.query(freeTableQuery);
        const freeTableId = freeTableResult.rows[0].table_number;
        console.log('table number');
        console.log(freeTableId);
        // Assign the customer to the free table
        const assignCustomerQuery = 'UPDATE tables SET customer_id = $1 WHERE table_number = $2';
        await client.query(assignCustomerQuery, [customerId, freeTableId]);
        return freeTableId;
    } catch (error) {
        console.error('Error assigning customer:', error);
    } finally {
        console.log('client released');
        client.release(); // Release the client back to the pool
    }
};

/**
 * Assigns a waiter to a random waiter to a random table where one has not been assigned yet.
 * @returns- All the tables after updating the database.
 */
async function assignWaiterToTable() {
    let client;
    try {
        client = await pool.connect(); // Establish Connection
        // Find occupied tables without assigned waiters
        const occupiedTablesQuery = 'SELECT table_number, customer_id FROM tables WHERE customer_id IS NOT NULL AND staff_id IS NULL';
        const occupiedTablesResult = await client.query(occupiedTablesQuery);
        // For each occupied table without a waiter, assign a waiter
        for (const row of occupiedTablesResult.rows) {
            const tableNumber = row.table_number;
            const customerId = row.customer_id;
            // Find available waiters
            const availableWaiterQuery = 'SELECT staff_id FROM staff WHERE staff_type = 1';
            const availableWaiterResult = await client.query(availableWaiterQuery);
            if (availableWaiterResult.rows.length > 0) {
                // Select a random available waiter
                const randomIndex = Math.floor(Math.random() * availableWaiterResult.rows.length);
                const waiterId = availableWaiterResult.rows[randomIndex].staff_id;
                // Assign the waiter to the table
                const assignWaiterQuery = 'UPDATE tables SET staff_id = $1 WHERE table_number = $2';
                await client.query(assignWaiterQuery, [waiterId, tableNumber]);
                // Return all tables after successful assignment
                return showTables();
            } else {
                console.log('No available waiters.');
            }
        }
    } catch (error) {
        console.error('Error assigning waiter to table:', error);
    } finally {
        console.log('client released');
        client.release(); // Release the client back to the pool
    }
};

/**
 * Clears a table after a customer has left.
 * @param {int} tableNumber- The ID of the table to clear.
 * @returns- All tables after updating the database
 */
async function clearTable(tableNumber) {
    let client;
    try {
        client = await pool.connect(); // Establish Connection
        // Clear staff and customer IDs for the specified table
        const clearTableQuery = 'UPDATE tables SET staff_id = NULL, customer_id = NULL WHERE table_number = $1';
        await client.query(clearTableQuery, [tableNumber]);
        console.log(`Table ${tableNumber} has been cleared.`);
        return showTables();
    } catch (error) {
        console.error('Error clearing table:', error);
    } finally {
        console.log('client released');
        client.release(); // Release the client back to the pool
    }
};

/**
 * Displays information about the customer and the orders the customer at a specific table
 * have made.
 * @returns- The name of the customer at a specific table, the status of their order and
 * whether they have paid or not.
 */
async function displayTableStatus() {
    let client;
    try {
      client = await pool.connect();
      const query = 
      `SELECT t.table_number, c.customer_name, o.order_status,
               CASE
                   WHEN p.payment_id IS NOT NULL THEN TRUE
                   ELSE FALSE
               END AS paid
        FROM tables t
        INNER JOIN customer c ON t.customer_id = c.customer_id
        LEFT JOIN orders o ON c.customer_id = o.customer_id
        LEFT JOIN payments p ON t.table_number = p.table_number
        WHERE o.order_id IS NOT NULL;`;
      const result = await client.query(query);
      return result.rows
    } catch (error) {
      console.error('Error executing query', error);
    } finally {
        if (client) {
            client.release;
        };
    }
  }

/**
 * Export all functions to be used elsewhere in the project.
 */
module.exports = { showTables, showAssigned, assignToTable, assignWaiterToTable, clearTable, displayTableStatus };