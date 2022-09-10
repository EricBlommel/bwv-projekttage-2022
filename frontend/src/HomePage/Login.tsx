import React, {ChangeEvent, FormEvent, useState} from "react";
import {Button, Link, TextField, Typography} from "@mui/material";
import AuthService from "../_shared/services/auth.service";

function Login() {

  const [registration, setRegistration] = useState<boolean>(false);
  const [successful, setSuccessful] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  //form inputs
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }

  const onChangeUsername = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  }

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    setMessage("");
    setSuccessful(false);

    if (registration) {
      AuthService.register(
        username,
        email,
        password
      ).then(
        response => {
          setMessage(response.data.message);
          setSuccessful(true);
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      )
    } else {
      AuthService.login(
        username,
        password
      ).then(
        () => {
          console.log("logged in");
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage)
        }
      );
    }
  }

  return (
    <>
      <Typography component="h1" variant="h5">
        {registration ? "Registrierung" : "Anmeldung"}
      </Typography>
      <form onSubmit={handleSubmit}>
        {registration && <TextField
            fullWidth
            margin={"dense"}
            required
            id="email"
            label={"Email"}
            name="Email"
            autoComplete="email"
            autoFocus
            onChange={onChangeEmail}
        />}
        <TextField
          fullWidth
          margin={"dense"}
          required
          id="username"
          label={"Benutzername"}
          name="username"
          autoComplete="username"
          autoFocus
          onChange={onChangeUsername}
        />
        <TextField
          fullWidth
          margin={"dense"}
          required
          name="password"
          label={"Passwort"}
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={onChangePassword}
        />
        <Button
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
        >
          {registration ? "Registrieren" : "Anmelden"}
        </Button>
      </form>
      <Link onClick={() => setRegistration(!registration)}>zur {registration ? "Anmeldung" : "Registrierung"}</Link>
    </>
  )

}

export default Login;