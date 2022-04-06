/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';

const style = {
  table: css`
    margin: 0px auto;
    justify-content: center;
  `,
};

function AttendanceScreen() {
  const [viewMode, setViewMode] = React.useState('Last 7 Days');

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'>View Attendance</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={viewMode}
          label='View Attendance'
          onChange={(e) => {
            setViewMode(e.target.value);
          }}
        >
          <MenuItem value='Last 7 Days'>Last 7 Days</MenuItem>
          <MenuItem value='By Month'>By Month</MenuItem>
          <MenuItem value='By Year'>By Year</MenuItem>
        </Select>
      </FormControl>
      <br />
      <TableContainer css={style.table} component={Paper}>
        <Table sx={{ minWidth: 400 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>S. No</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Check In</TableCell>
              <TableCell>Check Out</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[
              {
                date: Date(),
                checkIn: 'Time In',
                checkOut: 'Time Out',
                status: 'Present',
              },
            ].map((atd, idx) => (
              <TableRow key={idx}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{atd.date}</TableCell>
                <TableCell>{atd.checkIn}</TableCell>
                <TableCell>{atd.checkOut}</TableCell>
                <TableCell>{atd.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default AttendanceScreen;
