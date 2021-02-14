import React from "react";
import "../styles/LogIn.module.css";
import { Button } from "@material-ui/core";
import LoginCard from "../components/LoginCard";
import Header from "../components/Header";
import SEO from "../components/SEO";

const LogIn: React.FC = () => {
  return (
    <div className="login-container">
      <SEO title="Train Track" />
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
