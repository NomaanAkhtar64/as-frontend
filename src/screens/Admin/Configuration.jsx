/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { Button, FormHelperText, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import TimePicker from '@mui/lab/TimePicker';
import { css } from '@emotion/react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

import SubmitButton from '../../layout/generic/SubmitButton';

const style = {
  wtContainer: css`
    & .MuiFormControl-root {
      width: 100%;
    }
  `,
  timePicker: css`
    width: 100%;
  `,
  wrapper: css`
    padding: 10px;
  `,
  section: css`
    padding: 15px 0px !important;
    /* margin: 10px 0px; */
    h6 {
      margin: 10px 0px !important;
    }
  `,
  multiSelector: css`
    width: 200px;
  `,
};

function Section({ children }) {
  return <div css={style.section}>{children}</div>;
}

function ConfigurationScreen() {
  const [startTime, setStartTime] = useState(Date());
  const [endTime, setEndTime] = useState(Date());
  const [changes, setChanges] = useState(true);
  const [formState, setFormState] = React.useState({
    userRoles: [],
  });
  const handleFieldChange = (event) => {
    console.log(event);
    event.persist();
    setFormState((formState) => ({
      ...formState,
      [event.target.name]:
        event.target.type === 'checkbox'
          ? event.target.checked
          : event.target.value,
    }));
  };
  return (
    <form css={style.wrapper}>
      {/* <Section>
        <Typography variant='h6'>Working Timing</Typography>
        <Grid container css={style.wtContainer} spacing={1}>
          <Grid item xs={12} md={6}>
            <TimePicker
              label='Start Time'
              css={style.timePicker}
              value={startTime}
              readOnly
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TimePicker
              label='End Time'
              value={endTime}
              css={style.timePicker}
              readOnly
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>
        </Grid>
        <FormHelperText>
          Can Only be Edited By Admin with Proper Authorization
        </FormHelperText>
      </Section> */}
      <Section>{changes && <SubmitButton>Save Changes</SubmitButton>}</Section>
    </form>
  );
}

export default ConfigurationScreen;
