import React from "react";
import Button from "../components/Button";
import Logo from "../assets/train-track-init-logo.svg";
import "../styles/LogIn.css";
import LoginCard from "../components/LoginCard";

const LogIn: React.FC = () => {
  return (
    <div className="login-container">
      <div className="login-header">
        <img
          src={Logo}
          alt="Train Track Logo"
          className="train-track-logo"
          onClick={() => {
            window.location.href = "/";
          }}
        />
        <Button
          text="Sign Up"
          size="large"
          onClick={() => {
            window.location.href = "/signup";
          }}
        />
      </div>
      <div className="login-card-container">
        <LoginCard />
      </div>
    </div>
  );
};

export default LogIn;
