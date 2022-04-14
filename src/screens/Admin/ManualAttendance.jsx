/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useMarkableAttendance } from '../../hooks/Admin/useMarkableAttendance';
import { useMarkAttendance } from '../../hooks/Admin/useMarkAttendance';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router';

const style = {
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
  btn: css`
    display: block;
    width: 100%;
    /* margin-bottom: auto; */
    margin: 4px 0px;
  `,
};

function Section({ children }) {
  return <div css={style.section}>{children}</div>;
}

function ManualAttendanceScreen() {
  const [attendance, setAttendance] = React.useState();
  const [mark, setMark] = React.useState('');
  const { data, loading } = useMarkableAttendance();
  const [disabled, setDisable] = React.useState(false);
  const markAttendance = useMarkAttendance();
  const navigate = useNavigate();
  if (loading) return <CircularProgress />;
  return (
    <form
      css={style.wrapper}
      onSubmit={(e) => {
        e.preventDefault();
        if (mark && attendance) {
          setDisable(true);
          markAttendance({
            date: data.date,
            mark,
            id: attendance.id,
          }).then(() => {
            setDisable(false);
            navigate('/');
          });
        }
      }}
    >
      <Section>
        <FormControl fullWidth>
          <InputLabel id='employee-label'>Employee</InputLabel>
          <Select
            labelId='employee-label'
            id='employee'
            label='Employee'
            value={attendance ? attendance.id : ''}
            onChange={(e) =>
              setAttendance(
                data.attendance.find(
                  (atd) => atd.id === parseInt(e.target.value)
                )
              )
            }
            disabled={disabled}
          >
            <MenuItem value=''>---------------------</MenuItem>
            {data.attendance.map((atd) => (
              <MenuItem key={atd.id} value={atd.id}>
                {atd.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Section>
      {attendance && (
        <Section>
          {!attendance.has_checkin && (
            <Button
              onClick={() => {
                if (!disabled) setMark('checkin');
              }}
              css={style.btn}
              variant='outlined'
              disabled={disabled}
              type='submit'
            >
              Mark Check IN
            </Button>
          )}
          {!attendance.has_checkout && (
            <Button
              onClick={() => {
                if (!disabled) setMark('checkout');
              }}
              css={style.btn}
              variant='outlined'
              type='submit'
              disabled={disabled}
            >
              Mark Check OUT
            </Button>
          )}
          {!(attendance.has_checkin || attendance.has_checkout) && (
            <Button
              onClick={() => {
                if (!disabled) setMark('both');
              }}
              css={style.btn}
              variant='outlined'
              type='submit'
              disabled={disabled}
            >
              Mark Both Check IN and Check OUT
            </Button>
          )}
        </Section>
      )}
    </form>
  );
}

export default ManualAttendanceScreen;
