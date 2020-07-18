import React from "react";
import Card from "./Card";
import "../styles/LoginCard.css";
import Button from "./Button";
import Input from "./Input";

const LoginCard: React.FC = () => {
  return (
    <Card
      style={{
        width: "60%",
      }}
    >
      <h1>Log In</h1>
      <form>
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
