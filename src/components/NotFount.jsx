/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';


function NotFound({ dataName }) {
    return (
        <Paper css={css`padding: 20px; text-align:center;`}>
            <Typography variant="h6" css={css`
            color:#333;
            text-transform: uppercase;
            letter-spacing: 2px;
            `}>
                No {dataName} Found!
            </Typography>
        </Paper>
    )
}

export default NotFound;