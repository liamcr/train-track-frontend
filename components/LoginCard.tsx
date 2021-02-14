import React, { useState } from "react";
import "../styles/LoginCard.module.css";
import axios from "axios";
import { REGISTER_URL, LOGIN_URL } from "../util/consts";

import {
  Button,
  TextField,
  Card,
  CardHeader,
  CardContent,
} from "@material-ui/core";
import ToastAlert from "./ToastAlert";

type LoginCardProps = {
  signup?: boolean;
};

const LoginCard: React.FC<LoginCardProps> = ({ signup }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);

    const data = new FormData(event.target as HTMLFormElement);

    const username = data.get("train-track-username") as string;
    const password = data.get("train-track-password") as string;

    if (signup && username.length < 3) {
      setErrorMessage("Username must be longer than 2 characters.");
      setIsLoading(false);
      return;
    }

    if (signup && password.length < 3) {
      setIsLoading(false);
      setErrorMessage("Password must be longer than 2 characters.");
      return;
    }

    axios
      .post(signup ? REGISTER_URL : LOGIN_URL, {
        username: username,
        password: password,
      })
      .then((response) => {
        if (typeof window !== "undefined")
          window.location.href = `/home#${response.data.accessToken}`;
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          setErrorMessage("Username or password is invalid.");
        } else if (err.response && err.response.status === 409) {
          setErrorMessage("Username is already taken.");
        } else {
          setErrorMessage("Something went wrong. Try again later.");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleClose = () => {
    setErrorMessage("");
  };

  return (
    <>
      <Card>
        <CardHeader title={signup ? "Sign Up" : "Log In"} />
        <CardContent>
          <form onSubmit={onSubmit}>
            <TextField
              label="Username"
              name="train-track-username"
              color="primary"
              variant="outlined"
              fullWidth
            />
            <TextField
              label="Password"
              type="password"
              name="train-track-password"
              variant="outlined"
              color="primary"
              margin="normal"
              fullWidth
            />
            <div style={{ height: "1rem" }} />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isLoading}
              disableElevation
              fullWidth
            >
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
      <ToastAlert message={errorMessage} type="error" onClose={handleClose} />
    </>
  );
};

export default LoginCard;
