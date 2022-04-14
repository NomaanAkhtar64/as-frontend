/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import React, { useLayoutEffect, useState } from 'react';
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Typography,
  Container,
} from '@mui/material';
import { css } from '@emotion/react';
import useUser from '../hooks/user';
import axios from 'axios';
import { EMAIL_REGEX } from '../const';
import Loading from '../components/Loading';
import SubmitButton from '../layout/generic/SubmitButton';

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
    height: 60vh;
    min-height: 400px;
    border-radius: 0.5rem;
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
  `,
  padder: css`
    padding: 30px !important;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  `,
  control: css`
    margin: 10px 0px;
  `,
  error: css`
    color: red;
    margin-top: auto;
    margin-bottom: 10px;
  `,
};

function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disable, setDisable] = useState(false);
  const [error, setError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const user = useUser();
  useLayoutEffect(() => {
    document.title = 'Company Login';
  }, []);

  async function onSubmit(e) {
    e.preventDefault();
    if (!email) setEmailError('Email is Required');
    if (!password) setPasswordError('Password is Required');
    if (!email || !password) return;

    if (!email.toLowerCase().match(EMAIL_REGEX)) {
      setEmailError('Email is Invalid');
      return;
    }

    setDisable(true);
    try {
      await user.actions.login({ email, password });
      setDisable(false);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        let data = err.response.data;
        if ('non_field_errors' in data) {
          let msg = data['non_field_errors'][0];
          if (msg === 'Unable to log in with provided credentials.') {
            setError('Email or Password are incorrect');
          } else {
            setError(msg);
          }
          setEmailError('');
          setDisable(false);
          setPassword('');
        }
      }
    }
  }

  return (
    <Container css={style.wrapper}>
      <Container
        onSubmit={onSubmit}
        component='form'
        css={style.container}
        maxWidth='sm'
      >
        {disable && <Loading />}
        <Container css={style.padder}>
          <Typography variant='h4' css={style.typography}>
            Login
          </Typography>
          <FormControl css={style.control} error={emailError !== null}>
            <InputLabel htmlFor='my-input'>Email address</InputLabel>
            <Input
              aria-describedby='email-ht'
              type='email'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value.replaceAll(' ', ''));
                setEmailError(null);
              }}
              disabled={disable}
            />
            <FormHelperText id='email-ht'>
              {emailError ? emailError : "We'll never share your email."}
            </FormHelperText>
          </FormControl>
          <FormControl
            css={style.control}
            sx={{ width: '100%' }}
            error={passwordError !== null}
          >
            <InputLabel htmlFor='my-input'>Password</InputLabel>
            <Input
              aria-describedby='password-ht'
              type='password'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError(null);
              }}
              disabled={disable}
            />
            <FormHelperText id='password-ht'>
              {passwordError
                ? passwordError
                : 'Enter your company account Password'}
            </FormHelperText>
          </FormControl>

          <Typography variant='subtitle1' css={style.error}>
            {error}
          </Typography>
          <SubmitButton>Login</SubmitButton>
        </Container>
      </Container>
    </Container>
  );
}

export default LoginScreen;
