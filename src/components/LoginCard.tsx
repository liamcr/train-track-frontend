import React, { useState } from "react";
import Card from "./Card";
import "../styles/LoginCard.css";
import Button from "./Button";
import Input from "./Input";
import axios from "axios";
import config from "../config/config";
import Alert from "./Alert";

const LoginCard: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.target as HTMLFormElement);

    const username = data.get("train-track-username");
    const password = data.get("train-track-password");

    axios
      .post(`${config.apiHost}/users/login`, {
        username: username,
        password: password,
      })
      .then((response) => {
        console.log("Success!");
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          setErrorMessage("Username or password is invalid.");
        } else {
          setErrorMessage("Something went wrong. Try again later.");
        }
      });
  };

  return (
    <Card
      style={{
        width: "60%",
      }}
    >
      <h1>Log In</h1>
      <Alert
        message={errorMessage}
        type="danger"
        visible={errorMessage !== ""}
      />
      <form onSubmit={onSubmit}>
        <Input type="text" placeholder="Username" name="train-track-username" />
        <Input
          type="password"
          placeholder="Password"
          name="train-track-password"
        />
        <div style={{ height: "1rem" }} />
        <Button text="Submit" size="large" style={{ width: "100%" }} />
      </form>
    </Card>
  );
};

export default LoginCard;
