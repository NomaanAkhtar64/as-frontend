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
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { useParams } from 'react-router';
import format from 'date-fns/format';
import { useEmployeeAttendance } from '../../hooks/dual/useEmployeeAttendance';
import { Link } from 'react-router-dom';

const style = {
  table: css`
    margin: 0px auto;
    justify-content: center;
    & td,
    th {
      text-align: center;
    }
  `,
};

function AttendanceScreen() {
  const [viewMode, setViewMode] = React.useState('Month');
  const { id } = useParams();
  const {
    data: attendanceArray,
    loading,
    actions,
  } = useEmployeeAttendance(viewMode, id);

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
            actions.load();
            setViewMode(e.target.value);
          }}
        >
          <MenuItem value='7days'>Last 7 Days</MenuItem>
          <MenuItem value='Month'>By Month</MenuItem>
          {/* <MenuItem value='Year'>By Year</MenuItem> */}
        </Select>
      </FormControl>
      <br />
      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer css={style.table} component={Paper}>
          <Table sx={{ minWidth: 400 }} aria-label='simple table'>
            <TableHead>
              {viewMode === '7days' && (
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Check In</TableCell>
                  <TableCell>Check Out</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              )}
              {viewMode === 'Month' && (
                <TableRow>
                  <TableCell>Month</TableCell>
                  <TableCell>Hours Worked</TableCell>
                  <TableCell>Report</TableCell>
                </TableRow>
              )}
              {viewMode === 'Year' && (
                <TableRow>
                  <TableCell>Year</TableCell>
                  <TableCell>Hours Worked</TableCell>
                  <TableCell>Report</TableCell>
                </TableRow>
              )}
            </TableHead>
            <TableBody>
              {attendanceArray.map((atd, idx) => (
                <React.Fragment key={idx}>
                  {viewMode === '7days' && (
                    <TableRow>
                      <TableCell>
                        {format(Date.parse(atd.date), 'do MMM yyyy')}
                      </TableCell>
                      <TableCell>{atd.checked_in.substr(0, 5)}</TableCell>
                      <TableCell>{atd.checked_out.substr(0, 5)}</TableCell>
                      <TableCell>{atd.status}</TableCell>
                    </TableRow>
                  )}
                  {viewMode === 'Month' && (
                    <TableRow>
                      <TableCell>
                        {format(new Date(atd.year, atd.month), 'MMM yyyy')}
                      </TableCell>
                      <TableCell>{atd.hours_worked}</TableCell>
                      <TableCell>
                        <Link to='#'>
                          <Button>Download</Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  )}
                  {viewMode === 'Year' && (
                    <TableRow>
                      <TableCell>{atd.year}</TableCell>
                      <TableCell>{atd.hours_worked}</TableCell>
                      <TableCell>
                        <Link to='#'>
                          <Button>Download</Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}

export default AttendanceScreen;
