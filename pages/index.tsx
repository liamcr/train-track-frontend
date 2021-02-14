import React from "react";
import "../styles/LogIn.module.css";
import { Button } from "@material-ui/core";
import LoginCard from "../components/LoginCard";
import Header from "../components/Header";

const LogIn: React.FC = () => {
  return (
    <div className="login-container">
      <Header notLoggedIn>
        <Button
          variant="contained"
          color="primary"
          size="large"
          href="/signup"
          disableElevation
        >
          Sign Up
        </Button>
      </Header>
      <div className="login-card-container">
        <LoginCard />
      </div>
    </div>
  );
};

export default LogIn;
