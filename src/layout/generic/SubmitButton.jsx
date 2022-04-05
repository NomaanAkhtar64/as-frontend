/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button } from '@mui/material';

export default function SubmitButton({ children }) {
  return (
    <Button
      css={css`
        display: block;
        width: 100%;
        margin-bottom: auto;
      `}
      variant='outlined'
      type='submit'
    >
      {children}
    </Button>
  );
}
