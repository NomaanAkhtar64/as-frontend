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
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import { useEmployeeArray } from '../../hooks/Admin/employeeArray';
import { Link } from 'react-router-dom';

const style = {
  cont: css`
    margin: 0px auto;
    justify-content: center;
  `,
};

function EmployeesScreen() {
  const { data: employees, loading } = useEmployeeArray();
  if (loading) return <CircularProgress />;

  return (
    <TableContainer css={style.cont} component={Paper} sx={{ maxWidth: 800 }}>
      <Table sx={{ minWidth: 400 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>S. No.</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Status</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((employee, idx) => (
            <TableRow key={employee.id}>
              <TableCell>{idx + 1}</TableCell>
              <TableCell>
                {employee.first_name} {employee.last_name}
              </TableCell>
              <TableCell>{employee.employee_status}</TableCell>
              <TableCell>
                <Link to={`/employees/attendance/${employee.id}`}>
                  <Button>View Attendance</Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default EmployeesScreen;
