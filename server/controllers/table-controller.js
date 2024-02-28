/**
 * @file Manages all table functionality.
 * @version 1.0.0
 */
const db = require('../db');
const pool = db.pool;

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
        // Fetch all staff members
        const staffQuery = 'SELECT staff_id FROM staff';
        const staffResult = await client.query(staffQuery);
        const staffMembers = staffResult.rows;
        // Find the staff member with the least workload
        let leastLoadedStaffId = null;
        let minTableCount = Infinity;
        for (const staffMember of staffMembers) {
            const staffId = staffMember.staff_id;
            const staffWorkloadQuery = 'SELECT COUNT(*) AS table_count FROM tables WHERE staff_id = $1';
            const staffWorkloadResult = await client.query(staffWorkloadQuery, [staffId]);
            const tableCount = parseInt(staffWorkloadResult.rows[0].table_count);
            if (tableCount < minTableCount) {
                minTableCount = tableCount;
                leastLoadedStaffId = staffId;
            }
        }
        // Assign the staff member to the table
        const assignStaffQuery = 'UPDATE tables SET staff_id = $1 WHERE table_number = $2';
        await client.query(assignStaffQuery, [leastLoadedStaffId, freeTableId]);
        console.log(`Customer ${customerId} assigned to table ${freeTableId}.`);
        console.log(`Staff ${leastLoadedStaffId} assigned to table ${freeTableId}.`);
    } catch (error) {
        console.error('Error assigning customer and staff:', error);
    } finally {
        client.release(); // Release the client back to the pool
    }
}
module.exports = { assignToTable }