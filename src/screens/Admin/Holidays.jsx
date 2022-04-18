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
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import format from 'date-fns/format';
import { useHolidays } from '../../hooks/Admin/useHolidays';
import { Link } from 'react-router-dom';

const style = {
  btn: css`
    margin-bottom: 30px;
  `,
};

function MonthTableRow({ data, day }) {
  const holiday = data.holidays.find(
    (h) => parseInt(h.date.substr(8, 2)) === day
  );
  return (
    <TableRow style={holiday && { background: 'rgba(25, 118, 210, 0.5)' }}>
      <TableCell>{day}</TableCell>
      <TableCell>{holiday && holiday.name}</TableCell>
      <TableCell>{holiday && (holiday.repeats ? 'Yes' : 'No')}</TableCell>
    </TableRow>
  );
}

function HolidaysScreen() {
  const [viewMode, setViewMode] = React.useState('Month');
  const { data, loading, actions } = useHolidays(viewMode);

  if (loading) return <CircularProgress />;

  return (
    <>
      <Link to='/holidays/create'>
        <Button variant='outlined' fullWidth as={Button} css={style.btn}>
          Create
        </Button>
      </Link>
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'>View Holidays</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={viewMode}
          label='View Attendance'
          onChange={(e) => {
            setViewMode(e.target.value);
            actions.load();
          }}
        >
          <MenuItem value='Month'>This Month</MenuItem>
          <MenuItem value='Year'>This Year</MenuItem>
        </Select>
      </FormControl>

      {viewMode === 'Month' && (
        <TableContainer css={style.table} component={Paper}>
          <Table sx={{ minWidth: 400 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>Day</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Repeats</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[...Array(data.month_days).keys()].map((d) => (
                <MonthTableRow data={data} day={d + 1} key={d} />
              ))}
              <TableRow></TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {viewMode === 'Year' && (
        <TableContainer css={style.table} component={Paper}>
          <Table sx={{ minWidth: 400 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>S No.</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Repeats</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((h, idx) => (
                <TableRow key={h.id}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>
                    {h.repeats
                      ? format(Date.parse(h.date), 'do MMM')
                      : format(Date.parse(h.date), 'do MMM yyyy')}
                  </TableCell>
                  <TableCell>{h.name}</TableCell>
                  <TableCell>{h.repeats ? 'Yes' : 'No'}</TableCell>
                </TableRow>
              ))}
              <TableRow></TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}

export default HolidaysScreen;
