/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FormControl, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import DateInput from "../../components/DateInput";
import useRequestLeave from "../../hooks/Employee/useRequestLeave";
import useUser from "../../hooks/user";
import SubmitButton from "../../layout/generic/SubmitButton";

const style = {
  typography: css`
    text-align: center;
    margin-bottom: 20px;
  `,
  control: css`
    margin: 10px 0px;
  `,
  padder: css`
    padding: 30px;
  `,
};

function fixDigits(int, size) {
  let str = int.toString();
  while (str.length < size) {
    str = "0" + str;
  }
  return str;
}

function RequestLeave() {
  const [reason, setReason] = useState("");
  const [msg, setMsg] = useState("");
  const [disable, setDisable] = useState(false);
  const [dateError, setDateError] = useState(null);

  const today = new Date();
  const [date, setDate] = useState({
    d: fixDigits(today.getDate(), 2),
    m: fixDigits(today.getMonth() + 1, 2),
    y: fixDigits(today.getFullYear(), 4),
  });

  const requestLeave = useRequestLeave();
  const navigate = useNavigate();
  const user = useUser();

  return (
    <Paper
      component="form"
      css={style.padder}
      onSubmit={async (e) => {
        e.preventDefault();
        if (reason && date && msg) {
          let hasError = false;
          setDisable(true);
          if (!date.d || !date.m || !date.y) setDateError("Date is required!");

          if (!reason || !msg || !date.d || !date.m || !date.y) hasError = true;
          if (hasError) return;

          let leave = {
            employee: user.state.user.employee_id,
            reason: reason,
            date: `${date.y}-${date.m}-${date.d}`,
            msg: msg,
          };
          await requestLeave(leave).then((res) => {
            if (axios.isAxiosError(res)) {
              setDisable(false);
            } else {
              navigate("/");
            }
          });
        }
      }}
    >
      <Typography variant="h5" css={style.typography}>
        Create a Request
      </Typography>

      <FormControl css={style.control} fullWidth>
        <TextField
          label="Reason"
          variant="standard"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
          disabled={disable}
        />
      </FormControl>
      <br />
      <FormControl css={style.control} fullWidth>
        <DateInput
          label="Date"
          value={date}
          onUpdate={(v) => setDate(v)}
          disable={disable}
          err={dateError}
          onError={(err) => setDateError(err)}
        />
      </FormControl>
      <br />
      <FormControl css={style.control} fullWidth>
        <TextField
          label="Message"
          variant="outlined"
          multiline
          rows={4}
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          required
          disabled={disable}
        />
      </FormControl>
      <br />
      <SubmitButton>Send</SubmitButton>
    </Paper>
  );
}

export default RequestLeave;
