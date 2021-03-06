/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import React from "react";
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Typography,
  Container,
  Grid,
} from "@mui/material";
import { css } from "@emotion/react";
import useUser from "../hooks/user";
import axios from "axios";
import { EMAIL_REGEX } from "../const";
import Loading from "../components/Loading";
import SubmitButton from "../layout/generic/SubmitButton";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import DateInput from "../components/DateInput";

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
    height: fit-content;
    min-height: 600px;
    border-radius: 0.5rem;
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
  `,
  padder: css`
    padding: 30px 60px !important;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  `,
  control: css`
    margin: 5px 0px;
  `,
  error: css`
    color: red;
    margin-top: auto;
    margin-bottom: 10px;
  `,
};

function SignUpScreen() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [device, setDevice] = React.useState("");
  const [contact, setContact] = React.useState("");
  const [dob, setDOB] = React.useState({ d: "", m: "", y: "" });

  const [disable, setDisable] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [emailError, setEmailError] = React.useState(null);
  const [passwordError, setPasswordError] = React.useState(null);
  const [firstNameError, setFirstNameError] = React.useState(null);
  const [lastNameError, setLastNameError] = React.useState(null);
  const [deviceError, setDeviceError] = React.useState(null);
  const [confirmPasswordError, setConfirmPasswordError] = React.useState(null);
  const [contactError, setContactError] = React.useState(null);
  const [dobError, setDOBError] = React.useState(null);

  const user = useUser();
  const navigate = useNavigate();

  React.useLayoutEffect(() => {
    document.title = "Company Registration";
  }, []);



  async function onSubmit(e) {
    e.preventDefault();
    let hasError = false;
    if (!firstName) setFirstNameError("First Name is Required");
    if (!lastName) setLastNameError("Last Name is Required");
    if (!email) setEmailError("Email is Required");
    if (!password) setPasswordError("Password is Required");
    if (!confirmPassword)
      setConfirmPasswordError("Password Confirmation is Required");
    if (!device) setDeviceError("Brand Of Device is Required");
    if (!contact) setContactError("Contact Number is Required");
    if (!dob.d || !dob.m || !dob.y) setDOBError("Date Of Birth is required!");

    if (
      !email ||
      !password ||
      !firstName ||
      !lastName ||
      !confirmPassword ||
      !contact ||
      !dob.d ||
      !dob.m ||
      !dob.y ||
      !device
    )
      hasError = true;

    if (password !== confirmPassword) {
      setPasswordError("");
      setConfirmPasswordError("Password Does Not Match");
      hasError = true;
    }

    if (!email.toLowerCase().match(EMAIL_REGEX)) {
      setEmailError("Email is Invalid");
      hasError = true;
    }

    if (password.length < 8) {
      setPasswordError("Password must be atleast 8 characters long!");
      hasError = true;
    }

    if (hasError) return;

    setDisable(true);

    try {
      await user.actions.signup({
        email,
        password,
        device,
        first_name: firstName,
        last_name: lastName,
        date_of_birth: `${dob.y}-${dob.m}-${dob.d}`,
        contact,
      });
      navigate("/signup/success");
      setDisable(false);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err);
        setError('SERVER ERROR');
        setDisable(false);
      }
    }
  }

  return (
    <Container css={style.wrapper}>
      <Container
        onSubmit={onSubmit}
        component="form"
        css={style.container}
        maxWidth="sm"
      >
        {disable && <Loading />}
        <Container css={style.padder}>
          <Typography variant="h4" css={style.typography}>
            Registration
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <FormControl
                css={style.control}
                error={firstNameError !== null}
                fullWidth
              >
                <InputLabel htmlFor="first-name">First Name</InputLabel>
                <Input
                  aria-describedby="first-name"
                  type="text"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    setFirstNameError(null);
                  }}
                  disabled={disable}
                />
                <FormHelperText>
                  {firstNameError && firstNameError}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl
                css={style.control}
                error={lastNameError !== null}
                fullWidth
              >
                <InputLabel htmlFor="last-name">Last Name</InputLabel>
                <Input
                  aria-describedby="last-name"
                  type="text"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    setLastNameError(null);
                  }}
                  disabled={disable}
                />
                <FormHelperText>
                  {lastNameError && lastNameError}
                </FormHelperText>
              </FormControl>
            </Grid>
          </Grid>

          <FormControl css={style.control} error={emailError !== null}>
            <InputLabel htmlFor="email-ht">Email address</InputLabel>
            <Input
              aria-describedby="email-ht"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value.replaceAll(" ", ""));
                setEmailError(null);
              }}
              disabled={disable}
            />
            <FormHelperText>{emailError && emailError}</FormHelperText>
          </FormControl>

          <DateInput
            label="Date Of Birth"
            value={dob}
            onUpdate={(v) => setDOB(v)}
            disable={disable}
            err={dobError}
            onError={(err) => setDOBError(err)}
          />

          <FormControl css={style.control} error={deviceError !== null}>
            <InputLabel htmlFor="device">Brand Of Device</InputLabel>
            <Input
              aria-describedby="device"
              type="text"
              value={device}
              onChange={(e) => {
                setDevice(e.target.value);
                setDeviceError(null);
              }}
              disabled={disable}
            />
            <FormHelperText>{deviceError && deviceError}</FormHelperText>
          </FormControl>
          <FormControl css={style.control} error={contactError !== null}>
            <InputLabel htmlFor="contact">Contact Number</InputLabel>
            <Input
              aria-describedby="contact"
              type="text"
              value={contact}
              onChange={(e) => {
                setContact(e.target.value);
                setContactError(null);
              }}
              placeholder="+44 123 1234567"
              disabled={disable}
            />
            <FormHelperText>{contactError && contactError}</FormHelperText>
          </FormControl>

          <FormControl
            css={style.control}
            fullWidth
            error={passwordError !== null}
          >
            <InputLabel htmlFor="password-ht">Password</InputLabel>
            <Input
              aria-describedby="password-ht"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError(null);
              }}
              disabled={disable}
            />
            <FormHelperText>{passwordError && passwordError}</FormHelperText>
          </FormControl>
          <FormControl
            css={style.control}
            fullWidth
            error={confirmPasswordError !== null}
          >
            <InputLabel htmlFor="cpassword-ht">Confirm Password</InputLabel>
            <Input
              aria-describedby="cpassword-ht"
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setConfirmPasswordError(null);
              }}
              disabled={disable}
            />
            <FormHelperText>
              {confirmPasswordError && confirmPasswordError}
            </FormHelperText>
          </FormControl>
          <Typography variant="subtitle1" css={style.error}>
            {error}
          </Typography>
          <SubmitButton>Sign Up</SubmitButton>
          <FormHelperText>
            Already Have an account? Login in <Link to="/login">Here</Link>
          </FormHelperText>
        </Container>
      </Container>
    </Container>
  );
}

export default SignUpScreen;
