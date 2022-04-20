/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import { useMarkableAttendance } from "../../hooks/Admin/useMarkableAttendance";
import { useMarkAttendance } from "../../hooks/Admin/useMarkAttendance";
import { CircularProgress, Paper } from "@mui/material";
import { useNavigate } from "react-router";
import SubmitButton from "../../layout/generic/SubmitButton";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

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
  padder: css`
    padding: 30px;
  `,
  tpicker: css`
    margin: 20px 0px;
    width: 100%;
  `,
};

function Section({ children }) {
  return <div css={style.section}>{children}</div>;
}

function toHHMMSS(t) {
  return t.toTimeString().substring(0, 8);
}

function ManualAttendanceScreen() {
  const today = React.useMemo(() => new Date(), []);
  const [attendance, setAttendance] = React.useState();
  const [mark, setMark] = React.useState("");
  const { data, loading } = useMarkableAttendance();
  const [disabled, setDisable] = React.useState(false);
  const markAttendance = useMarkAttendance();
  const navigate = useNavigate();

  const [checkin, setCheckin] = React.useState(today);
  const [checkout, setCheckout] = React.useState(today);
  const [checkinError, setCheckinError] = React.useState(null);
  const [checkoutError, setCheckoutError] = React.useState(null);

  if (loading) return <CircularProgress />;
  return (
    <form
      css={style.wrapper}
      onSubmit={(e) => {
        e.preventDefault();
        if (mark && attendance) {
          setDisable(true);
          let hasError = false;
          const out = { date: data.date, id: attendance.id };
          if (mark === "checkin" || mark === "both") {
            out.checkin = toHHMMSS(checkin);
            if (!checkin) {
              setCheckinError("Check in time is required!");
              hasError = true;
            }
          } else if (mark === "checkout" || mark === "both") {
            out.checkout = toHHMMSS(checkout);
            if (!checkout) {
              setCheckoutError("Check Out time is required");
              hasError = true;
            }
          }
          if (!hasError) {
            markAttendance(out).then(() => {
              setDisable(false);
              navigate("/");
            });
          }
        }
      }}
    >
      <Section>
        <FormControl fullWidth>
          <InputLabel id="employee-label">Employee</InputLabel>
          <Select
            labelId="employee-label"
            id="employee"
            label="Employee"
            value={attendance ? attendance.id : ""}
            onChange={(e) => {
              setAttendance(
                data.attendance.find(
                  (atd) => atd.id === parseInt(e.target.value)
                )
              );
              setMark("");
            }}
            disabled={disabled}
          >
            <MenuItem value="">---------------------</MenuItem>
            {data.attendance.map((atd) => (
              <MenuItem key={atd.id} value={atd.id}>
                {atd.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Section>
      {!mark && (
        <>
          {attendance && (
            <Section>
              {!attendance.has_checkin && (
                <Button
                  onClick={() => {
                    if (!disabled) setMark("checkin");
                  }}
                  css={style.btn}
                  variant="outlined"
                >
                  Mark Check IN
                </Button>
              )}
              {attendance.has_checkin && !attendance.has_checkout && (
                <Button
                  onClick={() => {
                    if (!disabled) setMark("checkout");
                  }}
                  css={style.btn}
                  variant="outlined"
                >
                  Mark Check OUT
                </Button>
              )}
              {!(attendance.has_checkin || attendance.has_checkout) && (
                <Button
                  onClick={() => {
                    if (!disabled) setMark("both");
                  }}
                  css={style.btn}
                  variant="outlined"
                >
                  Mark Both Check IN and Check OUT
                </Button>
              )}
            </Section>
          )}
        </>
      )}
      {attendance && attendance.id && mark === "checkin" && (
        <Paper css={style.padder}>
          <TimePicker
            label="Check In"
            value={checkin}
            onChange={(nv) => setCheckin(nv)}
            error={checkinError !== null}
            renderInput={(p) => (
              <>
                <TextField css={style.tpicker} {...p} />
                <FormHelperText>{checkinError && checkinError}</FormHelperText>
              </>
            )}
          />
          <SubmitButton>Create</SubmitButton>
        </Paper>
      )}
      {attendance && attendance.id && mark === "checkout" && (
        <Paper css={style.padder}>
          <TimePicker
            label="Check Out"
            value={checkout}
            onChange={(nv) => setCheckout(nv)}
            error={checkoutError !== null}
            renderInput={(p) => (
              <>
                <TextField css={style.tpicker} {...p} />
                <FormHelperText>
                  {checkoutError && checkoutError}
                </FormHelperText>
              </>
            )}
          />
          <SubmitButton>Create</SubmitButton>
        </Paper>
      )}
      {attendance && attendance.id && mark === "both" && (
        <Paper css={style.padder}>
          <TimePicker
            label="Check In"
            value={checkin}
            onChange={(nv) => setCheckin(nv)}
            error={checkinError !== null}
            renderInput={(p) => (
              <>
                <TextField css={style.tpicker} {...p} />
                <FormHelperText>{checkinError && checkinError}</FormHelperText>
              </>
            )}
          />
          <TimePicker
            label="Check Out"
            value={checkout}
            onChange={(nv) => setCheckout(nv)}
            error={checkoutError !== null}
            renderInput={(p) => (
              <>
                <TextField css={style.tpicker} {...p} />
                <FormHelperText>
                  {checkoutError && checkoutError}
                </FormHelperText>
              </>
            )}
          />
          <SubmitButton>Create</SubmitButton>
        </Paper>
      )}
    </form>
  );
}

export default ManualAttendanceScreen;
