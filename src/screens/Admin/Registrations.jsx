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
import { Link } from 'react-router-dom';
import { useRegistrations } from '../../hooks/Admin/useRegistrations';
const style = {
  cont: css`
    margin: 0px auto;
    justify-content: center;
  `,
  row: css`
    cursor: pointer;
  `,
  formCont: css`
    width: 100%;
    position: absolute;
    top: 0;
    left: 0%;
  `,
};

function RegistartionRow({ idx, registration }) {
  const rowRef = React.useRef();
  return (
    <>
      <TableRow ref={rowRef} css={style.row}>
        <TableCell>{idx + 1}</TableCell>
        <TableCell>
          {registration.first_name} {registration.last_name}
        </TableCell>
        <TableCell>{registration.applied}</TableCell>
        <TableCell>
          <Link to={`/registrations/${registration.id}`}>
            <Button>ACCEPT</Button>
          </Link>
        </TableCell>
        <TableCell>
          <Link to={`/registrations/${registration.id}/deny`}>
            <Button>DENY</Button>
          </Link>
        </TableCell>
      </TableRow>
    </>
  );
}

function RegistrationsScreen() {
  const { data: registrations, loading } = useRegistrations();
  if (loading) return <CircularProgress />;
  return (
    <TableContainer css={style.cont} component={Paper} sx={{ maxWidth: 800 }}>
      <Table sx={{ minWidth: 400 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>S. No.</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Applied At</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {registrations.map((registration, idx) => (
            <RegistartionRow
              key={registration.id}
              idx={idx}
              registration={registration}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default RegistrationsScreen;
