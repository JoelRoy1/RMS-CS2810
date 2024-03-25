// TableStatusPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const TableStatusPage = () => {
  const [tableData, setTableData] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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
    <Container maxWidth="md">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="header-stats">
        <div className="stat-item">Active Tables</div>
      </div>
      <Typography variant="h4" align="center" gutterBottom>
        Table Status
      </Typography>
      <TableContainer component={Paper}>
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
                <TableCell>{table.order_status}</TableCell>
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
