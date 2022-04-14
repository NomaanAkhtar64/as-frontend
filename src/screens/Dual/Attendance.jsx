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
import { useParams } from 'react-router';
import format from 'date-fns/format';
import { useEmployeeAttendance } from '../../hooks/dual/useEmployeeAttendance';
import { CircularProgress } from '@mui/material';
import useUser from '../../hooks/user';
const style = {
  table: css`
    margin: 0px auto;
    justify-content: center;
  `,
};

function AttendanceScreen() {
  const [viewMode, setViewMode] = React.useState('7days');
  const { id } = useParams();
  const { data: attendanceArray, loading } = useEmployeeAttendance(
    viewMode,
    id
  );
  const {
    state: { user },
  } = useUser();

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
          <MenuItem value='7days'>Last 7 Days</MenuItem>
          <MenuItem value='Month'>By Month</MenuItem>
          <MenuItem value='Year'>By Year</MenuItem>
        </Select>
      </FormControl>
      <br />
      {loading ? (
        <CircularProgress />
      ) : (
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
              {attendanceArray.map((atd, idx) => (
                <TableRow key={idx}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>
                    {format(Date.parse(atd.date), 'do MMM yyyy')}
                  </TableCell>
                  <TableCell>{atd.checked_in}</TableCell>
                  <TableCell>{atd.checked_out}</TableCell>
                  <TableCell>{atd.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}

export default AttendanceScreen;
