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
import { useGrantedLeaves } from '../../hooks/dual/useGrantedLeaves';
import NotFound from '../../components/NotFount';
import { format } from 'date-fns';

const style = {
    cont: css`
    margin: 0px auto;
    justify-content: center;
  `,
};

function GrantedLeavesScreen() {
    const { data: leaves, loading } = useGrantedLeaves();

    if (loading) return <CircularProgress />;
    if (leaves.length === 0) return <NotFound dataName="Granted Leaves" />

    return (
        <TableContainer css={style.cont} component={Paper}>
            <Table sx={{ minWidth: 400 }} aria-label='simple table'>
                <TableHead>
                    <TableRow>
                        <TableCell>S. No.</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Reason</TableCell>
                        <TableCell>Message</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {leaves.map((leave, idx) => (
                        <TableRow key={leave.id}>
                            <TableCell>{idx + 1}</TableCell>
                            <TableCell>
                                {leave.employee_detail.first_name}{" "}
                                {leave.employee_detail.last_name}
                            </TableCell>
                            <TableCell>{format(Date.parse(leave.date), 'do MMM yyyy')}</TableCell>
                            <TableCell>{leave.reason}</TableCell>
                            <TableCell>{leave.msg}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default GrantedLeavesScreen;
