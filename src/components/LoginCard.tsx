import React, { useState } from "react";
import Card from "./Card";
import "../styles/LoginCard.css";
import Button from "./Button";
import Input from "./Input";
import axios from "axios";
import config from "../config/config";
import Alert from "./Alert";

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

    const username = data.get("train-track-username");
    const password = data.get("train-track-password");

    axios
      .post(`${config.apiHost}/users/${signup ? "register" : "login"}`, {
        username: username,
        password: password,
      })
      .then((response) => {
        console.log("Success!");
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

  return (
    <Card
      style={{
        width: "60%",
      }}
    >
      <h1>{signup ? "Sign Up" : "Log In"}</h1>
      <Alert
        message={errorMessage}
        type="danger"
        visible={errorMessage !== ""}
        onClose={() => setErrorMessage("")}
      />
      <form onSubmit={onSubmit}>
        <Input type="text" placeholder="Username" name="train-track-username" />
        <Input
          type="password"
          placeholder="Password"
          name="train-track-password"
        />
        <div style={{ height: "1rem" }} />
        <Button
          text="Submit"
          size="large"
          loading={isLoading}
          disabled={isLoading}
          style={{ width: "100%" }}
        />
      </form>
    </Card>
  );
};

export default LoginCard;
