/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import SubmitButton from '../../layout/generic/SubmitButton';
import DateInput from '../../components/DateInput';
import { useHolidays } from '../../hooks/Admin/useHolidays';
import { useNavigate } from 'react-router';

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
};

function fixDigits(int, size) {
  let str = int.toString();
  while (str.length < size) {
    str = '0' + str;
  }
  return str;
}

function HolidayFormScreen() {
  const today = new Date();
  const [name, setName] = React.useState('');
  const [date, setDate] = React.useState({
    d: fixDigits(today.getDate(), 2),
    m: fixDigits(today.getMonth() + 1, 2),
    y: fixDigits(today.getFullYear(), 4),
  });
  const [repeats, setRepeats] = React.useState(false);

  const [nameError, setNameError] = React.useState(null);
  const [dateError, setDateError] = React.useState(null);
  const navigate = useNavigate();
  const [disable, setDisable] = React.useState(false);
  const { actions } = useHolidays();
  return (
    <Paper
      component='form'
      onSubmit={async (e) => {
        e.preventDefault();
        let hasError = false;
        if (!name) setNameError('Name is Required');
        if (!date.d || !date.m || !date.y) setDateError('Date is required!');

        if (!name || !date.d || !date.m || !date.y) hasError = true;
        if (hasError) return;

        setDisable(true);
        await actions.create({
          name,
          date: `${date.y}-${date.m}-${date.d}`,
          repeats: repeats === 'true',
        });
        navigate('/holidays');
      }}
      css={style.padder}
    >
      <Typography variant='h5' css={style.typography}>
        Create Holiday
      </Typography>

      <FormControl css={style.control} error={nameError !== null} fullWidth>
        <InputLabel htmlFor='first-name'>Name</InputLabel>
        <Input
          aria-describedby='first-name'
          type='text'
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setNameError(null);
          }}
          disabled={disable}
        />
        <FormHelperText>{nameError && nameError}</FormHelperText>
      </FormControl>

      <FormControl css={style.control} fullWidth>
        <InputLabel id='demo-simple-select-label'>Repeats Yearly</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={repeats}
          label='Repeats Yearly'
          onChange={(e) => {
            setRepeats(e.target.value);
          }}
        >
          <MenuItem value='true'>Yes</MenuItem>
          <MenuItem value='false'>No</MenuItem>
        </Select>
      </FormControl>

      <DateInput
        label='Date'
        value={date}
        onUpdate={(v) => setDate(v)}
        disable={disable}
        err={dateError}
        onError={(err) => setDateError(err)}
      />
      <br />

      <SubmitButton>Create</SubmitButton>
    </Paper>
  );
}

export default HolidayFormScreen;
