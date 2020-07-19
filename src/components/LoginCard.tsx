import React from "react";
import Card from "./Card";
import "../styles/LoginCard.css";
import Button from "./Button";
import Input from "./Input";

const LoginCard: React.FC = () => {
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.target as HTMLFormElement);

    const username = data.get("train-track-username");
    const password = data.get("train-track-password");

    // TODO send POST request to backend
  };

  return (
    <Card
      style={{
        width: "60%",
      }}
    >
      <h1>Log In</h1>
      <form onSubmit={onSubmit}>
        <Input type="text" placeholder="Username" name="train-track-username" />
        <Input
          type="password"
          placeholder="Password"
          name="train-track-password"
        />
        <div style={{ height: "2rem" }} />
        <Button text="Submit" style={{ width: "100%" }} />
      </form>
    </Card>
  );
};

export default LoginCard;
