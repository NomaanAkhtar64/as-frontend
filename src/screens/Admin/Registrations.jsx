/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react';
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
import NotFound from '../../components/NotFount';
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

function RegistrationsScreen() {
  const {
    data: registrations,
    loading,
    actions: { fetchAll, fetchAllCancel, deny },
  } = useRegistrations();

  useEffect(() => {
    fetchAll();
    return () => fetchAllCancel();
  }, [fetchAll, fetchAllCancel]);

  if (loading) return <CircularProgress />;
  if (registrations.length === 0) return <NotFound dataName="Employee Registrations" />
  return (
    <TableContainer css={style.cont} component={Paper}>
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
            <TableRow key={registration.id} css={style.row}>
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
                <Button onClick={() => deny(registration.id)}>DENY</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default RegistrationsScreen;
