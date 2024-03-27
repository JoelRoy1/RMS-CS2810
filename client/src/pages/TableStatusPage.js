/**
 * TableStatusPage component displays the active status of tables along with customer names, order status, and payment status.
 * @module TableStatusPage
 */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

/**
 * TableStatusPage component.
 * @returns {JSX.Element} TableStatusPage component.
 */
const TableStatusPage = () => {
  /**
   * State to store table data.
   * @type {Array<Object>}
   */
  const [tableData, setTableData] = useState([]);

  /**
   * Fetches table data from the server upon component mount.
   */
  useEffect(() => {
    axios.get('http://localhost:9000/table/status')
      .then(response => {
        setTableData(response.data.tables);
      })
      .catch(error => {
        console.error('Error fetching table data:', error);
      });
  }, []);

  return (
    <Container maxWidth="md" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh'}}>
      <Typography variant="h4" align="center" gutterBottom style={{ color: '#333', marginBottom: '20px' }}>
        Active Table Status
      </Typography>
      <TableContainer component={Paper} style={{ backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: 'bold', fontSize: '1rem' }}>Table Number</TableCell>
              <TableCell style={{ fontWeight: 'bold', fontSize: '1rem' }}>Customer Name</TableCell>
              <TableCell style={{ fontWeight: 'bold', fontSize: '1rem' }}>Order Status</TableCell>
              <TableCell style={{ fontWeight: 'bold', fontSize: '1rem' }}>Paid</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map(table => (
              <TableRow key={table.table_number}>
                <TableCell>{table.table_number}</TableCell>
                <TableCell>{table.customer_name}</TableCell>
                <TableCell>{(table.order_status).toUpperCase()}</TableCell>
                <TableCell>{table.paid ? 'Yes' : 'No'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default TableStatusPage;
