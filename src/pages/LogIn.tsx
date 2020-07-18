import React from "react";
import Button from "../components/Button";
import Logo from "../assets/train-track-init-logo.svg";
import "../styles/LogIn.css";
import LoginCard from "../components/LoginCard";

const LogIn: React.FC = () => {
  return (
    <div className="login-container">
      <div className="login-header">
        <img src={Logo} alt="Train Track Logo" className="train-track-logo" />
        <Button text="Sign Up" size="large" href="#" />
      </div>
      <div className="login-card-container">
        <LoginCard />
      </div>
    </div>
  );
};

export default LogIn;
