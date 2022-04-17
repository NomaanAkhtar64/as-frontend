/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import Typography from '@mui/material/Typography';

function HomeScreen() {
  return (
    <Typography
      variant='h4'
      css={css`
        text-align: center;
        margin: 50px 0px 10px 0px;
      `}
    >
      Welcome to Admin Panel
    </Typography>
  );
}

export default HomeScreen;
