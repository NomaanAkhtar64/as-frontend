/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Typography,
  Container,
  Button,
} from '@mui/material';
import { css } from '@emotion/react';

const style = {
  wrapper: css`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  container: css`
    padding: 30px !important;
    height: 60vh;
    min-height: 500px;
    border-radius: 0.5rem;
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
  `,
  control: css`
    margin: 10px 0px;
  `,
  btn: css`
    display: block;
    width: 100%;
    margin: 5px 0px;
    &:first-of-type {
      margin-top: auto;
    }
    &:last-of-type {
      margin-bottom: auto;
    }
  `,
};

function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Container css={style.wrapper}>
      <Container css={style.container} maxWidth='sm'>
        <Typography variant='h4'>Login</Typography>
        <FormControl
          css={style.control}
          sx={{ width: '100%', marginBottom: 10 }}
        >
          <InputLabel htmlFor='my-input'>Email address</InputLabel>
          <Input
            aria-describedby='email-ht'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormHelperText id='email-ht'>
            We'll never share your email.
          </FormHelperText>
        </FormControl>
        <FormControl css={style.control} sx={{ width: '100%' }}>
          <InputLabel htmlFor='my-input'>Password</InputLabel>
          <Input
            aria-describedby='password-ht'
            value={password}
            type='password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormHelperText id='password-ht'>
            Enter your company account Password
          </FormHelperText>
        </FormControl>
        <Button css={style.btn} variant='outlined'>
          Login
        </Button>
        <Button css={style.btn} variant='outlined'>
          SignUp
        </Button>
      </Container>
    </Container>
  );
}

export default LoginScreen;
