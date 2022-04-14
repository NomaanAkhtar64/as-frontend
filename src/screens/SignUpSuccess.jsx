/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import React from 'react';
import { Typography, Container, FormHelperText } from '@mui/material';
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';

const style = {
  wrapper: css`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  typography: css`
    text-align: center;
  `,
  container: css`
    padding: 0px !important;
    height: fit-content;
    min-height: 600px;
    border-radius: 0.5rem;
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
  `,
  padder: css`
    padding: 0px 100px 80px 100px !important;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  `,
};

function SignUpSuccessScreen() {
  React.useLayoutEffect(() => {
    document.title = 'Registration Success';
  }, []);

  return (
    <Container css={style.wrapper}>
      <Container css={style.container} maxWidth='sm'>
        <Container css={style.padder}>
          <Typography variant='h6' css={style.typography}>
            Successfully Registered!
            <br />
            You Need to wait for Admin Approval before you can{' '}
            <Link to='/'>Login</Link>
          </Typography>
        </Container>
      </Container>
    </Container>
  );
}

export default SignUpSuccessScreen;
