/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';

const style = {
  label: css`
    font-size: 12px;
    margin-left: 8px;
    color: rgba(0, 0, 0, 0.6);
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  `,
};

function DateInput({ label, value, onUpdate, err, onError, disable }) {
  return (
    <>
      <label css={style.label}>{label}</label>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <FormControl css={style.control} error={err !== null} fullWidth>
            <Input
              type='text'
              value={value.d}
              onChange={(e) => {
                onUpdate({
                  ...value,
                  d: e.target.value.replace(/[^0-9]+/i, '').substring(0, 2),
                });
                onError(null);
              }}
              placeholder='DD'
              disabled={disable}
            />
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl css={style.control} error={err !== null} fullWidth>
            <Input
              type='text'
              value={value.m}
              onChange={(e) => {
                onUpdate({
                  ...value,
                  m: e.target.value.replace(/[^0-9]+/i, '').substring(0, 2),
                });
                onError(null);
              }}
              placeholder='MM'
              disabled={disable}
            />
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl css={style.control} error={err !== null} fullWidth>
            <Input
              type='text'
              value={value.y}
              onChange={(e) => {
                onUpdate({
                  ...value,
                  y: e.target.value.replace(/[^0-9]+/i, '').substring(0, 4),
                });
                onError(null);
              }}
              placeholder='YYYY'
              disabled={disable}
            />
          </FormControl>
        </Grid>
      </Grid>
      <FormHelperText>{err && err}</FormHelperText>
    </>
  );
}

export default DateInput;
