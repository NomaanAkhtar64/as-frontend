/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { useParams, useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';

import { useRegistrations } from '../../hooks/Admin/useRegistrations';
import SubmitButton from '../../layout/generic/SubmitButton';
import DateInput from '../../components/DateInput';

const style = {
  padder: css`
    padding: 30px;
  `,
  typography: css`
    text-align: center;
    margin-bottom: 20px;
  `,
  control: css`
    margin: 10px 0px;
  `,
  lab: css`
    font-size: 12px;
    margin-left: 8px;
    color: rgba(0, 0, 0, 0.6);
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  `,
};

function RegistrationFormScreen() {
  const { id } = useParams();
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [device, setDevice] = React.useState('');
  const [wage, setWage] = React.useState('');
  const [contact, setContact] = React.useState('');
  const [joining, setJoining] = useState({ d: '', m: '', y: '' });
  const [dob, setDOB] = useState({ d: '', m: '', y: '' });

  const [firstNameError, setFirstNameError] = React.useState(null);
  const [lastNameError, setLastNameError] = React.useState(null);
  const [deviceError, setDeviceError] = React.useState(null);
  const [wageError, setWageError] = React.useState(null);
  const [contactError, setContactError] = React.useState(null);
  const [joiningError, setJoiningError] = React.useState(null);
  const [dobError, setDOBError] = React.useState(null);
  const [disable, setDisable] = React.useState(false);

  const navigate = useNavigate();
  const {
    loading,
    data: reg,
    actions: { fetch, fetchCancel, accept },
  } = useRegistrations();

  useEffect(() => {
    if (reg) {
      setFirstName(reg.first_name);
      setLastName(reg.last_name);
      setDevice(reg.brand_of_device);
      const jd = reg.applied.split('-');
      const dd = reg.date_of_birth.split('-');
      setJoining({ d: jd[2], m: jd[1], y: jd[0] });
      setDOB({ d: dd[2], m: dd[1], y: dd[0] });
      setContact(reg.contact);
    }
  }, [reg]);

  useEffect(() => {
    fetch(id);
    return () => fetchCancel();
  }, [fetch, fetchCancel, id]);

  if (loading) return <CircularProgress />;

  if (!reg)
    return (
      <Paper css={style.padder}>
        Registration with Given ID Does Not Exist
      </Paper>
    );
  return (
    <Paper
      component='form'
      onSubmit={async (e) => {
        e.preventDefault();
        let hasError = false;
        if (!firstName) setFirstNameError('First Name is Required');
        if (!lastName) setLastNameError('Last Name is Required');
        if (!device) setDeviceError('Brand Of Device is Required');
        if (!wage) setWageError('Wage Per Hour is Required');
        if (!contact) setContactError('Contact Number is Required');
        if (!joining.d || !joining.m || !joining.y)
          setJoiningError('Joining Date is required!');
        if (!dob.d || !dob.m || !dob.y)
          setDOBError('Date Of Birth is required!');
        if (
          !firstName ||
          !lastName ||
          !joining.d ||
          !joining.m ||
          !joining.y ||
          !dob.d ||
          !dob.m ||
          !dob.y ||
          !wage ||
          !contact ||
          !device
        )
          hasError = true;

        if (hasError) return;
        setDisable(true);
        try {
          await accept(id, {
            first_name: firstName,
            last_name: lastName,
            brand_of_device: device,
            wage_per_hour: parseFloat(wage),
            contact_number: contact,
            date_of_birth: `${dob.y}-${dob.m}-${dob.d}`,
            joining_date: `${joining.y}-${joining.m}-${joining.d}`,
            user: reg.user,
          });
          navigate('/registrations/');
        } catch (err) {
          console.log(err);
        }
      }}
      css={style.padder}
    >
      <Typography variant='h5' css={style.typography}>
        Confirm And Input Employee Data
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <FormControl
            css={style.control}
            error={firstNameError !== null}
            fullWidth
          >
            <InputLabel htmlFor='first-name'>First Name</InputLabel>
            <Input
              aria-describedby='first-name'
              type='text'
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                setFirstNameError(null);
              }}
              disabled={disable}
            />
            <FormHelperText>{firstNameError && firstNameError}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl
            css={style.control}
            error={lastNameError !== null}
            fullWidth
          >
            <InputLabel htmlFor='last-name'>Last Name</InputLabel>
            <Input
              aria-describedby='last-name'
              type='text'
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                setLastNameError(null);
              }}
              disabled={disable}
            />
            <FormHelperText>{lastNameError && lastNameError}</FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
      <FormControl css={style.control} error={deviceError !== null} fullWidth>
        <InputLabel htmlFor='device'>Brand Of Device</InputLabel>
        <Input
          aria-describedby='device'
          type='text'
          value={device}
          onChange={(e) => {
            setDevice(e.target.value);
            setDeviceError(null);
          }}
          disabled={disable}
        />
        <FormHelperText>{deviceError && deviceError}</FormHelperText>
      </FormControl>
      <DateInput
        label='Date Of Birth'
        value={dob}
        onUpdate={(v) => setDOB(v)}
        disable={disable}
        err={dobError}
        onError={(err) => setDOBError(err)}
      />
      <DateInput
        label='Joining Date'
        value={joining}
        onUpdate={(v) => setJoining(v)}
        disable={disable}
        err={joiningError}
        onError={(err) => setJoiningError(err)}
      />

      <FormControl css={style.control} error={contactError !== null} fullWidth>
        <InputLabel htmlFor='contact'>Contact Number</InputLabel>
        <Input
          aria-describedby='contact'
          type='text'
          value={contact}
          onChange={(e) => {
            setContact(e.target.value.replace(/[^0-9-+\s]+/i, ''));
            setContactError(null);
          }}
          placeholder='+92 321 1234567'
          disabled={disable}
        />
        <FormHelperText>{contactError && contactError}</FormHelperText>
      </FormControl>
      <FormControl css={style.control} error={wageError !== null} fullWidth>
        <InputLabel htmlFor='wage'>Wage Per Hour</InputLabel>
        <Input
          aria-describedby='wage'
          type='text'
          value={wage}
          onChange={(e) => {
            setWage(e.target.value.replace(/[^0-9,.]+/i, ''));
            setWageError(null);
          }}
          disabled={disable}
        />
        <FormHelperText>{wageError && wageError}</FormHelperText>
      </FormControl>

      <SubmitButton>Create Employee</SubmitButton>
    </Paper>
  );
}

export default RegistrationFormScreen;
