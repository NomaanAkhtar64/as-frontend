/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';

import Table from '@mui/material/Table';
import CircularProgress from '@mui/material/CircularProgress';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEmployee } from '../../hooks/Employee/employee';

const style = {
  cont: css`
    margin: 0px auto;
    justify-content: center;
  `,
};

function HomeScreen() {
  const { loading, data: employee } = useEmployee();

  if (loading) return <CircularProgress />;

  return (
    <TableContainer css={style.cont} component={Paper} sx={{ maxWidth: 800 }}>
      <Table sx={{ minWidth: 400 }} aria-label='simple table'>
        <TableBody>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>{employee.first_name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Last Name</TableCell>
            <TableCell>{employee.last_name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Wage Per Hour</TableCell>
            <TableCell>{employee.wage_per_hour}$</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Employee Status</TableCell>
            <TableCell>{employee.employee_status}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Joining Date</TableCell>
            <TableCell>{employee.joining_date}</TableCell>
          </TableRow>
          {employee.leaving_date !== null && (
            <TableRow>
              <TableCell>Leaving Date</TableCell>
              <TableCell>{employee.leaving_date}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default HomeScreen;
